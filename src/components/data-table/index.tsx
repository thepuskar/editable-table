import { cn } from "@/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import { z } from "zod";
import { data, getColumns } from "./column";
import { DataTableContext } from "./data-table.context";
import { TableHeader } from "./table-header.component";
import { TableRow } from "./table-row.component";
import { TableProp } from "./types";
export const DataTable = () => {
  const columns = getColumns(true);
  const rowSchema = z.object({
    balance: z
      .number({ required_error: "Balance is required" })
      .min(1, "Balance is required"),
    ltp: z.number({ required_error: "LTP is required" }),
    script: z.string().nonempty("Script is required"),
    // add other fields as needed...
  });
  return (
    <Table
      columns={columns}
      data={data}
      id="script"
      isEditable
      validationSchema={rowSchema}
    />
  );
};

const Table = <T extends { [key: string]: unknown }>(props: TableProp<T>) => {
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [isAllEditable, setIsAllEditable] = useState(false);

  const handleEditRow = (index: number | null) => {
    setEditableRowIndex(index);
  };

  const toggleEditAll = () => {
    setIsAllEditable((prev) => !prev);
    setEditableRowIndex(null);
  };

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: props.data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // should match your row height
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <DataTableContext.Provider
      value={{
        editableRowIndex,
        setEditableRowIndex,
        isEditable: props.isEditable,
      }}
    >
      <div className="max-w-full overflow-x-auto">
        <div
          ref={parentRef}
          className={cn(
            props?.maxHeight && props?.maxHeight,
            "overflow-y-auto border w-fit"
          )}
        >
          <div className="table w-full relative">
            {/* Table Header */}
            <TableHeader columns={props.columns} sticky={props.stickyHeader} />

            {/* Virtualized Rows */}
            <div
              style={{
                height: rowVirtualizer.getTotalSize(),
                position: "relative",
              }}
              className="table-row-group"
            >
              {/* Virtualized Rows */}
              {virtualItems.map((virtualRow) => {
                const row = props.data[virtualRow.index];
                const rowId = String(row[props.id] ?? "");

                const isEditable = editableRowIndex === virtualRow.index;
                return (
                  <TableRow
                    key={`${rowId}-${isEditable ? "edit" : "view"}`}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    row={row}
                    rowIndex={virtualRow.index}
                    columns={props.columns}
                    onEditRow={handleEditRow}
                    onToggleAllEdit={toggleEditAll}
                    isAllEditable={isAllEditable}
                    style={{
                      marginTop: `${virtualRow.start}px`, // pushes each row into place
                    }}
                    validationSchema={props.validationSchema}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DataTableContext.Provider>
  );
};
