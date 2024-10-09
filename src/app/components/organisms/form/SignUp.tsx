import React from "react";
import { Email } from "../../atoms/TextInput";
import { AuthLabelGroup1 } from "../../molecules/AuthLabelGroup";

export const SignUp = () => {
  return (
    <form className="flex flex-col gap-4 ">
      <Email placeholder="Enter email" />

      <AuthLabelGroup1
        text1={"Already have an account?"}
        text2={"Log in"}
        href="/auth/signin"
      />
    </form>
  );
};
