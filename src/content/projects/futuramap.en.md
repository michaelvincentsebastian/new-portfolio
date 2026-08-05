---
title: "FuturaMap"
tagline: "A Data and AI-driven student analytics platform for measuring college readiness"
projectSlug: "futuramap"
lang: "en"
year: "2026"
status: "Completed"
techStack: ["DuckDB", "SQLMesh", "MinIO", "PostgreSQL", "Python", "Flask", "Docker", "Ollama"]
cover: "/images/projects/futuramap/futuramap-tryout-1.jpg"
order: 1
---

## General

### Problem

Students often don't know how large the gap is between their practice test scores and the SNBT (national university entrance exam) standard for their dream major, and their career-interest results tend to be inconsistent. Meanwhile, school counselors struggle to monitor students whose scores are declining in real time, because grade data is scattered across different subject teachers — causing delayed intervention.

### User

High school students, school counselors, and academic advisors.

### Solution

FuturaMap is a "Data as a Product" platform built on a modern Data Lakehouse architecture that decouples storage from compute. It ingests data from the Andalan School LMS and online course catalogs, processes it through a Medallion pipeline (Bronze → Silver → Gold) using SQLMesh and DuckDB, and serves college-readiness analytics through a Flask REST API — powered by a local AI model (Ollama) for semantic course recommendations, and orchestrated end-to-end by an autonomous agent for daily operations.

### Key Features

- **Tryout Alert System** — Monitors score trends via regression; sends an automatic email to counselors when a student's performance drops.
- **Student Profiling Hub** — A unified dashboard with identity, target major/campus, minimum score requirements, applicant competition, and career-interest results.
- **SNBT Gap Analysis** — Trend charts, progress bars against target scores, remaining tryout estimates, and a wrong-answer review feature.
- **AI Course Recommendation** — A local small language model semantically matches a student's career-interest profile with the course catalog.

### Challenge

Normalizing and cleansing dirty LMS data, parsing complex HTML mock-test questions at scale, and running language model inference locally on consumer-grade hardware.

### Impact

- **100%** pipeline automation, reliably orchestrated end-to-end.
- **Zero** cloud AI cost — semantic inference runs entirely locally.
- Early warning system successfully flagged declining students for timely counselor interventions.

## Technical

### Explanation

FuturaMap employs a modern, lightweight Data Lakehouse architecture. Computational logic is decoupled: MinIO serves as the object store, SQLMesh manages incremental transformations using DuckDB, and a Flask API servers cleaned insights.

### Architecture

1. **Bronze (Ingestion)** — Extract raw LMS database records and course catalogs. *(Python)*
2. **Silver (Processing)** — Cleanse, deduplicate, parse test question HTML structures, and store as Parquet. *(SQLMesh + DuckDB)*
3. **Gold (Analytics)** — Merge clean tables, apply regression to detect trends, and output target scores. *(SQLMesh + Postgres)*
4. **Data Serving** — Flask REST API serves processed gap analysis and student profile datasets to the frontend. *(Flask + Ollama)*

### Tech Stack

- **Data Processing & Catalog**: DuckDB, SQLMesh, DuckLake
- **Object Storage**: MinIO (S3-compatible)
- **Database (Metadata & Serving)**: PostgreSQL
- **Backend API**: Flask (Python)
- **Semantic Inference**: Ollama (SmolLM2 1.7B)
- **Ops & Automation**: Docker, Cron automation agent

### Data Sources

- School LMS database dumps (MySQL/PostgreSQL)
- Scraping results from online course directories
- Mock test exam answer sheets

### Repository Structure

- `lakehouse/` — SQLMesh project folder containing SQL/Python models
- `api/` — Flask REST API serving endpoints and Ollama handlers
- `agent/` — Automation agent scripts for scheduling and Telegram notifications
- `docker-compose.yml` — Local stack orchestration (MinIO, Postgres, Ollama)

### Features

- `REGR_SLOPE` linear regression scoring trends
- Medallion pipeline promotion tests
- Decoupled storage (S3) and processing (DuckDB)
- Beautifulsoup4 HTML parsing models

## Result

### Metrics

- **100%** automated pipeline execution.
- **0 USD** cloud GPU API expenses by hosting local Ollama nodes.
- **3-tier** Medallion data engineering architecture (Bronze, Silver, Gold).
