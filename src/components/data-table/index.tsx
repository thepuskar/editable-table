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
    estimateSize: () => 20,
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
        ref={parentRef}
        className="max-w-full overflow-x-auto border border-gray-300 rounded"
      >
        <div
          style={{
            height: `${props?.height ?? `${rowVirtualizer.getTotalSize()}px`}`,
          }}
          className={cn("border w-fit")}
        >
          <div className="table w-full relative">
            {/* Table Header */}
            <TableHeader columns={props.columns} sticky={props.stickyHeader} />

            {/* Virtualized Rows */}
            {virtualItems.map((virtualRow, index) => {
              const row = props.data[virtualRow.index];
              const rowId = String(row[props.id] ?? "");

              const isEditable = editableRowIndex === virtualRow.index;
              return (
                <TableRow
                  key={`${rowId}-${isEditable ? "edit" : "view"}`}
                  dataIndex={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  row={row}
                  rowIndex={virtualRow.index}
                  columns={props.columns}
                  onEditRow={handleEditRow}
                  onToggleAllEdit={toggleEditAll}
                  isAllEditable={isAllEditable}
                  validationSchema={props.validationSchema}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DataTableContext.Provider>
  );
};
