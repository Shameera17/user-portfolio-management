import Image from "next/image";
import styles from "./ProjectCard.module.css";
import { NavigateButton } from "../../atoms/Button";

interface ProjectCardProps {
  title: string;
  description: string;
  demoUrl: string;
  repoUrl: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  demoUrl,
  repoUrl,
  imageUrl,
}) => {
  return (
    <div className={`${styles.card} flex md:flex-row flex-col md:h-40 p-3`}>
      <div
        className={`${styles.imageWrapper} sm:w-full md:w-1/4 md:min-w-32 h-52 md:h-full`}
      >
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
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
              window.open(repoUrl, "_blank");
            }}
            iconPath="/images/externalLink.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
