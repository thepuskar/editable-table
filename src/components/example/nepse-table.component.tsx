import { z } from "zod";
import { DataTable } from "../data-table";
import { getColumns } from "./columns";
import { data } from "./data";

export const NepseTable = () => {
  const columns = getColumns(true);
  const rowSchema = z.object({
    balance: z.coerce
      .number({ required_error: "Balance is required" })
      .min(1, "Balance is required"),
    ltp: z.number({ required_error: "LTP is required" }),
    script: z.string().nonempty("Script is required"),
  });
  return (
    <DataTable
      columns={columns}
      data={data}
      id="script"
      isEditable
      validationSchema={rowSchema}
      stickyHeader
      height="520px"
    />
  );
};
