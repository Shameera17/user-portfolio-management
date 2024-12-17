"use client";
import React, { useEffect, useState } from "react";
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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { createProject, editProject } from "@/app/api/services/projectService";

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
      toast.error("No file selected");
      return;
    }
    if (!user?.email) {
      toast.error("Please try again.");
      return;
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
    } finally {
      setIsLoading(false);
    }
  };
  const updateNewProject = async (formData: ProjectFormValues) => {
    const updateProject = async (filePath?: string, url?: string) => {
      const projectCode = record!.code!;
      await editProject(
        {
          projectName: formData.projectName,
          demoUrl: formData.demoUrl,
          repositoryUrl: formData.repositoryUrl,
          description: formData.description,
          imageUrl: url,
          imagePath: filePath,
          email: user!.email,
        },
        projectCode
      )
        .then(() => {
          toast.success("Project added successfully");
          setOpen(false);
        })
        .catch((error) => {
          toast.error("Project creation failed. Please try again.");
          console.error(error);
        });
    };
    try {
      if (file) {
        // create new file
        const filePath = `images/project/${user!.email}/${file.name}`;
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        // remove old file
        const storageRef1 = ref(storage, record!.imagePath!);
        await deleteObject(storageRef1);
        // update project
        await updateProject(filePath, url);
        return;
      }
      await updateProject(record!.imagePath!, record!.imageUrl!);
    } catch (error) {
      toast.error("Project update failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    if (mode === "edit") {
      form.reset({
        projectName: record?.projectName || "",
        demoUrl: record?.demoUrl || "",
        repositoryUrl: record?.repositoryUrl || "",
        description: record?.description || "",
      });
    }
  }, [mode, record]);

  return (
    <Modal
      title={mode == "new" ? "Add new project" : "Update project"}
      setOpen={setOpen}
      open={open}
    >
      <Wrapper>
        <div>
          <ProjectImageUpload
            savedImageUrl={record?.imageUrl}
            file={file}
            setPojectImage={setFile}
          />
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
                  placeholder="https://sample-demo-url.com"
                />
                <TextInput
                  label="Repository URL"
                  control={form.control}
                  type="text"
                  name="repositoryUrl"
                  placeholder="https://sample-repo-url.com"
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
                  label={mode === "new" ? "Add" : "Update"}
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
