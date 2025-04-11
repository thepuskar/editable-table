import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { ColumnType } from "./types";

type DataTableCellProps<T> = {
  row: T;
  column: ColumnType<T>;
  rowIndex: number;
  editable: boolean;
};
export const DataTableCell = <T,>({
  row,
  column,
  rowIndex,
  editable,
}: DataTableCellProps<T>) => {
  if ("action" in column) return column.action(row, rowIndex);

  const value = row[column.accessor];
  const inputType = column.meta?.inputType ?? "text";

  if (!editable) {
    return column.cell?.(row, rowIndex) ?? String(value);
  }
  switch (inputType) {
    case "text":
    case "number":
    case "date":
      return (
        <Input
          type={inputType}
          defaultValue={String(value)}
          onChange={(e) =>
            console.log("Changed", column.accessor, e.target.value)
          }
        />
      );

    case "textarea":
      return (
        <Textarea
          defaultValue={String(value)}
          onChange={(e) =>
            console.log("Changed", column.accessor, e.target.value)
          }
        />
      );

    case "select":
      return (
        <Select
          defaultValue={String(value)}
          onValueChange={(val) => console.log("Selected", column.accessor, val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(column.meta?.selectOptions ?? []).map((opt) => (
              <SelectItem key={opt.value} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    default:
      return String(value);
  }
};
