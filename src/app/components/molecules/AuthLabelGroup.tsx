import React from "react";
import { H2, P } from "../atoms/Typography";

export const AuthLabelGroup = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div>
      <H2 text={title} />
      <P text={subtitle} />
    </div>
  );
};
