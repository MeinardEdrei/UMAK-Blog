import connectDB from "@/lib/db";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@/models/User';

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    await connectDB();
                    const { username, email, password } = credentials;

                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        return null;
                    }

                    const isValid = credentials.password === user.password;

                    if (!isValid) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60,
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            session.user.name = token.name; 
            session.user.email = token.email; 
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        }
    },
    debug: true,
    pages: {
        signIn: '/login',
        error: '/login',
    }
});

export { handler as GET, handler as POST };