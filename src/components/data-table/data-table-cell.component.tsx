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
import { Controller, Control, FieldValues, FieldErrors } from "react-hook-form";

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
  submitRow?: () => void;
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
  rules,
}: DataTableCellProps<T>) => {
  if ("action" in column) {
    return column.action?.(row, rowIndex, {
      onEditRow,
      onToggleAllEdit,
      isAllEditable,
      editable,
      onCancelEdit: () => onEditRow?.(null),
      submitRow,
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
      name={name}
      control={control}
      rules={rules ?? { required: true }}
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
          default:
            return (
              <Input
                {...field}
                type={inputType}
                className={errors?.[name] && "border-red-500"}
              />
            );
        }
      }}
    />
  );
};
