import { getPlaiceholder } from "plaiceholder"

export async function getBase64(imageUrl) {
    try {
        const res = await fetch(imageUrl)

        if(!res.ok) {
            throw new Error('Could not fetch image')
        }

        const buffer = await res.arrayBuffer()
        const {base64} = await getPlaiceholder(Buffer.from(buffer))

        return base64

    } catch (error) {
        console.log("ERROR GETTING BASE64 ", error)
    }
}