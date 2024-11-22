import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/models/UserModel";
import { connect } from "@/db/config";
export const authOptions = {
  // Configure one or more authentication providers
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
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
