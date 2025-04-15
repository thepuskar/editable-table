import { z } from "zod";
import { DataTable } from "../data-table/data-table.component";
import { getColumns } from "./columns";
import { nepseData, NepseDataType } from "./data2";

export const NepseTable = () => {
  const columns = getColumns(true);
  const rowSchema = z.object({
    symbol: z
      .string({ required_error: "Balance is required" })
      .min(1, "Symbol is required"),
  });
  return (
    <DataTable<NepseDataType>
      columns={columns}
      data={nepseData}
      id="id"
      isEditable
      validationSchema={rowSchema}
      stickyHeader
      height="520px"
    />
  );
};
