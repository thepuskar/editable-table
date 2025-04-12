import { createContext, useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DataTableContextType<T> = {
  editableRowIndex: number | null;
  setEditableRowIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isEditable?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataTableContext = createContext<DataTableContextType<any>>({
  editableRowIndex: null,
  setEditableRowIndex: () => {},
  isEditable: false,
});

export function useDataTableContext<T>() {
  return useContext(DataTableContext) as DataTableContextType<T>;
}
