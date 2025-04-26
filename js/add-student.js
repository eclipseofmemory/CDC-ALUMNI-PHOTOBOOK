// Mengimpor modul Firebase dari SDK Modular
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "./firebaseConfig.js";

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Fungsi untuk menampilkan toast
function showToast(message, success = true) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.backgroundColor = success ? "#4CAF50" : "#e53935";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Referensi ke form
const form = document.getElementById("studentForm");

// Fungsi submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const className = document.getElementById("class").value.trim();
  const school = document.getElementById("school").value.trim();
  const city = document.getElementById("city").value.trim();
  const photoFile = document.getElementById("photo").files[0];

  // Validasi field kosong
  if (!name || !className || !school || !city || !photoFile) {
    showToast("Harap lengkapi semua field dan unggah foto.", false);
    return;
  }

  // Lokasi penyimpanan file di Firebase Storage
  const photoRef = ref(storage, `students/${Date.now()}_${photoFile.name}`);

  try {
    // Upload file
    const snapshot = await uploadBytes(photoRef, photoFile);
    const photoUrl = await getDownloadURL(snapshot.ref);

    // Simpan ke Firestore
    await addDoc(collection(db, "students"), {
      name,
      class: className,
      school,
      city,
      photoUrl,
      createdAt: new Date()
    });

    showToast("✅ Siswa berhasil ditambahkan.");

    form.reset();

    // Redirect setelah 1.5 detik
    setTimeout(() => {
      window.location.href = "admin-dashboard.html";
    }, 1500);
  } catch (err) {
    console.error("❌ Gagal menambah siswa:", err);
    showToast("Terjadi kesalahan: " + err.message, false);
  }
});
