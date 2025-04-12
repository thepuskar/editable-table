import { cn } from "@/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import { DataTableContext } from "./data-table.context";
import { TableHeader } from "./table-header.component";
import { TableRow } from "./table-row.component";
import { DataTableProp } from "./types";

export const DataTable = <T extends { [key: string]: unknown }>(
  props: DataTableProp<T>
) => {
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
      <div
        className="max-w-full overflow-x-auto "
        style={{ height: props?.height || "auto" }}
      >
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
