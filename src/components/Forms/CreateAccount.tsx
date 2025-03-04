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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAccountFormSchema } from "@/schemas/FormsValidation";
import Link from "next/link";
import { PhoneInput } from "../ui/PhoneInput";
import { useUserAccount } from "@/hooks/apis/useUserAuth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { role } from "@/constant/data";
import { Check, ChevronDown } from "lucide-react";

export function CreateAccountForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmShowPassword, setConfirmShowPassword] =
    useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [openRoleDropdown, setOpenRoleDropdown] = useState(false);

  const { mutate: createAccount, isPending: loading } = useUserAccount();

  const form = useForm<z.infer<typeof createAccountFormSchema>>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof createAccountFormSchema>) => {
    const payload = {
      ...data,
      countryCode: data.phone.slice(0, 3),
      phone: data.phone.slice(3),
    };
    createAccount(payload);
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
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <LabelInputContainer>
                    <Label htmlFor="firstName">First Name</Label>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              type="text"
                              id="firstName"
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
                    <Label htmlFor="lastName">Last Name</Label>
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              type="text"
                              id="lastName"
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
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
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
                </div>
                <div className="grid gap-3.5">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
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
                  </div>
                  <LabelInputContainer>
                    <Label htmlFor="role">Role</Label>
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Popover
                              open={openRoleDropdown}
                              onOpenChange={setOpenRoleDropdown}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openRoleDropdown}
                                  className="min-w-full justify-between p-3 py-5 focus:outline-none focus:ring-1 focus:ring-primary text-gray-500"
                                >
                                  {selectedRole
                                    ? role.find(
                                        (item) => item.value === selectedRole
                                      )?.label
                                    : "Search & Select Role..."}
                                  <ChevronDown
                                    className={`ml-2 h-4 w-4 opacity-50 transition-transform duration-200 ${
                                      openRoleDropdown ? "rotate-180" : ""
                                    }`}
                                  />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="max-w-2xl p-0 rounded-xl">
                                <Command className="rounded-xl">
                                  <CommandInput placeholder="Search Role..." />
                                  <CommandList>
                                    <CommandEmpty>No role found.</CommandEmpty>
                                    <CommandGroup>
                                      {role.map((item) => (
                                        <CommandItem
                                          key={item.value}
                                          value={item.value}
                                          onSelect={(currentValue) => {
                                            setSelectedRole(currentValue);
                                            field.onChange(currentValue);
                                            setOpenRoleDropdown(false);
                                          }}
                                        >
                                          <Check
                                            className={`mr-2 h-4 w-4 ${
                                              selectedRole === item.value
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
