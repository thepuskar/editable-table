import { cn } from "@/utils";
import { useState } from "react";
import { data, getColumns } from "./column";
import { DataTableContext } from "./data-table.context";
import { TableHeader } from "./table-header.component";
import { TableRow } from "./table-row.component";
import { TableProp } from "./types";

export const DataTable = () => {
  const columns = getColumns(true);
  return (
    <>
      <Table columns={columns} data={data} id="script" isEditable />
    </>
  );
};

const Table = <T extends { [key: string]: unknown }>(props: TableProp<T>) => {
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [isAllEditable, setIsAllEditable] = useState(false);

  const handleEditRow = (index: number) => {
    setEditableRowIndex(index);
    setIsAllEditable(false);
  };

  const toggleEditAll = () => {
    setIsAllEditable((prev) => !prev);
    setEditableRowIndex(null);
  };

  return (
    <>
      <DataTableContext.Provider
        value={{
          editableRowIndex,
          setEditableRowIndex,
          isEditable: props.isEditable,
        }}
      >
        <div className="max-w-full overflow-x-auto">
          <div
            className={cn(
              props?.maxHeight && props?.maxHeight,
              "overflow-y-auto border border-gray-300 w-fit"
            )}
          >
            <div className="table w-full">
              {/* Header */}
              <TableHeader
                columns={props.columns}
                sticky={props.stickyHeader}
              />

              {/* Table Rows */}
              {props.data.map((row, index) => {
                const key = String(row[props.id] ?? "");
                return (
                  <TableRow
                    key={key}
                    row={row}
                    rowIndex={index}
                    columns={props.columns}
                    editable={isAllEditable || editableRowIndex === index}
                    onEditRow={handleEditRow}
                    onToggleAllEdit={toggleEditAll}
                    isAllEditable={isAllEditable}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </DataTableContext.Provider>
    </>
  );
};
