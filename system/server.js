import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Membaca file statis langsung dari folder utama
app.use(express.static("."));

app.get("/api/info", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL kosong" });

  try {
    const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const result = await response.json();
    if (result.code !== 0) return res.status(400).json({ error: "Video tidak ditemukan" });
    
    const data = result.data;
    res.json({
      title: data.title,
      author: data.author.nickname,
      thumbnail: data.cover,
      video: data.play,
      music: data.music
    });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Tambahkan di bawah route TikTok yang lama
app.get("/api/ig", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL Instagram kosong" });

  try {
    // Menggunakan API publik Instagram Downloader (Contoh)
    const response = await fetch(`https://api.vreden.my.id/api/igdl?url=${encodeURIComponent(url)}`);
    const result = await response.json();

    if (result.status !== 200) return res.status(400).json({ error: "Gagal mengambil data Instagram" });
    
    // Sesuaikan mapping data dengan hasil API
    const data = result.result[0]; // Biasanya IG API kasih array karena bisa multi-post
    res.json({
      title: "Instagram Media",
      author: "Instagram User",
      thumbnail: data.thumbnail || data.url,
      video: data.url, // URL download-nya
      type: data.type // image atau video
    });
  } catch (e) {
    res.status(500).json({ error: "Server error saat akses IG API" });
  }
});

// Menangani halaman utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

export default app;
