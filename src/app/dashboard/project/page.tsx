"use client";
import React, { useState } from "react";
import { DashboardTemplate } from "@/app/components/templates/DashboardTemplate";
import { PrimaryButton } from "@/app/components/atoms/Button";
import ProjectModal from "@/app/components/organisms/content/ProjectModal";

export default function ProjectPage() {
  const [modalSetting, setModalSetting] = useState<{
    mode?: "edit" | "new";
    visible: boolean;
    record: undefined;
  }>({
    mode: undefined,
    visible: false,
    record: undefined,
  });
  const openModal = (flag: boolean) =>
    setModalSetting({
      ...modalSetting,
      visible: flag,
      mode: undefined,
    });

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
    </DashboardTemplate>
  );
}
