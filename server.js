const express = require("express"); // Mengimpor Express untuk membuat aplikasi server
const axios = require("axios");    // Mengimpor Axios untuk melakukan request HTTP
const path = require("path");


const app = express();  // Membuat instance aplikasi Express
const PORT = process.env.PORT || 3000;


const sheetID = '1v9BgMMHbQh5NnLa2OVjJ-KX99z9o2AD03IUGPYUA1ug'; // ID dari Google Sheets kamu
const sheetName = 'Sheet1';
const url = `https://opensheet.elk.sh/${sheetID}/${sheetName}`;

app.use(express.static(__dirname));

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
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
