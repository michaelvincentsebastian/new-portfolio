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

## Overview

platy is a lightweight, headless data lakehouse built to bring production-grade ELT practices — medallion architecture, incremental ingestion, and governed API access — into a resource-efficient stack that doesn't require a full big-data cluster.

## The Problem

The organization's data lived in two disconnected worlds: structured records inside a MySQL production database, and unstructured files (documents, exports, ad-hoc uploads) with no consistent storage or metadata tracking. There was no single, versioned pipeline that could ingest both, apply governed transformation stages, and expose only validated data to downstream consumers — raw and clean data were effectively mixed together with no access boundaries.

## Role & Responsibilities

As Data Engineer & Architect:

- Designed the end-to-end lakehouse architecture: DuckDB/DuckLake for compute and catalog, MinIO for object storage, PostgreSQL for metadata, SQLMesh for transformation
- Built a separate ingestion path for unstructured data (streaming upload through FastAPI to MinIO, metadata tracked in PostgreSQL) decoupled from the structured DuckLake pipeline
- Defined the medallion layer strategy (bronze, silver, gold) and the access rules for each layer
- Planned the incremental extraction strategy for MySQL sources using watermark-based reads via a read replica, rather than bulk API pulls
- Identified and documented security hardening requirements ahead of production deployment

## How It Works

1. **Ingestion (bronze)** — Structured data is extracted directly from a MySQL read replica using watermark-based incremental loads; unstructured files are streamed through a FastAPI upload endpoint straight into MinIO. *(Python, pymysql/dlt, FastAPI)*
2. **Landing** — Ingested data lands as Parquet files in MinIO, registered against the DuckLake catalog backed by PostgreSQL. *(DuckDB + DuckLake)*
3. **Transformation** — SQLMesh models progressively clean, deduplicate, and enrich data from bronze to silver to gold, with environment promotion (`dev` → `prod`) handled natively. *(SQLMesh)*
4. **Governed API access** — Gold (and selectively silver) layers are exposed through API endpoints; bronze remains internal-only to preserve data governance. *(FastAPI)*
5. **Cataloging** — Uploaded unstructured assets are searchable and manageable through a dedicated catalog interface with filtering, stats, and detail views.

## Key Features

- **Medallion architecture** — Clear separation between raw (bronze), cleaned (silver), and business-ready (gold) data, each with its own access boundary.
- **Structured/unstructured separation of concerns** — Tabular data flows through DuckLake; unstructured files flow through an independent streaming-upload pipeline, so changes to one never risk the other.
- **Incremental, database-native ingestion** — Direct read-replica connections with watermark tracking instead of fragile, rate-limited API backfills.
- **Transformation-as-code** — SQLMesh manages model versioning, testing, and environment promotion for every transformation stage.

## Results

platy is currently in active development. To date, the core local architecture is running end to end: unstructured ingestion, tabular DuckLake ingestion, and an artifact catalog UI are functional in the local environment. Remaining milestones are the bronze/silver/gold pipeline build-out, security hardening (credential management, authenticated API access, network isolation), and migration to a company-hosted Linux server.