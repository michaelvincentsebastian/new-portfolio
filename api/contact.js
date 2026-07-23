// api/contact.js
// Serverless function di Vercel. Access key TIDAK pernah dikirim ke browser —
// hanya dibaca dari Environment Variable di server Vercel.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, message, botcheck } = req.body || {};

    // Honeypot: kalau field tersembunyi ini terisi, anggap bot, diamkan saja
    if (botcheck) {
      return res.status(200).json({ success: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Semua field wajib diisi" });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY, // <- diambil dari Vercel Env Var
        subject: "Pesan baru dari Portfolio",
        name,
        email,
        message,
      }),
    });

    const data = await response.json();
    return res.status(response.ok ? 200 : 500).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Terjadi kesalahan di server" });
  }
}
