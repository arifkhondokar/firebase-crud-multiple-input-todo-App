import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDlqBie4nQzPsKwb8V9kmZLrZbUvERaEUg",
  authDomain: "todoapp-37dc8.firebaseapp.com",
  projectId: "todoapp-37dc8",
  storageBucket: "todoapp-37dc8.appspot.com",
  messagingSenderId: "139662728790",
  appId: "1:139662728790:web:e14612c47f0402d69ca5f7"
};


const app = initializeApp(firebaseConfig);
export default firebaseConfig