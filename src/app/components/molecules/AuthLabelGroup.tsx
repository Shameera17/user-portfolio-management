import React from "react";
import { H2, LinkText, P1, P2 } from "../atoms/Typography";

export const AuthLabelGroup = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <>
      <H2 text={title} />
      <P1 text={subtitle} />
    </>
  );
};
export const AuthLabelGroup1 = ({
  text1,
  text2,
  onClick1,
  href,
  className,
}: {
  text1?: string;
  text2?: string;
  onClick1?: () => void;
  href?: string;
  className?: string;
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {text1 && <P2 text={text1} onClick={onClick1} />}
      {text2 && <LinkText text={text2} linkHref={href!} />}
    </div>
  );
};
