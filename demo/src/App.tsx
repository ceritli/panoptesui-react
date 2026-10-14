import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { OverviewDemo } from './pages/OverviewDemo';
import { PagingDemo } from './pages/PagingDemo';
import { SortingDemo } from './pages/SortingDemo';
import { FilteringDemo } from './pages/FilteringDemo';
import { GroupingDemo } from './pages/GroupingDemo';
import { SelectionDemo } from './pages/SelectionDemo';
import { HierarchyDemo } from './pages/HierarchyDemo';
import { ColumnsDemo } from './pages/ColumnsDemo';
import { IncellEditDemo } from './pages/IncellEditDemo';
import { InlineEditDemo } from './pages/InlineEditDemo';
import { PopupEditDemo } from './pages/PopupEditDemo';
import { TemplatesDemo } from './pages/TemplatesDemo';
import { ExportDemo } from './pages/ExportDemo';
import { ApiDemo } from './pages/ApiDemo';
import { EventsDemo } from './pages/EventsDemo';
import { ComponentCatalogDemo } from './pages/ComponentCatalogDemo';
import { ComponentShowcase } from './components/ComponentShowcase';

const GRID_PROPS_ROWS = [
  { name: 'data', type: 'T[]', default: '[]', description: 'Tabloda listelenecek veri dizisi (sunucu veya yerel veri kaynağı).' },
  { name: 'pageSize', type: 'number', default: '10', description: 'Sayfa başına gösterilecek varsayılan kayıt adedi.' },
  { name: 'pageSizes', type: 'number[]', default: '[5, 10, 20]', description: 'Kullanıcının seçebileceği sayfa boyutu seçenekleri dizisi.' },
  { name: 'sortable', type: 'boolean', default: 'true', description: 'Sütun başlıklarına tıklayarak sıralamayı (tekli veya çoklu) etkinleştirir.' },
  { name: 'filterable', type: 'boolean', default: 'false', description: 'Sütun bazlı veri filtreleme menülerini ve arama kutucuklarını etkinleştirir.' },
  { name: 'groupable', type: 'boolean', default: 'false', description: 'Sütunların üst alana sürüklenerek gruplanmasını etkinleştirir.' },
  { name: 'selectable', type: 'boolean', default: 'false', description: 'Satır seçimi (checkbox veya tıklama ile tekli/çoklu satır seçimi).' },
  { name: 'searchable', type: 'boolean', default: 'false', description: 'Araç çubuğunda anlık genel arama filtre kutusunu etkinleştirir.' },
  { name: 'editable', type: "'inline' | 'incell' | 'popup' | false", default: 'false', description: 'Satır içi, hücre içi (toplu) veya modal popup düzenleme modları.' },
  { name: 'exportable', type: 'boolean', default: 'false', description: 'Excel (.xlsx/.xls/.csv) dışa aktarma butonunu araç çubuğuna ekler.' },
  { name: 'pdfExport', type: 'boolean', default: 'false', description: 'Vektörel PDF / Yazdır butonunu araç çubuğuna ekler.' },
  { name: 'detailTemplate', type: '(row: T) => ReactNode', default: '-', description: 'Satır genişletildiğinde açılacak hiyerarşik detay şablonu.' },
  { name: 'onSelectionChange', type: '(selected: T[]) => void', default: '-', description: 'Seçilen satırların listesi değiştiğinde tetiklenen callback.' },
  { name: 'onSave', type: '(record: T) => void', default: '-', description: 'Düzenlenen satır veya hücre kaydedildiğinde tetiklenen callback.' }
];

// Data Management
import { TreeListDemo } from './pages/TreeListDemo';
import { PivotGridDemo } from './pages/PivotGridDemo';
import { SpreadsheetDemo } from './pages/SpreadsheetDemo';
import { ListViewDemo } from './pages/ListViewDemo';
import { PagerDemo } from './pages/PagerDemo';
import { PropertyGridDemo } from './pages/PropertyGridDemo';

// Date & Time Inputs
import { DatePickerDemo } from './pages/DatePickerDemo';
import { DateRangePickerDemo } from './pages/DateRangePickerDemo';
import { TimePickerDemo } from './pages/TimePickerDemo';
import { DateTimePickerDemo } from './pages/DateTimePickerDemo';

