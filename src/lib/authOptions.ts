import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/models/UserModel";
import { connect } from "@/db/config";
import { Account, User as AuthUser, NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { ensureUniqueUsername } from "./helper/generateUsername";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "test" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials) return null;
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }
          const isPasswordValid = await user.comparePassword(
            credentials.password
          );
          if (isPasswordValid) {
            return {
              id: user._id.toString(),
              name: user.name || user.email,
              email: user.email,
            };
          }
          return null;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID! || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET! || "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 10 * 60,
  },
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: AuthUser | AdapterUser;
      account: Account | null;
    }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "github") {
        await connect();
        try {
          const existingUser = await User.findOne({
            email: user.email,
          });
          if (!existingUser) {
            const username = ensureUniqueUsername(user.name!);
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              avatarUrl: user.image,
              provider: account.provider,
              username,
            });
            await newUser.save();
            return true;
          }
          return true;
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : String(error)
          );
        }
      }
      return false;
    },
  },
};
