import { Leaves } from '@/models/helpers.model';
import { ReactNode } from 'react';

type Column = {
  header: string;
  id: string;
  sortable?: boolean;
  width?: number;
};

type RenderColumn<T> = {
  accessor: Leaves<T>;
};

type AccessorColumn<T> = {
  Render: (data: T) => ReactNode;
};

export type TableColumn<T extends Record<string, any>> = Column &
  (RenderColumn<T> | AccessorColumn<T>);
