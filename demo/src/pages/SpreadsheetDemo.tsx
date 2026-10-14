import React, { useState, useMemo } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';

interface CellStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
  format?: 'none' | 'currency' | 'percent';
  bg?: string;
  color?: string;
}

interface SheetData {
  id: string;
  name: string;
  rows: number;
  cols: number;
  cells: Record<string, string>;
  styles: Record<string, CellStyle>;
}

// ----------------------------------------------------
// Robust In-Browser Formula Engine for Panoptes Spreadsheet
// ----------------------------------------------------
function evaluateFormula(
  rawVal: string,
  cells: Record<string, string>,
  visited: Set<string> = new Set()
): { val: number | string; isError: boolean } {
  if (!rawVal || !rawVal.startsWith('=')) {
    // If it's a numeric string, return number
    const trimmed = (rawVal || '').trim();
    const cleanNum = trimmed.replace(/[^0-9.-]/g, '');
    if (trimmed !== '' && !isNaN(Number(cleanNum)) && !isNaN(parseFloat(cleanNum))) {
      return { val: parseFloat(cleanNum), isError: false };
    }
    return { val: rawVal || '', isError: false };
  }

  const expr = rawVal.substring(1).trim().toUpperCase();

  // Helper to extract clean numeric value for a cell reference
  const getNum = (ref: string): number => {
    if (visited.has(ref)) return 0; // prevent circular dependency
    const cellContent = cells[ref] || '0';
    if (cellContent.startsWith('=')) {
      const nextVisited = new Set(visited);
      nextVisited.add(ref);
      const res = evaluateFormula(cellContent, cells, nextVisited);
      return typeof res.val === 'number' ? res.val : parseFloat(String(res.val).replace(/[^0-9.-]/g, '')) || 0;
    }
    const clean = cellContent.replace(/[^0-9.-]/g, '');
    return parseFloat(clean) || 0;
  };

  // 1. Built-in Range Functions: SUM, AVERAGE, AVG, MIN, MAX, COUNT
  const fnMatch = expr.match(/^(SUM|AVERAGE|AVG|MIN|MAX|COUNT)\(([A-Z][0-9]+):([A-Z][0-9]+)\)$/);
  if (fnMatch) {
    const fn = fnMatch[1];
    const start = fnMatch[2];
    const end = fnMatch[3];

    const startCol = start.charCodeAt(0) - 65;
    const startRow = parseInt(start.substring(1), 10) - 1;
    const endCol = end.charCodeAt(0) - 65;
    const endRow = parseInt(end.substring(1), 10) - 1;

    const values: number[] = [];
    const minR = Math.min(startRow, endRow);
    const maxR = Math.max(startRow, endRow);
    const minC = Math.min(startCol, endCol);
    const maxC = Math.max(startCol, endCol);

    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        const id = `${String.fromCharCode(65 + c)}${r + 1}`;
        values.push(getNum(id));
      }
    }

    if (values.length === 0) return { val: 0, isError: false };

    if (fn === 'SUM') {
      const sum = values.reduce((a, b) => a + b, 0);
      return { val: sum, isError: false };
    }
    if (fn === 'AVERAGE' || fn === 'AVG') {
      const sum = values.reduce((a, b) => a + b, 0);
      return { val: Math.round((sum / values.length) * 100) / 100, isError: false };
    }
    if (fn === 'MIN') {
      return { val: Math.min(...values), isError: false };
    }
    if (fn === 'MAX') {
      return { val: Math.max(...values), isError: false };
    }
    if (fn === 'COUNT') {
      return { val: values.length, isError: false };
    }
  }

  // 2. Arithmetic Expressions with Cell References e.g. B2*C2 or B2+C2 or (B2*C2)*1.2
  const replaced = expr.replace(/[A-Z][0-9]+/g, match => {
    return String(getNum(match));
  });

  if (/^[0-9.+\-*/() ]+$/.test(replaced)) {
    try {
      // Safe numeric calculation
      const result = new Function(`return (${replaced})`)();
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        return { val: Math.round(result * 100) / 100, isError: false };
      }
    } catch {
      return { val: '#HATA!', isError: true };
    }
  }

  return { val: '#HATA!', isError: true };
}

