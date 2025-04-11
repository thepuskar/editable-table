import { ColumnType } from "./types";

type DataRowProps<T> = {
  columns: ColumnType<T>[];
  row: T;
  rowIndex: number;
};

export function TableRow<T>({ columns, row, rowIndex }: DataRowProps<T>) {
  return (
    <div className="table-row">
      {columns.map((col, index) => {
        const content =
          "action" in col
            ? col.action(row, rowIndex)
            : col?.cell?.(row, rowIndex) ?? String(row[col.accessor]);

        return (
          <div
            key={index}
            className={`table-cell p-2 border-r border-b border-gray-200 whitespace-nowrap ${
              col.meta?.cellClassName ?? ""
            }`}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
