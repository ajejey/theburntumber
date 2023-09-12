import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCMmnPFFCGYOy8dV0NhujHcrjmMbTaR9DQ",
    authDomain: "burntumber-33894.firebaseapp.com",
    projectId: "burntumber-33894",
    storageBucket: "burntumber-33894.appspot.com",
    messagingSenderId: "178237104616",
    appId: "1:178237104616:web:36fa3bfd49950155e2045d",
    measurementId: "G-CYFHGD0LQ8"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);