import connect from "@/utils/db"



export const POST = async(request) => {
    const postBody = await request.json()
    try {
        await connect();

    } catch (error) {
        
    }
}