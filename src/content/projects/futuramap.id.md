---
title: "FuturaMap"
tagline: "Platform Analitik Siswa Berbasis Data dan AI untuk Kesiapan Kuliah"
projectSlug: "futuramap"
lang: "id"
year: "2026"
status: "Completed"
techStack: ["DuckDB", "SQLMesh", "MinIO", "PostgreSQL", "Python", "Flask", "Docker", "Ollama"]
cover: "/images/projects/futuramap/futuramap-tryout-1.jpg"
order: 1
---

## Umum

### Masalah

Siswa sering tidak tahu seberapa besar *gap* skor mereka dibandingkan standar SNBT (seleksi nasional masuk perguruan tinggi) untuk jurusan impian, dan hasil tes minat karir mereka cenderung berubah-ubah. Di sisi lain, Guru BK kesulitan memantau siswa yang performanya menurun secara real-time karena data nilai tersebar di berbagai guru mata pelajaran, menyebabkan keterlambatan intervensi.

### Pengguna

Siswa sekolah menengah, guru BK (Bimbingan Konseling), dan penasihat akademik.

### Solusi

FuturaMap merupakan platform "Data as a Product" yang dibangun di atas arsitektur Data Lakehouse modern, memisahkan layer penyimpanan dan komputasi. Platform ini mengkonsumsi data dari LMS Andalan School dan katalog kursus online, memprosesnya melalui pipeline Medallion (Bronze → Silver → Gold) menggunakan SQLMesh dan DuckDB, lalu menyajikan analitik kesiapan kuliah lewat Flask REST API — didukung AI lokal (Ollama) untuk rekomendasi kursus secara semantik.

### Fitur Utama

- **Tryout Alert System** — Memantau tren nilai lewat regression; mengirim email otomatis ke Guru BK saat performa siswa menurun.
- **Student Profiling Hub** — Dasbor terpadu berisi identitas, target jurusan/kampus, minimal skor, kompetisi pendaftar, dan hasil tes minat karir.
- **SNBT Gap Analysis** — Grafik tren, progress bar terhadap skor target, estimasi sisa tryout, dan fitur review soal salah.
- **Rekomendasi Kursus berbasis AI** — Small language model lokal mencocokkan profil minat karir siswa dengan katalog kursus secara semantik.

### Tantangan

Menormalisasi dan membersihkan data LMS yang kotor, melakukan parsing HTML soal tryout yang kompleks dalam skala besar, serta menjalankan model bahasa AI secara lokal di perangkat komputasi standar sekolah.

### Dampak

- **100%** otomatisasi pipeline data, diorkestrasi andal secara harian.
- **Bebas biaya** API cloud AI dengan menjalankan inferensi bahasa secara lokal.
- Sistem peringatan dini berhasil membantu Guru BK mendeteksi penurunan nilai siswa untuk intervensi konseling yang tepat waktu.

## Teknis

### Penjelasan

FuturaMap menerapkan arsitektur Data Lakehouse yang terpisah. Data mentah diekstrak dan disimpan di MinIO, ditransformasikan secara bertahap menggunakan SQLMesh dengan mesin DuckDB, dan disajikan melalui REST API berbasis Flask.

### Arsitektur

1. **Bronze (Ingestion)** — Ekstraksi data mentah secara aman dari database LMS dan dataset kursus online. *(Python)*
2. **Silver (Processing)** — Filtrasi, standarisasi, penanganan NULL, dan parsing HTML dengan BeautifulSoup via SQLMesh Python model. *(SQLMesh + DuckDB)*
3. **Gold (Analytics)** — Penggabungan data bersih dan penerapan `REGR_SLOPE` untuk menghitung arah tren nilai. *(SQLMesh + Postgres)*
4. **Data Serving** — Backend Flask menyajikan data siap pakai (profil, gap analysis, tren) ke frontend. *(Flask REST API + Ollama)*

### Tech Stack

- **Pemrosesan Data**: DuckDB, SQLMesh, DuckLake
- **Object Storage**: MinIO (S3-compatible)
- **Database (Metadata & Serving)**: PostgreSQL
- **Backend API**: Flask (Python)
- **Model LLM Lokal**: Ollama (SmolLM2 1.7B)
- **Otomasi & Kontainer**: Docker, Python scheduler

### Sumber Data

- Dump basis data OLTP LMS sekolah (MySQL/PostgreSQL)
- Scraping katalog materi kursus online
- Lembar jawaban tryout ujian siswa

### Struktur Repositori

- `lakehouse/` — Proyek SQLMesh untuk model transformasi data
- `api/` — Server Flask REST API untuk layanan data dan model Ollama
- `agent/` — Skrip agen orkestrasi otomatis dan bot notifikasi Telegram
- `docker-compose.yml` — Konfigurasi deploy lokal (MinIO, Postgres, Ollama)

### Fitur Teknis

- Perhitungan regresi linear tren nilai dengan rumus `REGR_SLOPE`
- Parsing terstruktur data HTML soal ujian dengan BeautifulSoup4
- Uji integrasi pipeline Medallion otomatis

## Hasil

### Metrik Keberhasilan

- Orkestrasi pipeline data berjalan otomatis **100%**.
- Penghematan biaya model bahasa hingga **0 USD** dengan Ollama lokal.
- Penerapan **3 layer** arsitektur Medallion (Bronze, Silver, Gold).
