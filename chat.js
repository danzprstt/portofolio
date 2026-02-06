export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: 'Pesan kosong' });
    }

    const prompt = `
Kamu adalah AI Assistant website portfolio.
Jawab dengan bahasa Indonesia yang ramah dan singkat.
`;

   const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt + '\n\nUser: ' + message }]
            }
          ]
        })
      }
    );

    const d = await r.json();

    res.status(200).json({
      reply:
        d.candidates?.[0]?.content?.parts?.[0]?.text ||
        'AI lagi sibuk, coba lagi ya 🙏'
    });

  } catch (e) {
    res.status(500).json({ reply: 'Server error' });
  }
}
