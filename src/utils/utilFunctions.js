import { storage } from '@/utils/firebaseConfig'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

// export const convertToWebP = async (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//             const img = new Image();
//             img.src = reader.result;
//             img.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');
//                 canvas.width = img.width;
//                 canvas.height = img.height;
//                 ctx.drawImage(img, 0, 0);
//                 canvas.toBlob((blob) => {
//                     resolve(new File([blob], `${file.name}.webp`, { type: 'image/webp' }));
//                 }, 'image/webp', 0.7);
//             };
//         };
//         reader.onerror = (error) => {
//             reject(error);
//         };
//     });
// };

export function convertToWebP(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const width = img.width;
                const height = img.height;
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    resolve({ width, height, blob });
                }, "image/webp");
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

export async function uploadToFireBase(file) {
    try {
        const storageRef = ref(getStorage(), `${process.env.NEXT_PUBLIC_FIREBASE_FOLDER}` + file.name)
        const snapshot = await uploadBytes(storageRef, file)
        const url = await getDownloadURL(snapshot.ref)
        console.log("Successfully uploaded to Firebase ", url)
        return url
    } catch (error) {
        console.log("ERROR UPLOADING TO FIREBASE ", error)
    }
}

export function convertSpacesToDashes(string) {
    return string.replace(/\s+/g, '-');
}

export function convertDashesToSpaces(string) {
    return string.replace(/-/g, ' ');
}

// export async function getBase64(imageUrl) {
//     try {
//         const res = await fetch(imageUrl)

//         if(!res.ok) {
//             throw new Error('Could not fetch image')
//         }

//         const buffer = await res.arrayBuffer()
//         const {base64} = await getPlaiceholder(Buffer.from(buffer))

//         return base64

//     } catch (error) {
//         console.log("ERROR GETTING BASE64 ", error)
//     }
// }

