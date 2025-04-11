import { ColumnType } from "./types";

export type DataType = {
  script: string;
  balance: number;
  prevLTP: number;
  prevValue: number;
  ltp: number;
  valueAsOfLTP: number;
  costPrice: number;
  totalInvestment: number;
  overallPL: number;
  plPercent: string;
};
export const columns: ColumnType<DataType>[] = [
  {
    header: "Script",
    accessor: "script",
    cell: (row: DataType) => <span>{row.script}</span>,
    meta: {
      cellClassName: "min-w-[150px]",
    },
  },
  {
    header: "Balance",
    accessor: "balance",
  },
  {
    header: "Previous LTP",
    accessor: "prevLTP",
  },
  {
    header: "Previous Value",
    accessor: "prevValue",
  },
  {
    header: "LTP",
    accessor: "ltp",
  },
  {
    header: "Value As of LTP",
    accessor: "valueAsOfLTP",
  },
  {
    header: "Cost Price",
    accessor: "costPrice",
  },
  {
    header: "Total Investment",
    accessor: "totalInvestment",
  },
  {
    header: "Overall P/L",
    accessor: "overallPL",
  },
  {
    header: "P/L %",
    accessor: "plPercent",
  },
  {
    header: "Actions",
    action: (row) => (
      <div className="flex gap-2">
        <button
          className="text-blue-600 text-xs"
          onClick={() => console.log("Edit", row)}
        >
          Edit
        </button>
        <button
          className="text-red-600 text-xs"
          onClick={() => console.log("Delete", row)}
        >
          Delete
        </button>
      </div>
    ),
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
  },
];

export const data: DataType[] = [
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
