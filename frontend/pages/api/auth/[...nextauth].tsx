import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          username: profile.login,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token.access_token) {
        session.git_username = token.git_username as string;
        session.access_token = token.access_token as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.access_token = account.access_token;
        token.git_username = user.username;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
