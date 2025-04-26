const sheetID = '1v9BgMMHbQh5NnLa2OVjJ-KX99z9o2AD03IUGPYUA1ug';
const sheetName = 'Sheet1';
const url = `https://opensheet.elk.sh/${sheetID}/${sheetName}`;

let allStudents = [];

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    allStudents = data;
    populateFilters(data);
    renderCards(data);
  })
  .catch((error) => {
    console.error("Gagal mengambil data:", error);
  });

function populateFilters(data) {
  const kelasSet = new Set();
  const sekolahSet = new Set();
  const kotaSet = new Set();

  data.forEach(student => {
    kelasSet.add(student.class);
    sekolahSet.add(student.school);
    kotaSet.add(student.city);
  });

  fillSelect("filter-kelas", [...kelasSet]);
  fillSelect("filter-sekolah", [...sekolahSet]);
  fillSelect("filter-kota", [...kotaSet]);
}

function fillSelect(selectId, options) {
  const select = document.getElementById(selectId);
  options.sort().forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}

function applyFilters() {
  const search = document.getElementById("search").value.toLowerCase();
  const kelas = document.getElementById("filter-kelas").value;
  const sekolah = document.getElementById("filter-sekolah").value;
  const kota = document.getElementById("filter-kota").value;

  const filtered = allStudents.filter(student => {
    return (
      student.name.toLowerCase().includes(search) &&
      (kelas === "" || student.class === kelas) &&
      (sekolah === "" || student.school === sekolah) &&
      (kota === "" || student.city === kota)
    );
  });

  renderCards(filtered);
}

function renderCards(data) {
  const container = document.getElementById("daftar-alumni");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>Tidak ada data ditemukan.</p>";
    return;
  }

  data.forEach(student => {
    const card = document.createElement("div");
    card.className = "card";
    const photoUrl = `https://drive.google.com/uc?export=view&id=${student.photoUrl}`;
    card.innerHTML = `
      <img src="${photoUrl}" alt="${student.name}">
      <h3>${student.name}</h3>
      <p>${student.school}</p>
      <p>${student.class} - ${student.city}</p>
    `;
    container.appendChild(card);
  });
}
