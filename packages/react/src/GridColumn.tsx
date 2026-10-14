import React from 'react';
import { ColumnDefinition } from '@panoptesui/core';

export interface GridColumnProps<T = any> extends ColumnDefinition<T> {
  children?: React.ReactNode;
}

export function GridColumn<T = any>(_props: GridColumnProps<T>) {
  return null;
}

GridColumn.displayName = 'GridColumn';
