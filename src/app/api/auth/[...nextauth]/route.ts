import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
console.log("test", {
  clientId: process.env.AUTH_GITHUB_ID!,
  clientSecret: process.env.AUTH_GITHUB_SECRET!,
});
export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
