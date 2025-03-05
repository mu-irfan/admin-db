import React, { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pakistanData, trade } from "@/constant/data";
import { useContextConsumer } from "@/context/Context";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import LabelInputContainer from "./LabelInputContainer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateProjectFormSchema } from "@/schemas/FormsValidation";
import { useUpdateProject } from "@/hooks/apis/useProject";
import { Textarea } from "../ui/textarea";

const UpdateProjectForm = ({ project, onClose }: any) => {
  const { token } = useContextConsumer();
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [tehsilOptions, setTehsilOptions] = useState<Option[]>([]);

  //
  const { mutate: updateProject, isPending: updating } = useUpdateProject();

  const form = useForm<z.infer<typeof updateProjectFormSchema>>({
    resolver: zodResolver(updateProjectFormSchema),
    defaultValues: {
      title: "",
      trade: "",
      sector: "",
      description: "",
      requirements: "",
      location: [0, 0],
      address: "",
      province: "",
      district: "",
      tehsil: "",
      duration: "",
      startDate: "",
      endDate: "",
      deadline: "",
      totalSlots: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (project) {
      reset({
        title: project.title || "",
        trade: project.trade || "",
        sector: project.sector || "",
        description: project.description || "",
        requirements: project.requirements || "",
        location: project.location || [0, 0],
        address: project.address || "",
        province: project.province || "",
        district: project.district || "",
        tehsil: project.tehsil || "",
        duration: project.duration || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        deadline: project.deadline || "",
        totalSlots: project.totalSlots || "",
      });
    }
  }, [project, reset]);

  const onSubmit = (data: any) => {
    const updatedData = {
      data: {
        ...data,
        uuid: project?.uuid,
      },
      token,
    };
    updateProject(updatedData, {
      onSuccess: (log: any) => {
        if (log?.success) {
          onClose();
        }
      },
    });
  };

  const handleProvinceChange = (value: string) => {
    const districts = pakistanData[`districts_${value}`] || [];
    setDistrictOptions(districts as any);
    setTehsilOptions([]);
  };

  const handleDistrictChange = (value: string) => {
    const tehsils = pakistanData[`tehsils_${value}`] || [];
    setTehsilOptions(tehsils as any);
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 mb-4">
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
                        {...field}
                        className="border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="trade" className="dark:text-farmacieGrey">
                Trade
              </Label>
              <FormField
                control={form.control}
                name="trade"
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
                            "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                            !field.value
                              ? "dark:text-farmaciePlaceholderMuted"
                              : "dark:text-farmacieWhite"
                          )}
                        >
                          <SelectValue
                            placeholder={project?.trade || "No Trade"}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select Trade</SelectLabel>
                            {trade.map((trade) => (
                              <SelectItem key={trade.value} value={trade.value}>
                                {trade.label}
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
              <Label htmlFor="description" className="dark:text-farmacieGrey">
                Description
              </Label>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your description ..."
                        rows={2}
                        id="description"
                        className="outline-none focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="requirements" className="dark:text-farmacieGrey">
                Requirements
              </Label>
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your Requirements ..."
                        rows={2}
                        id="requirements"
                        className="outline-none focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="address" className="dark:text-farmacieGrey">
                address
              </Label>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your address ..."
                        rows={2}
                        id="address"
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
              <Label htmlFor="province" className="dark:text-farmacieGrey">
                Province
              </Label>
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          handleProvinceChange(value);
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger
                          className={cn(
                            "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                            !field.value
                              ? "dark:text-farmaciePlaceholderMuted"
                              : "dark:text-farmacieWhite"
                          )}
                        >
                          <SelectValue
                            placeholder={project?.province || "No province"}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select Province</SelectLabel>
                            {pakistanData.provinces.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
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
              <Label htmlFor="district" className="dark:text-farmacieGrey">
                District
              </Label>
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          handleDistrictChange(value);
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger
                          className={cn(
                            "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                            !field.value
                              ? "dark:text-farmaciePlaceholderMuted"
                              : "dark:text-farmacieWhite"
                          )}
                        >
                          <SelectValue
                            placeholder={project?.district || "Select District"}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select District</SelectLabel>
                            {districtOptions.map((district) => (
                              <SelectItem
                                key={district.value}
                                value={district.value}
                              >
                                {district.label}
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
              <Label htmlFor="tehsil" className="dark:text-farmacieGrey">
                Tehsil
              </Label>
              <FormField
                control={form.control}
                name="tehsil"
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
                            "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                            !field.value
                              ? "dark:text-farmaciePlaceholderMuted"
                              : "dark:text-farmacieWhite"
                          )}
                        >
                          <SelectValue
                            placeholder={project?.tehsil || "Select Tehsil"}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select Tehsil</SelectLabel>
                            {tehsilOptions.map((tehsil) => (
                              <SelectItem
                                key={tehsil.value}
                                value={tehsil.value}
                              >
                                {tehsil.label}
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
              <Label htmlFor="totalSlots">Total Slots</Label>
              <FormField
                control={form.control}
                name="totalSlots"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="totalSlots"
                        placeholder="Enter Number of Slots"
                        type="number"
                        {...field}
                        className="border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>
          <Button className="w-full text-white font-medium" type="submit">
            {updating ? "Updating..." : "Update"}
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
        </form>
      </Form>
    </>
  );
};

export default UpdateProjectForm;
