import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import { Adapter } from "@auth/core/adapters";

const AUTH_GITHUB_ID = process.env.AUTH_GITHUB_ID;
const AUTH_GITHUB_SECRET = process.env.AUTH_GITHUB_SECRET;

if (!AUTH_GITHUB_ID || !AUTH_GITHUB_SECRET) {
  throw new Error("missing sth");
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GitHub
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
});
