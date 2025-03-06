import React, { useState } from "react";
import { Button } from "../button";
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
import { Input } from "../input";
import { Label } from "../label";
import LabelInputContainer from "@/components/Forms/LabelInputContainer";
import { projectFormSchema } from "@/schemas/FormsValidation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import L from "leaflet";
import { pakistanData, role, trade } from "@/constant/data";
import { cn } from "@/lib/utils";
import { useCreateProject } from "@/hooks/apis/useProject";
import { useContextConsumer } from "@/context/Context";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Textarea } from "../textarea";

const markerIcon = new L.Icon({
  iconUrl: "/images/map/marker-green.png",
  iconSize: [18, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationPicker = ({ setLat, setLng }: any) => {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    },
  });
  return null;
};

const AddProjectForm = ({ onOpenChange, onClose }: any) => {
  const { token } = useContextConsumer();
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [tehsilOptions, setTehsilOptions] = useState<Option[]>([]);
  const [lat, setLat] = useState(30.3753);
  const [lng, setLng] = useState(69.3451);

  const { mutate: createProject, isPending: loading } = useCreateProject();

  const form = useForm({
    resolver: zodResolver(projectFormSchema),
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

  const handleProvinceChange = (value: string) => {
    const districts = pakistanData[`districts_${value}`] || [];
    setDistrictOptions(districts as any);
    setTehsilOptions([]);
  };

  const handleDistrictChange = (value: string) => {
    const tehsils = pakistanData[`tehsils_${value}`] || [];
    setTehsilOptions(tehsils as any);
  };

  const onSubmit = (data: z.infer<typeof projectFormSchema>) => {
    const updatedData = {
      ...data,
      location: [
        parseFloat(data.location[0].toString()),
        parseFloat(data.location[1].toString()),
      ],
    };
    createProject(
      { data: updatedData, token },
      {
        onSuccess: (log) => {
          if (log?.success) {
            onClose();
            onOpenChange((prev: any) => !prev);
          }
        },
      }
    );
  };

  return (
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
                    onValueChange={(value: any) => {
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
                      <SelectValue placeholder="Select Trade" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectGroup>
                        <SelectLabel>Select Trade</SelectLabel>
                        {trade.map((tehsil) => (
                          <SelectItem key={tehsil.value} value={tehsil.value}>
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
          <Label htmlFor="sector" className="dark:text-farmacieGrey">
            Sector
          </Label>
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value: any) => {
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
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectGroup>
                        <SelectLabel>Select Sector</SelectLabel>
                        {role.map((sector) => (
                          <SelectItem key={sector.value} value={sector.value}>
                            {sector.label}
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

        <LabelInputContainer>
          <Label htmlFor="location">Select Location</Label>
          <MapContainer
            center={[lat, lng]}
            zoom={6}
            style={{ height: "150px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]} icon={markerIcon} />
            <LocationPicker setLat={setLat} setLng={setLng} />
          </MapContainer>
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
                    onValueChange={(value: any) => {
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
                      <SelectValue placeholder="Select province" />
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
                    onValueChange={(value: any) => {
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
                      <SelectValue placeholder="Select District" />
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
                    onValueChange={(value: any) => {
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
                      <SelectValue placeholder="Select Tehsil" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectGroup>
                        <SelectLabel>Select Tehsil</SelectLabel>
                        {tehsilOptions.map((tehsil) => (
                          <SelectItem key={tehsil.value} value={tehsil.value}>
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
          <Label htmlFor="duration">Duration</Label>
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="duration"
                    placeholder="Enter Duration"
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
          <Label htmlFor="deadline">Application Deadline</Label>
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="deadline"
                    placeholder="Select Deadline"
                    type="date"
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

        <Button type="submit" className="w-full" disabled={loading}>
          Add Project
        </Button>
      </form>
    </Form>
  );
};

export default AddProjectForm;
