import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PasswordInput, TextInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import CheckPasswordGroup from "../../molecules/CheckPasswordGroup";

export const NewPassword = () => {
  const formSchema = z
    .object({
      password: z.string().min(1, { message: "Password is required" }),
      confirmPassword: z.string().min(1, { message: "Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <PasswordInput
          control={form.control}
          name="password"
          placeholder="Enter your password"
        />
        <PasswordInput
          control={form.control}
          name="confirmPassword"
          placeholder="Re-enter a password"
        />
        <CheckPasswordGroup password={form.watch("confirmPassword")} />
        <PrimaryButton label="Reset Password" type="submit" />
      </form>
    </Form>
  );
};