// Dropdowns & Select
import { DropDownListDemo } from './pages/DropDownListDemo';
import { ComboBoxDemo } from './pages/ComboBoxDemo';
import { AutoCompleteDemo } from './pages/AutoCompleteDemo';
import { MultiSelectDemo } from './pages/MultiSelectDemo';
import { DropDownTreeDemo } from './pages/DropDownTreeDemo';
import { MultiColumnComboBoxDemo } from './pages/MultiColumnComboBoxDemo';

// Text & Numeric Inputs
import { TextBoxDemo } from './pages/TextBoxDemo';
import { NumericTextBoxDemo } from './pages/NumericTextBoxDemo';
import { TextAreaDemo } from './pages/TextAreaDemo';
import { MaskedTextBoxDemo } from './pages/MaskedTextBoxDemo';
import { SwitchDemo } from './pages/SwitchDemo';
import { CheckBoxDemo } from './pages/CheckBoxDemo';
import { RadioGroupDemo } from './pages/RadioGroupDemo';
import { SliderDemo } from './pages/SliderDemo';
import { RatingDemo } from './pages/RatingDemo';
import { ColorPickerDemo } from './pages/ColorPickerDemo';
import { OtpDemo } from './pages/OtpDemo';
import { SignatureDemo } from './pages/SignatureDemo';
import { UploadDemo } from './pages/UploadDemo';
import { EditorDemo } from './pages/EditorDemo';
import { FormDemo } from './pages/FormDemo';

// Navigation & Layout
import { MenuDemo } from './pages/MenuDemo';
import { TabStripDemo } from './pages/TabStripDemo';
import { PanelBarDemo } from './pages/PanelBarDemo';
import { DrawerDemo } from './pages/DrawerDemo';
import { TreeViewDemo } from './pages/TreeViewDemo';
import { StepperDemo } from './pages/StepperDemo';
import { BreadcrumbDemo } from './pages/BreadcrumbDemo';
import { ToolBarDemo } from './pages/ToolBarDemo';
import { SplitterDemo } from './pages/SplitterDemo';
import { TileLayoutDemo } from './pages/TileLayoutDemo';
import { ScrollViewDemo } from './pages/ScrollViewDemo';
import { ActionSheetDemo } from './pages/ActionSheetDemo';

// Popups & Dialogs
import { WindowDemo } from './pages/WindowDemo';
import { DialogDemo } from './pages/DialogDemo';
import { NotificationDemo } from './pages/NotificationDemo';
import { TooltipDemo } from './pages/TooltipDemo';

// Scheduling & Gantt
import { SchedulerDemo } from './pages/SchedulerDemo';
import { GanttDemo } from './pages/GanttDemo';
import { TaskBoardDemo } from './pages/TaskBoardDemo';

// Charts & Visualizations
import { ChartsDemo } from './pages/ChartsDemo';
import { StockChartDemo } from './pages/StockChartDemo';
import { GaugesDemo } from './pages/GaugesDemo';
import { BarcodeDemo } from './pages/BarcodeDemo';
import { DiagramDemo } from './pages/DiagramDemo';
import { MapDemo } from './pages/MapDemo';

// Media & Document Tools
import { PdfViewerDemo } from './pages/PdfViewerDemo';
import { FilterDemo } from './pages/FilterDemo';
import { MediaPlayerDemo } from './pages/MediaPlayerDemo';
import { ChatDemo } from './pages/ChatDemo';

// Legacy summary pages
import { InputsDemo } from './pages/InputsDemo';
import { LayoutDemo } from './pages/LayoutDemo';
import { PopupsDemo } from './pages/PopupsDemo';
import { SchedulingDemo } from './pages/SchedulingDemo';
import { ToolsDemo } from './pages/ToolsDemo';
import { PanoptesProvider, LocaleSelector, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation, getNavGroups, SUPPORTED_LANGUAGES } from './i18n/siteTranslations';

import { Product } from './types';

