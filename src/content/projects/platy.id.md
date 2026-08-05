---
title: "platy"
tagline: "Data Lakehouse Hybrid Headless untuk Embedded Analytics"
projectSlug: "platy-data-lakehouse"
lang: "id"
year: "2026"
status: "In Progress"
techStack: ["DuckDB", "DuckLake", "MinIO", "PostgreSQL", "SQLMesh", "FastAPI"]
order: 3
---

## Umum

### Masalah

Data organisasi tersebar di dua dunia yang terpisah: data terstruktur di database production MySQL, dan file tidak terstruktur (dokumen, hasil export, upload ad-hoc) tanpa storage maupun pencatatan metadata yang konsisten. Tidak ada satu pipeline tunggal dan ter-versi yang bisa menampung keduanya, menerapkan tahap transformasi yang ter-governance, dan hanya mengekspos data yang sudah tervalidasi ke konsumen hilir.

### Pengguna

Tim data engineering internal, analis data, dan pengembang aplikasi pihak ketiga yang membutuhkan embedded analytics.

### Solusi

platy adalah data lakehouse yang ringan dan headless, dibangun untuk menghadirkan praktik ELT production-grade — medallion architecture, incremental ingestion, dan akses API yang ter-governance — dalam satu stack yang efisien tanpa perlu cluster big data penuh.

### Fitur Utama

- **Medallion Architecture** — Pemisahan jelas antara data mentah (bronze), data bersih (silver), dan data siap pakai untuk bisnis (gold), masing-masing dengan batas akses sendiri.
- **Pemisahan Terstruktur & Tidak Terstruktur** — Data tabular mengalir lewat DuckLake; file tidak terstruktur mengalir lewat pipeline streaming-upload independen, sehingga perubahan di satu sisi tidak pernah berisiko ke sisi lain.
- **Incremental Ingestion Native** — Koneksi langsung ke read replica dengan watermark tracking, bukan backfill via API yang rapuh dan rentan rate limit.
- **Transformation-as-Code** — SQLMesh mengelola versioning model, testing, dan environment promotion untuk setiap tahap transformasi.

### Tantangan

Mengatur batas tata kelola keamanan (governance) antara tabel katalog tabular dan objek file mentah, serta melakukan ekstraksi inkremental berbasis tanda air (watermark) pada database produksi tanpa mengunci tabel.

### Dampak

- Pipeline penampungan DuckLake dan file streaming berhasil dijalankan di lingkungan lokal.
- Cakupan uji pipeline 100% pada promosi lingkungan (dev ke prod) menggunakan SQLMesh.
- Stack lakehouse yang sangat efisien dan berjalan lancar di virtual private server (VPS) standar.

## Teknis

### Penjelasan

Platy menerapkan desain lakehouse modular. Beban komputasi diproses secara in-memory oleh DuckDB. File tidak terstruktur mentah dialirkan langsung ke MinIO, sementara data tabel disinkronkan ke PostgreSQL target yang dikelola oleh SQLMesh.

### Arsitektur

1. **Ingestion (bronze)** — Data terstruktur diambil langsung dari MySQL read replica menggunakan incremental load berbasis watermark; file tidak terstruktur di-stream lewat endpoint upload FastAPI langsung ke MinIO. *(Python, pymysql/dlt, FastAPI)*
2. **Landing** — Data hasil ingestion mendarat sebagai file Parquet di MinIO, terdaftar di catalog DuckLake yang didukung PostgreSQL. *(DuckDB + DuckLake)*
3. **Transformation** — Model SQLMesh secara bertahap membersihkan, deduplikasi, dan memperkaya data dari bronze ke silver ke gold. *(SQLMesh)*
4. **Governed API access** — Layer gold diekspos lewat endpoint API FastAPI; bronze tetap internal-only untuk menjaga governance data. *(FastAPI)*

### Tech Stack

- **Komputasi & Katalog**: DuckDB, DuckLake
- **Object Storage**: MinIO
- **Database Metadata**: PostgreSQL
- **Pipeline Transformasi**: SQLMesh
- **Framework API**: FastAPI (Python)
- **Ingestion Toolkit**: python-dlt, pymysql

### Sumber Data

- Read-replica database MySQL produksi
- Upload file mentah multipart streaming API (PDF, JSON, CSV)

### Struktur Repositori

- `pipelines/` — Folder SQLMesh berisi query model Medallion
- `api/` — Proyek FastAPI yang mengekspos endpoint analitik dan batas upload file
- `catalog/` — Dasbor antarmuka pengguna untuk pencarian dan preview aset file
- `docker-compose.yml` — Konfigurasi deploy lokal kontainer MinIO dan Postgres

### Fitur Teknis

- Ingestion inkremental berbasis tanda air database (watermark)
- Pengiriman data analitik headless via REST API
- Pemisahan total storage untuk data tabular dan berkas tidak terstruktur

## Hasil

### Metrik Keberhasilan

- Arsitektur inti lokal (upload file, ingestion tabular via DuckLake, dan UI katalog) berjalan lancar secara end-to-end.
- Kecepatan query tabel terkompresi berkat pemanfaatan file caching DuckDB.
- Zero-overhead pengujian promosi environment melalui dry-run SQLMesh.