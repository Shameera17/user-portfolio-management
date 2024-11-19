"use client";
import React, { useState } from "react";
import { DashboardTemplate } from "@/app/components/templates/DashboardTemplate";
import { PrimaryButton } from "@/app/components/atoms/Button";
import ProjectModal from "@/app/components/organisms/content/ProjectModal";
import useSWR, { mutate } from "swr";
import { getAllProjects } from "@/app/api/services/projectService";
import { useUser } from "@/app/context/userContext";
import ProjectCard from "@/app/components/molecules/ProjectCard/ProjectCard";
import { SkeletonCard } from "@/app/components/molecules/SkeletonCard";
import { IProject } from "@/types/project";
import { deleteProject } from "@/app/api/services/projectService";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";
import { toast } from "sonner";

export default function ProjectPage() {
  const { user } = useUser();
  const [modalSetting, setModalSetting] = useState<{
    mode?: "edit" | "new";
    visible: boolean;
    record: undefined | IProject;
  }>({
    mode: undefined,
    visible: false,
    record: undefined,
  });
  const openModal = (flag: boolean) => {
    setModalSetting({
      ...modalSetting,
      visible: flag,
      mode: undefined,
    });
    if (!flag) {
      // Revalidate useSWR when modal closes
      mutate(user?.email ? `/api/user?email=${user.email}` : null);
    }
  };

  const { data, error, isLoading } = useSWR(
    user?.email ? `/api/user?email=${user.email}` : null,
    () => (user?.email ? getAllProjects(user.email) : null) // Check if email exists
  );

  if (!data) mutate(user?.email ? `/api/user?email=${user.email}` : null);

  return (
    <DashboardTemplate title="Profile settings">
      <PrimaryButton
        onClick={() =>
          setModalSetting({ ...modalSetting, mode: "new", visible: true })
        }
        label={"Add project"}
      />
      {modalSetting.visible && (
        <ProjectModal
          setOpen={openModal}
          open={modalSetting.visible}
          mode={modalSetting.mode ?? "new"}
          record={modalSetting.record}
        />
      )}
      {isLoading ? (
        <div className="flex gap-3 flex-col">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="space-y-4">
          {Array.isArray(data) &&
            data?.map((project) => (
              <ProjectCard
                key={project.code}
                record={project}
                editProject={() => {
                  setModalSetting({
                    ...modalSetting,
                    mode: "edit",
                    visible: true,
                    record: project,
                  });
                }}
                deleteProject={async () => {
                  try {
                    if (!project.code) {
                      toast.error("Project code is missing.");
                      return;
                    }

                    // Handle both image and project deletion
                    try {
                      if (project.imagePath && project.imageUrl) {
                        const storageRef = ref(storage, project.imagePath);
                        await deleteObject(storageRef);
                      }
                      const res = await deleteProject(project.code);
                      toast.success(res.message);

                      // Revalidate user-related data
                      if (user?.email) {
                        mutate(`/api/user?email=${user.email}`);
                      }
                    } catch (operationError) {
                      console.error(
                        "Error during project deletion process:",
                        operationError
                      );
                      toast.error("Failed to delete the project or its image.");
                    }
                  } catch (generalError) {
                    console.error("Unexpected error:", generalError);
                    toast.error(
                      "An unexpected error occurred. Please try again."
                    );
                  }
                }}
              />
            ))}
        </div>
      )}
    </DashboardTemplate>
  );
}