function formatCellValue(val: number | string, style?: CellStyle): string {
  if (typeof val === 'number') {
    if (style?.format === 'currency') {
      return `₺${val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (style?.format === 'percent') {
      return `%${(val * 100).toFixed(1)}`;
    }
    return val.toLocaleString('tr-TR');
  }
  return String(val);
}

// ----------------------------------------------------
// Initial Spreadsheet Templates
// ----------------------------------------------------
const INITIAL_SHEET_1: SheetData = {
  id: 'sheet1',
  name: 'Siparişler & Satışlar',
  rows: 8,
  cols: 5,
  cells: {
    'A1': 'Ürün Adı',
    'B1': 'Adet',
    'C1': 'Birim Fiyat',
    'D1': 'KDV Tutarı',
    'E1': 'Toplam Tutar',

    'A2': 'MacBook Pro M3 Max 16"',
    'B2': '8',
    'C2': '115000',
    'D2': '=(B2*C2)*0.20',
    'E2': '=(B2*C2)+D2',

    'A3': 'Dell UltraSharp 32" 4K',
    'B3': '15',
    'C3': '28500',
    'D3': '=(B3*C3)*0.20',
    'E3': '=(B3*C3)+D3',

    'A4': 'Logitech MX Master 3S',
    'B4': '45',
    'C4': '3800',
    'D4': '=(B4*C4)*0.20',
    'E4': '=(B4*C4)+D4',

    'A5': 'Keychron Q1 Pro Mekanik',
    'B5': '20',
    'C5': '7500',
    'D5': '=(B5*C5)*0.20',
    'E5': '=(B5*C5)+D5',

    'A6': 'CalDigit TS4 Thunderbolt Dock',
    'B6': '12',
    'C6': '14500',
    'D6': '=(B6*C6)*0.20',
    'E6': '=(B6*C6)+D6',

    'A7': 'Toplam Sipariş Adedi',
    'B7': '=SUM(B2:B6)',
    'C7': 'Genel Toplam',
    'D7': '=SUM(D2:D6)',
    'E7': '=SUM(E2:E6)',

    'A8': 'Ortalama Sipariş Tutarı',
    'B8': '-',
    'C8': 'Ortalama (Ürün Başı)',
    'D8': '-',
    'E8': '=AVERAGE(E2:E6)'
  },
  styles: {
    'A1': { bold: true, bg: '#f1f5f9', align: 'left' },
    'B1': { bold: true, bg: '#f1f5f9', align: 'center' },
    'C1': { bold: true, bg: '#f1f5f9', align: 'right' },
    'D1': { bold: true, bg: '#f1f5f9', align: 'right' },
    'E1': { bold: true, bg: '#f1f5f9', align: 'right' },

    'B2': { align: 'center' },
    'B3': { align: 'center' },
    'B4': { align: 'center' },
    'B5': { align: 'center' },
    'B6': { align: 'center' },

    'C2': { align: 'right', format: 'currency' },
    'C3': { align: 'right', format: 'currency' },
    'C4': { align: 'right', format: 'currency' },
    'C5': { align: 'right', format: 'currency' },
    'C6': { align: 'right', format: 'currency' },

    'D2': { align: 'right', format: 'currency', color: '#64748b' },
    'D3': { align: 'right', format: 'currency', color: '#64748b' },
    'D4': { align: 'right', format: 'currency', color: '#64748b' },
    'D5': { align: 'right', format: 'currency', color: '#64748b' },
    'D6': { align: 'right', format: 'currency', color: '#64748b' },

    'E2': { align: 'right', format: 'currency', bold: true, color: '#1e293b' },
    'E3': { align: 'right', format: 'currency', bold: true, color: '#1e293b' },
    'E4': { align: 'right', format: 'currency', bold: true, color: '#1e293b' },
    'E5': { align: 'right', format: 'currency', bold: true, color: '#1e293b' },
    'E6': { align: 'right', format: 'currency', bold: true, color: '#1e293b' },

    'A7': { bold: true, bg: '#e0f2fe', color: '#0369a1' },
    'B7': { bold: true, bg: '#e0f2fe', align: 'center', color: '#0369a1' },
    'C7': { bold: true, bg: '#fef3c7', align: 'right', color: '#92400e' },
    'D7': { bold: true, bg: '#fef3c7', align: 'right', format: 'currency', color: '#92400e' },
    'E7': { bold: true, bg: '#dcfce7', align: 'right', format: 'currency', color: '#15803d' },

    'A8': { italic: true, bg: '#f8fafc', color: '#475569' },
    'C8': { italic: true, bg: '#f8fafc', align: 'right', color: '#475569' },
    'E8': { bold: true, bg: '#f8fafc', align: 'right', format: 'currency', color: '#2563eb' }
  }
};

const INITIAL_SHEET_2: SheetData = {
  id: 'sheet2',
  name: 'Finansal Gelir & Gider',
  rows: 6,
  cols: 4,
  cells: {
    'A1': 'Dönem', 'B1': 'Brüt Gelir', 'C1': 'Operasyonel Gider', 'D1': 'Net Kar / Zarar',
    'A2': 'Ocak 2026', 'B2': '480000', 'C2': '310000', 'D2': '=B2-C2',
    'A3': 'Şubat 2026', 'B3': '560000', 'C3': '325000', 'D3': '=B3-C3',
    'A4': 'Mart 2026', 'B4': '690000', 'C4': '340000', 'D4': '=B4-C4',
    'A5': 'Nisan 2026 (Tahmin)', 'B5': '810000', 'C5': '390000', 'D5': '=B5-C5',
    'A6': 'Genel Toplam', 'B6': '=SUM(B2:B5)', 'C6': '=SUM(C2:C5)', 'D6': '=SUM(D2:D5)'
  },
  styles: {
    'A1': { bold: true, bg: '#f1f5f9' },
    'B1': { bold: true, bg: '#f1f5f9', align: 'right' },
    'C1': { bold: true, bg: '#f1f5f9', align: 'right' },
    'D1': { bold: true, bg: '#f1f5f9', align: 'right' },

    'B2': { align: 'right', format: 'currency' },
    'B3': { align: 'right', format: 'currency' },
    'B4': { align: 'right', format: 'currency' },
    'B5': { align: 'right', format: 'currency' },

    'C2': { align: 'right', format: 'currency', color: '#dc2626' },
    'C3': { align: 'right', format: 'currency', color: '#dc2626' },
    'C4': { align: 'right', format: 'currency', color: '#dc2626' },
    'C5': { align: 'right', format: 'currency', color: '#dc2626' },

    'D2': { align: 'right', format: 'currency', bold: true, color: '#16a34a' },
    'D3': { align: 'right', format: 'currency', bold: true, color: '#16a34a' },
    'D4': { align: 'right', format: 'currency', bold: true, color: '#16a34a' },
    'D5': { align: 'right', format: 'currency', bold: true, color: '#16a34a' },

    'A6': { bold: true, bg: '#f8fafc' },
    'B6': { bold: true, bg: '#e0f2fe', align: 'right', format: 'currency', color: '#0369a1' },
    'C6': { bold: true, bg: '#fee2e2', align: 'right', format: 'currency', color: '#991b1b' },
    'D6': { bold: true, bg: '#dcfce7', align: 'right', format: 'currency', color: '#166534' }
  }
};

export function SpreadsheetDemo() {
  // Active sheet state
  const [sheets, setSheets] = useState<SheetData[]>([INITIAL_SHEET_1, INITIAL_SHEET_2]);
  const [activeSheetId, setActiveSheetId] = useState<string>('sheet1');

  // Currently active cell coordinates
  const [activeCell, setActiveCell] = useState<{ row: number; col: number }>({ row: 1, col: 1 });
  const [inlineEditing, setInlineEditing] = useState<boolean>(false);
  const [lastCalculationTime, setLastCalculationTime] = useState<string>('Az önce');
  const [flashMessage, setFlashMessage] = useState<string>('');

  const currentSheet = useMemo(() => {
    return sheets.find(s => s.id === activeSheetId) || sheets[0];
  }, [sheets, activeSheetId]);

  const getCellId = (r: number, c: number) => {
    const colLetter = String.fromCharCode(65 + c);
    return `${colLetter}${r + 1}`;
  };

  const activeCellId = getCellId(activeCell.row, activeCell.col);
  const rawActiveValue = currentSheet.cells[activeCellId] || '';

  // Calculate all cells in current sheet
  const evaluatedValues = useMemo(() => {
    const map: Record<string, number | string> = {};
    for (const [cellId, raw] of Object.entries(currentSheet.cells)) {
      const res = evaluateFormula(raw, currentSheet.cells);
      map[cellId] = res.val;
    }
    return map;
  }, [currentSheet.cells]);

  // Flash notice helper
  const triggerNotice = (msg: string) => {
    setFlashMessage(msg);
    setLastCalculationTime(new Date().toLocaleTimeString('tr-TR'));
    setTimeout(() => {
      setFlashMessage('');
    }, 2800);
  };

  // Cell Click / Select
  const handleCellClick = (r: number, c: number) => {
    setActiveCell({ row: r, col: c });
    setInlineEditing(false);
  };

  // Cell Double Click (In-Cell Edit)
  const handleCellDoubleClick = (r: number, c: number) => {
    setActiveCell({ row: r, col: c });
    setInlineEditing(true);
  };

  // Update cell value
  const updateCellValue = (cellId: string, newValue: string) => {
    setSheets(prevSheets =>
      prevSheets.map(s => {
        if (s.id !== activeSheetId) return s;
        return {
          ...s,
          cells: {
            ...s.cells,
            [cellId]: newValue
          }
        };
      })
    );
    triggerNotice(`Hücre [${cellId}] güncellendi → Tüm formüller yeniden hesaplandı.`);
  };

  // Toggle cell style formatting
  const toggleStyle = (styleProp: keyof CellStyle, value?: any) => {
    setSheets(prevSheets =>
      prevSheets.map(s => {
        if (s.id !== activeSheetId) return s;
        const currentStyle = s.styles[activeCellId] || {};
        const newStyle = { ...currentStyle };

        if (styleProp === 'bold') newStyle.bold = !currentStyle.bold;
        else if (styleProp === 'italic') newStyle.italic = !currentStyle.italic;
        else if (styleProp === 'underline') newStyle.underline = !currentStyle.underline;
        else if (styleProp === 'format') {
          newStyle.format = currentStyle.format === value ? 'none' : value;
        } else if (styleProp === 'align') {
          newStyle.align = value;
        } else if (styleProp === 'bg') {
          newStyle.bg = currentStyle.bg === value ? undefined : value;
        }

        return {
          ...s,
          styles: {
            ...s.styles,
            [activeCellId]: newStyle
          }
        };
      })
    );
  };

  // Preset Action: Double Order Quantities (Test reactive formula engine)
  const handleMultiplyQuantities = (factor: number) => {
    setSheets(prevSheets =>
      prevSheets.map(s => {
        if (s.id !== 'sheet1') return s;
        const newCells = { ...s.cells };
        ['B2', 'B3', 'B4', 'B5', 'B6'].forEach(id => {
          const val = parseFloat(newCells[id] || '0') || 0;
          newCells[id] = String(Math.round(val * factor));
        });
        return { ...s, cells: newCells };
      })
    );
    triggerNotice(`Sipariş adetleri x${factor} yapıldı. Bütün KDV, Toplam ve SUM formülleri anında güncellendi!`);
  };

  // Preset Action: Apply 10% Discount
  const handleApplyDiscount = () => {
    setSheets(prevSheets =>
      prevSheets.map(s => {
        if (s.id !== 'sheet1') return s;
        const newCells = { ...s.cells };
        ['C2', 'C3', 'C4', 'C5', 'C6'].forEach(id => {
          const val = parseFloat(newCells[id] || '0') || 0;
          newCells[id] = String(Math.round(val * 0.9));
        });
        return { ...s, cells: newCells };
      })
    );
    triggerNotice(`Birim fiyatlara %10 indirim uygulandı. Toplam ciro formülleri otomatik güncellendi!`);
  };

  // Reset to original
  const handleResetSheet = () => {
    setSheets([INITIAL_SHEET_1, INITIAL_SHEET_2]);
    triggerNotice('Çalışma tablosu başlangıç değerlerine sıfırlandı.');
  };

  // Real CSV Export File Download
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    const cols = Array.from({ length: currentSheet.cols });
    const rows = Array.from({ length: currentSheet.rows });

    rows.forEach((_, r) => {
      const rowData = cols.map((_, c) => {
        const id = getCellId(r, c);
        const evaluated = evaluatedValues[id] ?? currentSheet.cells[id] ?? '';
        return `"${String(evaluated).replace(/"/g, '""')}"`;
      });
      csvContent += rowData.join(';') + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${currentSheet.name.replace(/[^a-zA-Z0-9]/g, '_')}_Panoptes.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotice(`"${currentSheet.name}" tablosu gerçek CSV formatında bilgisayarınıza indirildi.`);
  };

  // Add new sheet
  const handleAddNewSheet = () => {
    const newId = `sheet_${Date.now()}`;
    const newName = `Sayfa ${sheets.length + 1} (Yeni)`;
    const newSheet: SheetData = {
      id: newId,
      name: newName,
      rows: 6,
      cols: 4,
      cells: {
        'A1': 'Kategori', 'B1': 'Adet', 'C1': 'Tutar', 'D1': 'Toplam',
        'A2': 'Hizmetler', 'B2': '5', 'C2': '12000', 'D2': '=B2*C2',
        'A3': 'Lisanslar', 'B3': '10', 'C3': '4500', 'D3': '=B3*C3',
        'A4': 'Genel Toplam', 'B4': '=SUM(B2:B3)', 'C4': '-', 'D4': '=SUM(D2:D3)'
      },
      styles: {
        'A1': { bold: true, bg: '#f1f5f9' },
        'B1': { bold: true, bg: '#f1f5f9', align: 'center' },
        'C1': { bold: true, bg: '#f1f5f9', align: 'right' },
        'D1': { bold: true, bg: '#f1f5f9', align: 'right' },
        'D2': { align: 'right', format: 'currency', bold: true },
        'D3': { align: 'right', format: 'currency', bold: true },
        'A4': { bold: true, bg: '#dcfce7' },
        'D4': { bold: true, bg: '#dcfce7', align: 'right', format: 'currency', color: '#15803d' }
      }
    };
    setSheets(prev => [...prev, newSheet]);
    setActiveSheetId(newId);
    triggerNotice(`Yeni çalışma sayfası "${newName}" oluşturuldu ve etkinleştirildi.`);
  };

  const activeStyle = currentSheet.styles[activeCellId] || {};

  return (
    <ComponentShowcase
      title="Spreadsheet (Hesap Tablosu Motoru)"
      category="Veri Yönetimi & Tablolar"
      description="Panoptes Kurumsal Spreadsheet bileşeni: Canlı matematik ve formül hesaplama motoru (SUM, AVERAGE, MIN, MAX, çarpma, bölme, yüzde), formül çubuğu (fx), hücre içi doğrudan çift tıklamayla düzenleme, hücre biçimlendirme stilleri (kalın, para birimi, renk), çoklu çalışma sayfası sekmeleri ve gerçek CSV dışa aktarımı."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Canlı Formül Motoru & Etkileşimli Hesap Tablosu',
          description: 'Hücrelere çift tıklayarak veya üstteki formül çubuğundan değerleri değiştirin. Bütün bağımlı formüller (SUM, KDV, Çarpma, Ortalama) anında canlı olarak yeniden hesaplanır.',
          preview: (
            <div className="space-y-4 w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              {/* Notification Banner when formula recalculates */}
              {flashMessage && (
                <div className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold flex items-center justify-between shadow-xs transition-all animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>{flashMessage}</span>
                  </div>
                  <span className="text-[10px] text-emerald-100">Son Hesaplama: {lastCalculationTime}</span>
                </div>
              )}

              {/* Quick Interactive Scenario Bar */}
              <div className="px-4 pt-3 pb-1 flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <span className="text-base">⚡</span>
                  <span>Anlık Senaryo Testi:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleMultiplyQuantities(1.5)}
                    className="px-2.5 py-1 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-lg font-bold text-slate-700 shadow-2xs transition cursor-pointer"
                  >
                    📈 Adetleri %50 Artır (*1.5)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMultiplyQuantities(0.5)}
                    className="px-2.5 py-1 bg-white hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 border border-slate-200 rounded-lg font-bold text-slate-700 shadow-2xs transition cursor-pointer"
                  >
                    📉 Adetleri Yarıya İndir (*0.5)
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 rounded-lg font-bold text-slate-700 shadow-2xs transition cursor-pointer"
                  >
                    🏷️ %10 Fiyat İndirimi Yap
                  </button>
                  <button
                    type="button"
                    onClick={handleResetSheet}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-semibold transition cursor-pointer"
                  >
                    ↺ Sıfırla
                  </button>
                </div>
              </div>

              {/* Ribbon Toolbar (Styling & Formatting Actions) */}
              <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-xs">
                {/* Font Styles */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                  <button
                    type="button"
                    title="Seçili Hücreyi Kalın Yap"
                    onClick={() => toggleStyle('bold')}
                    className={`w-7 h-7 rounded font-black transition flex items-center justify-center cursor-pointer ${
                      activeStyle.bold ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    B
                  </button>
                  <button
                    type="button"
                    title="Seçili Hücreyi İtalik Yap"
                    onClick={() => toggleStyle('italic')}
                    className={`w-7 h-7 rounded italic font-serif font-bold transition flex items-center justify-center cursor-pointer ${
                      activeStyle.italic ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    I
                  </button>
                  <button
                    type="button"
                    title="Seçili Hücrenin Altını Çiz"
                    onClick={() => toggleStyle('underline')}
                    className={`w-7 h-7 rounded underline font-bold transition flex items-center justify-center cursor-pointer ${
                      activeStyle.underline ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    U
                  </button>
                </div>

                {/* Alignment */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                  <button
                    type="button"
                    title="Sola Hizala"
                    onClick={() => toggleStyle('align', 'left')}
                    className={`w-7 h-7 rounded transition flex items-center justify-center cursor-pointer ${
                      activeStyle.align === 'left' || !activeStyle.align
                        ? 'bg-slate-200 text-slate-900 font-bold'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    ⇤
                  </button>
                  <button
                    type="button"
                    title="Ortala"
                    onClick={() => toggleStyle('align', 'center')}
                    className={`w-7 h-7 rounded transition flex items-center justify-center cursor-pointer ${
                      activeStyle.align === 'center'
                        ? 'bg-slate-200 text-slate-900 font-bold'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    ↔
                  </button>
                  <button
                    type="button"
                    title="Sağa Hizala"
                    onClick={() => toggleStyle('align', 'right')}
                    className={`w-7 h-7 rounded transition flex items-center justify-center cursor-pointer ${
                      activeStyle.align === 'right'
                        ? 'bg-slate-200 text-slate-900 font-bold'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    ⇥
                  </button>
                </div>

                {/* Number Formatters */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                  <button
                    type="button"
                    title="Para Birimi (₺) Formatı"
                    onClick={() => toggleStyle('format', 'currency')}
                    className={`px-2 py-1 rounded font-bold transition flex items-center gap-1 cursor-pointer ${
                      activeStyle.format === 'currency'
                        ? 'bg-emerald-600 text-white'
                        : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <span>₺</span>
                    <span>Para</span>
                  </button>
                  <button
                    type="button"
                    title="Yüzde (%) Formatı"
                    onClick={() => toggleStyle('format', 'percent')}
                    className={`px-2 py-1 rounded font-bold transition flex items-center gap-1 cursor-pointer ${
                      activeStyle.format === 'percent'
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    <span>%</span>
                    <span>Yüzde</span>
                  </button>
                </div>

                {/* Background Highlights */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-bold px-1">Renk:</span>
                  <button
                    type="button"
                    onClick={() => toggleStyle('bg', '#fef3c7')}
                    className="w-5 h-5 rounded-full bg-amber-200 hover:scale-110 transition border border-amber-300"
                    title="Sarı Vurgu"
                  />
                  <button
                    type="button"
                    onClick={() => toggleStyle('bg', '#dcfce7')}
                    className="w-5 h-5 rounded-full bg-emerald-200 hover:scale-110 transition border border-emerald-300"
                    title="Yeşil Onay"
                  />
                  <button
                    type="button"
                    onClick={() => toggleStyle('bg', '#fee2e2')}
                    className="w-5 h-5 rounded-full bg-rose-200 hover:scale-110 transition border border-rose-300"
                    title="Kırmızı Uyarı"
                  />
                  <button
                    type="button"
                    onClick={() => toggleStyle('bg', undefined)}
                    className="px-1.5 py-0.5 text-[10px] font-bold text-slate-500 hover:text-slate-900 rounded"
                    title="Rengi Sıfırla"
                  >
                    Temizle
                  </button>
                </div>

                {/* Real CSV Export Button */}
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition ml-auto flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>CSV İndir ↗</span>
                </button>
              </div>

              {/* Formula Bar (fx) */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100/90 border-b border-slate-200 text-xs font-mono">
                <span className="w-14 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold text-slate-800 shadow-2xs">
                  {activeCellId}
                </span>
                <span className="font-black text-slate-500 italic text-sm">fx</span>
                <input
                  type="text"
                  value={rawActiveValue}
                  placeholder="Metin yazın veya formül girin (Örn: =B2*C2 veya =SUM(B2:B6))..."
                  onChange={e => updateCellValue(activeCellId, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-lg outline-none font-mono text-xs shadow-2xs transition"
                />
                {rawActiveValue.startsWith('=') && (
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                    Sonuç: {formatCellValue(evaluatedValues[activeCellId] ?? '', activeStyle)}
                  </span>
                )}
              </div>

              {/* Main Interactive Spreadsheet Grid */}
              <div className="overflow-x-auto max-h-[460px] relative select-none">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-mono text-[11px] sticky top-0 z-20">
                      <th className="w-12 border border-slate-300 p-2 text-center bg-slate-200 font-bold">#</th>
                      {Array.from({ length: currentSheet.cols }).map((_, c) => {
                        const colLetter = String.fromCharCode(65 + c);
                        const isColSelected = activeCell.col === c;
                        return (
                          <th
                            key={colLetter}
                            className={`border border-slate-300 p-2 text-center font-bold transition ${
                              isColSelected ? 'bg-blue-100 text-blue-900 ring-1 ring-blue-500' : 'bg-slate-100'
                            }`}
                          >
                            {colLetter}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: currentSheet.rows }).map((_, r) => {
                      const isRowSelected = activeCell.row === r;
                      return (
                        <tr key={r}>
                          {/* Row Number Header */}
                          <td
                            className={`border border-slate-300 p-1.5 text-center font-mono font-bold transition ${
                              isRowSelected ? 'bg-blue-100 text-blue-900 ring-1 ring-blue-500' : 'bg-slate-100/80 text-slate-500'
                            }`}
                          >
                            {r + 1}
                          </td>

                          {/* Data Cells */}
                          {Array.from({ length: currentSheet.cols }).map((_, c) => {
                            const cellId = getCellId(r, c);
                            const raw = currentSheet.cells[cellId] || '';
                            const evaluated = evaluatedValues[cellId] ?? raw;
                            const isSelected = activeCell.row === r && activeCell.col === c;
                            const style = currentSheet.styles[cellId] || {};
                            const formatted = formatCellValue(evaluated, style);

                            const alignClass =
                              style.align === 'center'
                                ? 'text-center'
                                : style.align === 'right'
                                ? 'text-right'
                                : 'text-left';

                            const fontClass = [
                              style.bold ? 'font-bold' : '',
                              style.italic ? 'italic' : '',
                              style.underline ? 'underline' : ''
                            ].filter(Boolean).join(' ');

                            return (
                              <td
                                key={c}
                                onClick={() => handleCellClick(r, c)}
                                onDoubleClick={() => handleCellDoubleClick(r, c)}
                                style={{
                                  backgroundColor: style.bg || undefined,
                                  color: style.color || undefined
                                }}
                                className={`border border-slate-300 p-2 transition cursor-cell relative ${
                                  isSelected
                                    ? 'ring-2 ring-blue-600 bg-blue-50/60 z-10'
                                    : 'hover:bg-slate-50'
                                } ${alignClass} ${fontClass}`}
                              >
                                {isSelected && inlineEditing ? (
                                  <input
                                    autoFocus
                                    type="text"
                                    value={raw}
                                    onChange={e => updateCellValue(cellId, e.target.value)}
                                    onBlur={() => setInlineEditing(false)}
                                    onKeyDown={e => {
                                      if (e.key === 'Enter' || e.key === 'Escape') {
                                        setInlineEditing(false);
                                      }
                                    }}
                                    className="w-full h-full px-1 py-0.5 bg-white border border-blue-600 outline-none text-xs font-mono shadow-xs"
                                  />
                                ) : (
                                  <div className="truncate flex items-center justify-between gap-1">
                                    <span className="truncate">{formatted || <span className="opacity-0">-</span>}</span>
                                    {raw.startsWith('=') && (
                                      <span
                                        className="text-[9px] font-mono text-blue-500 opacity-60 ml-1 font-normal"
                                        title={`Formül: ${raw}`}
                                      >
                                        fx
                                      </span>
                                    )}
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Status Bar & Help Info */}
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Hücre Düzenleme: Çift tıklayın veya fx çubuğunu kullanın
                  </span>
                  <span>|</span>
                  <span>Formül Desteği: <code>=B2*C2</code>, <code>=SUM(B2:B6)</code>, <code>=AVERAGE(...)</code></span>
                </div>
                <div className="text-slate-600 font-semibold">
                  Seçili: <strong className="text-blue-700">{activeCellId}</strong> ({rawActiveValue ? `Değer: "${rawActiveValue}"` : 'Boş'})
                </div>
              </div>

              {/* Interactive Multi-Sheet Tabs */}
              <div className="p-2 bg-slate-200/80 border-t border-slate-300 flex items-center gap-1.5 text-xs font-bold overflow-x-auto">
                {sheets.map(sheet => {
                  const isActive = sheet.id === activeSheetId;
                  return (
                    <button
                      key={sheet.id}
                      type="button"
                      onClick={() => {
                        setActiveSheetId(sheet.id);
                        setActiveCell({ row: 1, col: 1 });
                        triggerNotice(`"${sheet.name}" çalışma sayfasına geçildi.`);
                      }}
                      className={`px-3.5 py-1.5 rounded-t-lg transition flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-white text-blue-700 border-t-2 border-blue-600 shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>📊</span>
                      <span>{sheet.name}</span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={handleAddNewSheet}
                  className="px-3 py-1.5 text-slate-600 hover:text-blue-700 hover:bg-white rounded-t-lg transition flex items-center gap-1 cursor-pointer"
                  title="Yeni Çalışma Sayfası Ekle"
                >
                  <span className="text-base font-bold">+</span>
                  <span>Yeni Sayfa</span>
                </button>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { PanoptesSpreadsheet } from '@panoptes/react';

export function SpreadsheetExample() {
  const [activeCell, setActiveCell] = useState('A1');
  const [cells, setCells] = useState({
    'A1': 'Ürün', 'B1': 'Adet', 'C1': 'Birim Fiyat', 'D1': 'Toplam',
    'A2': 'Laptop Pro 16', 'B2': '10', 'C2': '45000', 'D2': '=B2*C2',
    'A3': '4K Monitör',    'B3': '15', 'C3': '28500', 'D3': '=B3*C3',
    'A4': 'Genel Toplam',  'B4': '=SUM(B2:B3)', 'C4': '-', 'D4': '=SUM(D2:D3)'
  });

  return (
    <PanoptesSpreadsheet
      data={cells}
      rows={8}
      cols={5}
      showFormulaBar={true}
      showRibbonToolbar={true}
      allowCellFormatting={true}
      onCellChange={(cellId, newValue) => {
        setCells(prev => ({ ...prev, [cellId]: newValue }));
      }}
      onExportCSV={() => console.log('CSV Export')}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'sheets', type: 'SpreadsheetSheet[]', description: 'Çoklu çalışma sayfası (sheet) veri koleksiyonu' },
        { name: 'activeSheetId', type: 'string', default: 'sheet1', description: 'Aktif görüntülenen sayfa anahtarı' },
        { name: 'showFormulaBar', type: 'boolean', default: 'true', description: 'fx formül ve koordinat çubuğu görünürlüğü' },
        { name: 'showRibbonToolbar', type: 'boolean', default: 'true', description: 'Yazı tipi, hizalama ve sayı biçimi şerit menüsü' },
        { name: 'allowInCellEdit', type: 'boolean', default: 'true', description: 'Çift tıklamayla doğrudan hücre içi metin düzenleme' },
        { name: 'supportedFormulas', type: 'string[]', default: "['SUM', 'AVG', 'MIN', 'MAX', 'COUNT', '+', '-', '*', '/']", description: 'Desteklenen matematik ve aralık fonksiyonları' },
        { name: 'onCellChange', type: '(cellId: string, value: string) => void', description: 'Hücre içeriği veya formülü değiştiğinde tetiklenir' },
        { name: 'onExportCSV', type: '() => void', description: 'Hesaplanmış tablonun gerçek CSV dosyasını dışa aktarır' }
      ]}
    />
  );
}
