import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDBNvtwDemdxZ3hVpxTrANYxOJDmj_sRU",
  authDomain: "movies-app-react-2948e.firebaseapp.com",
  projectId: "movies-app-react-2948e",
  storageBucket: "movies-app-react-2948e.appspot.com",
  messagingSenderId: "56827172944",
  appId: "1:56827172944:web:740f52348af6a568e95955"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
export {db, auth, fire};