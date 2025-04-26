// Modular imports
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig.js"; // atau sesuaikan path-nya

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Ambil ID siswa dari URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Ambil data siswa dan tampilkan di form
const getStudentData = async () => {
  const docRef = doc(db, "students", studentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const student = docSnap.data();
    document.getElementById('name').value = student.name;
    document.getElementById('class').value = student.class;
    document.getElementById('school').value = student.school;
    document.getElementById('city').value = student.city;
  } else {
    alert("Data tidak ditemukan.");
  }
};

getStudentData();

// Menangani submit form
document.getElementById('studentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const studentClass = document.getElementById('class').value;
  const school = document.getElementById('school').value;
  const city = document.getElementById('city').value;
  const photoFile = document.getElementById('photo').files[0];

  const docRef = doc(db, "students", studentId);
  const updateData = { name, class: studentClass, school, city };

  try {
    if (photoFile) {
      const photoRef = ref(storage, 'student_photos/' + Date.now() + '_' + photoFile.name);
      const snapshot = await uploadBytes(photoRef, photoFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      updateData.photoUrl = downloadURL;
    }

    await updateDoc(docRef, updateData);
    alert("✅ Data siswa berhasil diperbarui!");
    window.location.href = 'admin-dashboard.html';

  } catch (err) {
    console.error("❌ Gagal memperbarui:", err);
    alert("Terjadi kesalahan: " + err.message);
  }
});
