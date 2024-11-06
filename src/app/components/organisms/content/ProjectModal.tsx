import React, { useState } from "react";
import { Modal } from "@/app/components/organisms/modal/Modal";
import Wrapper from "@/app/components/atoms/Wrapper";
import { IProject } from "@/types/project";
import { useForm } from "react-hook-form";
import {
  projectFormSchema,
  ProjectFormValues,
} from "@/app/utils/schemas/projectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TextArea, TextInput } from "../../molecules/TextInput";
import { ProjectImageUpload } from "../upload/ProjectImageUpload";
import { Form } from "@/components/ui/form";
import { PrimaryButton } from "../../atoms/Button";

function ProjectModal({
  open,
  setOpen,
  mode,
  record,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
  mode: "edit" | "new";
  record?: IProject;
}) {
  const [file, setFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: record?.projectName || "",
      demoUrl: record?.demoUrl || "",
      repositoryUrl: record?.repositoryUrl || "",
      description: record?.description || "",
    },
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
    <Modal title={"Add new project"} setOpen={setOpen} open={open}>
      <Wrapper>
        <div>
          <ProjectImageUpload file={file} setPojectImage={setFile} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  width=" w-full"
                  isLoading={isLoading}
                  label="Add"
                  type="submit"
                />
              </div>
            </form>
          </Form>
        </div>
      </Wrapper>
    </Modal>
  );
}

export default ProjectModal;