export interface NavItem {
  id: string;
  label: string;
  sub?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

// Complete navigation groups matching Panoptes UI categories - 1 to 1 dedicated components
export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Data Grid (Veri Yönetimi)',
    items: [
      { id: 'overview', label: '1. Genel Bakış (Overview)' },
      { id: 'paging', label: 'Sayfalama (Paging)', sub: true },
      { id: 'sorting', label: 'Çoklu Sıralama (Sorting)', sub: true },
      { id: 'filtering', label: 'Filtreleme & Arama (Filtering)', sub: true },
      { id: 'grouping', label: 'Gruplama & Özetler (Grouping)', sub: true },
      { id: 'selection', label: 'Satır Seçimi & Checkbox', sub: true },
      { id: 'hierarchy', label: 'Hiyerarşi & Alt Grid (Detail)', sub: true },
      { id: 'columns', label: 'Sütun Yönetimi & Görünürlük', sub: true },
      { id: 'incell', label: 'Hücre İçi (In-Cell / Batch Edit)', sub: true },
      { id: 'inline', label: 'Satır İçi Düzenleme (Inline)', sub: true },
      { id: 'popup', label: 'Modal ile Düzenleme (Popup)', sub: true },
      { id: 'templates', label: 'Özel Hücre Şablonları (Templates)', sub: true },
      { id: 'export', label: 'Excel & PDF Dışa Aktarma', sub: true },
      { id: 'api', label: 'React Props & State API', sub: true },
      { id: 'events', label: 'Canlı Olaylar Konsolu (Events)', sub: true }
    ]
  },
  {
    title: 'Gelişmiş Veri & Izgara',
    items: [
      { id: 'treelist', label: 'TreeList (Hiyerarşik Ağaç Tablo)' },
      { id: 'pivotgrid', label: 'PivotGrid (Çapraz Matris Tablosu)' },
      { id: 'spreadsheet', label: 'Spreadsheet (Excel & Formül Barı)' },
      { id: 'listview', label: 'ListView (Şablonlu Kart Listesi)' },
      { id: 'pager', label: 'Pager (Bağımsız Sayfalayıcı)' },
      { id: 'propertygrid', label: 'PropertyGrid (Özellik Denetçisi)' }
    ]
  },
  {
    title: 'Tarih & Zaman Seçiciler',
    items: [
      { id: 'datepicker', label: 'DatePicker (Tarih Seçici)' },
      { id: 'daterangepicker', label: 'DateRangePicker (Tarih Aralığı)' },
      { id: 'timepicker', label: 'TimePicker (Saat Seçici)' },
      { id: 'datetimepicker', label: 'DateTimePicker (Tarih & Saat)' }
    ]
  },
  {
    title: 'Açılır Menüler & Seçim',
    items: [
      { id: 'dropdownlist', label: 'DropDownList (Açılır Seçim)' },
      { id: 'combobox', label: 'ComboBox (Serbest Metin & Liste)' },
      { id: 'autocomplete', label: 'AutoComplete (Otomatik Tamamlama)' },
      { id: 'multiselect', label: 'MultiSelect (Çoklu Etiket Seçimi)' },
      { id: 'dropdowntree', label: 'DropDownTree (Ağaç Açılır Menü)' },
      { id: 'multicolumncombobox', label: 'MultiColumnComboBox (Çok Sütunlu)' }
    ]
  },
  {
    title: 'Metin & Sayısal Girişler',
    items: [
      { id: 'textbox', label: 'TextBox (Metin Kutusu)' },
      { id: 'numerictextbox', label: 'NumericTextBox (Sayısal Giriş)' },
      { id: 'textarea', label: 'TextArea (Çok Satırlı Metin)' },
      { id: 'maskedtextbox', label: 'MaskedTextBox (Maskeli Giriş)' },
      { id: 'switch', label: 'Switch (Aç/Kapa Anahtarı)' },
      { id: 'checkbox', label: 'CheckBox (Onay Kutusu)' },
      { id: 'radiogroup', label: 'RadioGroup (Radyo Buton Grubu)' },
      { id: 'slider', label: 'Slider (Aralık Kaydırıcı)' },
      { id: 'rating', label: 'Rating (Yıldız Puanlama)' },
      { id: 'colorpicker', label: 'ColorPicker (Renk Seçici)' },
      { id: 'otp', label: 'OTPInput (Tek Kullanımlık Şifre)' },
      { id: 'signature', label: 'Signature (Dijital İmza Tuvali)' },
      { id: 'upload', label: 'Upload (Dosya Yükleme)' },
      { id: 'editor', label: 'Editor (WYSIWYG Zengin Metin)' },
      { id: 'form', label: 'Form (Doğrulama & Gönderim)' }
    ]
  },
  {
    title: 'Navigasyon & Yerleşim',
    items: [
      { id: 'menu', label: 'Menu (Hiyerarşik Navigasyon)' },
      { id: 'tabstrip', label: 'TabStrip (Sekmeli Panel)' },
      { id: 'panelbar', label: 'PanelBar (Akordiyon Paneller)' },
      { id: 'drawer', label: 'Drawer (Yan Çekmece)' },
      { id: 'treeview', label: 'TreeView (Hiyerarşik Ağaç)' },
      { id: 'stepper', label: 'Stepper (Adım Sayacı / Wizard)' },
      { id: 'breadcrumb', label: 'Breadcrumb (Ekmek Kırıntısı)' },
      { id: 'toolbar', label: 'ToolBar (Eylem Araç Çubuğu)' },
      { id: 'splitter', label: 'Splitter (Panel Bölücü)' },
      { id: 'tilelayout', label: 'TileLayout (Pano Düzeni)' },
      { id: 'scrollview', label: 'ScrollView (Kart Kaydırıcı)' },
      { id: 'actionsheet', label: 'ActionSheet (Mobil Eylem Menüsü)' }
    ]
  },
  {
    title: 'Popuplar & Bildirimler',
    items: [
      { id: 'window', label: 'Window (Masaüstü Pencere)' },
      { id: 'dialog', label: 'Dialog (Alert / Confirm / Prompt)' },
      { id: 'notification', label: 'Notification (Toast Bildirimleri)' },
      { id: 'tooltip', label: 'Tooltip (Hover Bilgi İpucu)' }
    ]
  },
  {
    title: 'Planlama & Ajanda',
    items: [
      { id: 'scheduler', label: 'Scheduler (Ajanda & Randevu)' },
      { id: 'gantt', label: 'Gantt (Zaman Çizelgesi & Plan)' },
      { id: 'taskboard', label: 'TaskBoard (Kanban Panosu)' }
    ]
  },
  {
    title: 'Grafikler & Görselleştirme',
    items: [
      { id: 'charts', label: 'Chart (Sütun & Pasta Grafik)' },
      { id: 'stockchart', label: 'StockChart (Finansal Mum Grafiği)' },
      { id: 'gauges', label: 'Gauges (Kadran Göstergeleri)' },
      { id: 'barcode', label: 'Barcode & QR Code (Barkod)' },
      { id: 'diagram', label: 'Diagram (Organizasyon Şeması)' },
      { id: 'map', label: 'Map (Coğrafi Konum Haritası)' }
    ]
  },
  {
    title: 'Medya & Döküman Araçları',
    items: [
      { id: 'pdfviewer', label: 'PDFViewer (PDF Belge Okuyucu)' },
      { id: 'filter', label: 'Filter (Görsel Filtre Motoru)' },
      { id: 'mediaplayer', label: 'MediaPlayer (Video/Ses Oynatıcı)' },
      { id: 'chat', label: 'Chat (AI Sohbet & Asistan)' }
    ]
  }
];

