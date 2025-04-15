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
  const parentRef = useRef<HTMLDivElement>(null);

  const handleEditRow = (index: number | null) => {
    setEditableRowIndex(index);
  };

  const toggleEditAll = () => {
    setIsAllEditable((prev) => !prev);
    setEditableRowIndex(null);
  };

  const virtualizer = useVirtualizer({
    count: props?.data?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });
  return (
    <DataTableContext.Provider
      value={{
        editableRowIndex,
        setEditableRowIndex,
        isEditable: props.isEditable,
      }}
    >
      <div className=" max-w-full overflow-x-auto border border-gray-300 rounded">
        <div className="w-full overflow-auto h-[500px]">
          {/* Table Header */}
          <div
            className="bg-muted/50"
            style={{ display: "table-header-group" }}
          >
            <TableHeader columns={props.columns} sticky={props.stickyHeader} />
          </div>

          {/* Virtualized Rows */}

          <div
            ref={parentRef}
            className="table-row-group"
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
              width: "100%",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = props.data[index];
              const rowId = String(row[props.id] ?? "");

              const isEditable = editableRowIndex === index;
              return (
                <TableRow
                  key={`${rowId}-${isEditable ? "edit" : "view"}`}
                  dataIndex={virtualRow.index}
                  row={row}
                  rowIndex={virtualRow.index}
                  columns={props.columns}
                  onEditRow={handleEditRow}
                  onToggleAllEdit={toggleEditAll}
                  isAllEditable={isAllEditable}
                  validationSchema={props.validationSchema}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DataTableContext.Provider>
  );
};
