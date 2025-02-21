import { API_LOGIN_USER, API_REGISTRATION_USER } from "@/service/endpoint";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        let user = null;

        if (credentials?.Registration) {
          const { first_name, last_name, email, phone, password, address }: any = credentials;
          const res = await fetch(`${process.env.API_BASE_URL}/api/v1/${API_REGISTRATION_USER}`, {
            method: "POST",
            body: JSON.stringify({ first_name, last_name, email, phone, password, address }),
            headers: { "Content-Type": "application/json" },
          });

          const response = await res.json();

          if (res.ok && response) {
            user = response;
            return response;
          }
          return null;
        } else if (credentials?.Login) {
          const { email, password }: any = credentials;
          const res = await fetch(`${process.env.API_BASE_URL}/api/v1/${API_LOGIN_USER}`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          const response = await res.json();

          if (res.ok && response) {
            user = response;
            return response;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
