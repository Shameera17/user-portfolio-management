import React from "react";
import { GithubButton } from "../atoms/Button";
import { signIn } from "next-auth/react";
import { DividerWithText } from "../atoms/Separator";

export default function OAuthGroup() {
  return (
    <div className="flex flex-col gap-y-6 pb-6">
      <GithubButton
        label={"Sign in with GitHub"}
        onClick={() => signIn("github")}
      />
      <DividerWithText text={"or"} />
    </div>
  );
}
