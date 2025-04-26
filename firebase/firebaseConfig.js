// Mengimpor modul Firebase yang diperlukan
import { initializeApp } from "firebase/app";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor aplikasi Firebase
export default app;
