import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PasswordInput, TextInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import { AuthLabelGroup1 } from "../../molecules/AuthLabelGroup";
import CheckPasswordGroup from "../../molecules/CheckPasswordGroup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp } from "@/app/api/services/profileService";
export const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email format"),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .refine(
        (value) => {
          const flag =
            /[a-z]/.test(value) &&
            /[A-Z]/.test(value) &&
            /\d/.test(value) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(value) &&
            value.length >= 8;
          return flag;
        },
        {
          message: "Password must contain below requirements.",
        }
      ),
  });
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await signUp(data);
      toast.success(
        "Sign up successful. You will be redirected to the Login page."
      );
      router.push("/auth/signin");
    } catch (error) {
      toast.error("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        <PrimaryButton isLoading={isLoading} label="Sign Up" type="submit" />
        <AuthLabelGroup1
          text1={"Already have an account?"}
          text2={"Log in"}
          href="/auth/signin"
        />
      </form>
    </Form>
  );
};
