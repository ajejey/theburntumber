import React from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

function useUploadToFireBase() {
  
    async function uploadToFireBase(file) {
        console.log("FIREBASE_FOLDER ", process.env.FIREBASE_FOLDER)
        try {
          const storageRef = ref(getStorage(), `${process.env.FIREBASE_FOLDER}` + file.name)
          const snapshot = await uploadBytes(storageRef, file)
          const url = await getDownloadURL(snapshot.ref)
          console.log("Successfully uploaded to Firebase ", url)
          return url
        } catch (error) {
          console.log("ERROR UPLOADING TO FIREBASE ", error)
        }
    }


    return uploadToFireBase
}

export default useUploadToFireBase