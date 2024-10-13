import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PasswordInput, TextInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import { AuthLabelGroup1 } from "../../molecules/AuthLabelGroup";
import CheckPasswordGroup from "../../molecules/CheckPasswordGroup";
import axios from "axios";
import { useRouter } from "next/navigation";
export const SignUp = () => {
  const router = useRouter();
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

  const onSubmit = async (data: FormValues) => {
    const response = await axios.post("/api/signup", data);
    console.log(response);
    router.push("/auth/signin");
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
        <PasswordInput
          control={form.control}
          name="password"
          placeholder="Enter your password"
        />
        <CheckPasswordGroup password={form.watch("password")} />
        <PrimaryButton label="Sign Up" type="submit" />
        <AuthLabelGroup1
          text1={"Already have an account?"}
          text2={"Log in"}
          href="/auth/signin"
        />
      </form>
    </Form>
  );
};
