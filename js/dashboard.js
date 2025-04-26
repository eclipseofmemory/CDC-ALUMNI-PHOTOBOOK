// Mengimpor modul Firebase dari SDK Modular
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig.js";

// Inisialisasi Firebase App dan Firestore
const db = getFirestore();

// Referensi ke elemen
const studentsList = document.getElementById('studentsList');
const addStudentBtn = document.getElementById('addStudentBtn');

// Fungsi untuk mengambil dan menampilkan daftar siswa
async function loadStudents() {
  try {
    const snapshot = await getDocs(collection(db, 'students'));
    snapshot.forEach((doc) => {
      const student = doc.data();

      // Membuat elemen untuk card siswa
      const studentCard = document.createElement('div');
      studentCard.classList.add('student-card');

      // Menambahkan foto
      const img = document.createElement('img');
      img.src = student.photoUrl; // Foto dari Firestore
      img.alt = student.name;
      studentCard.appendChild(img);

      // Menambahkan nama dan informasi siswa
      const name = document.createElement('h3');
      name.textContent = student.name;
      studentCard.appendChild(name);

      const info = document.createElement('p');
      info.textContent = `Kelas: ${student.class} | Sekolah: ${student.school} | Kota: ${student.city}`;
      studentCard.appendChild(info);

      // Menambahkan tombol edit atau lihat detail
      const button = document.createElement('button');
      button.textContent = 'Lihat Detail';
      studentCard.appendChild(button);

      // Menambahkan card ke dalam daftar
      studentsList.appendChild(studentCard);
    });
  } catch (error) {
    console.error("Error fetching students:", error);
  }
}

// Menambahkan event listener untuk tombol tambah siswa
addStudentBtn.addEventListener('click', () => {
  window.location.href = "add-student.html";
});

// Memuat data siswa ketika halaman dimuat
loadStudents();
