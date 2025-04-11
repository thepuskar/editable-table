import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

/**
 * Represents an option in the combobox
 */
type Option = {
  /** Unique identifier for the option */
  value: string;
  /** Display text for the option */
  label: string;
};

/**
 * Props for the internal VirtualizedCommand component
 */
interface VirtualizedCommandProps {
  /** Height of the command menu */
  height: string;
  /** Array of options to display */
  options: Option[];
  /** Placeholder text for the search input */
  placeholder: string;
  /** Currently selected option value */
  selectedOption: string;
  /** Callback when an option is selected */
  onSelectOption?: (option: string) => void;
}

/**
 * Internal component that handles the virtualized command menu
 *
 * @param props - Component props
 * @returns React component
 */
const VirtualizedCommand = ({
  height,
  options,
  placeholder,
  selectedOption,
  onSelectOption,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] =
    React.useState<Option[]>(options);
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [isKeyboardNavActive, setIsKeyboardNavActive] = React.useState(false);

  const parentRef = React.useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  /**
   * Scrolls to ensure the specified index is visible
   *
   * @param index - Index to scroll to
   */
  const scrollToIndex = (index: number) => {
    virtualizer.scrollToIndex(index, {
      align: "center",
    });
  };

  /**
   * Filters options based on search text
   *
   * @param search - Search string
   */
  const handleSearch = (search: string) => {
    setIsKeyboardNavActive(false);
    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(search.toLowerCase() ?? [])
      )
    );
  };

  /**
   * Handles keyboard navigation
   *
   * @param event - Keyboard event
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        setIsKeyboardNavActive(true);
        setFocusedIndex((prev) => {
          const newIndex =
            prev === -1 ? 0 : Math.min(prev + 1, filteredOptions.length - 1);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setIsKeyboardNavActive(true);
        setFocusedIndex((prev) => {
          const newIndex =
            prev === -1 ? filteredOptions.length - 1 : Math.max(prev - 1, 0);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      }
      case "Enter": {
        event.preventDefault();
        if (filteredOptions[focusedIndex]) {
          onSelectOption?.(filteredOptions[focusedIndex].value);
        }
        break;
      }
      default:
        break;
    }
  };

  // Scroll to selected item when options or selection changes
  React.useEffect(() => {
    if (selectedOption) {
      const option = filteredOptions.find(
        (option) => option.value === selectedOption
      );
      if (option) {
        const index = filteredOptions.indexOf(option);
        setFocusedIndex(index);
        virtualizer.scrollToIndex(index, {
          align: "center",
        });
      }
    }
  }, [selectedOption, filteredOptions, virtualizer]);

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandList
        ref={parentRef}
        style={{
          height: height,
          width: "100%",
          overflow: "auto",
        }}
        onMouseDown={() => setIsKeyboardNavActive(false)}
        onMouseMove={() => setIsKeyboardNavActive(false)}
      >
        <CommandEmpty>No item found.</CommandEmpty>
        <CommandGroup>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualOptions.map((virtualOption) => (
              <CommandItem
                key={filteredOptions[virtualOption.index].value}
                disabled={isKeyboardNavActive}
                className={cn(
                  "absolute left-0 top-0 w-full bg-transparent",
                  focusedIndex === virtualOption.index &&
                    "bg-accent text-accent-foreground",
                  isKeyboardNavActive &&
                    focusedIndex !== virtualOption.index &&
                    "aria-selected:bg-transparent aria-selected:text-primary"
                )}
                style={{
                  height: `${virtualOption.size}px`,
                  transform: `translateY(${virtualOption.start}px)`,
                }}
                value={filteredOptions[virtualOption.index].value}
                onMouseEnter={() =>
                  !isKeyboardNavActive && setFocusedIndex(virtualOption.index)
                }
                onMouseLeave={() => !isKeyboardNavActive && setFocusedIndex(-1)}
                onSelect={onSelectOption}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedOption ===
                      filteredOptions[virtualOption.index].value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {filteredOptions[virtualOption.index].label}
              </CommandItem>
            ))}
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

/**
 * Props for the VirtualizedCombobox component
 */
interface VirtualizedComboboxProps {
  /** Array of string options to display in the dropdown */
  options: string[];
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Width of the combobox button and dropdown */
  width?: string;
  /** Height of the dropdown menu */
  height?: string;
  /** Callback function triggered when an option is selected */
  onSelect?: (option: string) => void;
  /** Currently selected value (for controlled component usage) */
  value?: string;
}

/**
 * A virtualized combobox component that efficiently renders large lists of options
 * with search capability and keyboard navigation.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <VirtualizedCombobox
 *   options={["Option 1", "Option 2", "Option 3"]}
 *   searchPlaceholder="Search options..."
 * />
 *
 * // As a controlled component
 * const [selected, setSelected] = useState("");
 *
 * <VirtualizedCombobox
 *   options={options}
 *   value={selected}
 *   onSelect={(value) => setSelected(value)}
 * />
 * ```
 *
 * @param props - Component props
 * @returns React component
 */
export function VirtualizedCombobox({
  options,
  searchPlaceholder = "Search items...",
  width = "400px",
  height = "400px",
  onSelect,
  value,
}: VirtualizedComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(value || "");

  // Update internal state when prop value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedOption(value);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          style={{
            width: width,
          }}
        >
          {selectedOption
            ? options.find((option) => option === selectedOption)
            : searchPlaceholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: width }}>
        <VirtualizedCommand
          height={height}
          options={options.map((option) => ({ value: option, label: option }))}
          placeholder={searchPlaceholder}
          selectedOption={selectedOption}
          onSelectOption={(currentValue) => {
            const newValue =
              currentValue === selectedOption ? "" : currentValue;

            // Only update internal state if not controlled
            if (value === undefined) {
              setSelectedOption(newValue);
            }

            // Call the onSelect prop if provided
            if (onSelect) {
              onSelect(newValue);
            }

            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
