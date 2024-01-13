import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6OhK42ocWZnsMzUENfFpK_XFqD0vhd2M",
  authDomain: "tpa-web-f66dc.firebaseapp.com",
  projectId: "tpa-web-f66dc",
  storageBucket: "tpa-web-f66dc.appspot.com",
  messagingSenderId: "124168094219",
  appId: "1:124168094219:web:75d4ec292e115f428afd0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);