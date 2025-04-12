// data-table-cell.component.tsx
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
import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";

type DataTableCellProps<T extends FieldValues> = {
  row: T;
  column: ColumnType<T>;
  rowIndex: number;
  editable: boolean;
  onEditRow?: (index: number | null) => void;
  onToggleAllEdit?: () => void;
  isAllEditable?: boolean;
  control?: Control<T>;
  errors?: FieldErrors<T>;
  submitRow?: () => Promise<T | undefined>;
  rules?: Record<string, unknown>;
};

export const DataTableCell = <T extends FieldValues>({
  row,
  column,
  rowIndex,
  editable,
  onEditRow,
  onToggleAllEdit,
  isAllEditable,
  control,
  errors,
  submitRow,
}: DataTableCellProps<T>) => {
  if ("action" in column) {
    return column.action?.(row, rowIndex, {
      onEditRow,
      onToggleAllEdit,
      isAllEditable,
      editable,
      onCancelEdit: () => onEditRow?.(null),
      submitRow: submitRow ?? (() => {}),
    });
  }

  const value = column.accessor ? row[column.accessor] : "";

  if (!(editable && column.editable)) {
    return column.cell?.(row, rowIndex) ?? String(value);
  }

  const name = column.accessor as string;
  const inputType = column.meta?.inputType ?? "text";

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field }) => {
        switch (inputType) {
          case "textarea":
            return (
              <Textarea
                {...field}
                className={errors?.[name] && "border-red-500"}
              />
            );
          case "select":
            return (
              <Select value={field.value} onValueChange={field.onChange}>
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
          case "number":
            return (
              <>
                <Input
                  {...field}
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  className={errors?.[name] ? "border-red-500" : ""}
                />
                {errors?.[name]?.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {String(errors[name].message)}
                  </p>
                )}
              </>
            );
          default:
            return (
              <>
                <Input
                  {...field}
                  type={inputType}
                  className={errors?.[name] && "border-red-500"}
                />
                {errors?.[name]?.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {String(errors[name].message)}
                  </p>
                )}
              </>
            );
        }
      }}
    />
  );
};
