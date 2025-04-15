import { Pencil, Save, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { ColumnType } from "../data-table/types";
import { NepseDataType } from "./data2";

export const getColumns = (
  isEditable?: boolean | false
): ColumnType<NepseDataType>[] => [
  {
    header: "SN",
    accessor: "id",
    meta: {
      cellClassName: "w-[150px]",
      inputType: "text",
    },
    editable: isEditable,
  },
  {
    header: "Symbol",
    accessor: "symbol",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
      inputType: "text",
    },
  },
  {
    header: "Close Price",
    accessor: "closePrice",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Open Price",
    accessor: "openPrice",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "High Price",
    accessor: "highPrice",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
      inputType: "number",
    },
  },
  {
    header: "Low Price",
    accessor: "lowPrice",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Total Traded Quantity",
    accessor: "totalTradedQuantity",
    editable: isEditable,
    meta: {
      cellClassName: "w-[20px]",
      headerClassName: "bg-red-500 !w-[20px]",
    },
  },
  {
    header: "Total Traded Value",
    accessor: "totalTradedValue",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Total Trades ",
    accessor: "totalTrades",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "LTP ",
    accessor: "lastUpdatedPrice",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Fifty Two Week High ",
    accessor: "fiftyTwoWeekHigh",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Fifty Two Week Low",
    accessor: "fiftyTwoWeekLow",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Average Traded Price",
    accessor: "averageTradedPrice",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Actions",
    action: (row, rowIndex, ctx) => (
      <div className="flex gap-2">
        {!ctx?.editable && (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                ctx?.onEditRow?.(rowIndex);
              }}
              variant={"ghost"}
              className="cursor-pointer hover:bg-gray-200 !px-2 !py-2 border"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant={"ghost"}
              className="cursor-pointer hover:bg-red-200 !px-2 !py-2 border"
            >
              <Trash2 className="size-4" />
            </Button>
          </>
        )}
        {ctx?.editable && (
          <>
            <Button
              onClick={async (e) => {
                e.stopPropagation();
                const result = await ctx?.submitRow?.();
                if (result !== undefined) {
                  console.log("Row submitted data:", result);
                }
              }}
              variant={"ghost"}
              className="cursor-pointer hover:bg-green-200 !px-2 !py-2 border"
            >
              <Save className="size-4" />
            </Button>
            <Button
              onClick={() => {
                ctx?.onCancelEdit?.();
              }}
              variant={"ghost"}
              className="cursor-pointer hover:bg-gray-200 !px-2 !py-2 border"
            >
              <X className="size-4" />
            </Button>
          </>
        )}
      </div>
    ),
    meta: {
      headerClassName: "text-center right-0 bg-blue-500",
      cellClassName: "text-center absolute right-0 bg-blue-500",
    },
  },
];
