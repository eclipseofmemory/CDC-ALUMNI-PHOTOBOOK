const express = require("express"); // Mengimpor Express untuk membuat aplikasi server
const axios = require("axios");    // Mengimpor Axios untuk melakukan request HTTP
const path = require("path");


const app = express();  // Membuat instance aplikasi Express
const port = 3000;      // Menentukan port untuk server

const sheetID = '1v9BgMMHbQh5NnLa2OVjJ-KX99z9o2AD03IUGPYUA1ug'; // ID dari Google Sheets kamu
const sheetName = 'Sheet1';
const url = `https://opensheet.elk.sh/${sheetID}/${sheetName}`;

app.use(express.static(path.join(__dirname, "..")));

// Membuat endpoint untuk mengambil data dari Google Sheets
app.get("/api/students", async (req, res) => {
  try {
    const response = await axios.get(url);  // Mengambil data dari Google Sheets
    const data = response.data;             // Data yang diterima dari Google Sheets
    res.json(data);                         // Mengirimkan data ke frontend dalam format JSON
  } catch (error) {
    console.error("Gagal mengambil data:", error);  // Menangani error jika pengambilan data gagal
    res.status(500).send("Terjadi kesalahan saat mengambil data.");  // Menanggapi error dengan status 500
  }
});

// Menjalankan server pada port yang ditentukan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}/api/students`);
});
