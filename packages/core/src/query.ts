import {
  DataState,
  DataSourceResult,
  FilterDescriptor,
  GroupDescriptor,
  GroupResult,
  SortDescriptor,
  AggregateDescriptor
} from './types';

function getDeepValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  if (!path.includes('.')) return obj[path];
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function matchFilter(item: any, filter: FilterDescriptor): boolean {
  if (filter.filters && filter.filters.length > 0) {
    const isAnd = (filter.logic || 'and').toLowerCase() === 'and';
    return isAnd
      ? filter.filters.every(f => matchFilter(item, f))
      : filter.filters.some(f => matchFilter(item, f));
  }

  if (!filter.field) return true;
  const rawVal = getDeepValue(item, filter.field);
  const targetVal = filter.value;
  const op = (filter.operator || 'eq').toLowerCase();

  if (op === 'isnull') return rawVal === null || rawVal === undefined;
  if (op === 'isnotnull') return rawVal !== null && rawVal !== undefined;
  if (op === 'isempty') return rawVal === '' || rawVal === null || rawVal === undefined;
  if (op === 'isnotempty') return rawVal !== '' && rawVal !== null && rawVal !== undefined;

  if (targetVal === undefined || targetVal === null || targetVal === '') return true;

  const itemStr = rawVal !== null && rawVal !== undefined ? String(rawVal).toLowerCase() : '';
  const filterStr = String(targetVal).toLowerCase();

  switch (op) {
    case 'eq':
      if (typeof rawVal === 'number') return Number(rawVal) === Number(targetVal);
      if (typeof rawVal === 'boolean') return Boolean(rawVal) === (targetVal === true || targetVal === 'true');
      return itemStr === filterStr;
    case 'neq':
      if (typeof rawVal === 'number') return Number(rawVal) !== Number(targetVal);
      return itemStr !== filterStr;
    case 'contains':
      return itemStr.includes(filterStr);
    case 'doesnotcontain':
      return !itemStr.includes(filterStr);
    case 'startswith':
      return itemStr.startsWith(filterStr);
    case 'endswith':
      return itemStr.endsWith(filterStr);
    case 'gt':
      return Number(rawVal) > Number(targetVal);
    case 'gte':
      return Number(rawVal) >= Number(targetVal);
    case 'lt':
      return Number(rawVal) < Number(targetVal);
    case 'lte':
      return Number(rawVal) <= Number(targetVal);
    default:
      return itemStr.includes(filterStr);
  }
}

function applySort<T>(items: T[], sorts: SortDescriptor[]): T[] {
  if (!sorts || sorts.length === 0) return items;
  return [...items].sort((a, b) => {
    for (const sort of sorts) {
      const aVal = getDeepValue(a, sort.field);
      const bVal = getDeepValue(b, sort.field);
      if (aVal === bVal) continue;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      } else {
        comparison = String(aVal).localeCompare(String(bVal), 'tr-TR', { numeric: true });
      }

      if (comparison !== 0) {
        return sort.dir === 'desc' ? -comparison : comparison;
      }
    }
    return 0;
  });
}

function calculateAggregates(items: any[], aggregates?: AggregateDescriptor[]): Record<string, any> {
  if (!aggregates || aggregates.length === 0 || items.length === 0) return {};
  const result: Record<string, any> = {};

  aggregates.forEach(agg => {
    const vals = items
      .map(it => getDeepValue(it, agg.field))
      .filter(v => v !== undefined && v !== null);

    const numericVals = vals.map(Number).filter(v => !isNaN(v));
    const type = agg.aggregate.toLowerCase();

    if (!result[agg.field]) result[agg.field] = {};

    if (type === 'count') {
      result[agg.field].count = vals.length;
    } else if (type === 'sum') {
      result[agg.field].sum = numericVals.reduce((acc, v) => acc + v, 0);
    } else if (type === 'average' || type === 'avg') {
      result[agg.field].average = numericVals.length > 0
        ? numericVals.reduce((acc, v) => acc + v, 0) / numericVals.length
        : 0;
    } else if (type === 'min') {
      result[agg.field].min = numericVals.length > 0 ? Math.min(...numericVals) : 0;
    } else if (type === 'max') {
      result[agg.field].max = numericVals.length > 0 ? Math.max(...numericVals) : 0;
    }
  });

  return result;
}

function groupItems<T>(
  items: T[],
  groups: GroupDescriptor[],
  groupIndex = 0
): GroupResult<T>[] {
  if (groupIndex >= groups.length) return items as any;
  const currentGroup = groups[groupIndex];
  const field = currentGroup.field;
  const map = new Map<any, T[]>();

  items.forEach(item => {
    const val = getDeepValue(item, field) ?? '';
    if (!map.has(val)) map.set(val, []);
    map.get(val)!.push(item);
  });

  const results: GroupResult<T>[] = [];
  map.forEach((groupItemsArr, groupVal) => {
    const subGroups = groupIndex + 1 < groups.length
      ? groupItems(groupItemsArr, groups, groupIndex + 1)
      : groupItemsArr;

    results.push({
      field,
      value: groupVal,
      items: subGroups,
      hasSubgroups: groupIndex + 1 < groups.length,
      aggregates: calculateAggregates(groupItemsArr, currentGroup.aggregates)
    });
  });

  if (currentGroup.dir) {
    results.sort((a, b) => {
      const comp = String(a.value).localeCompare(String(b.value), 'tr-TR', { numeric: true });
      return currentGroup.dir === 'desc' ? -comp : comp;
    });
  }

  return results;
}

export function process<T = any>(
  data: T[],
  state: DataState
): DataSourceResult<T> {
  if (!data) return { data: [], total: 0 };
  let result = [...data];

  // 1. Search Panel filter across all properties
  if (state.search && state.search.trim()) {
    const term = state.search.trim().toLowerCase();
    result = result.filter(item => {
      return Object.values(item as any).some(val => {
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(term);
      });
    });
  }

  // 2. Structured Filter
  if (state.filter) {
    result = result.filter(item => matchFilter(item, state.filter!));
  }

  const total = result.length;

  // 3. Sorting
  if (state.sorts && state.sorts.length > 0) {
    result = applySort(result, state.sorts);
  }

  // 4. Grouping (if any)
  if (state.groups && state.groups.length > 0) {
    const grouped = groupItems(result, state.groups);
    return {
      data: grouped,
      total,
      aggregates: {}
    };
  }

  // 5. Paging
  let skip = state.skip;
  let take = state.take;
  if (skip === undefined && state.page !== undefined && state.pageSize !== undefined) {
    skip = (state.page - 1) * state.pageSize;
    take = state.pageSize;
  }

  if (skip !== undefined && take !== undefined) {
    result = result.slice(skip, skip + take);
  }

  return {
    data: result,
    total
  };
}
