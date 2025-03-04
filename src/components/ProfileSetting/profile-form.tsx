"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileFormSchema } from "@/schemas/FormsValidation";
import { useContextConsumer } from "@/context/Context";
import { useEffect, useState } from "react";
import {
  useGetUSerProfile,
  useUpdateUserProfile,
} from "@/hooks/apis/useUserAuth";
import { useSession } from "next-auth/react";
import { Pencil } from "lucide-react";
import LabelInputContainer from "../Forms/LabelInputContainer";
import { Label } from "../ui/label";
import { PhoneInput } from "../ui/PhoneInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const { token } = useContextConsumer();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { data: session } = useSession();

  const { data: apiUser, isLoading } = useGetUSerProfile(token);
  const { mutate: updateUser, isPending: updating } = useUpdateUserProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "",
      phone: "",
      dateOfBirth: "",
      cnic: "",
      gender: null,
      address: "",
      tehsil: "",
      district: "",
      province: "",
      role: "",
      verified: false,
      profileImg: "",
    },
  });

  useEffect(() => {
    if (session?.user) {
      form.reset(session.user);
    } else if (apiUser?.success && apiUser.data) {
      form.reset(apiUser.data);
    }
  }, [session, apiUser, form]);

  function onSubmit(data: ProfileFormValues) {
    updateUser(
      { data, token },
      {
        onSuccess: () => {
          setIsEditable(false);
        },
      }
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          type="button"
          onClick={() => setIsEditable(!isEditable)}
          className="py-2 px-4"
        >
          {isEditable ? "Cancel" : "Edit"}
          {!isEditable && <Pencil className="w-3.5 h-3.5 ml-2" />}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
        >
          {Object.keys(form.getValues())
            .filter(
              (field) =>
                ![
                  "uuid",
                  "password",
                  "createdAt",
                  "updatedAt",
                  "canChangePassword",
                  "otp",
                  "otpCount",
                  "profileImg",
                  "verified",
                ].includes(field)
            )
            .map((field) => (
              <LabelInputContainer key={field}>
                <Label htmlFor={field}>
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <FormField
                  control={form.control}
                  name={field}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {field.name === "phone" ? (
                          <PhoneInput
                            id="phone"
                            placeholder="Enter phone number"
                            defaultCountry="PK"
                            className="focus:border-none"
                            {...field}
                            disabled={!isEditable}
                          />
                        ) : field.name === "gender" ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger disabled={!isEditable}>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            placeholder={`Enter ${field.name}`}
                            type="text"
                            id={field.name}
                            {...field}
                            disabled={!isEditable}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
            ))}
          {isEditable && (
            <div className="col-span-full flex justify-end">
              <Button type="submit">
                {updating ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
