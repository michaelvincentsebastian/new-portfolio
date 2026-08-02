# Portfolio — Vincent (Astro Edition)

Rebuild dari portfolio Next.js + TypeScript lama, dengan stack yang jauh lebih
sederhana: **Astro + Tailwind CSS**, hampir tanpa TypeScript, dan struktur
file yang rapi/tidak tersebar.

Situs ini **1 halaman scroll** (Home → Tech Stack → Projects → Experience →
Contact) dengan navigasi jump-link, ditambah halaman detail terpisah untuk
tiap project (`/projects/nama-project`). Tersedia dalam 2 bahasa: English
(`/en/`, default) dan Indonesia (`/id/`).

---

## 1. Menjalankan di komputer sendiri

Butuh [Node.js](https://nodejs.org) versi 22 ke atas.

```bash
npm install
npm run dev
```

Buka `http://localhost:4321` di browser. Setiap perubahan file otomatis ter-refresh.

Perintah lain:

```bash
npm run build     # build versi production ke folder dist/
npm run preview   # coba jalankan hasil build secara lokal
```

---

## 2. Struktur folder (di mana harus edit apa)

```
src/
├── content/projects/     ← 👉 TAMBAH/EDIT PROJECT DI SINI (file Markdown)
├── data/
│   ├── i18n.js            ← semua teks situs (EN & ID), termasuk timeline
│   │                         pengalaman, info kontak, nomor telepon, dst
│   ├── techstack.js        ← daftar tools/teknologi yang tampil di section
│   │                         Tech Stack
│   └── site.js             ← nama, link sosial media
├── components/            ← blok-blok UI (sidebar, kartu project, ikon)
├── components/sections/   ← 5 section homepage (Home, TechStack, dst)
├── layouts/BaseLayout.astro
├── pages/
│   ├── en/index.astro      ← halaman utama versi English
│   ├── id/index.astro      ← halaman utama versi Indonesia
│   └── [lang]/projects/[slug].astro  ← template halaman detail project
│                                        (1 file dipakai untuk semua project,
│                                        kedua bahasa)
└── content.config.ts      ← ⚠️ satu-satunya file "TypeScript". Isinya cuma
                               definisi skema data project. Jangan diedit
                               kecuali mau menambah field baru.
public/
├── images/                ← gambar/screenshot project & logo tech stack
└── resume.pdf             ← 👉 GANTI DENGAN RESUME ASLI ANDA
```

**Poin penting:** kecuali `content.config.ts`, Anda tidak akan menulis kode
TypeScript sama sekali untuk pekerjaan sehari-hari (nambah project, ganti
teks, ganti warna). Semua file `.astro` isinya HTML + sedikit JavaScript
biasa.

---

## 3. Cara menambah project baru

Ini bagian yang dulu paling bikin malas update — sekarang tinggal bikin 1
file Markdown baru per bahasa di `src/content/projects/`.

1. Duplikat salah satu file yang sudah ada, misalnya `futuramap.en.md`
2. Ganti nama file, contoh: `chatbot-project.en.md`
3. Isi bagian atas (frontmatter) di antara `---`:

```markdown
---
title: "Nama Project"
tagline: "Satu kalimat singkat tentang project ini"
projectSlug: "chatbot-project"   # dipakai di URL: /projects/chatbot-project
lang: "en"                        # "en" atau "id"
year: "2026"
status: "Completed"               # Completed | In Progress | Archived
techStack: ["Python", "n8n"]
cover: "/images/projects/cover.jpg"   # opsional, taruh gambarnya di public/images/projects/
github: "https://github.com/..."      # opsional
demo: "https://..."                    # opsional
order: 3                          # urutan tampil, angka kecil di atas
---

## Overview
Tulis penjelasan project di sini, bebas pakai Markdown biasa
(bisa **bold**, list, dst).

## The Problem
...

## How It Works
1. Langkah pertama
2. Langkah kedua

## Results
...
```

4. Buat juga versi bahasa satunya (`chatbot-project.id.md`) dengan
   `projectSlug` **yang sama persis**, supaya tombol ganti bahasa di halaman
   detail bisa saling terhubung. Kalau belum sempat menerjemahkan, boleh
   sementara isi versi ID dengan teks yang sama dulu.
5. Simpan file. Project baru otomatis muncul di homepage dan punya halaman
   detail sendiri — tidak perlu sentuh kode apa pun yang lain.

Judul section Markdown (`## Overview`, `## The Problem`, dst) bebas Anda
sesuaikan sendiri, tidak harus persis seperti contoh.

---

## 4. Cara ganti Resume

1. Siapkan file PDF resume Anda
2. Beri nama file **`resume.pdf`**
3. Timpa file `public/resume.pdf` yang ada (isinya sekarang cuma placeholder)
4. Selesai — tombol "Download Resume" otomatis membuka file yang baru

---

## 5. Cara edit teks, warna, dan pengalaman kerja

- **Teks apa pun di situs** (nama, deskripsi, label tombol, timeline
  pengalaman, nomor telepon, alamat): edit `src/data/i18n.js`. Cari teksnya
  (biasanya gampang ditemukan lewat Ctrl+F di editor Anda), ganti nilainya,
  simpan.
- **Daftar tech stack** (logo dan nama tools yang tampil di section Tech
  Stack): edit `src/data/techstack.js`.
- **Link media sosial**: edit `src/data/site.js`.
- **Warna tema** (aksen cyan, dsb): edit variabel CSS di
  `src/styles/global.css`, bagian `:root` (mode terang) dan `.dark` (mode
  gelap).

---

## 6. Setup form kontak (Web3Forms)

Form kontak memakai [Web3Forms](https://web3forms.com) — layanan gratis
yang mengirim isi form ke email Anda **tanpa perlu bikin backend/API route
sendiri**.

1. Buka https://web3forms.com, masukkan email Anda, dan dapatkan **Access
   Key** gratis (dikirim ke email, prosesnya instan)
2. Duplikat file `.env.example` di root project, ganti namanya jadi `.env`
3. Isi:
   ```
   PUBLIC_WEB3FORMS_KEY=isi-dengan-access-key-anda
   ```
4. Jalankan ulang `npm run dev` — form kontak sekarang aktif mengirim email

Saat deploy ke Vercel, environment variable ini perlu didaftarkan juga di
dashboard Vercel (caranya ada di bagian 7 di bawah).

---

## 7. Deploy ke Vercel

1. Push project ini ke repository GitHub baru (bisa timpa/replace repo lama,
   atau bikin repo baru — terserah Anda)
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → pilih repo
   tersebut
3. Vercel otomatis mendeteksi ini project Astro, tidak perlu ubah pengaturan
   build apa pun (defaultnya sudah benar: build command `astro build`,
   output directory `dist`)
4. Sebelum klik Deploy, buka bagian **Environment Variables**, tambahkan:
   - `PUBLIC_WEB3FORMS_KEY` → isi dengan access key dari langkah sebelumnya
5. Klik **Deploy**, tunggu selesai, situs langsung live

Setiap kali Anda `git push` perubahan baru (misalnya nambah project lewat
file Markdown), Vercel otomatis build ulang dan deploy versi terbaru — sama
seperti workflow lama Anda.

---

## 8. Apa yang berubah dari versi lama

| Versi Lama (Next.js + TS) | Versi Baru (Astro) |
|---|---|
| Data project: 1 file TypeScript ~600 baris, nested types dalam-dalam | Data project: 1 file Markdown per project/bahasa, isinya teks biasa |
| Navigasi antar "section" via state React (bukan URL asli) | 1 halaman scroll dengan jump-link asli (`#projects`, dst) — bisa di-bookmark/di-share |
| Detail project: bagian dari state yang sama | Halaman terpisah asli: `/en/projects/nama-project` |
| Kontak: API route custom + kirim email server-side | Form langsung ke Web3Forms, tanpa server sendiri |
| Animasi: Framer Motion (stagger, spring, dst) | CSS animation sederhana (fade-up), tetap halus tanpa JS berat |
| Wajib paham TypeScript untuk update sehari-hari | Update sehari-hari = edit file Markdown/JS biasa. TypeScript cuma ada di 1 file setup yang jarang disentuh |

Beberapa hal yang **tidak dipertahankan** karena butuh library berat yang
justru menambah kerumitan (sesuai kesepakatan): partikel background custom,
animasi stagger/spring ala Framer Motion, dan API route contact-form custom
(diganti Web3Forms yang lebih simpel).
