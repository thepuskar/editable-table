// table-row.component.tsx
import React from "react";
import {
  FormProvider,
  useForm,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
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
  }: DataRowProps<T>,
  ref: React.Ref<HTMLFormElement>
) {
  const { editableRowIndex, setEditableRowIndex, isEditable } =
    useDataTableContext<T>();
  const isRowEditable = rowIndex === editableRowIndex;

  const methods = useForm<T>({
    defaultValues: row as DefaultValues<T>,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleRowClick = () => {
    if (isEditable) {
      setEditableRowIndex(rowIndex);
    }
  };

  const onSubmit = (data: T) => {
    console.log("Submitted row:", data);
    setEditableRowIndex(null);
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
              control={control}
              errors={errors}
              submitRow={() => handleSubmit(onSubmit)()}
              rules={col?.meta?.rules}
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
