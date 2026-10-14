import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ColumnDefinition,
  DataSourceRequest,
  DataSourceResult,
  SortDescriptor,
  FilterDescriptor,
  GroupDescriptor,
  GroupResult,
  DataState,
  process
} from '@panoptesui/core';
import { GridColumnProps } from './GridColumn';
import {
  RatingCell,
  SparklineCell,
  CountryCell,
  BadgeCell,
  ProductPhotoCell,
  CurrencyCell
} from './cells';
import { usePanoptesTranslation } from './localization';

export interface PanoptesGridProps<T = any> {
  url?: string;
  data?: T[];
  columns?: ColumnDefinition<T>[];
  children?: React.ReactNode;
  pageSize?: number;
  pageSizes?: number[];
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  selectable?: boolean | { mode?: 'single' | 'multiple'; checkboxOnly?: boolean };
  exportable?: boolean;
  pdfExport?: boolean;
  searchable?: boolean;
  editable?: 'inline' | 'popup' | 'incell';
  className?: string;
  title?: string;
  renderDetail?: (row: T) => React.ReactNode;
  onRowClick?: (item: T, index: number) => void;
  onSelectionChange?: (selectedRows: T[], selectedKeys: any[]) => void;
  onSave?: (item: T) => void | Promise<void>;
  onDelete?: (item: T) => void | Promise<void>;
}

