type CommonColumnProps = {
  header: string;
  editable?: boolean;
  meta?: {
    headerClassName?: string;
    cellClassName?: string;
    inputType?: "text" | "number" | "select" | "date" | "textarea";
    selectOptions?: { label: string; value: string | number }[];
  };
};

type DataColumn<T> = CommonColumnProps & {
  accessor: keyof T;
  cell?: (row: T, rowIndex: number) => React.ReactNode;
};

type ActionColumn<T> = CommonColumnProps & {
  action: (
    row: T,
    rowIndex: number,
    ctx?: {
      onEditRow?: (index: number) => void;
      onToggleAllEdit?: () => void;
      isAllEditable?: boolean;
    }
  ) => React.ReactNode;
};

export type ColumnType<T> = DataColumn<T> | ActionColumn<T>;

export type TableProp<T> = {
  columns: ColumnType<T>[];
  data: T[];
  maxHeight?: string;
  stickyHeader?: boolean;
  id: string;
  isEditable?: boolean;
  editableRowIndex?: number | null;
  onEditRow?: (rowIndex: number) => void;
  isAllRowsEditable?: boolean;
  onToggleAllEdit?: () => void;
};
