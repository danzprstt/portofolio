const tools = [
    { name: 'TikTok Downloader', path: 'ttdl.html', cat: 'Downloader', desc: 'Video No Watermark & MP3' },
    { name: 'Instagram Downloader', path: 'igdl.html', cat: 'Downloader', desc: 'Reels, Video & Foto' },
    { name: 'Portofolio', path: 'https://danztech.vercel.app/portofolio.html', cat: 'Utility', desc: 'Lihat hasil karya saya' }
];

const toolsGrid = document.getElementById('toolsGrid');

// Fungsi Render dengan Animasi Staggered
function renderTools(data) {
    // Kosongkan grid terlebih dahulu agar animasi trigger ulang
    toolsGrid.innerHTML = ''; 
    
    data.forEach((tool, index) => {
        const card = document.createElement('a');
        card.href = tool.path;
        card.className = 'tool-card';
        
        // Menambahkan delay animasi berdasarkan urutan (index)
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h3>${tool.name}</h3>
            <p>${tool.desc}</p>
            <span style="display:inline-block; margin-top:15px; color:#00f2ea; font-size:0.8rem; font-weight:bold; letter-spacing:1px;">BUKA TOOLS →</span>
        `;
        
        toolsGrid.appendChild(card);
    });
}

// Fitur Filter Kategori
function filterByCat(cat, btn) {
    // Update UI Tombol
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-category'));
    btn.classList.add('active-category');
    
    // Filter Data
    const filteredData = (cat === 'All') 
        ? tools 
        : tools.filter(t => t.cat === cat);
    
    // Render ulang dengan animasi fresh
    renderTools(filteredData);
}

// Hamburger Menu (Identik dengan TTDL/IGDL)
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

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

// Jalankan pertama kali saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderTools(tools);
});
