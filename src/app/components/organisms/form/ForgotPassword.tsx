import React from "react";
import { PrimaryButton } from "../../atoms/Button";
import { AuthLabelGroup1 } from "../../molecules/AuthLabelGroup";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../../molecules/TextInput";
import { resetPasswordRequest } from "@/app/api/services/profileService";

export const ForgotPassword = () => {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email format"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await resetPasswordRequest(data.email)
      .then((data) => console.log(data))
      .catch((error) => {
        form.setError("email", error.response.data);
      });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 "
      >
        <TextInput
          control={form.control}
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <PrimaryButton label="Reset Password" type="submit" />
        <AuthLabelGroup1 text2={"Back to login"} href="/auth/signin" />
      </form>
    </Form>
  );
};
