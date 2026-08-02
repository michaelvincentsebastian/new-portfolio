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

## Overview

Automated Prospecting Engine adalah sistem otomasi cerdas yang dibangun menggunakan n8n untuk merevolusi cara tim Sales mengelola prospek (leads) yang masuk. Sistem ini mengintegrasikan AI agent berbasis Gemini 2.5 untuk melakukan kualifikasi dan segmentasi otomatis, menggantikan proses manual yang lambat dengan pipeline yang sepenuhnya otomatis — dari input mentah hingga sinkron ke CRM.

## Masalah yang Diselesaikan

Tim Sales menghadapi inefisiensi besar dalam mengelola data prospek yang masuk setiap harinya. Proses sorting dan kualifikasi dilakukan manual, mengakibatkan respons lambat, leads berkualitas rendah diproses bersamaan dengan leads prioritas tinggi, dan hilangnya potensi konversi akibat keterlambatan follow-up.

## Peran & Tanggung Jawab

Sebagai Data Engineer & Automation Developer:

- Merancang dan membangun automation workflow di n8n dari awal hingga production
- Mengintegrasikan Gemini 2.5 sebagai AI agent untuk kualifikasi dan scoring leads
- Membangun koneksi antara n8n dan TwentyCRM via REST API
- Mendefinisikan parameter segmentasi dan aturan routing leads

## Cara Kerja

1. **Data Input / Trigger** — Data prospek masuk lewat form, spreadsheet, atau API endpoint dan otomatis men-trigger workflow n8n. *(n8n Webhook)*
2. **Data Preprocessing** — Data mentah dinormalisasi, duplikat dihapus, field kosong diisi nilai default. *(n8n + Python)*
3. **AI Qualification** — AI agent menganalisis tiap prospek berdasarkan kesesuaian industri, ukuran perusahaan, dan kebutuhan, lalu memberi skor kualifikasi. *(Gemini 2.5 AI Agent)*
4. **Segmentation & Routing** — Prospek disegmentasi berdasarkan skor dan di-route ke antrian yang sesuai (Hot, Warm, Cold). *(n8n Router)*
5. **CRM Sync** — Prospek yang sudah diklasifikasi disinkronkan ke TwentyCRM lengkap dengan segmen, prioritas, dan catatan AI. *(TwentyCRM API)*

## Fitur Utama

- **AI-Powered Lead Scoring** — Gemini 2.5 menganalisis tiap prospek secara mendalam dan memberi skor kualifikasi berdasarkan parameter bisnis yang presisi.
- **Automatic Segmentation** — Prospek otomatis diklasifikasi menjadi Hot, Warm, dan Cold tanpa intervensi manual.
- **CRM Auto-Sync** — Semua data prospek yang terklasifikasi langsung tersinkron ke TwentyCRM dengan metadata lengkap dan catatan AI.
- **Real-time Notifications** — Tim Sales mendapat notifikasi real-time saat Hot leads baru masuk, sehingga bisa merespons dalam hitungan menit.

## Hasil

Sistem berhasil mengotomasi penuh proses kualifikasi yang sebelumnya dilakukan manual. Tim Sales kini bisa fokus pada leads berkualitas tinggi yang sudah tersegmentasi dan diprioritaskan AI.

- **90%** waktu kualifikasi per leads berkurang drastis
- **100%** automation rate di seluruh pipeline
- **3x** kecepatan respons ke Hot leads meningkat
