// api/contact.js
// Serverless function di Vercel. Meneruskan pesan dari form kontak ke Discord
// lewat Webhook. Logic-nya sama seperti versi lama (Next.js), hanya dipindah
// ke plain JavaScript (CommonJS) supaya tidak butuh proses build.
//
// DISCORD_WEBHOOK_URL disimpan sebagai Environment Variable di Vercel,
// jadi tidak pernah terlihat oleh pengunjung web.

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { name, email, message, botcheck } = req.body || {};

    // 1. HONEYPOT: kalau field tersembunyi 'botcheck' terisi, anggap bot,
    //    diamkan saja (jangan kasih tahu bot bahwa ini terdeteksi)
    if (botcheck) {
      return res.status(200).json({ success: true, message: "Spam detected" });
    }

    // 2. VALIDASI INPUT
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const DISCORD_URL = process.env.DISCORD_WEBHOOK_URL;

    if (!DISCORD_URL) {
      console.error("Discord Webhook URL is missing (set DISCORD_WEBHOOK_URL in Vercel env vars)");
      return res.status(500).json({ success: false, error: "Server configuration error" });
    }

    // 3. KIRIM KE DISCORD DENGAN FORMAT EMBED (SAMA SEPERTI VERSI LAMA)
    const discordPayload = {
      embeds: [
        {
          title: `📩 Pesan Baru dari Portfolio`,
          color: 0x06b6d4, // Cyan, sesuai tema web
          fields: [
            { name: "Nama", value: `\`${name}\``, inline: true },
            { name: "Dari", value: `\`${email}\``, inline: true },
            {
              name: "Waktu",
              value: new Date().toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
                dateStyle: "medium",
                timeStyle: "short",
              }),
              inline: true,
            },
            { name: "Isi Pesan", value: message },
          ],
          footer: { text: "Michael's Portfolio Notification" },
        },
      ],
    };

    const response = await fetch(DISCORD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: "Sent to Discord" });
    } else {
      throw new Error("Discord API failed");
    }
  } catch (err) {
    console.error("Contact Error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};
