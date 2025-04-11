import { cn } from "@/utils";
import { columns, data } from "./column";
import { TableHeader } from "./table-header.component";
import { TableProp } from "./types";
import { TableRow } from "./table-row.component";
import { DataTableContext } from "./data-table.context";

export const DataTable = () => {
  return (
    <>
      <Table columns={columns} data={data} id="script" rowEditable={true} />
    </>
  );
};

const Table = <T extends { [key: string]: unknown }>(props: TableProp<T>) => {
  return (
    <>
      <DataTableContext.Provider value={{ rowEditable: props.rowEditable }}>
        <div className="max-w-full overflow-x-auto">
          <div
            className={cn(
              props?.maxHeight && props?.maxHeight,
              "overflow-y-auto border border-gray-300 w-fit"
            )}
          >
            <div className="table w-full">
              {/* Header */}
              <TableHeader columns={columns} sticky={props.stickyHeader} />

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
