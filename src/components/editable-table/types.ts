type CommonColumnProps = {
  header: string;
  meta?: {
    headerClassName?: string;
    cellClassName?: string;
  };
};

type DataColumn<T> = CommonColumnProps & {
  accessor: keyof T;
  cell?: (row: T, rowIndex: number) => React.ReactNode;
};

type ActionColumn<T> = CommonColumnProps & {
  action: (row: T, rowIndex: number) => React.ReactNode;
};

export type ColumnType<T> = DataColumn<T> | ActionColumn<T>;

export type TableProp<T> = {
  columns: ColumnType<T>[];
  data: T[];
  maxHeight?: string;
  stickyHeader?: boolean;
  id: string;
};