export function PanoptesGrid<T extends Record<string, any>>({
  url,
  data: initialData = [],
  columns: propColumns,
  children,
  pageSize: initialPageSize = 10,
  pageSizes = [5, 10, 20, 50],
  sortable = true,
  filterable = true,
  groupable = false,
  selectable = false,
  exportable = true,
  pdfExport = true,
  searchable = true,
  editable,
  className = '',
  title,
  renderDetail,
  onRowClick,
  onSelectionChange,
  onSave,
  onDelete
}: PanoptesGridProps<T>) {
  const { t, messages } = usePanoptesTranslation();

  // Extract columns from props or children (<GridColumn>)
  const columns: ColumnDefinition<T>[] = useMemo(() => {
    if (propColumns && propColumns.length > 0) return propColumns;
    const extracted: ColumnDefinition<T>[] = [];
    React.Children.forEach(children, child => {
      if (React.isValidElement(child) && (child.type as any)?.displayName === 'GridColumn') {
        extracted.push(child.props as GridColumnProps<T>);
      }
    });
    return extracted;
  }, [propColumns, children]);

  // Master data state (supports in-memory CRUD)
  const [masterData, setMasterData] = useState<T[]>(initialData);
  const [displayResult, setDisplayResult] = useState<DataSourceResult<T>>({
    data: [],
    total: initialData.length
  });

  // Query state
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [sorts, setSorts] = useState<SortDescriptor[]>([]);
  const [filters, setFilters] = useState<Record<string, { op: string; val: string }>>({});
  const [groups, setGroups] = useState<GroupDescriptor[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // UI state
  const [selectedKeys, setSelectedKeys] = useState<Set<any>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedDetails, setExpandedDetails] = useState<Set<any>>(new Set());
  const [hiddenCols, setHiddenCols] = useState<Set<string>>(new Set());
  const [columnMenuOpen, setColumnMenuOpen] = useState<boolean>(false);
  const [activeFilterCol, setActiveFilterCol] = useState<string | null>(null);

  // Editing state
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<T>>({});
  const [inCellChanges, setInCellChanges] = useState<Map<string, Record<string, any>>>(new Map());
  const [editingCell, setEditingCell] = useState<{ key: string; field: string } | null>(null);
  const [popupModalOpen, setPopupModalOpen] = useState<boolean>(false);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

  // Sync initialData changes
  useEffect(() => {
    if (initialData) {
      setMasterData(initialData);
    }
  }, [initialData]);

  // Sync initialPageSize prop changes
  useEffect(() => {
    if (initialPageSize && initialPageSize > 0) {
      setPageSize(initialPageSize);
      setPage(1);
    }
  }, [initialPageSize]);

  // In-Memory Data Processing
  const runQuery = useCallback(() => {
    const compositeFilter: FilterDescriptor | null = (() => {
      const activeFilterEntries = Object.entries(filters).filter(([_, f]) => (f as any)?.val);
      if (activeFilterEntries.length === 0) return null;
      return {
        logic: 'and',
        filters: activeFilterEntries.map(([field, f]) => ({
          field,
          operator: (f as any).op,
          value: (f as any).val
        }))
      };
    })();

    const state: DataState = {
      page,
      pageSize,
      sorts,
      filter: compositeFilter,
      groups: groupable && groups.length > 0 ? groups : undefined,
      search: searchKeyword
    };

    const result = process(masterData, state);
    setDisplayResult(result);
  }, [masterData, page, pageSize, sorts, filters, groups, searchKeyword, groupable]);

  useEffect(() => {
    runQuery();
  }, [runQuery]);

  const visibleColumns = useMemo(() => {
    return columns.filter(c => !hiddenCols.has(String(c.field || '')));
  }, [columns, hiddenCols]);

  const hasSelectableColumn = useMemo(() => {
    return visibleColumns.some(c => c.selectable);
  }, [visibleColumns]);

  const showAutoSelectColumn = Boolean(selectable) && !hasSelectableColumn;

  const totalPages = Math.max(1, Math.ceil(displayResult.total / pageSize));

  // Selection handlers
  const getItemKey = (item: any, index: number) => {
    return item?.id ?? item?.Id ?? item?.code ?? index;
  };

  const toggleSelectRow = (key: any, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const next = new Set(selectedKeys);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelectedKeys(next);

    const selectedRows = masterData.filter((it, idx) => next.has(getItemKey(it, idx)));
    onSelectionChange?.(selectedRows, Array.from(next));
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      const keys = new Set(displayResult.data.map((it: any, idx) => getItemKey(it, idx)));
      setSelectedKeys(keys);
      onSelectionChange?.(displayResult.data as T[], Array.from(keys));
    } else {
      setSelectedKeys(new Set());
      onSelectionChange?.([], []);
    }
  };

  // Sorting handler
  const handleSort = (field?: string) => {
    if (!sortable || !field) return;
    setSorts(prev => {
      const existing = prev.find(s => s.field.toLowerCase() === field.toLowerCase());
      if (!existing) return [{ field, dir: 'asc' }];
      if (existing.dir === 'asc') return [{ field, dir: 'desc' }];
      return [];
    });
    setPage(1);
  };

  // Grouping handlers
  const addGroup = (field: string) => {
    if (groups.some(g => g.field === field)) return;
    setGroups(prev => [...prev, { field, dir: 'asc' }]);
    setPage(1);
  };

  const removeGroup = (field: string) => {
    setGroups(prev => prev.filter(g => g.field !== field));
    setPage(1);
  };

  // In-Cell Editing
  const handleCellClick = (key: string, field: string) => {
    if (editable !== 'incell') return;
    const col = visibleColumns.find(c => c.field === field);
    if (col?.editable === false) return;
    setEditingCell({ key, field });
  };

  const handleCellBlur = (key: string, field: string, value: any) => {
    setEditingCell(null);
    const existing = inCellChanges.get(key) || {};
    existing[field] = value;
    const next = new Map(inCellChanges);
    next.set(key, existing);
    setInCellChanges(next);

    // Update masterData locally
    setMasterData(prev =>
      prev.map((item, idx) => {
        if (getItemKey(item, idx) === key) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Save all In-Cell changes
  const saveBatchChanges = () => {
    setInCellChanges(new Map());
  };

  const cancelBatchChanges = () => {
    setInCellChanges(new Map());
    setMasterData([...initialData]);
  };

  // Inline / Popup Edit
  const startEditRow = (row: T, index: number) => {
    setEditFormData({ ...row });
    if (editable === 'popup') {
      setIsNewRecord(false);
      setPopupModalOpen(true);
    } else {
      setEditingRowIndex(index);
    }
  };

  const startAddNew = () => {
    const empty: any = {};
    visibleColumns.forEach(c => {
      if (c.field) empty[c.field] = '';
    });
    setEditFormData(empty);
    setIsNewRecord(true);
    if (editable === 'popup') {
      setPopupModalOpen(true);
    } else {
      setEditingRowIndex(-1);
    }
  };

  const saveEditRow = async () => {
    if (isNewRecord) {
      const newItem = ({ id: Date.now(), ...editFormData } as unknown) as T;
      setMasterData(prev => [newItem, ...prev]);
      onSave?.(newItem);
    } else {
      setMasterData(prev =>
        prev.map(item => {
          if (getItemKey(item, 0) === getItemKey(editFormData, 0)) {
            return { ...item, ...editFormData } as T;
          }
          return item;
        })
      );
      onSave?.(editFormData as T);
    }
    setEditingRowIndex(null);
    setPopupModalOpen(false);
  };

  const cancelEditRow = () => {
    setEditingRowIndex(null);
    setPopupModalOpen(false);
  };

  // Excel (.xlsx) Client Export
  const exportToExcel = () => {
    const exportCols = visibleColumns.filter(c => c.field);
    const headerRow = exportCols.map(c => `<th>${String(c.title || c.field || '')}</th>`).join('');
    const dataRows = masterData
      .map(row => {
        const cells = exportCols
          .map(col => `<td>${row[col.field as string] ?? ''}</td>`)
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');

    const template = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="utf-8"/></head>
        <body>
          <table border="1">
            <thead><tr style="background:#1e293b; color:#ffffff;">${headerRow}</tr></thead>
            <tbody>${dataRows}</tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([template], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Panoptes-Grid-Export-${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
  };

  // PDF Export
  const exportToPdf = () => {
    window.print();
  };

  // Render cell content based on format / cell template
  const renderCellContent = (col: ColumnDefinition<T>, row: T, rowIndex: number) => {
    const field = col.field as string;
    const val = field ? row[field] : undefined;

    if (col.cell) {
      return col.cell({ row, field, value: val, rowIndex });
    }

    if (col.format === 'stars' || col.format === 'rating') {
      return <RatingCell value={val} />;
    }
    if (col.format === 'sparkline' || col.format === 'progress') {
      return <SparklineCell value={val} />;
    }
    if (col.format === 'country') {
      return <CountryCell country={val} countryCode={row['countryCode'] || row['CountryCode']} />;
    }
    if (col.format === 'badge') {
      return (
        <BadgeCell
          active={Boolean(val)}
          activeText={val ? 'Stokta' : 'Tükendi'}
          inactiveText="Tükendi"
        />
      );
    }
    if (col.format === 'currency') {
      return <CurrencyCell value={val} />;
    }
    if (col.format === 'date' && val) {
      return new Date(val).toLocaleDateString('tr-TR');
    }

    return String(val ?? '');
  };

  return (
    <div className={`panoptes-grid-wrapper bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible ${className}`}>
      {/* 1. Grouping Bar */}
      {groupable && (
        <div className="panoptes-group-bar flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-500 flex-wrap">
          <span className="font-semibold text-slate-400">Gruplama Alanı:</span>
          {groups.length === 0 ? (
            <span className="italic text-slate-400">
              Gruplamak için sütun başlığı yanındaki grupla ikonuna tıklayın
            </span>
          ) : (
            groups.map(g => (
              <span
                key={g.field}
                className="panoptes-group-chip inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 shadow-xs"
              >
                <span>{columns.find(c => c.field === g.field)?.title || g.field}</span>
                <button
                  type="button"
                  onClick={() => removeGroup(g.field)}
                  className="text-slate-400 hover:text-rose-500 font-bold ml-1 text-sm leading-none"
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
      )}

      {/* 2. Toolbar */}
      <div className="panoptes-toolbar flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2 flex-wrap">
          {title && <h3 className="text-base font-bold text-slate-800 mr-2">{title}</h3>}

          {editable && (
            <button
              type="button"
              onClick={startAddNew}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <span>+ {messages.grid.addNew}</span>
            </button>
          )}

          {inCellChanges.size > 0 && (
            <div className="inline-flex items-center gap-2 animate-fadeIn">
              <button
                type="button"
                onClick={saveBatchChanges}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
              >
                ✓ {messages.grid.saveChanges} ({inCellChanges.size})
              </button>
              <button
                type="button"
                onClick={cancelBatchChanges}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                {messages.grid.cancelChanges}
              </button>
            </div>
          )}

          {selectedKeys.size > 0 && (
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold">
              {t('grid.selectedItems', selectedKeys.size)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {searchable && (
            <div className="relative">
              <input
                type="text"
                placeholder={messages.grid.searchPlaceholder}
                value={searchKeyword}
                onChange={e => {
                  setSearchKeyword(e.target.value);
                  setPage(1);
                }}
                className="w-48 sm:w-60 pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
              <span className="absolute left-2.5 top-2 text-slate-400 text-xs">🔍</span>
            </div>
          )}

          {exportable && (
            <button
              type="button"
              onClick={exportToExcel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 transition"
              title={`${messages.grid.exportExcel} (.xlsx)`}
            >
              <span>📊 {messages.grid.exportExcel}</span>
            </button>
          )}

          {pdfExport && (
            <button
              type="button"
              onClick={exportToPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 transition"
              title={`${messages.grid.exportPdf}`}
            >
              <span>📕 {messages.grid.exportPdf}</span>
            </button>
          )}

          {/* Column Chooser Menu */}
          <div className={`relative ${columnMenuOpen ? 'z-50' : 'z-20'}`}>
            <button
              type="button"
              onClick={() => setColumnMenuOpen(!columnMenuOpen)}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-medium border border-slate-200 transition cursor-pointer"
              title={messages.grid.manageColumns}
            >
              ⚙
            </button>
            {columnMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 shadow-xl rounded-xl p-3 z-50 space-y-2 animate-fadeIn">
                <div className="text-xs font-bold text-slate-700 mb-1 border-b pb-1">{messages.grid.columns}</div>
                {columns.map(c => {
                  if (!c.field) return null;
                  const isHidden = hiddenCols.has(String(c.field));
                  return (
                    <label key={String(c.field)} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!isHidden}
                        onChange={() => {
                          const next = new Set(hiddenCols);
                          if (isHidden) next.delete(String(c.field));
                          else next.add(String(c.field));
                          setHiddenCols(next);
                        }}
                        className="rounded text-indigo-600 focus:ring-0"
                      />
                      <span>{c.title || String(c.field)}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Table Container */}
      <div className="overflow-x-auto min-h-[300px]">
        <table className="panoptes-table w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold select-none">
              {renderDetail && <th className="w-10 px-3 py-3 text-center"></th>}

              {showAutoSelectColumn && (
                <th className="w-12 px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={
                      displayResult.data.length > 0 &&
                      selectedKeys.size >= displayResult.data.length
                    }
                    onChange={e => toggleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 border-slate-300 cursor-pointer"
                  />
                </th>
              )}

              {visibleColumns.map((col, idx) => {
                if (col.selectable) {
                  return (
                    <th key={idx} className="w-12 px-3 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={
                          displayResult.data.length > 0 &&
                          selectedKeys.size >= displayResult.data.length
                        }
                        onChange={e => toggleSelectAll(e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-0 border-slate-300 cursor-pointer"
                      />
                    </th>
                  );
                }

                const field = col.field as string;
                const isSorted = sorts.find(s => s.field.toLowerCase() === field?.toLowerCase());
                const isFiltered = Boolean(filters[field]?.val);
                const isNearRight = idx >= visibleColumns.length - 2;

                return (
                  <th
                    key={field || idx}
                    style={{ width: col.width, textAlign: col.align || 'left' }}
                    className={`px-4 py-3 relative group ${activeFilterCol === field ? 'z-50' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div
                        onClick={() => col.sortable !== false && handleSort(field)}
                        className={`flex items-center gap-1.5 flex-1 ${
                          col.sortable !== false ? 'cursor-pointer hover:text-indigo-600 transition' : ''
                        }`}
                      >
                        <span className="truncate">{col.title || field}</span>
                        {isSorted && (
                          <span className="text-indigo-600 font-bold text-xs">
                            {isSorted.dir === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        {groupable && field && (
                          <button
                            type="button"
                            onClick={() => addGroup(field)}
                            className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 rounded cursor-pointer"
                            title="Bu sütuna göre grupla"
                          >
                            ⊞
                          </button>
                        )}
                        {filterable && field && (
                          <button
                            type="button"
                            onClick={() => setActiveFilterCol(activeFilterCol === field ? null : field)}
                            className={`p-1 rounded cursor-pointer ${
                              isFiltered
                                ? 'text-indigo-600 bg-indigo-50 font-bold'
                                : 'text-slate-400 hover:text-slate-700'
                            }`}
                            title="Filtrele"
                          >
                            ▼
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Filter Popover */}
                    {activeFilterCol === field && (
                      <>
                        <div
                          className="fixed inset-0 z-40 cursor-default"
                          onClick={() => setActiveFilterCol(null)}
                        />
                        <div
                          style={{ whiteSpace: 'normal' }}
                          className={`absolute ${isNearRight ? 'right-0' : 'left-0'} top-full mt-2 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 z-50 flex flex-col gap-2.5 text-xs font-normal text-slate-700 animate-fadeIn`}
                        >
                          <div className="flex items-center justify-between font-bold text-slate-800 border-b border-slate-100 pb-2">
                            <span className="truncate">{messages.grid.filterFor} {col.title || field}</span>
                            <button
                              type="button"
                              onClick={() => setActiveFilterCol(null)}
                              className="text-slate-400 hover:text-slate-700 font-bold px-1"
                            >
                              ✕
                            </button>
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">{messages.grid.operator}</label>
                            <select
                              value={filters[field]?.op || 'contains'}
                              onChange={e =>
                                setFilters(prev => ({
                                  ...prev,
                                  [field]: { op: e.target.value, val: prev[field]?.val || '' }
                                }))
                              }
                              className="block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                            >
                              <option value="contains">{messages.grid.operators.contains}</option>
                              <option value="eq">{messages.grid.operators.equals}</option>
                              <option value="startswith">{messages.grid.operators.startsWith}</option>
                              <option value="gt">{messages.grid.operators.greaterThan}</option>
                              <option value="lt">{messages.grid.operators.lessThan}</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">{messages.grid.value}</label>
                            <input
                              type="text"
                              placeholder={`${messages.grid.value}...`}
                              value={filters[field]?.val || ''}
                              onChange={e =>
                                setFilters(prev => ({
                                  ...prev,
                                  [field]: {
                                    op: prev[field]?.op || 'contains',
                                    val: e.target.value
                                  }
                                }))
                              }
                              onKeyDown={e => {
                                if (e.key === 'Enter') setActiveFilterCol(null);
                              }}
                              className="block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                              autoFocus
                            />
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => {
                                const next = { ...filters };
                                delete next[field];
                                setFilters(next);
                                setActiveFilterCol(null);
                              }}
                              className="text-xs font-semibold text-rose-600 hover:text-rose-700 py-1"
                            >
                              {messages.grid.clearFilter}
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveFilterCol(null)}
                              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition"
                            >
                              {messages.grid.applyFilter}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </th>
                );
              })}

              {editable && <th className="w-24 px-4 py-3 text-right">İşlemler</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {/* Inline New Row */}
            {editingRowIndex === -1 && (
              <tr className="bg-amber-50/60 border-2 border-amber-300">
                {renderDetail && <td></td>}
                {showAutoSelectColumn && <td></td>}
                {visibleColumns.map((col, idx) => {
                  if (col.selectable) return <td key={idx}></td>;
                  const field = col.field as string;
                  return (
                    <td key={field || idx} className="px-4 py-2">
                      <input
                        type={col.editorType === 'number' ? 'number' : 'text'}
                        value={(editFormData as any)[field] ?? ''}
                        onChange={e =>
                          setEditFormData({ ...editFormData, [field]: e.target.value })
                        }
                        placeholder={col.title}
                        className="w-full bg-white border border-amber-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                  );
                })}
                <td className="px-4 py-2 text-right space-x-1">
                  <button
                    type="button"
                    onClick={saveEditRow}
                    className="px-2 py-1 bg-emerald-600 text-white rounded font-bold"
                  >
                    ✓
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditRow}
                    className="px-2 py-1 bg-slate-300 text-slate-700 rounded font-bold"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            )}

            {displayResult.data.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (showAutoSelectColumn ? 1 : 0) + (renderDetail ? 1 : 0) + (editable ? 1 : 0)}
                  className="px-4 py-12 text-center text-slate-400 italic"
                >
                  {messages.grid.noRecords}
                </td>
              </tr>
            ) : (
              displayResult.data.map((item: any, rowIndex) => {
                // If item is a GroupResult
                if ('hasSubgroups' in item || 'items' in item) {
                  const groupKey = `${item.field}-${item.value}`;
                  const isExpanded = !expandedGroups.has(groupKey);
                  return (
                    <React.Fragment key={groupKey}>
                      <tr
                        onClick={() => {
                          const next = new Set(expandedGroups);
                          if (next.has(groupKey)) next.delete(groupKey);
                          else next.add(groupKey);
                          setExpandedGroups(next);
                        }}
                        className="bg-slate-100/90 font-bold text-slate-800 cursor-pointer hover:bg-slate-200/80 transition"
                      >
                        <td
                          colSpan={visibleColumns.length + (showAutoSelectColumn ? 1 : 0) + (renderDetail ? 1 : 0) + (editable ? 1 : 0)}
                          className="px-4 py-2.5"
                        >
                          <span className="mr-2 text-slate-400">{isExpanded ? '▼' : '▶'}</span>
                          <span>
                            {columns.find(c => c.field === item.field)?.title || item.field}:
                          </span>{' '}
                          <span className="text-indigo-600">{String(item.value)}</span>
                          <span className="text-slate-400 font-normal ml-2">
                            ({item.items?.length || 0} kayıt)
                          </span>
                        </td>
                      </tr>
                      {isExpanded &&
                        item.items?.map((subItem: any, subIdx: number) => {
                          const key = getItemKey(subItem, subIdx);
                          return (
                            <tr key={key} className="hover:bg-indigo-50/30 transition">
                              {renderDetail && <td className="px-3 py-3"></td>}
                              {showAutoSelectColumn && (
                                <td className="px-3 py-3 text-center">
                                  <input
                                    type="checkbox"
                                    checked={selectedKeys.has(key)}
                                    onChange={() => toggleSelectRow(key)}
                                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 cursor-pointer"
                                  />
                                </td>
                              )}
                              {visibleColumns.map((col, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 text-slate-700">
                                  {renderCellContent(col, subItem, subIdx)}
                                </td>
                              ))}
                              {editable && <td></td>}
                            </tr>
                          );
                        })}
                    </React.Fragment>
                  );
                }

                // Regular Row
                const rowKey = getItemKey(item, rowIndex);
                const isSelected = selectedKeys.has(rowKey);
                const isInlineEditing = editingRowIndex === rowIndex;
                const isDetailExpanded = expandedDetails.has(rowKey);

                if (isInlineEditing) {
                  return (
                    <tr key={rowKey} className="bg-indigo-50/60 border-2 border-indigo-300">
                      {renderDetail && <td></td>}
                      {showAutoSelectColumn && <td></td>}
                      {visibleColumns.map((col, idx) => {
                        if (col.selectable) return <td key={idx}></td>;
                        const field = col.field as string;
                        return (
                          <td key={field || idx} className="px-4 py-2">
                            <input
                              type={col.editorType === 'number' ? 'number' : 'text'}
                              value={(editFormData as any)[field] ?? ''}
                              onChange={e =>
                                setEditFormData({ ...editFormData, [field]: e.target.value })
                              }
                              className="w-full bg-white border border-indigo-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </td>
                        );
                      })}
                      <td className="px-4 py-2 text-right space-x-1">
                        <button
                          type="button"
                          onClick={saveEditRow}
                          className="px-2 py-1 bg-emerald-600 text-white rounded font-bold"
                        >
                          ✓
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditRow}
                          className="px-2 py-1 bg-slate-300 text-slate-700 rounded font-bold"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                }

                return (
                  <React.Fragment key={rowKey}>
                    <tr
                      onClick={() => onRowClick?.(item, rowIndex)}
                      className={`transition ${
                        isSelected ? 'bg-indigo-50/70 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Master-Detail expand button */}
                      {renderDetail && (
                        <td className="w-10 px-3 py-3 text-center">
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              const next = new Set(expandedDetails);
                              if (next.has(rowKey)) next.delete(rowKey);
                              else next.add(rowKey);
                              setExpandedDetails(next);
                            }}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
                          >
                            {isDetailExpanded ? '▼' : '▶'}
                          </button>
                        </td>
                      )}

                      {/* Selectable column */}
                      {showAutoSelectColumn && (
                        <td className="w-12 px-3 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectRow(rowKey)}
                            onClick={e => e.stopPropagation()}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-0 border-slate-300 cursor-pointer"
                          />
                        </td>
                      )}

                      {/* Data Columns */}
                      {visibleColumns.map((col, cIdx) => {
                        if (col.selectable) {
                          return (
                            <td key={cIdx} className="w-12 px-3 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectRow(rowKey)}
                                onClick={e => e.stopPropagation()}
                                className="w-4 h-4 rounded text-indigo-600 focus:ring-0 border-slate-300 cursor-pointer"
                              />
                            </td>
                          );
                        }

                        const field = col.field as string;
                        const isCellEditing =
                          editingCell?.key === rowKey && editingCell?.field === field;
                        const isDirty = inCellChanges.get(rowKey)?.[field] !== undefined;

                        return (
                          <td
                            key={field || cIdx}
                            style={{ textAlign: col.align || 'left' }}
                            onClick={() => handleCellClick(rowKey, field)}
                            className={`px-4 py-3 relative ${
                              col.editable !== false && editable === 'incell'
                                ? 'cursor-pointer hover:bg-indigo-50/40'
                                : ''
                            }`}
                          >
                            {isDirty && (
                              <span className="absolute top-0 right-0 w-0 h-0 border-t-6 border-t-rose-500 border-l-6 border-l-transparent" />
                            )}

                            {isCellEditing ? (
                              <input
                                type={col.editorType === 'number' ? 'number' : 'text'}
                                defaultValue={item[field]}
                                autoFocus
                                onBlur={e => handleCellBlur(rowKey, field, e.target.value)}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    handleCellBlur(rowKey, field, (e.target as any).value);
                                  } else if (e.key === 'Escape') {
                                    setEditingCell(null);
                                  }
                                }}
                                className="w-full bg-white border border-indigo-400 rounded px-1.5 py-0.5 text-xs focus:outline-none"
                              />
                            ) : (
                              renderCellContent(col, item, rowIndex)
                            )}
                          </td>
                        );
                      })}

                      {/* Row actions */}
                      {editable && (
                        <td className="w-24 px-4 py-3 text-right space-x-1.5">
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              startEditRow(item, rowIndex);
                            }}
                            className="px-2 py-1 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded text-xs transition"
                            title="Düzenle"
                          >
                            ✎
                          </button>
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              if (confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
                                setMasterData(prev => prev.filter((_, idx) => idx !== rowIndex));
                                onDelete?.(item);
                              }
                            }}
                            className="px-2 py-1 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded text-xs transition"
                            title="Sil"
                          >
                            🗑
                          </button>
                        </td>
                      )}
                    </tr>

                    {/* Master-Detail row */}
                    {isDetailExpanded && renderDetail && (
                      <tr className="bg-slate-50/70 border-y border-slate-200">
                        <td
                          colSpan={
                            visibleColumns.length +
                            (showAutoSelectColumn ? 1 : 0) +
                            1 +
                            (editable ? 1 : 0)
                          }
                          className="p-4"
                        >
                          {renderDetail(item)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pager */}
      <div className="panoptes-pager flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 bg-white text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>{messages.grid.itemsPerPage}</span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-indigo-500"
          >
            {pageSizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-slate-400 ml-2">
            {t('grid.totalItems', displayResult.total)} ({messages.grid.page} {page} {messages.grid.of} {totalPages})
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(1)}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition"
            title={messages.grid.firstPage}
          >
            «
          </button>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition"
            title={messages.grid.prevPage}
          >
            ‹
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const start = Math.max(1, Math.min(page - 2, totalPages - 4));
            const pNum = start + i;
            if (pNum > totalPages) return null;
            return (
              <button
                key={pNum}
                type="button"
                onClick={() => setPage(pNum)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition ${
                  pNum === page
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {pNum}
              </button>
            );
          })}

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition"
            title={messages.grid.nextPage}
          >
            ›
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage(totalPages)}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition"
            title={messages.grid.lastPage}
          >
            »
          </button>
        </div>
      </div>

      {/* 5. Popup Edit Modal */}
      {popupModalOpen && (() => {
        const modalContent = (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fadeIn font-sans text-left">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-base">
                  {isNewRecord ? messages.grid.newRecord : messages.grid.editRecord}
                </h3>
                <button
                  type="button"
                  onClick={cancelEditRow}
                  className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>
              <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
                {visibleColumns.map((col, idx) => {
                  if (col.selectable || !col.field || col.editable === false) return null;
                  const field = col.field as string;
                  return (
                    <div key={idx} className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        {col.title || field}
                      </label>
                      <input
                        type={col.editorType === 'number' ? 'number' : 'text'}
                        value={(editFormData as any)[field] ?? ''}
                        onChange={e =>
                          setEditFormData({ ...editFormData, [field]: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50">
                <button
                  type="button"
                  onClick={cancelEditRow}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  {messages.common.cancel}
                </button>
                <button
                  type="button"
                  onClick={saveEditRow}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer"
                >
                  {messages.common.save}
                </button>
              </div>
            </div>
          </div>
        );

        return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
      })()}
    </div>
  );
}
