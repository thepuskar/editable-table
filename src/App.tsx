import { NepseTable } from "@/components/example/nepse-table.component";
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
        <div className="container text-center mb-8">
          <h1 className="font-bold text-2xl underline text-indigo-700">
            Nepse Editable Table
          </h1>
        </div>
        <NepseTable />
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
