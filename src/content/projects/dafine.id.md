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

## Gambaran Umum

Dafine (Data Refine) adalah aplikasi web berbasis AI untuk data cleaning dan analitik mandiri (self-service analytics). Pengguna cukup mengunggah file data mentah, lalu sistem secara otomatis melakukan profiling setiap kolom, memilih strategi pembersihan yang tepat, membangkitkan SQL via AI, dan mengembalikan file yang sudah bersih — tanpa perlu menulis satu baris kode pun.

## Masalah yang Dihadapi

Analis data dan tim bisnis sering menerima dataset mentah yang penuh ketidakkonsistenan: nilai kosong (missing values), baris duplikat, penulisan huruf yang tidak seragam, spasi berlebih, hingga outlier. Membersihkan data ini secara manual di spreadsheet membutuhkan waktu lama, rawan kesalahan, dan tidak skalabel. Solusi yang sudah ada di pasaran umumnya mensyaratkan keahlian teknis, atau menggunakan pendekatan black-box tanpa transparansi — pengguna tidak tahu persis apa yang diubah dan mengapa.

## Peran & Tanggung Jawab

Sebagai Sole Developer (Full-Stack & Data Engineering):

- Merancang dan membangun seluruh pipeline dari ingestion file hingga pengiriman file yang sudah dibersihkan
- Membangun mesin deep statistical profiling (skewness, IQR, Tukey's fences, seleksi strategi imputasi mean/median/mode)
- Merancang sistem prompt engineering yang mengkodekan seluruh keputusan cleaning sebagai instruksi SQL eksplisit sebelum dikirim ke AI
- Membangun lapisan autentikasi dan keamanan (Argon2id, AES-256-GCM, JWT HS256)
- Merancang skema Supabase dan arsitektur penyimpanan berbasis Parquet
- Membangun frontend dari nol menggunakan Vanilla JS, Tailwind CSS, dan Chart.js

## Cara Kerja

1. **Upload & Parsing File** — Pengguna mengunggah file CSV, Parquet, XLSX, XLS, atau SQLite. Backend memuatnya ke instance DuckDB in-memory sebagai view `source_table`. *(FastAPI + DuckDB)*
2. **Deep Statistical Profiling** — Setiap kolom dianalisis: persentase null, jumlah nilai unik, skewness, IQR, deteksi outlier Tukey's fences, deteksi kolom kategorikal, mixed casing, whitespace, dan kolom teks panjang. Strategi imputasi (mean, median, mode, forward-fill, atau konstanta) dipilih otomatis per kolom berdasarkan karakteristik statistiknya. *(DuckDB + Python)*
3. **Prompt Engineering** — Hasil profiling diterjemahkan menjadi instruksi SQL eksplisit per kolom. AI menerima ringkasan terstruktur — bukan data mentah — yang sudah berisi nilai fill dan aturan transformasi yang telah dihitung. *(Python)*
4. **Pembangkitan SQL via AI** — Model AI menghasilkan satu pernyataan `CREATE TABLE cleaned_table AS ...` yang kompatibel dengan DuckDB sesuai instruksi yang diberikan. *(OpenRouter API)*
5. **Eksekusi SQL & Export** — SQL yang dihasilkan disanitasi, dieksekusi di DuckDB, dan hasilnya diekspor kembali ke format file asal pengguna. *(DuckDB)*
6. **Laporan Outlier Pasca-Cleaning** — Deteksi outlier berbasis IQR dijalankan ulang pada tabel yang sudah dibersihkan dan hasilnya dikembalikan ke frontend sebagai laporan terstruktur. *(DuckDB)*
7. **Riwayat & Penyimpanan** — File hasil cleaning disimpan dalam format Parquet di Supabase Storage. Metadata, SQL yang dibangkitkan AI, reasoning, dan konteks kolom disimpan di Supabase PostgreSQL. *(Supabase)*
8. **Analitik Mandiri** — Pengguna dapat memvisualisasikan data yang sudah bersih melalui chart builder interaktif dengan fitur filter, sorting, Top N, Group By, dan multiple metrics — didukung Chart.js. *(Vanilla JS + Chart.js)*

## Fitur Utama

- **Deep Profiling Otomatis** — Analisis statistik per kolom mencakup skewness, IQR, kuartil, deteksi outlier, inferensi kategorikal, dan pemeriksaan kualitas string — semuanya dihitung sebelum AI dilibatkan.
- **Imputasi NULL yang Cerdas** — Sistem memilih strategi yang tepat per kolom secara otomatis: mean untuk distribusi simetris, median untuk distribusi yang skewed, mode untuk kolom kategorikal atau numerik-kategorikal terselubung, dan forward-fill untuk data time-series.
- **SQL Cleaning Berbasis AI** — Alih-alih mengirimkan data mentah ke AI, Dafine mengirimkan instruksi yang sudah dihitung. Tugas AI semata-mata adalah menghasilkan SQL DuckDB yang benar secara sintaksis — menjadikan hasilnya dapat diaudit dan konsisten.
- **Dukungan Multi-Format** — Menerima CSV, Parquet, XLSX, XLS, dan SQLite. Output yang sudah dibersihkan dikembalikan dalam format yang sama.
- **Transparansi Outlier** — Laporan outlier pasca-cleaning menampilkan batas Q1/Q3/IQR dan sampel nilai yang terdeteksi per kolom numerik, sehingga pengguna mengetahui persis kondisi data yang tersisa.
- **Riwayat Cleaning & Re-download** — Setiap sesi cleaning tersimpan beserta SQL AI, reasoning, dan file output-nya. Pengguna dapat meninjau riwayat dan mengunduh ulang file kapan saja.
- **Chart Builder Interaktif** — Halaman dashboard memungkinkan pengguna membangun chart dari data yang sudah bersih dengan filter, sorting, Top N, Group By, dan multiple metrics — tanpa perlu pengetahuan SQL.
- **API Key Per Pengguna** — Setiap pengguna menyediakan OpenRouter API key miliknya sendiri, disimpan terenkripsi (AES-256-GCM) di sisi server. Tidak ada kuota API yang dibagi bersama.

## Arsitektur Teknis

- **Frontend** — Vanilla HTML/CSS/JS dengan Tailwind CSS, di-host di Vercel. URL API diselesaikan secara dinamis antara lingkungan production dan preview deployment.
- **Backend** — FastAPI (Python), di-host di Railway. Logika bisnis dipisah secara ketat: profiling di `data_profiler`, AI di `ai_cleaner`, penyimpanan di `storage_helper`.
- **Pemrosesan Data** — DuckDB berjalan sepenuhnya in-request (tidak ada engine persisten). Seluruh profiling dan eksekusi SQL terjadi dalam instance in-memory yang bersifat ephemeral per request.
- **Penyimpanan** — Supabase PostgreSQL untuk metadata; Supabase Storage untuk file Parquet hasil cleaning.
- **Keamanan** — Argon2id untuk hashing password, AES-256-GCM untuk enkripsi API key, JWT HS256 untuk session token. Semua secrets hanya ada di environment variable.

## Hasil

Dafine mengompresi proses yang biasanya membutuhkan banyak langkah manual — profiling, pengambilan keputusan strategi imputasi, penulisan skrip cleaning, validasi output — menjadi satu kali upload file.

- **Tanpa kode sama sekali** — siapa pun dapat membersihkan dataset tanpa pengetahuan SQL atau Python
- **Sepenuhnya dapat diaudit** — setiap sesi cleaning menyimpan SQL persis yang dieksekusi beserta reasoning AI-nya
- **Berbasis statistik** — keputusan cleaning diturunkan dari statistik yang dihitung, bukan tebakan AI