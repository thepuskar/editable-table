import { cn } from "@/utils";
import { useState } from "react";
import { data, getColumns } from "./column";
import { DataTableContext } from "./data-table.context";
import { TableHeader } from "./table-header.component";
import { TableRow } from "./table-row.component";
import { TableProp } from "./types";

export const DataTable = () => {
  const [isEditable, setIsEditable] = useState(false);

  const handleEditAll = () => {
    setIsEditable(true);
  };

  const columns = getColumns(isEditable, handleEditAll);
  return (
    <>
      <Table columns={columns} data={data} id="script" isEditable />
    </>
  );
};

const Table = <T extends { [key: string]: unknown }>(props: TableProp<T>) => {
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);

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
                    columns={props.columns}
                    row={row}
                    key={key}
                    rowIndex={index}
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
