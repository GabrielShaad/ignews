import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { query } from 'faunadb';

import { fauna } from '../../../services/fauna';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: { scope: 'read:user' },
      },
    }),
  ],
  jwt: {
    secret: process.env.JWT_KEY,
  },
  callbacks: {
    async signIn({ user }) {
      const { email } = user;

      try {
        await fauna.query(
          query.If(
            query.Not(
              query.Exists(
                query.Match(query.Index('user_by_email'), query.Casefold(email))
              )
            ),
            query.Create(query.Collection('users'), { data: { email } }),
            query.Get(
              query.Match(query.Index('user_by_email'), query.Casefold(email))
            )
          )
        );

        return true;
      } catch (error) {
        console.error(error);

        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
