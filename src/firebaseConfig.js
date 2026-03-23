
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDgUBWnPvwtiYILQdVXVkBXJcwMwIpiLfU",
  authDomain: "product-showcase-e8e37.firebaseapp.com",
  projectId: "product-showcase-e8e37",
  storageBucket: "product-showcase-e8e37.firebasestorage.app",
  messagingSenderId: "191653097439",
  appId: "1:191653097439:web:f5925b0e3f73624d34de6a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }

