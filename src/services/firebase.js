// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn0MHcrmWsefyoIs5l1M1DNxKBl1N2CVo",
    authDomain: "questcms-5b454.firebaseapp.com",
    projectId: "questcms-5b454",
    storageBucket: "questcms-5b454.appspot.com",
    messagingSenderId: "101045111916",
    appId: "1:101045111916:web:b9879f2a21f1131a851c49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export default firestore;
