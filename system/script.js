async function downloadMedia(fileUrl, authorName, extension) {
  try {
    // Memberitahu user proses download dimulai (opsional)
    console.log("Downloading...");
    
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Nama file jadi: nickname_tiktok.mp4 atau nickname_tiktok.mp3
    // .replace digunakan untuk menghapus spasi/karakter aneh agar aman di sistem file
    const safeAuthorName = authorName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${safeAuthorName}_tiktok.${extension}`;

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName; 
    document.body.appendChild(link);
    link.click();
    
    // Bersihkan
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Gagal download via Blob, buka tab baru:", error);
    window.open(fileUrl, '_blank');
  }
}

// 2. Fungsi Utama Ambil Info
async function getInfo() {
  const url = document.getElementById("urlInput").value;
  const result = document.getElementById("result");

  if (!url) return alert("Masukkan URL dulu!");

  result.innerHTML = `<div class="loading">Sedang memproses...</div>`;

  try {
    const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.error) {
      result.innerHTML = `<p style="color: #ff4444;">${data.error}</p>`;
      return;
    }

    // Tampilkan Card Hasil
    // Perhatikan: downloadMedia sekarang mengirim data.author juga
    result.innerHTML = `
      <div class="card">
        <img src="${data.thumbnail}" alt="Thumbnail">
        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 1rem; margin-bottom: 5px;">${data.title}</h3>
          <p style="color: #888; font-size: 0.85rem;">Oleh @${data.author}</p>
        </div>

        <div class="download-options">
          <button class="btn-dl btn-video" onclick="downloadMedia('${data.video}', '${data.author}', 'mp4')">
            📥 Simpan Video (No WM)
          </button>
          <button class="btn-dl btn-music" onclick="downloadMedia('${data.music}', '${data.author}', 'mp3')">
            🎵 Simpan Musik (MP3)
          </button>
        </div>
      </div>
    `;

  } catch (err) {
    result.innerHTML = "Terjadi kesalahan koneksi.";
  }
}

// Fungsi khusus untuk Instagram
async function getIgInfo() {
  const url = document.getElementById("urlInput").value;
  const result = document.getElementById("result");

  if (!url) return alert("Masukkan URL Instagram dulu!");

  result.innerHTML = `<div class="loading">Sedang memproses Instagram...</div>`;

  try {
    // Memanggil route API /api/ig yang kita buat di server.js
    const response = await fetch(`/api/ig?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.error) {
      result.innerHTML = `<p style="color: #ff4444;">${data.error}</p>`;
      return;
    }

    result.innerHTML = `
      <div class="card">
        <img src="${data.thumbnail}" alt="Thumbnail" style="border-radius: 10px; max-width: 100%;">
        <div style="margin-top: 15px; margin-bottom: 20px;">
          <h3 style="font-size: 1rem;">Instagram Media</h3>
          <p style="color: #888; font-size: 0.85rem;">Siap untuk diunduh</p>
        </div>

        <div class="download-options">
          <button class="btn-dl btn-video" onclick="downloadMedia('${data.video}', 'ig_download', 'mp4')">
            📥 Simpan ke Perangkat
          </button>
        </div>
      </div>
    `;

  } catch (err) {
    result.innerHTML = "Gagal terhubung ke server IGDL.";
  }
}



// 3. Script untuk Hamburger Menu (Tetap Sama)
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

if (menu) {
  menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
    
    const bars = document.querySelectorAll('.bar');
    if(menuLinks.classList.contains('active')) {
      bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }
  });
}

