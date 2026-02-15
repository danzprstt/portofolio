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

    // Bagian dalam function getInfo() saat menampilkan data:
result.innerHTML = `
  <div class="card">
    <img src="${data.thumbnail}" alt="Thumbnail">
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 1rem; margin-bottom: 5px;">${data.title}</h3>
      <p style="color: #888; font-size: 0.85rem;">Oleh @${data.author}</p>
    </div>

    <div class="download-options">
      <button class="btn-dl btn-video" onclick="downloadMedia('${data.video}', 'video.mp4')">
        📥 Simpan Video (No WM)
      </button>
      <button class="btn-dl btn-music" onclick="downloadMedia('${data.music}', 'audio.mp3')">
        🎵 Simpan Musik (MP3)
      </button>
    </div>
  </div>
`;
;

  } catch (err) {
    result.innerHTML = "Terjadi kesalahan koneksi.";
  }
}

// Fungsi download universal agar file langsung terunduh, bukan terbuka di tab baru
async function downloadMedia(url, filename) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    // Fallback jika fetch blob gagal (biasanya karena CORS)
    window.open(url, '_blank');
  }
}
// Tambahkan ini di bagian paling bawah file script.js
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
  
  // Animasi Hamburger jadi X
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

