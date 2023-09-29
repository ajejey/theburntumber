import { storage } from '@/utils/firebaseConfig'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

export const convertToWebP = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    resolve(new File([blob], `${file.name}.webp`, { type: 'image/webp' }));
                }, 'image/webp', 0.7);
            };
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};

export async function uploadToFireBase(file) {
    console.log("FIREBASE_FOLDER ", process.env.FIREBASE_FOLDER)
    try {
      const storageRef = ref(getStorage(), `devArtImages/` + file.name)
      const snapshot = await uploadBytes(storageRef, file)
      const url = await getDownloadURL(snapshot.ref)
      console.log("Successfully uploaded to Firebase ", url)
      return url
    } catch (error) {
      console.log("ERROR UPLOADING TO FIREBASE ", error)
    }
}