// Sub navigation tabs strictly mapping each distinct demo view
const SUB_NAV_TABS = [
  { id: 'overview', title: 'Genel Bakış' },
  { id: 'paging', title: 'Sayfalama' },
  { id: 'sorting', title: 'Sıralama' },
  { id: 'filtering', title: 'Filtreleme' },
  { id: 'grouping', title: 'Gruplama' },
  { id: 'selection', title: 'Seçim (Checkbox)' },
  { id: 'hierarchy', title: 'Hiyerarşi' },
  { id: 'columns', title: 'Sütun Yönetimi' },
  { id: 'incell', title: 'Hücre İçi (Batch)' },
  { id: 'inline', title: 'Satır İçi' },
  { id: 'popup', title: 'Modal (Popup)' },
  { id: 'templates', title: 'Şablonlar' },
  { id: 'export', title: 'Dışa Aktarma' },
  { id: 'api', title: 'React Props' },
  { id: 'events', title: 'Olaylar Konsolu' }
];

const VALID_IDS = [
  ...SUB_NAV_TABS.map(t => t.id),
  'catalog',
  'comparison',
  // Advanced Data
  'treelist', 'pivotgrid', 'spreadsheet', 'listview', 'pager', 'propertygrid',
  // Date & Time
  'datepicker', 'daterangepicker', 'timepicker', 'datetimepicker',
  // Dropdowns
  'dropdownlist', 'combobox', 'autocomplete', 'multiselect', 'dropdowntree', 'multicolumncombobox',
  // Inputs
  'textbox', 'numerictextbox', 'textarea', 'maskedtextbox', 'switch', 'checkbox',
  'radiogroup', 'slider', 'rating', 'colorpicker', 'otp', 'signature', 'upload', 'editor', 'form',
  // Navigation & Layout
  'menu', 'tabstrip', 'panelbar', 'drawer', 'treeview', 'stepper', 'breadcrumb',
  'toolbar', 'splitter', 'tilelayout', 'scrollview', 'actionsheet',
  // Popups
  'window', 'dialog', 'notification', 'tooltip',
  // Scheduling
  'scheduler', 'gantt', 'taskboard',
  // Charts
  'charts', 'stockchart', 'gauges', 'barcode', 'diagram', 'map',
  // Tools
  'pdfviewer', 'filter', 'mediaplayer', 'chat',
  // Summary Pages
  'inputs', 'layout', 'popups', 'scheduling', 'tools'
];

