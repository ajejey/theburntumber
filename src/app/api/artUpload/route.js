import connect from "@/utils/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Artwork from "@/models/Artwork";



export const POST = async (request) => {
    const postBody = await request.json()
    try {
        const session = await getServerSession(authOptions)
        console.log("Session in artUpload POST", session)
        if (!session) {
            return new Response("Unauthorized", { status: 401 })
        }
        await connect();
        const newArtwork = new Artwork({
            name: postBody.name,
            description: postBody.description,
            images: postBody.firebaseUrls,
            artist: session.id,
            category: postBody.category,
            tags: postBody.tags,
            price: postBody.price,
            dimensions: {
                height: postBody.dimensions,
                width: postBody.dimensions,
            },
            medium: postBody.medium,
            inStock: true,
        })

        newArtwork.save();

        return new Response(JSON.stringify(newArtwork), { status: 200 });


    } catch (error) {
        return new Response(error, { status: 500 });
    }
}