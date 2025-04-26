// Mengimpor modul Firebase yang diperlukan
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebaseConfig.js'; // Impor konfigurasi Firebase

// Inisialisasi Firebase Auth
const auth = getAuth(app);

// Login dengan email dan password
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'admin-dashboard.html'; // Redirect setelah login berhasil
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
