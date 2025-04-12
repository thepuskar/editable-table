import React from "react";
import { DataTableCell } from "./data-table-cell.component";
import { useDataTableContext } from "./data-table.context";
import { ColumnType } from "./types";

type DataRowProps<T> = {
  row: T;
  rowIndex: number;
  columns: ColumnType<T>[];
  onEditRow: (index: number | null) => void;
  onToggleAllEdit: () => void;
  isAllEditable: boolean;
  style?: React.CSSProperties;
};

function TableRowInner<T>(
  {
    columns,
    row,
    rowIndex,
    onEditRow,
    onToggleAllEdit,
    isAllEditable,
    style,
  }: DataRowProps<T>,
  ref: React.Ref<HTMLDivElement>
) {
  const { editableRowIndex, setEditableRowIndex, isEditable } =
    useDataTableContext<T>();
  const isRowEditable = rowIndex === editableRowIndex;

  const handleRowClick = () => {
    if (isEditable) {
      setEditableRowIndex(rowIndex);
    }
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`table-row ${
        isRowEditable ? "bg-yellow-100" : "hover:bg-blue-50"
      } cursor-pointer`}
    >
      {columns.map((col, colIndex) => (
        <div
          onClick={() => {
            if ("action" in col) return;
            if (!((isRowEditable || isAllEditable) && col.editable)) return;
            handleRowClick();
          }}
          key={`${String(
            "accessor" in col ? col.accessor : colIndex
          )}-${rowIndex}`}
          className={`table-cell p-2 border-r border-b border-gray-200 whitespace-nowrap ${
            col.meta?.cellClassName ?? ""
          }`}
        >
          <DataTableCell<T>
            column={col}
            row={row}
            rowIndex={rowIndex}
            editable={isRowEditable || isAllEditable}
            onEditRow={onEditRow}
            onToggleAllEdit={onToggleAllEdit}
            isAllEditable={isAllEditable}
          />
        </div>
      ))}
    </div>
  );
}

// 👇 Wrap with generic-preserving forwardRef helper
export const TableRow = React.forwardRef(TableRowInner) as <T>(
  props: DataRowProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => ReturnType<typeof TableRowInner>;
