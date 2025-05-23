import { z } from "zod";

type CommonColumnProps = {
  header: string;
  editable?: boolean;
  meta?: {
    headerClassName?: string;
    cellClassName?: string;
    inputType?: "text" | "number" | "select" | "date" | "textarea";
    selectOptions?: { label: string; value: string | number }[];
    rules?: Record<string, unknown>;
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
      onCancelEdit?: () => void; // ✅ new helper
      onToggleAllEdit?: () => void;
      isAllEditable?: boolean;
      editable?: boolean;
      submitRow: () => void;
    }
  ) => React.ReactNode;
};

export type ColumnType<T> = DataColumn<T> | ActionColumn<T>;

export type DataTableProp<T> = {
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
  validationSchema?: z.ZodObject<any>;
  height?: string;
};
