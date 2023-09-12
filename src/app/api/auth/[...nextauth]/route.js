import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/utils/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email:",
                    type: "text",
                    placeholder: "type email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials) {
                await connect()

                try {
                    const user = User.findOne({ email: credentials?.email })
                    if (user) {
                        const passwordMatch = await bcrypt.compare(credentials?.password, user.password)
                        if (passwordMatch) {
                            return user
                        } else {
                            throw new Error("Wrong password")
                        }
                    }
                } catch (error) {
                    throw new Error("Database error")
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        newUser: '/sign-up'
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            const user = token.user
            session.user = user
            return session
        }
    }
})

export { handler as GET, handler as POST }


// if (user.password === credentials?.password) {
//     return user
// } else {
//     throw new Error("Wrong password")
// }