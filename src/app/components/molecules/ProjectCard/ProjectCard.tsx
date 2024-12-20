"use client";
import Image from "next/image";
import styles from "./ProjectCard.module.css";
import { IconButton, NavigateButton } from "../../atoms/Button";
import { IProject } from "@/types/project";

interface ProjectCardProps {
  record: IProject;
  editProject?: () => void;
  deleteProject?: () => void;
  isHide?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  record,
  editProject,
  deleteProject,
  isHide,
}) => {
  const handleUrlOpen = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };
  const { projectName, demoUrl, repositoryUrl, description, imageUrl } = record;
  return (
    <div className={`${styles.card} flex md:flex-row flex-col md:min-h-24 p-3`}>
      <div
        className={`${styles.imageWrapper} sm:w-full md:w-1/4 md:min-w-32 h-44 bg-[#F2F5F9] rounded-lg `}
      >
        <Image
          src={imageUrl! ?? "/images/multiple image-1.svg"}
          alt={projectName!}
          layout="fill"
          objectFit="scale-down"
          className={styles.image}
        />
      </div>
      <div className={`${styles.content} md:w-3/4 w-full`}>
        <h3 className={styles.title}>{projectName}</h3>
        <p className={styles.description}>{description}</p>
        <div className="flex justify-between w-full">
          <div className={styles.buttons}>
            <NavigateButton
              variant={"outline"}
              label={"Demo URL"}
              onClick={() => handleUrlOpen(demoUrl)}
              iconPath="/images/externalLink.svg"
            />
            <NavigateButton
              variant={"outline"}
              label={"Repository URL"}
              onClick={() => handleUrlOpen(repositoryUrl)}
              iconPath="/images/externalLink.svg"
            />
          </div>
          {!isHide && (
            <div className={"flex gap-2"}>
              <IconButton
                tooltipText="Edit"
                variant={"outline"}
                onClick={editProject}
                iconPath="/images/Pencil.svg"
              />
              <IconButton
                tooltipText="Remove"
                variant={"outline"}
                onClick={deleteProject}
                iconPath="/images/Trash-1.svg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
