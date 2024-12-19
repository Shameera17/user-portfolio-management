"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PasswordInput, TextInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import { AuthLabelGroup1 } from "../../molecules/AuthLabelGroup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";

export const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const { status } = useSession();
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

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        if (res?.error) {
          toast.error("Login failed. Please try again.");
          console.log(res.error);
        }
        if (res?.url) {
          router.replace("/");
        }
      })
      .finally(() => setIsLoading(false));
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
        <AuthLabelGroup1
          text2={"Forgot password"}
          href="/auth/forgot-password"
          className="justify-end !mt-[-8px]"
        />
        <PrimaryButton isLoading={isLoading} label="Sign In" type="submit" />
        <AuthLabelGroup1
          text1={"Not a member?"}
          text2={"Create an account"}
          href="/auth/signup"
        />
      </form>
    </Form>
  );
};
