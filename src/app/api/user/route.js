import connect from "@/utils/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";


export const GET = async (request) => {
    // Get user by ID
    console.log("INSIDE GET USER API")
    // const session = await getServerSession(authOptions)
    // console.log("Session", session)
    // if (!session) {
    //     console.log("Session not found")
    //     return new Response("Unauthorized", { status: 401 })
    // }

    await connect();

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    console.log("Params id", id)
    const slugFullName = url.searchParams.get("slugFullName");
    console.log("Params slugFullName", slugFullName)
    let user;
    if (id) {
        user = await User.findById(id, { password: 0 });
    } else if (slugFullName) {
        user = await User.findOne({ slugFullName }, { password: 0 });
    }
    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    // console.log("USER", user)
    return new Response(JSON.stringify(user), { status: 200 })

}