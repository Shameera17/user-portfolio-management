import React, { useState } from "react";
import { Modal } from "@/app/components/organisms/modal/Modal";
import Wrapper from "@/app/components/atoms/Wrapper";
import { ProjectSetting } from "@/app/components/organisms/form/ProjectSetting";
import { IProject } from "@/types/project";

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
  const [formData, setFormData] = useState({
    projectName: record?.projectName ?? "",
    demoUrl: record?.demoUrl ?? "",
    repositoryUrl: record?.repositoryUrl ?? "",
    description: record?.description ?? "",
  });
  const [file, setFile] = useState<File | null>(null);

  return (
    <Modal title={"Add new project"} setOpen={setOpen} open={open}>
      <Wrapper>
        <ProjectSetting
          file={file}
          setFile={setFile}
          mode={mode}
          formData={formData}
          setFormData={setFormData}
        />
      </Wrapper>
    </Modal>
  );
}

export default ProjectModal;
