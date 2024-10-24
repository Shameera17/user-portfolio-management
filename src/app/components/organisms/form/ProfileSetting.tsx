import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextArea, TextInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/app/context/userContext";
import { toast } from "sonner";

export const ProfileSetting = () => {
  const router = useRouter();
  const { login } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
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
      email: "",
      jobTitle: "",
      name: "",
      bio: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    await axios
      .post("/api/updateProfile", data)
      .then((response) => {
        login(response?.data);
        toast.success("Profile update successful.");
        router.push("/");
      })
      .catch((error) => {
        toast.error("Profile update failed. Please try again.");
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
        className="space-y-6 border border-customGray rounded-lg p-4 "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextInput
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
