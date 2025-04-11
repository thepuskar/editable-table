import { createContext, useContext } from "react";

type DataTableContextType<T> = {
  rowEditable?: boolean | ((row: T, index: number) => boolean);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataTableContext = createContext<DataTableContextType<any>>({});

export function useDataTableContext<T>() {
  return useContext(DataTableContext) as DataTableContextType<T>;
}
