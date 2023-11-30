import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/utils/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions = {
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
                    const user = await User.findOne({ email: credentials?.email })
                    if (user) {
                        console.log("USER FOUND IN DB", user)
                        const passwordMatch = await bcrypt.compare(credentials?.password, user.password)
                        if (passwordMatch) {
                            console.log("PASSWORDS MATCH")
                            return user
                        } else {
                            console.log("PASSWORDS DO NOT MATCH")
                            throw new Error("Wrong password")
                        }
                    }
                } catch (error) {
                    console.log("ERROR", error)
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
        async signIn({ account, profile }) {
            // console.log("INSIDE SIGN IN CALLBACK", account, profile);
            if (account.provider === "google") {
                const email = profile.email;
                const googleId = profile.sub;
                await connect();
                const existingUser = await User.findOne({ email: email });
                if (existingUser) {
                    // update existingUser with googleId
                    await User.findOneAndUpdate({ email: email }, { googleId: googleId });
                } else {
                    // create new user with googleId
                    const newUser = new User({
                        fullName: profile.name,
                        email: email,
                        googleId: googleId,
                        image: profile.picture
                    })
                    await newUser.save();
                }
            }
            return true
        },
        async jwt({ token }) {
            // console.log("INSIDE JWT Callback", token);
            const email = token.email;
            const googleId = token.sub;
            await connect();
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                token.id = existingUser._id;
                token.googleId = googleId;
                token.fullName = existingUser.fullName;
                token.image = existingUser.image;
            }
            // console.log("Final TOken ", token);
            return token;
        },
        session: async ({ session, token }) => {
            // console.log("INSIDE SESSION CALLBACK", session, token);
            // const user = token.user;
            // session.user = user;
            return token;
        },
    },
    database: process.env.DATABASE_URL
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
