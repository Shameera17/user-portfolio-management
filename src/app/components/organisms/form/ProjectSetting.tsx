"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextArea, TextInput } from "../../molecules/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import { toast } from "sonner";
import { ProjectImageUpload } from "../upload/ProjectImageUpload";
import {
  projectFormSchema,
  ProjectFormValues,
} from "@/app/utils/schemas/projectFormSchema";

export const ProjectSetting = ({
  mode,
  formData,
  setFormData,
  setFile,
  file,
}: {
  mode: "edit" | "new";
  formData: ProjectFormValues;
  file: File | null;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormValues>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: formData,
  });

  const onSubmit = async (formData: ProjectFormValues) => {
    setIsLoading(true);
    try {
      toast.success("Profile update successful.");
    } catch (error) {
      toast.error("Profile update failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ProjectImageUpload file={file} setPojectImage={setFile} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => {
            setFormData(form.getValues());
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextInput
              label="Project Name"
              control={form.control}
              type="text"
              name="projectName"
              placeholder="Enter your project name"
            />
            <TextInput
              label="Demo URL"
              control={form.control}
              type="text"
              name="demoUrl"
              placeholder="Enter the demo URL"
            />
            <TextInput
              label="Repository URL"
              control={form.control}
              type="text"
              name="repositoryUrl"
              placeholder="Enter the repository URL"
            />
          </div>

          <TextArea
            label="Description"
            control={form.control}
            name="description"
            placeholder="Enter a short introduction.."
          />

          <div className="flex justify-end">
            <PrimaryButton
              iconPath="/images/checkcircle-1.svg"
              width="w-max"
              isLoading={isLoading}
              label="Add"
              type="submit"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
