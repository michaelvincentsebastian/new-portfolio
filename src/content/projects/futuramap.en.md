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

## Overview

FuturaMap is a "Data as a Product" platform built on a modern Data Lakehouse architecture that decouples storage from compute. It ingests data from the Andalan School LMS and online course catalogs, processes it through a Medallion pipeline (Bronze → Silver → Gold) using SQLMesh and DuckDB, and serves college-readiness analytics through a Flask REST API — powered by a local AI model (Ollama) for semantic course recommendations, and orchestrated end-to-end by an autonomous agent for daily operations.

## The Problem

Students often don't know how large the gap is between their practice test scores and the SNBT (national university entrance exam) standard for their dream major, and their career-interest results tend to be inconsistent. Meanwhile, school counselors struggle to monitor students whose scores are declining in real time, because grade data is scattered across different subject teachers — causing delayed intervention.

## Role & Responsibilities

As Data Engineer & Product Developer, the work included:

- Designing a decoupled Data Lakehouse architecture (MinIO, Postgres, DuckLake) with a Bronze/Silver/Gold Medallion pipeline
- Building complex data transformations in SQLMesh, including HTML parsing with BeautifulSoup4 at the Silver layer
- Applying linear regression (`REGR_SLOPE` in Postgres) at the Gold layer to dynamically track student score trends
- Building a Flask REST API as the data-serving layer between the Lakehouse and the web app
- Deploying an automation agent via Docker for pipeline scheduling, email alerts, and real-time failure notifications to Telegram
- Integrating a local small language model (Ollama smollm2 1.7b) for a semantic course recommendation system

## How It Works

1. **Bronze (Ingestion)** — Securely extract raw data from the LMS database and online course datasets. *(Python)*
2. **Silver (Processing)** — Filter, standardize, handle nulls, and parse HTML with BeautifulSoup via SQLMesh Python models. *(SQLMesh + DuckDB)*
3. **Gold (Analytics)** — Merge clean data and apply `REGR_SLOPE` to calculate score trend direction. *(SQLMesh + Postgres)*
4. **Data Serving** — Flask backend serves ready-to-use data (profiles, gap analysis, trends) to the frontend. *(Flask REST API)*
5. **Ops & Automation** — The agent schedules weekly pipeline runs, sends performance alerts to counselors, and reports status to Telegram.

## Key Features

- **Tryout Alert System** — Monitors score trends via regression; sends an automatic email to counselors when a student's performance drops.
- **Secure Lakehouse Auth** — Frontend login validated directly by the Flask backend against the Gold layer.
- **Student Profiling Hub** — A unified dashboard with identity, target major/campus, minimum score requirements, applicant competition, and career-interest results.
- **SNBT Gap Analysis** — Trend charts, progress bars against target scores, remaining tryout estimates, and a wrong-answer review feature.
- **AI Course Recommendation** — A local small language model semantically matches a student's career-interest profile with the course catalog.

## Results

FuturaMap successfully turned Andalan School's operational (OLTP) data into a high-value analytical asset. The early-warning system helps counselors intervene in time, while students get clear, data-driven guidance for their college preparation.

- **100%** pipeline automation, reliably orchestrated end-to-end
- **Zero** cloud AI cost — semantic inference runs entirely locally
- **3-tier** Medallion architecture: Bronze, Silver, and Gold analytics layers
