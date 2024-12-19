import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PasswordInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import CheckPasswordGroup from "../../molecules/CheckPasswordGroup";
import { updatePasswordRequest } from "@/app/api/services/profileService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { extractErrorMessage } from "@/lib/helper";

export const NewPassword = ({ token }: { token: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    await updatePasswordRequest(token, data.password)
      .then((data) => {
        toast.info("You will be redirected to the Login page.");
        toast.success(data.message, { duration: 1000 });
        router.push("/auth/signin");
      })
      .catch((error) => {
        toast.error(extractErrorMessage(error));
      })
      .finally(() => {
        setLoading(false);
      });
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
        <PrimaryButton
          isLoading={loading}
          label="Reset Password"
          type="submit"
        />
      </form>
    </Form>
  );
};
