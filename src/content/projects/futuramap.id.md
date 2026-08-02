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

## Overview

FuturaMap merupakan platform "Data as a Product" yang dibangun di atas arsitektur Data Lakehouse modern, memisahkan layer penyimpanan dan komputasi. Platform ini mengkonsumsi data dari LMS Andalan School dan katalog kursus online, memprosesnya melalui pipeline Medallion (Bronze → Silver → Gold) menggunakan SQLMesh dan DuckDB, lalu menyajikan analitik kesiapan kuliah lewat Flask REST API — didukung AI lokal (Ollama) untuk rekomendasi kursus secara semantik, dan diorkestrasi penuh oleh agent otomatis untuk operasional harian.

## Masalah yang Diselesaikan

Siswa sering tidak tahu seberapa besar *gap* skor mereka dibandingkan standar SNBT untuk jurusan impian, dan hasil tes minat karir mereka cenderung berubah-ubah. Di sisi lain, Guru BK kesulitan memantau siswa yang performanya menurun secara real-time karena data nilai tersebar di berbagai guru mata pelajaran, menyebabkan keterlambatan intervensi.

## Peran & Tanggung Jawab

Sebagai Data Engineer & Product Developer:

- Merancang arsitektur Data Lakehouse terpisah (MinIO, Postgres, DuckLake) dengan pipeline Medallion Bronze/Silver/Gold
- Membangun transformasi data kompleks di SQLMesh, termasuk parsing HTML dengan BeautifulSoup4 di layer Silver
- Menerapkan linear regression (`REGR_SLOPE` di Postgres) di layer Gold untuk menghitung tren skor siswa secara dinamis
- Membangun Flask REST API sebagai layer data-serving antara Lakehouse dan web app
- Men-deploy agent otomatisasi via Docker untuk penjadwalan pipeline, email alert, dan notifikasi kegagalan real-time ke Telegram
- Mengintegrasikan small language model lokal (Ollama smollm2 1.7b) untuk sistem rekomendasi kursus semantik

## Cara Kerja

1. **Bronze (Ingestion)** — Ekstraksi data mentah secara aman dari database LMS dan dataset kursus online. *(Python)*
2. **Silver (Processing)** — Filtrasi, standarisasi, penanganan NULL, dan parsing HTML dengan BeautifulSoup via SQLMesh Python model. *(SQLMesh + DuckDB)*
3. **Gold (Analytics)** — Penggabungan data bersih dan penerapan `REGR_SLOPE` untuk menghitung arah tren nilai. *(SQLMesh + Postgres)*
4. **Data Serving** — Backend Flask menyajikan data siap pakai (profil, gap analysis, tren) ke frontend. *(Flask REST API)*
5. **Ops & Automation** — Agent menjadwalkan pipeline mingguan, mengirim alert performa ke Guru BK, dan melaporkan status ke Telegram.

## Fitur Utama

- **Tryout Alert System** — Memantau tren nilai lewat regression; mengirim email otomatis ke Guru BK saat performa siswa menurun.
- **Secure Lakehouse Auth** — Login frontend divalidasi langsung oleh backend Flask ke layer Gold.
- **Student Profiling Hub** — Dasbor terpadu berisi identitas, target jurusan/kampus, minimal skor, kompetisi pendaftar, dan hasil tes minat karir.
- **SNBT Gap Analysis** — Grafik tren, progress bar terhadap skor target, estimasi sisa tryout, dan fitur review soal salah.
- **AI Course Recommendation** — Small language model lokal mencocokkan profil minat karir siswa dengan katalog kursus secara semantik.

## Hasil

FuturaMap berhasil mengubah data operasional (OLTP) Andalan School menjadi aset analitik bernilai tinggi. Sistem peringatan dini membantu Guru BK melakukan intervensi tepat waktu, sementara siswa mendapatkan arah persiapan kuliah yang jelas dan terukur.

- **100%** otomatisasi pipeline, diorkestrasi secara andal end-to-end
- **Zero** biaya cloud AI — inferensi semantik berjalan sepenuhnya lokal
- **3 tingkat** arsitektur Medallion: layer analitik Bronze, Silver, dan Gold
