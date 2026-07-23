# Portfolio — Michael Vincent Sebastian (versi sederhana)

Versi rebuild dari portfolio lama (Next.js + TypeScript) menjadi **HTML + CSS + JavaScript murni**.
Tidak ada `npm install`, tidak ada build step, tidak ada error compile. Edit file → save → upload.

## Struktur file

```
portfolio-simple/
├── index.html                    <- kerangka halaman (1 halaman, 4 section)
├── css/style.css                  <- semua warna & tampilan
├── js/main.js                      <- animasi, dark/light toggle, kirim form kontak
├── js/projects.js                   <- baca & render project dari content/projects
├── api/contact.js                    <- serverless function: forward pesan ke Discord
├── content/projects/*.md              <- 1 file = 1 project (INI YANG DIEDIT KALAU ADA PROJECT BARU)
├── content/projects/manifest.json      <- daftar urutan file project yang ditampilkan
├── assets/images/                       <- gambar project & ikon
├── package.json
└── README.md
```

## 1. Cara nambah/update project (tanpa sentuh HTML/CSS/JS)

Buka folder `content/projects/`. Tiap project itu 1 file `.md`, formatnya begini:

```markdown
---
title: Nama Project
status: done
tags: Python, Docker, PostgreSQL
image: assets/images/projects/nama-file.jpg
repo: https://github.com/username/repo
---
Deskripsi project kamu di sini, boleh 1-3 kalimat.
```

Keterangan tiap field:
- `status`: isi `done` kalau sudah selesai, atau `progress` kalau masih berjalan (badge di card berubah otomatis)
- `image`: kosongkan saja (`image:`) kalau belum ada gambar — card akan pakai background gradient
- `repo`: kosongkan saja (`repo:`) kalau belum ada link — tombol "Lihat Repo" otomatis hilang

**Langkah nambah project baru:**
1. Bikin file baru, misalnya `content/projects/project-baru.md`, isi seperti format di atas
2. Buka `content/projects/manifest.json`, tambahkan nama file itu ke dalam array:
   ```json
   ["futuramap.md", "prospecting-engine.md", "project-baru.md"]
   ```
3. Commit & push ke GitHub — selesai. Card baru otomatis muncul di web, urutannya sesuai urutan di manifest.json.

Tidak perlu install apapun, tidak perlu edit `index.html`, `css`, atau `js` sama sekali.

### Update konten lain

- **Ganti teks di luar project** (nama, intro, skill, dll) → buka `index.html`, cari teksnya, ganti, save.
- **Ganti warna tema** → buka `css/style.css`, baris paling atas ada `:root { --accent: #06b6d4; ... }`.

### Catatan soal tes di komputer sendiri

Karena `js/projects.js` mengambil file markdown lewat `fetch()`, membuka `index.html` dengan cara
**double-click langsung** tidak akan berhasil menampilkan project (browser memblokir `fetch` ke file
lokal karena alasan keamanan). Kalau mau tes dulu sebelum push, jalankan server lokal sederhana,
misalnya (butuh Node.js terpasang):
```
npx serve .
```
lalu buka alamat yang muncul di terminal (biasanya `http://localhost:3000`). Atau, cara paling
gampang: push saja ke GitHub, Vercel otomatis membuat **Preview Deployment** dengan URL sendiri
setiap kali kamu push — tes langsung di situ.

## 2. Setup form kontak (Discord Webhook, URL disimpan aman di Vercel)

Form kontak meneruskan pesan ke channel Discord kamu lewat Webhook. URL webhook **tidak** ditaruh
di `index.html` — disimpan di server (lewat `api/contact.js`) supaya tidak terlihat pengunjung.

1. Buka server Discord kamu → klik channel tujuan → **Edit Channel → Integrations → Webhooks → New Webhook**
2. Beri nama (misalnya "Portfolio Notification"), klik **Copy Webhook URL**
3. **Setelah** project di-deploy ke Vercel (lihat bagian 3 di bawah):
   - Buka dashboard project kamu di Vercel
   - Masuk ke **Settings → Environment Variables**
   - Tambahkan variable baru:
     - Name: `DISCORD_WEBHOOK_URL`
     - Value: (paste URL webhook dari Discord)
   - Klik **Save**
