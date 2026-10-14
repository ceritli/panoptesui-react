export type SortDirection = 'asc' | 'desc';

export interface SortDescriptor {
  field: string;
  dir: SortDirection;
}

export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'contains'
  | 'doesnotcontain'
  | 'startswith'
  | 'endswith'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'isnull'
  | 'isnotnull'
  | 'isempty'
  | 'isnotempty';

export interface FilterDescriptor {
  field?: string;
  operator?: FilterOperator | string;
  value?: any;
  logic?: 'and' | 'or';
  filters?: FilterDescriptor[];
}

export interface AggregateDescriptor {
  field: string;
  aggregate: 'sum' | 'average' | 'avg' | 'min' | 'max' | 'count';
}

export interface GroupDescriptor {
  field: string;
  dir?: SortDirection;
  aggregates?: AggregateDescriptor[];
}

export interface GroupResult<T = any> {
  field: string;
  value: any;
  items: (T | GroupResult<T>)[];
  aggregates?: Record<string, any>;
  hasSubgroups?: boolean;
}

export interface DataState {
  page?: number;
  pageSize?: number;
  skip?: number;
  take?: number;
  sorts?: SortDescriptor[];
  filter?: FilterDescriptor | null;
  groups?: GroupDescriptor[];
  search?: string;
}

export interface DataSourceRequest {
  page: number;
  pageSize: number;
  sorts?: SortDescriptor[];
  filter?: FilterDescriptor | null;
  groups?: GroupDescriptor[];
  search?: string;
}

export interface DataSourceResult<T = any> {
  data: (T | GroupResult<T>)[];
  total: number;
  aggregates?: Record<string, any>;
  errors?: any;
}

export interface ColumnDefinition<T = any> {
  field?: keyof T | string;
  title?: string;
  width?: string | number;
  minWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  align?: 'left' | 'center' | 'right';
  format?: 'currency' | 'date' | 'datetime' | 'stars' | 'sparkline' | 'country' | 'badge' | string;
  class?: string;
  headerClass?: string;
  editable?: boolean;
  editorType?: 'text' | 'number' | 'date' | 'select' | 'boolean';
  editorOptions?: string[] | { label: string; value: any }[];
  aggregates?: string | string[];
  locked?: boolean;
  hidden?: boolean;
  selectable?: boolean;
  cell?: (props: { row: T; field: string; value: any; rowIndex: number }) => any;
  headerCell?: (props: { column: ColumnDefinition<T> }) => any;
  groupHeaderTemplate?: (group: GroupResult<T>) => any;
}
