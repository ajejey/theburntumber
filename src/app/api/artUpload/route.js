import connect from "@/utils/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Artwork from "@/models/Artwork";
import User from "@/models/User";



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

        await newArtwork.save();

        await User.findOneAndUpdate(
            { _id: session.id }, 
            { $push: { "artistInfo.artworks": { $each: [newArtwork._id], $position: 0 } } }, // Use $push with $each and $position to add the new artwork's _id to the beginning of the array
            { new: true } // Set the `new` option to true to return the updated user object
          );

        return new Response(JSON.stringify(newArtwork), { status: 200 });


    } catch (error) {
        return new Response(error, { status: 500 });
    }
}

// Get all artworks
export const GET = async (request) => {
    const artworks = await Artwork.find()
    return new Response(JSON.stringify(artworks), { status: 200 })
}