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

// Menangani halaman utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

export default app;
