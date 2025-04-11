import { DataTable } from "@/components/data-table";
import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox";
import { useState } from "react";

function App() {
  const [selectedOption, setSelectedOption] = useState("item 3");
  function generateItems() {
    const items: string[] = [];
    for (let i = 1; i <= 20000; i++) {
      items.push(`item ${i}`);
    }
    return items;
  }

  const initialOptions: string[] = generateItems();

  const onSelectHandler = (val: unknown) => {
    console.log("Selected Value", val);
    setSelectedOption(val as string);
  };
  return (
    <>
      <div className="container px-8 py-8">
        <DataTable />
        <div className="mt-4">
          <VirtualizedCombobox
            options={initialOptions}
            value={selectedOption}
            onSelect={onSelectHandler}
          />
        </div>
      </div>
    </>
  );
}

export default App;
