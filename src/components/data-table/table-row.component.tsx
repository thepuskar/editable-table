import { DataTableCell } from "./data-table-cell.component";
import { useDataTableContext } from "./data-table.context";
import { ColumnType } from "./types";

type DataRowProps<T> = {
  row: T;
  rowIndex: number;
  columns: ColumnType<T>[];
  editable: boolean;
  onEditRow: (index: number) => void;
  onToggleAllEdit: () => void;
  isAllEditable: boolean;
};

export function TableRow<T>({
  columns,
  row,
  rowIndex,
  editable,
  onEditRow,
  onToggleAllEdit,
  isAllEditable,
}: DataRowProps<T>) {
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
      className={`table-row ${
        isRowEditable ? "bg-yellow-100" : "hover:bg-blue-50"
      } cursor-pointer`}
    >
      {columns.map((col, colIndex) => (
        <div
          onClick={handleRowClick}
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
            editable={editable}
            onEditRow={onEditRow}
            onToggleAllEdit={onToggleAllEdit}
            isAllEditable={isAllEditable}
          />
        </div>
      ))}
    </div>
  );
}
