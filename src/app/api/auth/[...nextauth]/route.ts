import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/models/UserModel";
import { connect } from "@/db/config";
import { Account, User as AuthUser } from "next-auth";
const authOptions = {
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
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
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
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              avatarUrl: user.image,
              provider: account.provider,
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

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