4. Buka tab **Deployments** → klik titik tiga (⋯) di deployment terakhir → **Redeploy**
   (supaya env var yang baru ditambahkan ikut terbaca)

Selesai — pesan dari form diproses lewat `/api/contact`, lalu dikirim ke Discord dalam format embed
rapi (nama, email, waktu WIB, isi pesan). Tidak ada database, tidak ada server yang perlu kamu kelola —
Vercel yang menjalankan fungsi ini otomatis tiap ada submit.

> Catatan keamanan: nomor telepon sudah dihapus dari web ini. Orang yang mau menghubungi kamu
> wajib lewat form ini atau media sosial yang kamu cantumkan.

## 3. Deploy ke Vercel (sampai bisa diakses publik)

Kamu tidak perlu install Node.js atau CLI apapun. Cukup akun GitHub + Vercel.

### Langkah A — Upload ke GitHub

1. Buka https://github.com → login
2. Klik **New repository** → beri nama misalnya `portfolio` → **Create repository**
3. Di halaman repo kosong itu, klik **uploading an existing file**
4. Drag semua isi folder `portfolio-simple` (index.html, css/, js/, assets/, README.md) ke halaman itu
5. Scroll ke bawah, klik **Commit changes**

*(Alternatif kalau kamu sudah biasa pakai Git di terminal: `git init`, `git add .`, `git commit -m "init"`, lalu push ke repo baru itu.)*

### Langkah B — Hubungkan ke Vercel

1. Buka https://vercel.com → login/signup pakai akun GitHub kamu (biar otomatis terhubung)
2. Di dashboard Vercel, klik **Add New... → Project**
3. Pilih repo `portfolio` yang tadi kamu upload → klik **Import**
4. Di halaman konfigurasi:
   - **Framework Preset**: pilih `Other` (karena ini HTML statis biasa, bukan Next.js/React)
   - **Build Command**: kosongkan
   - **Output Directory**: kosongkan / biarkan default
5. Klik **Deploy**

Tunggu ~30 detik, Vercel akan kasih tahu "Congratulations!" dengan link seperti
`https://portfolio-xxxx.vercel.app` — itu sudah bisa diakses siapa saja di internet.

### Langkah C — Update portfolio di kemudian hari

Setiap kali kamu mau update (misalnya nambah project baru progress):
1. Edit file di komputer kamu (`index.html`, dll)
2. Upload ulang / commit & push perubahan itu ke repo GitHub yang sama
   (bisa lewat halaman GitHub langsung: buka file → klik ikon pensil → edit → **Commit changes**)
3. Vercel otomatis mendeteksi perubahan dan re-deploy dalam hitungan detik — tidak perlu setting ulang apapun.

### (Opsional) Custom domain

Kalau kamu punya domain sendiri (misalnya `michaelvincent.dev`):
1. Di dashboard project Vercel → tab **Settings → Domains**
2. Masukkan domain kamu, ikuti instruksi untuk mengubah DNS record di penyedia domain kamu
3. Tunggu propagasi DNS (biasanya beberapa menit sampai 1 jam)

## 4. Apa yang berubah dari versi lama

| Sebelumnya | Sekarang |
|---|---|
| Next.js + TypeScript, per-halaman (home/techstack/dst terpisah) | 1 halaman HTML, scroll ke bawah, nav jadi anchor link |
| Data project: object TypeScript ~600 baris, dual-bahasa | 1 file Markdown per project di `content/projects/`, tinggal tambah file + 1 baris di manifest.json |
| Contact form → API route custom TypeScript → Discord webhook | Form → serverless function plain JS (`api/contact.js`) → Discord webhook, logic sama, webhook URL aman di Environment Variable |
| Nomor telepon ditampilkan publik | Dihapus. Kontak hanya lewat form & sosial media |
| Perlu `npm install`, build, deploy config | Tinggal buka file & edit, tidak ada proses build |

Section "Experience/Journey" dari versi lama sengaja tidak disertakan di sini karena tidak masuk
dalam 4 alur utama yang kamu minta (Home → Projects → Skills → Contact). Kalau nanti mau
ditambahkan kembali (misalnya sebagai sub-bagian di dalam "Home"), tinggal bilang saja.
