---
title: "dafine"
tagline: "AI-Powered Data Cleaning & Self-Service Analytics"
projectSlug: "dafine"
lang: "en"
year: "2026"
status: "In Progress"
techStack: ["FastAPI", "DuckDB", "OpenRouter AI", "Supabase", "Vanilla JS"]
order: 2
---

## Overview

Dafine (Data Refine) is a web-based AI-powered data cleaning and self-service analytics application. Users upload a raw data file, and the system automatically profiles each column, selects the appropriate cleaning strategy, generates SQL via AI, and returns a cleaned file — all without writing a single line of code.

## The Problem

Data analysts and business teams routinely receive raw datasets riddled with inconsistencies: missing values, duplicate rows, mixed casing, whitespace noise, and outliers. Cleaning this data manually in spreadsheets is tedious, error-prone, and does not scale. Existing tools either require technical expertise or lock users into opaque black-box transformations with no visibility into what actually changed and why.

## Role & Responsibilities

As Sole Developer (Full-Stack & Data Engineering):

- Designed and built the full pipeline from file ingestion to cleaned file delivery
- Engineered a deep statistical profiling engine (skewness, IQR, Tukey's fences, mode/median/mean imputation selection)
- Designed a prompt engineering system that encodes all cleaning decisions as explicit SQL instructions before passing to AI
- Built the authentication and security layer (Argon2id, AES-256-GCM, JWT HS256)
- Designed the Supabase schema and Parquet-based storage architecture
- Built the frontend from scratch using Vanilla JS, Tailwind CSS, and Chart.js

## How It Works

1. **File Upload & Parsing** — User uploads a CSV, Parquet, XLSX, XLS, or SQLite file. The backend loads it into an in-memory DuckDB instance as a `source_table` view. *(FastAPI + DuckDB)*
2. **Deep Statistical Profiling** — Every column is profiled: null rate, unique count, skewness, IQR, Tukey's fences outlier detection, categorical detection, mixed casing, whitespace issues, and long-text flags. An imputation strategy (mean, median, mode, forward-fill, or constant) is automatically selected per column based on its statistical characteristics. *(DuckDB + Python)*
3. **Prompt Engineering** — Profiling results are translated into explicit, per-column SQL instructions. The AI receives a structured brief — not raw data — containing the pre-computed fill values and transformation rules. *(Python)*
4. **AI SQL Generation** — The AI model generates a single DuckDB-compatible `CREATE TABLE cleaned_table AS ...` statement following the provided instructions. *(OpenRouter API)*
5. **SQL Execution & Export** — The generated SQL is sanitized, executed in DuckDB, and the result is exported back to the user's original file format. *(DuckDB)*
6. **Post-Cleaning Outlier Report** — IQR-based outlier detection is re-run on the cleaned table and returned to the frontend as a structured report. *(DuckDB)*
7. **History & Storage** — The cleaned file is stored as Parquet in Supabase Storage. Metadata, AI-generated SQL, reasoning, and column context are persisted in Supabase PostgreSQL. *(Supabase)*
8. **Self-Service Analytics** — Users can visualize cleaned data via an interactive chart builder with filters, sorting, Top N, Group By, and multiple metrics — powered by Chart.js. *(Vanilla JS + Chart.js)*

## Key Features

- **Automated Deep Profiling** — Per-column statistical analysis including skewness, IQR, quartiles, outlier detection, categorical inference, and string quality checks, all computed before any AI is involved.
- **Intelligent NULL Imputation** — The system automatically selects the right strategy per column: mean for symmetric distributions, median for skewed ones, mode for categorical or disguised-categorical columns, and forward-fill for time-series.
- **AI-Powered SQL Cleaning** — Rather than sending raw data to the AI, Dafine sends pre-computed instructions. The AI's sole job is generating syntactically correct DuckDB SQL — making results auditable and consistent.
- **Multi-Format Support** — Accepts CSV, Parquet, XLSX, XLS, and SQLite. Cleaned output is returned in the same format.
- **Outlier Transparency** — Post-cleaning outlier report shows Q1/Q3/IQR bounds and flagged sample values per numeric column, so users know exactly what remains.
- **Cleaning History & Re-download** — Every cleaning run is stored with its AI SQL, reasoning, and output file. Users can review past runs and re-download cleaned files at any time.
- **Interactive Chart Builder** — Dashboard page lets users build charts from cleaned data with filters, sorting, Top N, Group By, and multiple metrics — no SQL knowledge required.
- **Per-User API Key** — Each user supplies their own OpenRouter API key, stored encrypted (AES-256-GCM) server-side. No shared API quota.

## Technical Architecture

- **Frontend** — Vanilla HTML/CSS/JS with Tailwind CSS, hosted on Vercel. Dynamic API URL resolution between production and preview deployments.
- **Backend** — FastAPI (Python), hosted on Railway. Business logic is strictly separated: profiling in `data_profiler`, AI in `ai_cleaner`, storage in `storage_helper`.
- **Data Processing** — DuckDB runs entirely in-request (no persistent engine). All profiling and SQL execution happen in an ephemeral in-memory instance per request.
- **Storage** — Supabase PostgreSQL for metadata; Supabase Storage for cleaned Parquet files.
- **Security** — Argon2id for password hashing, AES-256-GCM for API key encryption, JWT HS256 for session tokens. All secrets in environment variables only.

## Results

Dafine compresses what would typically be a multi-step manual process — profiling, deciding imputation strategies, writing cleaning scripts, validating output — into a single file upload.

- **Zero code required** — any user can clean a dataset without SQL or Python knowledge
- **Fully auditable** — every cleaning run stores the exact SQL executed and the AI's reasoning
- **Statistically grounded** — cleaning decisions are derived from computed statistics, not AI guesswork