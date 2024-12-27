import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./app/lib/zod";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [

        GitHub(
            {clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),

        Credentials({
            credentials: {
                email: {label: "Email", type: "email", placeholder: "Email..."},
                password: {label: "Password", type: "password", placeholder: "Password"},
            } ,
            authorize: async (credentials) =>{
                let user = null
                const parseCredentials = signInSchema.safeParse(credentials)
                if (!parseCredentials.success) {
                    console.log("invalid credentials:", parseCredentials.error.errors)
                    return null
                }
                user = {
                    id: '1',
                    name: 'Louis',
                    email: 'louis@hotmail.com',
                    role: "user"
                }
                if (!user) {
                    console.log("Invalid credentials")
                    return null
                }  
                return user
            }
        })
    ],

    callbacks: {
        authorized({ request: {nextUrl}, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            const role = auth?.user.role || 'user'
            if (pathname.startsWith('/auth/signin') && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl))
            }
            if (pathname.startsWith('/page2') && role != "admin") {
                return Response.redirect(new URL('/', nextUrl))
            }
            return !!auth
        },

        jwt({ token, user }) {
            if (user) {
                token.id = user.id as string
                token.role = user.role as string
            }
            return token
        },

        session({ session, token }) {
            session.user.id = token.id
            session.user.role = token.role
            return session
        }
    },

    pages: {
        signIn: "/auth/signin"
    }
})