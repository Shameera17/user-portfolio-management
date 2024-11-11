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
import { useUser } from "@/app/context/userContext";
import { storage } from "@/app/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createProject } from "@/app/api/services/projectService";

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
  const { user } = useUser();
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

  const addNewProject = async (formData: ProjectFormValues) => {
    if (!file) {
      throw new Error("No file selected");
    }
    if (!user?.email) {
      throw new Error("No user found");
    }
    try {
      const filePath = `images/project/${user.email}/${file.name}`;
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      if (!url) {
        throw new Error("No url found");
      }
      await createProject({
        projectName: formData.projectName,
        demoUrl: formData.demoUrl,
        repositoryUrl: formData.repositoryUrl,
        description: formData.description,
        imageUrl: url,
        imagePath: filePath,
        email: user.email,
      })
        .then(() => {
          toast.success("Project added successfully");
          setOpen(false);
        })
        .catch((error) => {
          toast.error("Project creation failed. Please try again.");
          console.error(error);
        });
    } catch (error) {
      toast.error("Please try again.");
      console.log("unable to upload image");
    }
  };
  const updateNewProject = (formData: ProjectFormValues) => {
    try {
      console.log(formData);
    } catch (error) {
      toast.error("Profile update failed. Please try again.");
      console.error(error);
    }
  };

  const onSubmit = async (formData: ProjectFormValues) => {
    setIsLoading(true);
    if (mode === "new") {
      addNewProject(formData);
    }
    if (mode === "edit") {
      updateNewProject(formData);
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
