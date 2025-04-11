import { ColumnType } from "./types";

type HeaderRowProps<T> = {
  columns: ColumnType<T>[];
  sticky?: boolean;
};

export function TableHeader<T>({ columns, sticky }: HeaderRowProps<T>) {
  return (
    <div
      className={`table-row font-semibold ${
        sticky ? "sticky top-0 z-10 bg-gray-100" : ""
      }`}
    >
      {columns.map((col, index) => (
        <div
          key={index}
          className={`table-cell p-2 border-r border-b bg-indigo-200 border-white whitespace-nowrap ${
            col.meta?.headerClassName ?? ""
          }`}
        >
          <span>{col.header}</span>
        </div>
      ))}
    </div>
  );
}
