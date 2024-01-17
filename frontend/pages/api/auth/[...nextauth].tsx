import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token.access_token) {
        session.access_token = token.access_token as string;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
