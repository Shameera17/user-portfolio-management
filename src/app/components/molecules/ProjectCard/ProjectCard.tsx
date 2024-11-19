import Image from "next/image";
import styles from "./ProjectCard.module.css";
import { IconButton, NavigateButton } from "../../atoms/Button";
import { IProject } from "@/types/project";

interface ProjectCardProps {
  record: IProject;
  editProject?: () => void;
  deleteProject?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  record,
  editProject,
  deleteProject,
}) => {
  const { projectName, demoUrl, repositoryUrl, description, imageUrl } = record;
  return (
    <div className={`${styles.card} flex md:flex-row flex-col md:min-h-24 p-3`}>
      <div
        className={`${styles.imageWrapper} sm:w-full md:w-1/4 md:min-w-32 h-44 bg-[#F2F5F9] rounded-lg `}
      >
        <Image
          src={imageUrl!}
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
              onClick={() => {
                window.open(demoUrl, "_blank");
              }}
              iconPath="/images/externalLink.svg"
            />
            <NavigateButton
              variant={"outline"}
              label={"Repository URL"}
              onClick={() => {
                window.open(repositoryUrl, "_blank");
              }}
              iconPath="/images/externalLink.svg"
            />
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
