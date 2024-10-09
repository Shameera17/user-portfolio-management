import React from "react";
import { PrimaryButton } from "../../atoms/Button";
import { AuthLabelGroup1 } from "../../molecules/AuthLabelGroup";
import { Email } from "../../atoms/TextInput";

export const ForgotPassword = () => {
  return (
    <form className="flex flex-col gap-4 ">
      <Email placeholder="Enter email" />
      <PrimaryButton label="Sign In" type="submit" />
      <AuthLabelGroup1 text2={"Reset Password"} href="/auth/signin" />
    </form>
  );
};
