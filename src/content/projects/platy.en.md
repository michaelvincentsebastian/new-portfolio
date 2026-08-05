---
title: "platy"
tagline: "Headless Hybrid Data Lakehouse for Embedded Analytics"
projectSlug: "platy-data-lakehouse"
lang: "en"
year: "2026"
status: "In Progress"
techStack: ["DuckDB", "DuckLake", "MinIO", "PostgreSQL", "SQLMesh", "FastAPI"]
cover: "/images/projects/platy/platy.png"
order: 3
---

## General

### Problem

The organization's data lived in two disconnected worlds: structured records inside a MySQL production database, and unstructured files (documents, exports, ad-hoc uploads) with no consistent storage or metadata tracking. There was no single, versioned pipeline that could ingest both, apply governed transformation stages, and expose only validated data to downstream consumers — raw and clean data were effectively mixed together with no access boundaries.

### User

Internal data engineering teams, data analysts, and third-party application developers requiring embedded analytics.

### Solution

Platy is a lightweight, headless data lakehouse built to bring production-grade ELT practices — medallion architecture, incremental ingestion, and governed API access — into a resource-efficient stack that doesn't require a full big-data cluster.

### Key Features

- **Medallion Architecture** — Clear separation between raw (bronze), cleaned (silver), and business-ready (gold) data, each with its own access boundary.
- **Structured/Unstructured Separation** — Tabular data flows through DuckLake; unstructured files flow through an independent streaming-upload pipeline, preventing mutual resource risks.
- **Incremental, Database-Native Ingestion** — Direct read-replica connections with watermark tracking instead of fragile, rate-limited API backfills.
- **Transformation-as-Code** — SQLMesh manages model versioning, testing, and environment promotion for every transformation stage.

### Challenge

Governing security boundaries across tabular catalog tables and file objects, and handling incremental watermark extraction on production databases without locking records.

### Impact

- Successful local staging of tabular DuckLake and file ingestion pipelines.
- 100% test coverage on environment promotions (dev to prod) using SQLMesh.
- Resource-efficient lakehouse stack that runs smoothly on standard virtual private servers.

## Technical

### Explanation

Platy utilizes a modular lakehouse design. Computations are handled in-memory by DuckDB. Raw unstructured files stream directly to MinIO, while tabular records sync to PostgreSQL metadata targets governed by SQLMesh.

### Architecture

1. **Ingestion (bronze)** — Tabular data is extracted from a MySQL replica using watermark incremental loads; files are streamed through FastAPI straight to MinIO. *(Python, pymysql/dlt, FastAPI)*
2. **Landing** — Ingested data lands as Parquet in MinIO, registered against the DuckLake catalog backed by PostgreSQL. *(DuckDB + DuckLake)*
3. **Transformation** — SQLMesh models progressively clean, deduplicate, and enrich data from bronze to silver to gold. *(SQLMesh)*
4. **Governed API Access** — Gold layers are exposed through FastAPI endpoints, keeping bronze layers completely internal. *(FastAPI)*

### Tech Stack

- **Compute & Catalog**: DuckDB, DuckLake
- **Object Storage**: MinIO
- **Metadata Database**: PostgreSQL
- **Transformation Pipeline**: SQLMesh
- **API Framework**: FastAPI (Python)
- **Ingestion Toolkit**: python-dlt, pymysql

### Data Sources

- Production MySQL database read-replicas
- API streaming multipart file uploads (PDF, JSON, CSV)

### Repository Structure

- `pipelines/` — SQLMesh folder containing medallion layer queries
- `api/` — FastAPI project exposing analytical endpoints and file upload boundaries
- `catalog/` — UI dashboard codebase for searching and previewing unstructured assets
- `docker-compose.yml` — Container definitions for local MinIO and Postgres instances

### Features

- Watermark-based database incremental extraction
- Headless API data delivery
- Structured and unstructured storage separation of concerns

## Result

### Metrics

- Core local architecture is running end-to-end (unstructured upload, tabular ingestion, catalog UI).
- Tabular query execution time compressed significantly by leveraging DuckDB file caching.
- Zero-overhead environment testing via SQLMesh dry runs.