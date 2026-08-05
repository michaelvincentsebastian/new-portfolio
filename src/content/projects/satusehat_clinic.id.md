---
title: "Aplikasi Analitik untuk Sistem RME"
tagline: "Alat untuk auditor dalam memastikan rumah sakit tidak melanggar kepatuhan maupun merugi."
projectSlug: "prospecting-engine"
lang: "id"
year: "2024"
status: "Completed"
techStack: ["n8n", "Docker", "PostgreSQL", "Python", "Gemini 2.5", "TwentyCRM"]
order: 2
---

## Umum

### Masalah

Tim Sales menghadapi inefisiensi besar dalam mengelola data prospek yang masuk setiap harinya. Proses kualifikasi dilakukan secara manual, mengakibatkan respons lambat, prospek berkualitas rendah diproses bersamaan dengan prospek prioritas tinggi, dan hilangnya potensi konversi akibat keterlambatan tindak lanjut.

### Pengguna

Tim Sales, auditor rumah sakit, dan manajer operasional bisnis.

### Solusi

Automated Prospecting Engine adalah sistem otomasi cerdas yang dibangun menggunakan n8n untuk merevolusi cara tim Sales mengelola prospek (leads) yang masuk. Sistem ini mengintegrasikan AI agent berbasis Gemini 2.5 untuk melakukan kualifikasi dan segmentasi otomatis secara end-to-end.

### Fitur Utama

- **AI-Powered Lead Scoring** — Gemini 2.5 menganalisis tiap prospek secara mendalam dan memberi skor kualifikasi berdasarkan parameter bisnis yang presisi.
- **Segmentation Otomatis** — Prospek otomatis diklasifikasi menjadi Hot, Warm, dan Cold tanpa intervensi manual.
- **CRM Auto-Sync** — Semua data prospek yang terklasifikasi langsung tersinkron ke TwentyCRM dengan metadata lengkap dan catatan AI.
- **Notifikasi Real-time** — Tim Sales mendapat notifikasi real-time saat Hot leads baru masuk, sehingga bisa merespons dalam hitungan menit.

### Tantangan

Mengatasi ketidakrapian format input data dan memastikan hasil output terstruktur JSON dari Gemini LLM tetap konsisten sebelum disinkronkan ke dalam API TwentyCRM.

### Dampak

- **90%** waktu kualifikasi per leads berkurang drastis
- **100%** tingkat otomasi di seluruh data pipeline
- **3x** kecepatan respons tim Sales terhadap Hot leads

## Teknis

### Penjelasan

Sistem ini didesain sebagai mesin otomasi berbasis event (event-driven) menggunakan n8n. Data yang masuk divalidasi dan dinormalisasi dengan script Python ringan, dianalisis menggunakan API Gemini, lalu dialirkan ke TwentyCRM.

### Arsitektur

1. **Data Input / Trigger** — Data prospek masuk lewat form, spreadsheet, atau API endpoint dan otomatis men-trigger workflow n8n. *(n8n Webhook)*
2. **Data Preprocessing** — Data mentah dinormalisasi, duplikat dihapus, field kosong diisi nilai default. *(n8n + Python)*
3. **AI Qualification** — AI agent menganalisis tiap prospek berdasarkan kesesuaian industri, ukuran perusahaan, dan kebutuhan, lalu memberi skor kualifikasi. *(Gemini 2.5 AI Agent)*
4. **Segmentation & Routing** — Prospek disegmentasi berdasarkan skor dan di-route ke antrian yang sesuai (Hot, Warm, Cold). *(n8n Router)*
5. **CRM Sync** — Prospek yang sudah diklasifikasi disinkronkan ke TwentyCRM lengkap dengan segmen, prioritas, dan catatan AI. *(TwentyCRM API)*

### Tech Stack

- **Orkestrasi**: n8n
- **Lingkungan Deploy**: Docker Container
- **Database**: PostgreSQL
- **Logika Scripting**: Python & JavaScript
- **Model AI**: Gemini 2.5 API
- **Sistem CRM**: TwentyCRM

### Sumber Data

- Webhook API dari formulir landing page
- Google Sheets tim Sales
- Upload file CSV ad-hoc

### Struktur Repositori

- `workflows/` — Blueprint JSON dari workflow n8n
- `scripts/` — Skrip Python pembantu untuk parsing payload input
- `docker-compose.yml` — Konfigurasi orkestrasi container n8n, postgres, dan redis

### Fitur Teknis

- Penanganan kegagalan otomatis dengan mekanisme retry exponential backoff
- Autentikasi aman melalui integrasi kredensial terenkripsi n8n vault
- Payload filter dan parser dinamis

## Hasil

### Metrik Keberhasilan

- Penghematan waktu operasional kualifikasi sebesar **90%**.
- Pipeline data berjalan **100%** otomatis secara konsisten tanpa kesalahan manual.
- Respons tim Sales terhadap prospek dengan prioritas tinggi meningkat **3x lipat**.
