import type { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID! || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET! || "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.AUTH_GITHUB_EXPIRES_IN!),
  },
  jwt: {
    maxAge: Number(process.env.AUTH_GITHUB_EXPIRES_IN!),
  },
  secret: process.env.AUTH_SECRET || "",
};
