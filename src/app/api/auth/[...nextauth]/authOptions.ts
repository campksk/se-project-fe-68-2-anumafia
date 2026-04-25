import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@provider.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        
        const user = await userLogIn(credentials.email, credentials.password);
        
        if (user && user.token) {
          const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
          const profileRes = await fetch(`${backendUrl}/api/v1/auth/me`, {
            method: "GET",
            headers: { authorization: `Bearer ${user.token}` }
          });
          
          const profile = await profileRes.json();
          
          if (profile.success) {
            return {
              _id: profile.data._id,
              name: profile.data.name,
              email: profile.data.email,
              role: profile.data.role, 
              token: user.token
            } as any;
          }
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }: { session: any, token: any, user: any }) {
      session.user = token as any; 
      return session;
    }
  }
};