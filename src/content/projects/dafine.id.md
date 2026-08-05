---
title: "dafine"
tagline: "Data Cleaning & Analitik Mandiri Berbasis AI"
projectSlug: "dafine"
lang: "id"
year: "2026"
status: "In Progress"
techStack: ["FastAPI", "DuckDB", "OpenRouter AI", "Supabase", "Vanilla JS"]
order: 2
---

## Umum

### Masalah

Analis data dan tim bisnis sering menerima dataset mentah yang penuh ketidakkonsistenan: nilai kosong (missing values), baris duplikat, penulisan huruf yang tidak seragam, spasi berlebih, hingga outlier. Membersihkan data ini secara manual di spreadsheet membutuhkan waktu lama, rawan kesalahan, dan tidak skalabel. Solusi yang sudah ada umumnya mensyaratkan keahlian teknis, atau menggunakan pendekatan black-box tanpa transparansi.

### Pengguna

Analis data, tim business intelligence (BI), profesional bisnis non-teknis, dan manajer produk.

### Solusi

Dafine (Data Refine) adalah aplikasi web berbasis AI untuk data cleaning dan analitik mandiri (self-service analytics). Pengguna cukup mengunggah file data mentah, lalu sistem secara otomatis melakukan profiling setiap kolom, memilih strategi pembersihan yang tepat, membangkitkan SQL via AI, dan mengembalikan file yang sudah bersih — tanpa perlu menulis satu baris kode pun.

### Fitur Utama

- **Deep Profiling Otomatis** — Analisis statistik per kolom mencakup skewness, IQR, kuartil, deteksi outlier, inferensi kategorikal, dan pemeriksaan kualitas string — semuanya dihitung sebelum AI dilibatkan.
- **Imputasi NULL yang Cerdas** — Sistem memilih strategi yang tepat per kolom secara otomatis: mean untuk distribusi simetris, median untuk distribusi yang skewed, mode untuk kolom kategorikal atau numerik-kategorikal terselubung, dan forward-fill untuk data time-series.
- **SQL Cleaning Berbasis AI** — Alih-alih mengirimkan data mentah ke AI, Dafine mengirimkan instruksi yang sudah dihitung. Tugas AI semata-mata adalah menghasilkan SQL DuckDB yang benar secara sintaksis — menjadikan hasilnya dapat diaudit dan konsisten.
- **Chart Builder Interaktif** — Halaman dashboard memungkinkan pengguna membangun chart dari data yang sudah bersih dengan filter, sorting, Top N, Group By, dan multiple metrics — tanpa perlu pengetahuan SQL.

### Tantangan

Memvalidasi keamanan eksekusi SQL yang dihasilkan oleh AI, memastikan instance DuckDB in-memory tetap efisien saat diakses secara bersamaan, dan mengenkripsi API key pengguna secara aman.

### Dampak

- **Tanpa kode sama sekali** — siapa pun dapat membersihkan dataset tanpa pengetahuan SQL atau Python.
- **Sepenuhnya dapat diaudit** — setiap sesi cleaning menyimpan SQL persis yang dieksekusi beserta reasoning AI-nya.
- **Berbasis statistik** — keputusan cleaning diturunkan dari statistik yang dihitung, bukan tebakan AI.

## Teknis

### Penjelasan

Dafine membagi beban kerja antara frontend yang interaktif dan backend Python berkinerja tinggi. Database DuckDB in-memory memproses dataset secara dinamis, dengan metadata yang disimpan di database Supabase PostgreSQL.

### Arsitektur

1. **Upload & Parsing File** — Pengguna mengunggah file CSV, Parquet, XLSX, XLS, atau SQLite. Backend memuatnya ke instance DuckDB in-memory sebagai view `source_table`. *(FastAPI + DuckDB)*
2. **Deep Statistical Profiling** — Setiap kolom dianalisis: persentase null, jumlah nilai unik, skewness, IQR, deteksi outlier Tukey's fences. Strategi imputasi (mean, median, mode, forward-fill, atau konstanta) dipilih otomatis per kolom. *(DuckDB + Python)*
3. **Prompt Engineering & AI SQL Generation** — Hasil profiling diterjemahkan menjadi instruksi SQL eksplisit per kolom. AI menerima ringkasan terstruktur untuk menghasilkan satu pernyataan `CREATE TABLE cleaned_table AS ...` yang kompatibel dengan DuckDB. *(Python + OpenRouter API)*
4. **Eksekusi SQL & Export** — SQL yang dihasilkan disanitasi, dieksekusi di DuckDB, dan hasilnya diekspor kembali ke format file asal pengguna. *(DuckDB)*

### Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript, Tailwind CSS, Chart.js
- **Backend Framework**: FastAPI (Python)
- **Pemrosesan Data**: DuckDB (in-memory)
- **Database & Autentikasi**: Supabase PostgreSQL & Supabase Auth
- **Penyimpanan**: Supabase Object Storage (Parquet exports)
- **Model AI**: OpenRouter API (Gemini/Claude/GPT)

### Sumber Data

- Upload file CSV, Parquet, dan Excel (.xlsx, .xls)
- Database SQLite (.sqlite, .db)

### Struktur Repositori

- `frontend/` — Kode Single Page Application (HTML, CSS, JS)
- `backend/` — Kode aplikasi FastAPI
  - `data_profiler.py` — Logika kalkulasi statistik dan profiling DuckDB
  - `ai_cleaner.py` — Pengolah prompt dan integrasi API OpenRouter
  - `main.py` — Titik masuk server dan API endpoints
- `docker-compose.yml` — Konfigurasi kontainer untuk pengembangan lokal

### Fitur Teknis

- DuckDB in-memory session confinement per-request.
- Enkripsi AES-256-GCM untuk API key OpenRouter pengguna yang disimpan.
- Kalkulasi ulang Tukey's Fences pasca-cleaning untuk pelaporan outlier.

## Hasil

### Metrik Keberhasilan

- Transparansi **100%** di mana pengguna dapat melihat dan menyalin query SQL yang dieksekusi oleh AI.
- Kebocoran data mentah **0%** karena hanya metadata dan distribusi profil statistik yang dikirim ke LLM eksternal.
- Visualisasi analitik chart builder dimuat secara instan melalui query klien DuckDB.