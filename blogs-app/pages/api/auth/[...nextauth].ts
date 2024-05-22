import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { UserProfile } from "@/utils/types";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubAuthProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubAuthProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/callback/github',
        }
      },
      async profile(profile) {
        //find out the user
        await dbConnect();

        const userProfile = {
          email: profile.email,
          name: profile.name || profile.login,
          provider: "github",
          avatar: profile.avatar_url,
          role: "user",
        };

        //store new user inside db
        try {
          const oldUser = await User.findOne({ email: profile.email });
          if (!oldUser) {
            const newUser = new User({
              ...userProfile,
              provider: "github",
            });
            await newUser.save();
          } else {
            userProfile.role = oldUser.role;
          }
        } catch (error) {
          console.log(error);
        }
        return { id: profile.id, ...userProfile };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      await dbConnect();

      const userProfile = {
        email: profile!.email,
        name: profile!.name || (profile! as any).login,
        provider: "github",
        avatar: (profile! as any).avatar_url,
        role: "user",
      };

      //store new user inside db
      try {
        const oldUser = await User.findOne({ email: profile!.email });
        if (!oldUser) {
          const newUser = new User({
            ...userProfile,
            provider: "github",
          });
          await newUser.save();
        } else {
          userProfile.role = oldUser.role;
        }
        (user as any).role = userProfile.role;
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session }) {
      await dbConnect();
      const user = await User.findOne({
        email: session.user?.email
      })
      if (user)
        session.user = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        } as UserProfile
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/404",
  }
};

export default NextAuth(authOptions);