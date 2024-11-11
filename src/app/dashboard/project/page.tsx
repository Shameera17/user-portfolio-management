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

export default function ProjectPage() {
  const { user } = useUser();
  const [modalSetting, setModalSetting] = useState<{
    mode?: "edit" | "new";
    visible: boolean;
    record: undefined;
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
  mutate(user?.email ? `/api/user?email=${user.email}` : null);

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
                title={project.projectName}
                description={project.description ?? ""}
                demoUrl={project.demoUrl ?? ""}
                repoUrl={project.repositoryUrl ?? ""}
                imageUrl={project.imageUrl ?? ""}
              />
            ))}
        </div>
      )}
    </DashboardTemplate>
  );
}
