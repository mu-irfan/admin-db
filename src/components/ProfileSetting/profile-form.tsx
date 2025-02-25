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

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const { token } = useContextConsumer();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { data: session } = useSession();

  const { data: apiUser, isLoading } = useGetUSerProfile(token);
  const { mutate: updateCompany, isPending: updating } = useUpdateUserProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (session?.user) {
      form.reset({
        fullName: session.user.name || "",
        email: session.user.email || "",
        phone: "",
      });
    } else if (apiUser?.success && apiUser.data) {
      form.reset({
        fullName: apiUser.data.fullName || "",
        email: apiUser.data.email || "",
        phone: apiUser.data.phone || "",
      });
    }
  }, [session, apiUser, form]);

  function onSubmit(data: ProfileFormValues) {
    updateCompany(
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <LabelInputContainer>
            <Label htmlFor="fullName" className="dark:text-farmacieGrey">
              Full Name
            </Label>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter full name"
                      type="text"
                      id="fullName"
                      className="outline-none focus:border-primary py-5"
                      {...field}
                      disabled={!isEditable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="email" className="dark:text-farmacieGrey">
              Email
            </Label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      type="text"
                      id="email"
                      className="outline-none focus:border-primary py-5 bg-gray-200 cursor-not-allowed"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
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
                      placeholder="Enter your phone number"
                      defaultCountry="PK"
                      className="focus:border-none"
                      disabled={!isEditable}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          {isEditable && (
            <div className="flex justify-end">
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
