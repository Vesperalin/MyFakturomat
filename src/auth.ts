import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';

// TODO add logging with email and password
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  // asynchronous functions you can use to control what happens when an action is performed
  callbacks: {
    async session({ session, token }) {
      if (session.user && token && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
  },
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'auto',
    brandColor: '#1a6ef4',
  },
};
