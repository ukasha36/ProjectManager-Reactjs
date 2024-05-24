import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAj1y23pfrQSSDRY6soSfcR6RjFfvasEjg",
    authDomain: "project-manager-4c920.firebaseapp.com",
    projectId: "project-manager-4c920",
    storageBucket: "project-manager-4c920.appspot.com",
    messagingSenderId: "286598045072",
    appId: "1:286598045072:web:928b42251944081fb06715",
    measurementId: "G-D7TPXQ8P7Y"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const db = getFirestore(app);

export { app, auth ,  storage ,  db  };