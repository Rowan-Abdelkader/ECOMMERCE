import { jwtDecode } from "jwt-decode";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const response = await fetch(`${process.env.URL}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await response.json();

        if (payload.message === "success") {
          const { id } = jwtDecode(payload.token) as { id: string };
          return {
            id: id,
            user: payload.user,
            token: payload.token,
          };
        }
        throw new Error(payload.message || "failed to login");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      //server side
      if (user) {
        token.user = user?.user;
        token.token = user?.token;
      }

      return token;
    },

    //client side
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
