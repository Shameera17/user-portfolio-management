import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PasswordInput, TextInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import { AuthLabelGroup1 } from "../../molecules/AuthLabelGroup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/app/context/userContext";
import { toast } from "sonner";

export const SignIn = () => {
  const router = useRouter();
  const { login } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
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
    setIsLoading(true);
    await axios
      .post("/api/signin", data)
      .then((response) => {
        login(response?.data);
        toast.success("Login successful.");
        router.push("/");
      })
      .catch((error) => {
        toast.error("Login failed. Please try again.");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
