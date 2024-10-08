import React from "react";
import { Email } from "../../atoms/TextInput";
import { PrimaryButton } from "../../atoms/Button";
import { PasswordGroup } from "../../molecules/InputGroup";
import { AuthLabelGroup1 } from "../../molecules/AuthLabelGroup";

export const SignIn = () => {
  return (
    <form className="flex flex-col gap-4 ">
      <Email placeholder="Enter email" />
      <PasswordGroup
        placeholder="Enter password"
        linkText={"Forgot password"}
        linkHref={"forgot-password"}
      />
      <PrimaryButton label="Sign In" type="submit" />
      <AuthLabelGroup1
        text1={"Not a member?"}
        text2={"Create an account"}
        href="/auth/signup"
      />
    </form>
  );
};
