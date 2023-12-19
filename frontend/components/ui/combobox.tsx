import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboboxSelectItem = {
  value: string;
  key: string;
};

const Combobox = ({
  selections,
}: {
  name: string;
  label: string;
  selections: ComboboxSelectItem[];
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="relative w-full justify-between"
        >
          {value
            ? selections.find((selection) => selection.value === value)?.key
            : "Select country..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandEmpty>No item found</CommandEmpty>
          <CommandGroup className="max-h-[200px] w-full overflow-y-auto">
            {selections.map((selection) => (
              <CommandItem
                key={selection.key}
                value={selection.key}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === selection.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {selection.key}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const ControlledCombobox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  selections,
  name,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label: string;
  selections: ComboboxSelectItem[];
  name: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const lowerCaseLabel = label.toLowerCase();
  return (
    <FormField
      {...props}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? selections.find(
                        (selection) => selection.key === field.value
                      )?.value
                    : `Select ${lowerCaseLabel}...`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-100" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={`Search ${lowerCaseLabel}...`} />
                <CommandEmpty>No {lowerCaseLabel} found</CommandEmpty>
                <CommandGroup className="max-h-72 w-full overflow-y-auto">
                  {selections.map((selection) => (
                    <CommandItem
                      value={selection.key}
                      key={selection.key}
                      onSelect={() => {
                        field.onChange(selection.key);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selection.key === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {selection.value}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export { ControlledCombobox, Combobox };
