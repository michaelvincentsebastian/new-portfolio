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

## Overview

platy adalah data lakehouse yang ringan dan headless, dibangun untuk menghadirkan praktik ELT production-grade — medallion architecture, incremental ingestion, dan akses API yang ter-governance — dalam satu stack yang efisien tanpa perlu cluster big data penuh.

## The Problem

Data organisasi tersebar di dua dunia yang terpisah: data terstruktur di database production MySQL, dan file tidak terstruktur (dokumen, hasil export, upload ad-hoc) tanpa storage maupun pencatatan metadata yang konsisten. Tidak ada satu pipeline tunggal dan ter-versi yang bisa menampung keduanya, menerapkan tahap transformasi yang ter-governance, dan hanya mengekspos data yang sudah tervalidasi ke konsumen hilir — data mentah dan data bersih praktis tercampur tanpa batas akses yang jelas.

## Role & Responsibilities

Sebagai Data Engineer & Architect:

- Merancang arsitektur lakehouse end-to-end: DuckDB/DuckLake untuk compute dan catalog, MinIO untuk object storage, PostgreSQL untuk metadata, SQLMesh untuk transformasi
- Membangun jalur ingestion terpisah untuk data tidak terstruktur (streaming upload lewat FastAPI ke MinIO, metadata dicatat di PostgreSQL) yang decoupled dari pipeline DuckLake terstruktur
- Menentukan strategi layer medallion (bronze, silver, gold) beserta aturan akses tiap layer
- Merancang strategi incremental extraction untuk sumber MySQL menggunakan watermark-based read lewat read replica, bukan bulk pull via API
- Mengidentifikasi dan mendokumentasikan kebutuhan security hardening sebelum deployment production

## How It Works

1. **Ingestion (bronze)** — Data terstruktur diambil langsung dari MySQL read replica menggunakan incremental load berbasis watermark; file tidak terstruktur di-stream lewat endpoint upload FastAPI langsung ke MinIO. *(Python, pymysql/dlt, FastAPI)*
2. **Landing** — Data hasil ingestion mendarat sebagai file Parquet di MinIO, terdaftar di catalog DuckLake yang didukung PostgreSQL. *(DuckDB + DuckLake)*
3. **Transformation** — Model SQLMesh secara bertahap membersihkan, deduplikasi, dan memperkaya data dari bronze ke silver ke gold, dengan environment promotion (`dev` → `prod`) yang sudah native. *(SQLMesh)*
4. **Governed API access** — Layer gold (dan silver secara selektif) diekspos lewat endpoint API; bronze tetap internal-only untuk menjaga governance data. *(FastAPI)*
5. **Cataloging** — Aset tidak terstruktur yang di-upload bisa dicari dan dikelola lewat antarmuka catalog khusus dengan filtering, statistik, dan detail view.

## Key Features

- **Medallion architecture** — Pemisahan jelas antara data mentah (bronze), data bersih (silver), dan data siap pakai untuk bisnis (gold), masing-masing dengan batas akses sendiri.
- **Separation of concerns terstruktur/tidak terstruktur** — Data tabular mengalir lewat DuckLake; file tidak terstruktur mengalir lewat pipeline streaming-upload independen, sehingga perubahan di satu sisi tidak pernah berisiko ke sisi lain.
- **Incremental ingestion berbasis koneksi database** — Koneksi langsung ke read replica dengan watermark tracking, bukan backfill via API yang rapuh dan rentan rate limit.
- **Transformation-as-code** — SQLMesh mengelola versioning model, testing, dan environment promotion untuk setiap tahap transformasi.

## Results

platy saat ini masih dalam pengembangan aktif. Sejauh ini, arsitektur inti di lokal sudah berjalan end-to-end: ingestion data tidak terstruktur, ingestion data tabular via DuckLake, dan UI artifact catalog sudah berfungsi di environment lokal. Milestone yang tersisa adalah pembangunan pipeline bronze/silver/gold, security hardening (manajemen kredensial, akses API dengan autentikasi, isolasi jaringan), dan migrasi ke server Linux milik perusahaan.