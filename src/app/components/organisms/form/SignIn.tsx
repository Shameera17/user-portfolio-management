import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import { AuthLabelGroup1 } from "../../molecules/AuthLabelGroup";

export const SignIn = () => {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email format"),
    password: z.string().min(1, { message: "Password is required" }),
  });
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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
        <TextInput
          control={form.control}
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <TextInput
          control={form.control}
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <PrimaryButton label="Sign In" type="submit" />
        <AuthLabelGroup1
          text1={"Not a member?"}
          text2={"Create an account"}
          href="/auth/signup"
        />
      </form>
    </Form>
  );
};
