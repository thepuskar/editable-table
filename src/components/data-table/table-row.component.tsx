import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";
import { DataTableCell } from "./data-table-cell.component";
import { useDataTableContext } from "./data-table.context";
import { ColumnType } from "./types";

type DataRowProps<T extends FieldValues> = {
  row: T;
  rowIndex: number;
  columns: ColumnType<T>[];
  onEditRow: (index: number | null) => void;
  onToggleAllEdit: () => void;
  isAllEditable: boolean;
  style?: React.CSSProperties;
  validationSchema?: z.ZodObject<any>;
};

function TableRowInner<T extends FieldValues>(
  {
    columns,
    row,
    rowIndex,
    onEditRow,
    onToggleAllEdit,
    isAllEditable,
    style,
    validationSchema,
  }: DataRowProps<T>,
  ref: React.Ref<HTMLFormElement>
) {
  const { editableRowIndex, setEditableRowIndex, isEditable } =
    useDataTableContext<T>();
  const isRowEditable = rowIndex === editableRowIndex;

  const methods = useForm<T>({
    defaultValues: row as DefaultValues<T>,
    resolver: zodResolver(
      (validationSchema as z.ZodObject<any>).passthrough()
    ) as unknown as Resolver<T, any, T>,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods as unknown as UseFormReturn<T>;

  const handleRowClick = () => {
    if (isEditable) {
      setEditableRowIndex(rowIndex);
    }
  };

  const onSubmit: SubmitHandler<T> = (data) => {
    setEditableRowIndex(null);
    return data;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
              control={control}
              errors={errors}
              submitRow={async () =>
                new Promise<T | undefined>((resolve) => {
                  handleSubmit((data: T) => {
                    setEditableRowIndex(null);
                    resolve(data);
                  })();
                })
              }
            />
          </div>
        ))}
      </form>
    </FormProvider>
  );
}

export const TableRow = React.forwardRef(TableRowInner) as <
  T extends FieldValues
>(
  props: DataRowProps<T> & { ref?: React.Ref<HTMLFormElement> }
) => ReturnType<typeof TableRowInner>;
