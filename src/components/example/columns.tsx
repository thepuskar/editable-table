import { Pencil, Save, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { ColumnType } from "../data-table/types";
import { NepseDataType } from "./types";

export const getColumns = (
  isEditable?: boolean | false
): ColumnType<NepseDataType>[] => [
  {
    header: "Script",
    accessor: "script",
    cell: (row: NepseDataType) => <span>{row.script}</span>,
    meta: {
      cellClassName: "w-[150px]",
      inputType: "text",
    },
    editable: isEditable,
  },
  {
    header: "Balance",
    accessor: "balance",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
      inputType: "number",
    },
  },
  {
    header: "Previous LTP",
    accessor: "prevLTP",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Previous Value",
    accessor: "prevValue",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "LTP",
    accessor: "ltp",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Value As of LTP",
    accessor: "valueAsOfLTP",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Cost Price",
    accessor: "costPrice",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Total Investment",
    accessor: "totalInvestment",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "Overall P/L",
    accessor: "overallPL",
    editable: isEditable,
    meta: {
      cellClassName: "w-[150px]",
    },
  },
  {
    header: "P/L %",
    accessor: "plPercent",
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
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
  },
];

export const data: NepseDataType[] = [
  {
    script: "NABIL",
    balance: 100,
    prevLTP: 300,
    prevValue: 30000,
    ltp: 310,
    valueAsOfLTP: 31000,
    costPrice: 280,
    totalInvestment: 28000,
    overallPL: 3000,
    plPercent: "10.7%",
  },
  {
    script: "NLIC",
    balance: 50,
    prevLTP: 600,
    prevValue: 30000,
    ltp: 580,
    valueAsOfLTP: 29000,
    costPrice: 620,
    totalInvestment: 31000,
    overallPL: -2000,
    plPercent: "-6.5%",
  },
  {
    script: "NRIC",
    balance: 200,
    prevLTP: 500,
    prevValue: 100000,
    ltp: 520,
    valueAsOfLTP: 104000,
    costPrice: 480,
    totalInvestment: 96000,
    overallPL: 8000,
    plPercent: "8.3%",
  },
  {
    script: "NIFRA",
    balance: 300,
    prevLTP: 250,
    prevValue: 75000,
    ltp: 240,
    valueAsOfLTP: 72000,
    costPrice: 260,
    totalInvestment: 78000,
    overallPL: -6000,
    plPercent: "-7.7%",
  },
  {
    script: "NEPSE",
    balance: 80,
    prevLTP: 2000,
    prevValue: 160000,
    ltp: 2100,
    valueAsOfLTP: 168000,
    costPrice: 1900,
    totalInvestment: 152000,
    overallPL: 16000,
    plPercent: "10.5%",
  },
];
