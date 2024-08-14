import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAyYV2zyx3B1KhB9QlhLWjVBpp31aMnXFw",
    authDomain: "proj-3ab96.firebaseapp.com",
    databaseURL: "https://proj-3ab96-default-rtdb.firebaseio.com",
    projectId: "proj-3ab96",
    storageBucket: "proj-3ab96.appspot.com",
    messagingSenderId: "810268257883",
    appId: "1:810268257883:web:f84c751a7a18a67920597e",
    measurementId: "G-QZ81TR6ZZN"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db };
export { auth };
