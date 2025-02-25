import React, { useState } from "react";
import { Button } from "../button";
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
import { Check, ChevronDown } from "lucide-react";
import { tradeOptions } from "@/constant/data";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { useContextConsumer } from "@/context/Context";
import FilterModal from "./Filters/Filter";
import { projectFormSchema } from "@/schemas/FormsValidation";
import { Label } from "../label";
import { Input } from "../input";
import LabelInputContainer from "@/components/Forms/LabelInputContainer";

const AddProjectForm = ({ onSearchSubmit, onOpenChange }: any) => {
  const { token } = useContextConsumer();
  const [openTradeDropdown, setOpenTradeDropdown] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState("");
  const { setFilterModalOpen, isFilterModalOpen, handleFilterLands } =
    useContextConsumer();

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      trade: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data: z.infer<typeof projectFormSchema>) => {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      toast.error("Start Date cannot be after End Date.");
      return;
    }
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <LabelInputContainer>
            <Label htmlFor="title">Project Title</Label>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Enter Project Title"
                      type="text"
                      className="outline-none focus:border-primary p-3 rounded-md border border-estateLightGray"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="trade">Trade</Label>
            <FormField
              control={form.control}
              name="trade"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover
                      open={openTradeDropdown}
                      onOpenChange={setOpenTradeDropdown}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openTradeDropdown}
                          className="min-w-full justify-between p-3 py-5 focus:outline-none focus:ring-1 focus:ring-primary text-gray-500"
                        >
                          {selectedTrade
                            ? tradeOptions.find(
                                (item) => item.value === selectedTrade
                              )?.label
                            : "Search & Select Trade..."}
                          <ChevronDown
                            className={`ml-2 h-4 w-4 opacity-50 transition-transform duration-200 ${
                              openTradeDropdown ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="max-w-2xl p-0 rounded-xl">
                        <Command className="rounded-xl">
                          <CommandInput placeholder="Search Trade..." />
                          <CommandList>
                            <CommandEmpty>No trade found.</CommandEmpty>
                            <CommandGroup>
                              {tradeOptions.map((item) => (
                                <CommandItem
                                  key={item.value}
                                  value={item.value}
                                  onSelect={(currentValue) => {
                                    setSelectedTrade(currentValue);
                                    field.onChange(currentValue);
                                    setOpenTradeDropdown(false);
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      selectedTrade === item.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {item.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="startDate">Start Date</Label>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="startDate"
                      placeholder="Select Start Date"
                      type="date"
                      className="outline-none focus:border-primary text-gray-500 p-3 rounded-md border border-estateLightGray"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="endDate">End Date</Label>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="endDate"
                      placeholder="Select End Date"
                      type="date"
                      className="outline-none focus:border-primary text-gray-500 p-3 rounded-md border border-estateLightGray"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>

          <Button type="submit" className="w-full">
            Add Project
          </Button>
        </form>
      </Form>
      <FilterModal
        open={isFilterModalOpen}
        onOpenChange={setFilterModalOpen}
        onApplyFilters={handleFilterLands}
      />
    </>
  );
};

export default AddProjectForm;
