"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextArea, TextInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import { useUser } from "@/app/context/userContext";
import { toast } from "sonner";
import useSWR from "swr";
import {
  fetchUserProfile,
  updateUserProfile,
} from "@/app/api/services/profileService";

export const ProfileSetting = () => {
  const { user } = useUser();
  const { updateUser } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const { data, error } = useSWR(
    user?.email ? `/api/user?email=${user.email}` : null,
    () => (user?.email ? fetchUserProfile(user.email) : null) // Check if email exists
  );

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email format"),
    jobTitle: z.string().min(1, { message: "Job Title is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data?.email ?? "",
      jobTitle: data?.jobTitle ?? "",
      name: data?.name ?? "",
      bio: data?.bio ?? "",
    },
    values: data ?? {
      email: "",
      jobTitle: "",
      name: "",
      bio: "",
    }, // will get updated once values returns
  });

  const onSubmit = async (formData: FormValues) => {
    setIsLoading(true);
    try {
      const updatedUser = await updateUserProfile(formData);
      form.reset(updatedUser);
      updateUser({
        name: updatedUser.name,
        email: updatedUser.email,
      });
      toast.success("Profile update successful.");
    } catch (error) {
      toast.error("Profile update failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border border-customGray rounded-lg p-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextInput
            readonly
            label="Email"
            control={form.control}
            type="email"
            name="email"
            placeholder="example@mail.com"
          />
          <TextInput
            label="Job Title"
            control={form.control}
            type="text"
            name="jobTitle"
            placeholder="Enter your job title"
          />
          <TextInput
            label="Name"
            control={form.control}
            type="text"
            name="name"
            placeholder="Enter your name"
          />
        </div>

        <TextArea
          label="Bio"
          control={form.control}
          name="bio"
          placeholder="Enter a short introduction.."
        />

        <div className="flex justify-end">
          <PrimaryButton
            iconPath="/images/checkcircle-1.svg"
            width="w-max"
            isLoading={isLoading}
            label="Save"
            type="submit"
          />
        </div>
      </form>
    </Form>
  );
};
