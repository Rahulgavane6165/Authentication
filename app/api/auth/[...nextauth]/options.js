import credentialsProvider from "./credentialsProvider";
import githubProvider from "./githubProvider";
import googleProvider from "./googleProvider";

export const options = {
  providers: [credentialsProvider, githubProvider, googleProvider],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },

  callbacks: {
    async signOut({ url, baseUrl }) {
      return baseUrl 
    },
    
    async jwt({ token, user, remember, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.group = user.group;
        token.acces_type = user.access_type;
        token.usertype = user.usertype
       
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
           
      }
      return session;
    },
  },
};
