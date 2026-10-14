import React from 'react';

export interface PanoptesLocaleMessages {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction?: 'ltr' | 'rtl';

  // Grid & Data
  grid: {
    page: string;
    of: string;
    items: string;
    totalItems: string;
    itemsPerPage: string;
    firstPage: string;
    prevPage: string;
    nextPage: string;
    lastPage: string;
    noRecords: string;
    loading: string;
    searchPlaceholder: string;
    columns: string;
    manageColumns: string;
    exportExcel: string;
    exportPdf: string;
    addNew: string;
    saveChanges: string;
    cancelChanges: string;
    selectedItems: string;
    filter: string;
    filterFor: string;
    clearFilter: string;
    applyFilter: string;
    operator: string;
    value: string;
    operators: {
      contains: string;
      startsWith: string;
      endsWith: string;
      equals: string;
      notEquals: string;
      greaterThan: string;
      lessThan: string;
      greaterThanOrEqual: string;
      lessThanOrEqual: string;
    };
    edit: string;
    delete: string;
    editRecord: string;
    newRecord: string;
  };

  // Date & Time
  date: {
    months: string[];
    monthsShort: string[];
    days: string[];
    daysShort: string[];
    today: string;
    clear: string;
    now: string;
    hour: string;
    minute: string;
    placeholder: string;
    timePlaceholder: string;
    rangePlaceholder: string;
    start: string;
    end: string;
    quickPresets: {
      today: string;
      last7Days: string;
      last30Days: string;
      thisMonth: string;
    };
  };

  // Common UI
  common: {
    save: string;
    cancel: string;
    confirm: string;
    close: string;
    delete: string;
    yes: string;
    no: string;
    ok: string;
    select: string;
    search: string;
    clear: string;
    all: string;
    dropFilesHere: string;
    browse: string;
    uploadMaxSize: string;
    signHere: string;
  };
}
