// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAo6no8_I7cEKhNvCvbL54QnosDAlOLc7k",
  authDomain: "feedbackhub-leve-saude-550cc.firebaseapp.com",
  projectId: "feedbackhub-leve-saude-550cc",
  storageBucket: "feedbackhub-leve-saude-550cc.firebasestorage.app",
  messagingSenderId: "384666622820",
  appId: "1:384666622820:web:aed9c9981383a070f6b871"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