export interface RouteState {
  locale: string;
  activeId: string;
}

// Helper to extract both locale and activeId from window.location
export function getRouteState(): RouteState {
  if (typeof window === 'undefined') {
    return { locale: 'tr', activeId: 'overview' };
  }

  const rawPath = window.location.pathname.toLowerCase();
  const pathParts = rawPath.split('/').filter(Boolean);
  const possibleLocale = pathParts[0];
  const matchedLang = SUPPORTED_LANGUAGES.find(l => l.code === possibleLocale);

  const currentLocale = matchedLang ? matchedLang.code : 'tr';

  let clean = rawPath;
  if (matchedLang) {
    clean = clean.replace(new RegExp(`^\\/${matchedLang.code}\\/?`), '');
  } else {
    clean = clean.replace(/^\//, '');
  }
  clean = clean.replace(/^\/grid\/?/, '').replace(/^\//, '').trim();

  // 1. Catalog check
  if (clean.includes('catalog') || clean.includes('comparison')) {
    return { locale: currentLocale, activeId: 'catalog' };
  }

  // 2. Direct component route check
  if (clean && VALID_IDS.includes(clean)) {
    return { locale: currentLocale, activeId: clean === 'comparison' ? 'catalog' : clean };
  }

  // 3. Fallback query param
  const params = new URLSearchParams(window.location.search);
  const paramVal = params.get('demo') || params.get('tab') || params.get('page');
  if (paramVal && VALID_IDS.includes(paramVal)) {
    return { locale: currentLocale, activeId: paramVal === 'comparison' ? 'catalog' : paramVal };
  }

  // 4. Fallback hash
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/^grid\/?/, '').trim();
  if (hash && VALID_IDS.includes(hash)) {
    return { locale: currentLocale, activeId: hash === 'comparison' ? 'catalog' : hash };
  }

  return { locale: currentLocale, activeId: 'overview' };
}

function AppContent({ initialActiveId = 'overview' }: { initialActiveId?: string }) {
  const [activeId, setActiveId] = useState<string>(initialActiveId);
  const [gridDocTab, setGridDocTab] = useState<'features' | 'api' | 'a11y'>('features');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const { locale, setLocale } = usePanoptesLocale();
  const tSite = getSiteTranslation(locale);
  const navGroups = useMemo(() => getNavGroups(locale), [locale]);

  // Sync route on popstate and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const route = getRouteState();
      setActiveId(route.activeId);
      setGridDocTab('features');
      if (route.locale !== locale) {
        setLocale(route.locale);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [locale, setLocale]);

  // Sync URL when locale changes from external controls (like LocaleSelector dropdown)
  useEffect(() => {
    const rawPath = window.location.pathname.toLowerCase();
    const isTr = locale === 'tr';
    const expectedPrefix = isTr ? '' : `/${locale}`;
    const sub = activeId === 'overview' ? '' : `/${activeId}`;
    const expectedUrl = `${expectedPrefix}${sub}` || '/';

    if (window.location.pathname !== expectedUrl) {
      window.history.pushState({ id: activeId, locale }, '', expectedUrl);
    }
  }, [locale, activeId]);

  // Keep URL aligned with activeId and locale
  const navigateTo = useCallback((id: string, targetLocale?: string) => {
    const loc = targetLocale || locale || 'tr';
    const prefix = loc === 'tr' ? '' : `/${loc}`;
    const sub = id === 'overview' ? '' : `/${id}`;
    const targetUrl = `${prefix}${sub}` || '/';

    window.history.pushState({ id, locale: loc }, '', targetUrl);
    setActiveId(id);
    setGridDocTab('features');
    if (targetLocale && targetLocale !== locale) {
      setLocale(targetLocale);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [locale, setLocale]);

  // Language switcher that switches between / and /{locale} preserving active page
  const switchLocale = useCallback((newLocale: string) => {
    if (newLocale === locale) return;
    setLocale(newLocale);
    const prefix = newLocale === 'tr' ? '' : `/${newLocale}`;
    const sub = activeId === 'overview' ? '' : `/${activeId}`;
    const targetUrl = `${prefix}${sub}` || '/';
    window.history.pushState({ id: activeId, locale: newLocale }, '', targetUrl);
  }, [locale, activeId, setLocale]);

  // Fetch local mock data
  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Veri yüklenirken hata:', err);
        setLoading(false);
      });
  }, []);

  // Compute active item for enterprise reference banner
  const activeItem = useMemo(() => {
    for (const group of navGroups) {
      const found = group.items.find(i => i.id === activeId);
      if (found) return found;
    }
    return {
      id: activeId,
      label: activeId.toUpperCase()
    };
  }, [navGroups, activeId]);

  // Sadece seçili sayfanın ait olduğu grubu açık tut, diğerlerini kapat
  useEffect(() => {
    const nextOpen: Record<string, boolean> = {};
    for (const group of navGroups) {
      nextOpen[group.title] = group.items.some(i => i.id === activeId);
    }
    setOpenGroups(nextOpen);

    // Seçili öğeyi sol menüde görünür alana kaydır
    const timer = setTimeout(() => {
      const activeEl = document.querySelector('.sidebar-item-active');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [navGroups, activeId]);

  // Filter groups in sidebar by search keyword
  const filteredGroups = useMemo(() => {
    if (!searchFilter.trim()) return navGroups;
    const q = searchFilter.toLowerCase();
    return navGroups.map(group => ({
      ...group,
      items: group.items.filter(
        item => item.label.toLowerCase().includes(q) || item.id.toLowerCase().includes(q)
      )
    })).filter(group => group.items.length > 0);
  }, [navGroups, searchFilter]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* 1. Global Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-[1700px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('overview')}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-sky-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                P
              </div>
              <div>
                <div className="font-black text-base tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Panoptes UI
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  {tSite.header.brandSubtitle}
                </div>
              </div>
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {tSite.header.badge}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Segment Toggle between / (TR) and /en (EN) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              {SUPPORTED_LANGUAGES.slice(0, 2).map(lang => {
                const isSelected = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => switchLocale(lang.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title={`${lang.label} (${lang.code === 'tr' ? 'localhost:3000' : `localhost:3000/${lang.code}`})`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>

            <LocaleSelector />

            <button
              type="button"
              onClick={() => navigateTo('catalog')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeId === 'catalog' || activeId === 'comparison'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200'
              }`}
            >
              <span>📊</span>
              <span className="hidden md:inline">{tSite.header.catalogButton}</span>
              <span className="md:hidden">{tSite.header.catalogButtonShort}</span>
            </button>

            <a
              href="https://github.com/ceritlifatih/panoptes"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. Application Body (Sidebar + Content Workspace) */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 sticky top-22 max-h-[calc(100vh-6.5rem)] flex flex-col">
            {/* Quick Search */}
            <div className="relative mb-2">
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder={tSite.sidebar.searchPlaceholder}
                className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
              <span className="absolute left-2.5 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>

            {/* Navigation Groups List */}
            <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              {filteredGroups.map(group => {
                const hasActiveChild = group.items.some(i => i.id === activeId);
                const isSearching = !!searchFilter.trim();
                // Arama yapılıyorsa açık, değilse sadece aktif çocuğu olan grup açık
                const isOpen = isSearching || (openGroups[group.title] ?? hasActiveChild);

                return (
                  <details
                    key={group.title}
                    open={isOpen}
                    onToggle={e => {
                      const curOpen = (e.target as HTMLDetailsElement).open;
                      setOpenGroups(prev => ({ ...prev, [group.title]: curOpen }));
                    }}
                    className={`group/cat rounded-xl border transition-colors ${
                      hasActiveChild ? 'bg-indigo-50/30 border-indigo-200' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <summary className="flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                      <span className="truncate">{group.title}</span>
                      <span className="text-[10px] text-slate-400 group-open/cat:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <nav className="px-2 pb-2 pt-0.5 space-y-0.5 text-xs border-t border-slate-100">
                      {group.items.map(item => {
                        const isActive = item.id === activeId;
                        return (
                          <div
                            key={item.id}
                            className="group/item relative flex items-center"
                          >
                            <button
                              type="button"
                              onClick={() => navigateTo(item.id)}
                              className={`sidebar-link flex-1 min-w-0 flex items-center gap-2 rounded-lg text-left cursor-pointer transition px-2 py-1.5 ${
                                isActive
                                  ? 'sidebar-item-active active bg-blue-600 text-white font-bold shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                              } ${item.sub ? 'text-[11px] pl-4' : 'text-xs'}`}
                            >
                              <span className="truncate">{item.label}</span>
                            </button>
                          </div>
                        );
                      })}
                    </nav>
                  </details>
                );
              })}
              {filteredGroups.length === 0 && (
                <div className="text-center text-xs text-slate-400 py-6">
                  {tSite.sidebar.emptyMatch}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* 3. Main Workspace Area */}
        <main className="flex-1 min-w-0 space-y-6">
          {activeId === 'catalog' || activeId === 'comparison' ? (
            <ComponentCatalogDemo onNavigate={navigateTo} />
          ) : activeId === 'treelist' ? (
            <TreeListDemo products={products} />
          ) : activeId === 'pivotgrid' ? (
            <PivotGridDemo />
          ) : activeId === 'spreadsheet' ? (
            <SpreadsheetDemo />
          ) : activeId === 'listview' ? (
            <ListViewDemo products={products} />
          ) : activeId === 'pager' ? (
            <PagerDemo />
          ) : activeId === 'propertygrid' ? (
            <PropertyGridDemo />
          ) : activeId === 'datepicker' ? (
            <DatePickerDemo />
          ) : activeId === 'daterangepicker' ? (
            <DateRangePickerDemo />
          ) : activeId === 'timepicker' ? (
            <TimePickerDemo />
          ) : activeId === 'datetimepicker' ? (
            <DateTimePickerDemo />
          ) : activeId === 'dropdownlist' ? (
            <DropDownListDemo />
          ) : activeId === 'combobox' ? (
            <ComboBoxDemo />
          ) : activeId === 'autocomplete' ? (
            <AutoCompleteDemo />
          ) : activeId === 'multiselect' ? (
            <MultiSelectDemo />
          ) : activeId === 'dropdowntree' ? (
            <DropDownTreeDemo />
          ) : activeId === 'multicolumncombobox' ? (
            <MultiColumnComboBoxDemo />
          ) : activeId === 'textbox' ? (
            <TextBoxDemo />
          ) : activeId === 'numerictextbox' ? (
            <NumericTextBoxDemo />
          ) : activeId === 'textarea' ? (
            <TextAreaDemo />
          ) : activeId === 'maskedtextbox' ? (
            <MaskedTextBoxDemo />
          ) : activeId === 'switch' ? (
            <SwitchDemo />
          ) : activeId === 'checkbox' ? (
            <CheckBoxDemo />
          ) : activeId === 'radiogroup' ? (
            <RadioGroupDemo />
          ) : activeId === 'slider' ? (
            <SliderDemo />
          ) : activeId === 'rating' ? (
            <RatingDemo />
          ) : activeId === 'colorpicker' ? (
            <ColorPickerDemo />
          ) : activeId === 'otp' ? (
            <OtpDemo />
          ) : activeId === 'signature' ? (
            <SignatureDemo />
          ) : activeId === 'upload' ? (
            <UploadDemo />
          ) : activeId === 'editor' ? (
            <EditorDemo />
          ) : activeId === 'form' ? (
            <FormDemo />
          ) : activeId === 'menu' ? (
            <MenuDemo />
          ) : activeId === 'tabstrip' ? (
            <TabStripDemo />
          ) : activeId === 'panelbar' ? (
            <PanelBarDemo />
          ) : activeId === 'drawer' ? (
            <DrawerDemo />
          ) : activeId === 'treeview' ? (
            <TreeViewDemo />
          ) : activeId === 'stepper' ? (
            <StepperDemo />
          ) : activeId === 'breadcrumb' ? (
            <BreadcrumbDemo />
          ) : activeId === 'toolbar' ? (
            <ToolBarDemo />
          ) : activeId === 'splitter' ? (
            <SplitterDemo />
          ) : activeId === 'tilelayout' ? (
            <TileLayoutDemo />
          ) : activeId === 'scrollview' ? (
            <ScrollViewDemo />
          ) : activeId === 'actionsheet' ? (
            <ActionSheetDemo />
          ) : activeId === 'window' ? (
            <WindowDemo />
          ) : activeId === 'dialog' ? (
            <DialogDemo />
          ) : activeId === 'notification' ? (
            <NotificationDemo />
          ) : activeId === 'tooltip' ? (
            <TooltipDemo />
          ) : activeId === 'scheduler' ? (
            <SchedulerDemo />
          ) : activeId === 'gantt' ? (
            <GanttDemo />
          ) : activeId === 'taskboard' ? (
            <TaskBoardDemo />
          ) : activeId === 'stockchart' ? (
            <StockChartDemo />
          ) : activeId === 'gauges' ? (
            <GaugesDemo />
          ) : activeId === 'barcode' ? (
            <BarcodeDemo />
          ) : activeId === 'diagram' ? (
            <DiagramDemo />
          ) : activeId === 'map' ? (
            <MapDemo />
          ) : activeId === 'pdfviewer' ? (
            <PdfViewerDemo />
          ) : activeId === 'filter' ? (
            <FilterDemo />
          ) : activeId === 'mediaplayer' ? (
            <MediaPlayerDemo />
          ) : activeId === 'chat' ? (
            <ChatDemo />
          ) : activeId === 'charts' ? (
            <ChartsDemo />
          ) : activeId === 'inputs' ? (
            <InputsDemo />
          ) : activeId === 'layout' ? (
            <LayoutDemo />
          ) : activeId === 'popups' ? (
            <PopupsDemo />
          ) : activeId === 'scheduling' ? (
            <SchedulingDemo />
          ) : activeId === 'tools' ? (
            <ToolsDemo />
          ) : (
            <ComponentShowcase
              key={activeId}
              title="PanoptesGrid (Kurumsal Veri Tablosu)"
              category="Data Management"
              description="Yüksek performanslı sanallaştırma, sayfalama, sıralama, çok seviyeli filtreleme, satır/hücre/popup düzenleme, Excel/PDF dışa aktarma ve tam klavye erişilebilirliğine sahip kurumsal React 19 Data Grid bileşeni."
              propsRows={GRID_PROPS_ROWS}
              exampleCount={15}
              activeMainTab={gridDocTab}
              onMainTabChange={setGridDocTab}
              headerSubNav={
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
                  <div className="flex items-center gap-1.5 min-w-max">
                    {SUB_NAV_TABS.map(tab => {
                      const isActive = activeId === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setGridDocTab('features');
                            navigateTo(tab.id);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-xs font-bold'
                              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                          }`}
                        >
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                          <span>{(tSite.subNav as any)[tab.id] || tab.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              }
            >
              {/* Dedicated View Content */}
              {loading ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 space-y-3">
                  <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="text-xs font-semibold">
                    {tSite.app.loadingData}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeId === 'overview' && <OverviewDemo products={products} />}
                  {activeId === 'paging' && <PagingDemo products={products} />}
                  {activeId === 'sorting' && <SortingDemo products={products} />}
                  {activeId === 'filtering' && <FilteringDemo products={products} />}
                  {activeId === 'grouping' && <GroupingDemo products={products} />}
                  {activeId === 'selection' && <SelectionDemo products={products} />}
                  {activeId === 'hierarchy' && <HierarchyDemo products={products} />}
                  {activeId === 'columns' && <ColumnsDemo products={products} />}
                  {activeId === 'incell' && <IncellEditDemo products={products} />}
                  {activeId === 'inline' && <InlineEditDemo products={products} />}
                  {activeId === 'popup' && <PopupEditDemo products={products} />}
                  {activeId === 'templates' && <TemplatesDemo products={products} />}
                  {activeId === 'export' && <ExportDemo products={products} />}
                  {activeId === 'api' && <ApiDemo products={products} />}
                  {activeId === 'events' && <EventsDemo products={products} />}
                </div>
              )}
            </ComponentShowcase>
          )}
        </main>
      </div>

      {/* 4. Tech Stack Footer */}
      <footer className="mt-20 border-t border-slate-200 py-6 px-4 bg-white text-xs text-slate-500">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">Panoptes UI for React</span> &copy;{' '}
            {new Date().getFullYear()} &mdash; {tSite.footer.subtitle}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {tSite.footer.stack}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">{tSite.footer.zeroDep}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  const initialRoute = useMemo(() => getRouteState(), []);

  return (
    <PanoptesProvider locale={initialRoute.locale} applyDocumentDir={true}>
      <AppContent initialActiveId={initialRoute.activeId} />
    </PanoptesProvider>
  );
}

export default App;
