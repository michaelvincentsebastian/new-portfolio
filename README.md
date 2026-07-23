# Portfolio — Michael Vincent Sebastian (versi sederhana)

Versi rebuild dari portfolio lama (Next.js + TypeScript) menjadi **HTML + CSS + JavaScript murni**.
Tidak ada `npm install`, tidak ada build step, tidak ada error compile. Edit file → save → upload.

## Struktur file

```
portfolio-simple/
├── index.html          <- semua konten teks ada di sini (1 halaman, 4 section)
├── css/style.css        <- semua warna & tampilan
├── js/main.js            <- animasi, dark/light toggle, form kontak
├── assets/images/        <- gambar project & ikon
└── README.md
```

## 1. Cara update konten (tanpa install apapun)

- **Ganti teks apa saja** (nama, deskripsi, dll) → buka `index.html`, cari teksnya, ganti, save.
- **Tambah project baru** → di `index.html`, cari komentar `CARA MENAMBAH PROJECT BARU`
  di bagian `<section id="projects">`. Copy 1 blok `<article class="project-card reveal">`, ganti isinya.
- **Ganti warna tema** → buka `css/style.css`, baris paling atas ada `:root { --accent: #06b6d4; ... }`.
  Ubah kode warnanya, seluruh web ikut berubah.
- **Ganti gambar** → taruh file baru di `assets/images/`, lalu ubah path `src="assets/images/..."` di `index.html`.

Setelah edit, langsung bisa dites dengan buka `index.html` di browser (double click), tidak butuh server.

## 2. Setup form kontak (Web3Forms, key disimpan aman di Vercel)

Form kontak butuh "Access Key" supaya bisa mengirim pesan ke email kamu. Key ini **tidak** ditaruh
di `index.html` — sengaja disimpan di server (lewat `api/contact.js`) supaya tidak terlihat oleh
pengunjung web.

1. Buka **https://web3forms.com**, masukkan email kamu → klik **Create Access Key**
2. Cek email kamu, salin Access Key yang dikirim
3. **Setelah** project di-deploy ke Vercel (lihat bagian 3 di bawah):
   - Buka dashboard project kamu di Vercel
   - Masuk ke **Settings → Environment Variables**
   - Tambahkan variable baru:
     - Name: `WEB3FORMS_ACCESS_KEY`
     - Value: (paste Access Key dari Web3Forms)
   - Klik **Save**
4. Buka tab **Deployments** → klik titik tiga (⋯) di deployment terakhir → **Redeploy**
   (supaya env var yang baru ditambahkan ikut terbaca)

Selesai — pesan dari form akan diproses lewat `/api/contact` (serverless function di folder `api/`),
baru diteruskan ke Web3Forms dengan key yang aman di server. Tidak ada database, tidak ada server
yang perlu kamu kelola sendiri — Vercel yang menjalankan fungsi ini otomatis saat ada submit.

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
| Data project: object TypeScript ~600 baris, dual-bahasa | 1 blok HTML per project, langsung terlihat & gampang diduplikasi |
| Contact form → API route custom → Discord webhook | Form → 1 serverless function kecil (`api/contact.js`) → Web3Forms, access key aman di Environment Variable |
| Nomor telepon ditampilkan publik | Dihapus. Kontak hanya lewat form & sosial media |
| Perlu `npm install`, build, deploy config | Tinggal buka file & edit, tidak ada proses build |

Section "Experience/Journey" dari versi lama sengaja tidak disertakan di sini karena tidak masuk
dalam 4 alur utama yang kamu minta (Home → Projects → Skills → Contact). Kalau nanti mau
ditambahkan kembali (misalnya sebagai sub-bagian di dalam "Home"), tinggal bilang saja.
