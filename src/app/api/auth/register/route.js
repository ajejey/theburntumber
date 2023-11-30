import connect from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs"
import slugify from "slugify";


export const POST = async (request) => {
    const { fullName, email, password, confirmPassword } = await request.json();
    console.log(fullName, email, password, confirmPassword);
    try {
        await connect();
        console.log("CONNECTED TO DB");
    } catch (error) {
        console.log("ERROR CONNECTING TO DB", error);
    }

    // TODO: Add slugify https://www.npmjs.com/package/slugify
    // TODO: use a library to validate 
    if (!fullName || !email || !password || !confirmPassword) {
        console.log("All fields are required.");
        return new NextResponse("All fields are required.", { status: 400 });
    }
    if (password !== confirmPassword) {
        console.log("Passwords do not match.");
        return new NextResponse("Passwords do not match.", { status: 400 });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log("hashedPassword", hashedPassword);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("User already exists.");
        // check if googleId exists in existingUser
        if (existingUser.googleId) {
            return new NextResponse("User already signed up with Google, please sign in with Google.", { status: 400 });
        } else {
            return new NextResponse("User already exists.", { status: 400 });
        }
    }

    const slugFullName = slugify(fullName, { lower: true, remove: /[*+~.()'"!:@]/g });

    const phoneNo = Math.random().toString(36).substring(2, 10);

    const newUser = new User({ fullName, email, password: hashedPassword, slugFullName, phoneNo });

    try {
        await newUser.save();
        console.log("User has been created.", newUser);
        return new NextResponse("User has been created.", { status: 200 });
    } catch (error) {
        return new NextResponse(error, { status: 500 });
    }

}