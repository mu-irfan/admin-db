import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "../ui/icon";
import LabelInputContainer from "./LabelInputContainer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAccountFormSchema } from "@/schemas/FormsValidation";
import Link from "next/link";
import { PhoneInput } from "../ui/PhoneInput";
import { useUserAccount } from "@/hooks/apis/useUserAuth";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import {
  districts,
  educationLevels,
  experienceOptions,
  tradeOptions,
} from "@/constant/data";

export function CreateAccountForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [open, setOpen] = useState(false);
  const [districtListOpen, setDistrictListOpen] = useState<boolean>(false);
  const [selectedTrade, setSelectedTrade] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmShowPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const { mutate: createAccount, isPending: loading } = useUserAccount();

  const form = useForm<z.infer<typeof createAccountFormSchema>>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      cnic: "",
      experience: "",
      education: "",
      preferred_district: "",
      trade: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof createAccountFormSchema>) => {
    console.log(data, "iamdata");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-medium">Create Account</CardTitle>
          <CardDescription>
            New Admin? Register yourself by filling below form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="py-2" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-3.5">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="email">Email</Label>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your Email"
                              type="email"
                              id="email"
                              className="outline-none focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="fullName">Full Name</Label>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your name"
                              type="text"
                              id="fullName"
                              className="outline-none focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </LabelInputContainer>
                </div>
                <div className="grid gap-3.5">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                      <Label htmlFor="phone">Phone Number</Label>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <PhoneInput
                                id="phone"
                                placeholder="Enter phone number"
                                defaultCountry="PK"
                                className="focus:border-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Select DOB"
                                type="date"
                                id="DOB"
                                className="outline-none focus:border-primary text-gray-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                  </div>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                      <Label htmlFor="cnic">CNIC</Label>
                      <FormField
                        control={form.control}
                        name="cnic"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter your CNIC"
                                type="number"
                                id="cnic"
                                className="outline-none focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="experience">Experience (in years)</Label>
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                }}
                              >
                                <SelectTrigger
                                  className={cn(
                                    "p-3 py-5 rounded-md focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20 text-gray-500",
                                    !field.value
                                      ? "dark:text-farmaciePlaceholderMuted"
                                      : "dark:text-farmacieWhite"
                                  )}
                                >
                                  <SelectValue placeholder="Select Experience" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl bg-white border relative z-50 w-52">
                                  <SelectGroup>
                                    <SelectLabel>Experience Level</SelectLabel>
                                    {experienceOptions.map((item) => (
                                      <SelectItem
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                  </div>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                      <Label htmlFor="education">Education</Label>
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                }}
                              >
                                <SelectTrigger
                                  className={cn(
                                    "p-3 py-5 rounded-md focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20 text-gray-500",
                                    !field.value
                                      ? "dark:text-farmaciePlaceholderMuted"
                                      : "dark:text-farmacieWhite"
                                  )}
                                >
                                  <SelectValue placeholder="Select Education" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl bg-white border relative z-50 lg:w-56">
                                  <SelectGroup>
                                    <SelectLabel>Education Level</SelectLabel>
                                    {educationLevels.map((item) => (
                                      <SelectItem
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="preferred_district">
                        Preferred District of Training
                      </Label>
                      <FormField
                        control={form.control}
                        name="preferred_district"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <Popover
                              open={districtListOpen}
                              onOpenChange={setDistrictListOpen}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={districtListOpen}
                                  className="min-w-full justify-between p-3 py-5 focus:outline-none focus:ring-1 focus:ring-primary text-gray-500"
                                >
                                  {selectedDistrict
                                    ? districts.find(
                                        (item) =>
                                          item.value === selectedDistrict
                                      )?.label
                                    : "Search & Select District..."}
                                  <ChevronDown
                                    className={`ml-2 h-4 w-4 opacity-50 transition-transform duration-200 ${
                                      districtListOpen ? "rotate-180" : ""
                                    }`}
                                  />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="max-w-2xl p-0 rounded-xl">
                                <Command className="rounded-xl">
                                  <CommandInput placeholder="Search District..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No district found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {districts.map((item) => (
                                        <CommandItem
                                          key={item.value}
                                          value={item.value}
                                          onSelect={(currentValue) => {
                                            setSelectedDistrict(
                                              currentValue === selectedDistrict
                                                ? ""
                                                : currentValue
                                            );
                                            field.onChange(currentValue);
                                            setDistrictListOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={`mr-2 h-4 w-4 ${
                                              selectedDistrict === item.value
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                  </div>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                      <Label htmlFor="trade">Trade</Label>
                      <FormField
                        control={form.control}
                        name="trade"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="min-w-full justify-between p-3 py-5 focus:outline-none focus:ring-1 focus:ring-primary text-gray-500"
                                >
                                  {selectedTrade
                                    ? tradeOptions.find(
                                        (item) => item.value === selectedTrade
                                      )?.label
                                    : "Search & Select Trade..."}
                                  <ChevronDown
                                    className={`ml-2 h-4 w-4 opacity-50 transition-transform duration-200 ${
                                      open ? "rotate-180" : ""
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
                                            setSelectedTrade(
                                              currentValue === selectedTrade
                                                ? ""
                                                : currentValue
                                            );
                                            field.onChange(currentValue);
                                            setOpen(false);
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="address">Address</Label>
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter your address"
                                type="text"
                                id="address"
                                className="outline-none focus:border-primary p-3 rounded-md border border-estateLightGray"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                  </div>
                  <div className="grid gap-2">
                    <LabelInputContainer>
                      <Label htmlFor="password">Password</Label>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="outline-none focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            {!showPassword ? (
                              <Icon
                                name="Eye"
                                size={18}
                                className={cn(
                                  "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                                  !!form.formState.errors.password
                                    ? "top-[20%]"
                                    : "top-[32%]"
                                )}
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            ) : (
                              <Icon
                                name="EyeOff"
                                size={20}
                                className={cn(
                                  "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                                  !!form.formState.errors.password
                                    ? "top-[20%]"
                                    : "top-[32%]"
                                )}
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                  </div>
                  <div className="grid gap-2">
                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                placeholder="••••••••"
                                type={confirmShowPassword ? "text" : "password"}
                                id="confirmPassword"
                                className="outline-none focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            {!confirmShowPassword ? (
                              <Icon
                                name="Eye"
                                size={18}
                                className={cn(
                                  "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                                  !!form.formState.errors.password
                                    ? "top-[20%]"
                                    : "top-[20%]"
                                )}
                                onClick={() =>
                                  setConfirmShowPassword(!confirmShowPassword)
                                }
                              />
                            ) : (
                              <Icon
                                name="EyeOff"
                                size={20}
                                className={cn(
                                  "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                                  !!form.formState.errors.password
                                    ? "top-[20%]"
                                    : "top-[20%]"
                                )}
                                onClick={() =>
                                  setConfirmShowPassword(!confirmShowPassword)
                                }
                              />
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                  </div>
                  <Button type="submit" className="w-full">
                    {loading ? "Creating..." : "Create Account"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
