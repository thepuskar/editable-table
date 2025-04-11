import { DataTableCell } from "./data-table-cell.component";
import { useDataTableContext } from "./data-table.context";
import { ColumnType } from "./types";

type DataRowProps<T> = {
  columns: ColumnType<T>[];
  row: T;
  rowIndex: number;
  isEditable?: boolean | ((row: T, rowIndex: number) => boolean);
};

export function TableRow<T>({ columns, row, rowIndex }: DataRowProps<T>) {
  const { rowEditable } = useDataTableContext<T>();

  const isEditable =
    typeof rowEditable === "function"
      ? rowEditable(row, rowIndex)
      : !!rowEditable;

  return (
    <div className="table-row">
      {columns.map((col, colIndex) => (
        <div
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
            editable={isEditable}
          />
        </div>
      ))}
    </div>
  );
}
