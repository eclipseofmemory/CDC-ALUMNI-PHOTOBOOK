import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


// Konfigurasi Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyBS-kGqwEfmJyBThePAbsbQTZ6DmPTuDRM",
  authDomain: "cdcdisdiksulsel.firebaseapp.com",
  projectId: "cdcdisdiksulsel",
  storageBucket: "cdcdisdiksulsel.firebasestorage.app,
  messagingSenderId: "562294744066",
  appId: "1:562294744066:web:04aebeaaf6766ce650b31b",
  measurementId: "G-WHJS723DPZ"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // ✅ Diperlukan untuk Firebase Storage

export { storage };
