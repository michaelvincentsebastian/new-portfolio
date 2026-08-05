---
title: "Analytics App for EHR System"
tagline: "Tool for hospital auditors to ensure that hospitals do not violate compliance or incur losses."
projectSlug: "prospecting-engine"
lang: "en"
year: "2024"
status: "Completed"
techStack: ["n8n", "Docker", "PostgreSQL", "Python", "Gemini 2.5", "TwentyCRM"]
order: 2
---

## General

### Problem

The Sales team faced major inefficiencies handling the daily influx of prospect data. Sorting and qualification were done manually, leading to slow response times, low-quality leads being processed alongside high-priority ones, and lost conversion potential due to delayed follow-up.

### User

Sales team, hospital auditors, and business development managers.

### Solution

Automated Prospecting Engine is an intelligent automation system built with n8n to revolutionize how the Sales team manages incoming leads. It integrates a Gemini 2.5-based AI agent to qualify and segment prospects, replacing a slow manual process with a fully automated pipeline.

### Key Features

- **AI-Powered Lead Scoring** — Gemini 2.5 analyzes each prospect in depth and returns a qualification score based on precise business parameters.
- **Automatic Segmentation** — Prospects are automatically classified into Hot, Warm, and Cold segments, no manual intervention needed.
- **CRM Auto-Sync** — All classified prospect data is synced directly into TwentyCRM with full metadata and AI notes.
- **Real-time Notifications** — The Sales team gets real-time alerts when new Hot leads come in, enabling response within minutes.

### Challenge

Dealing with messy user inputs and ensuring consistent structuring in the output from the Gemini LLM before syncing to TwentyCRM.

### Impact

- **90%** time saved on per-lead qualification
- **100%** automation rate across the entire pipeline
- **3x** faster response time to Hot leads

## Technical

### Explanation

The platform is designed as an event-driven automation engine using n8n. Incoming data is preprocessed using lightweight Python scripts, passed to the Gemini API for intelligence, and then routed to CRM nodes.

### Architecture

1. **Data Input / Trigger** — Prospect data arrives via form, spreadsheet, or API endpoint and automatically triggers the n8n workflow. *(n8n Webhook)*
2. **Data Preprocessing** — Raw data is normalized, duplicates removed, and missing fields filled with defaults. *(n8n + Python)*
3. **AI Qualification** — The AI agent analyzes each prospect based on industry fit, company size, and needs, then returns a qualification score. *(Gemini 2.5 AI Agent)*
4. **Segmentation & Routing** — Prospects are segmented by score and routed to the right queue (Hot, Warm, Cold). *(n8n Router)*
5. **CRM Sync** — Classified prospects are synced to TwentyCRM with segment, priority, and AI-generated notes already attached. *(TwentyCRM API)*

### Tech Stack

- **Orchestration**: n8n
- **Runtime Environment**: Docker
- **Database**: PostgreSQL
- **Scripting & Logic**: Python, JavaScript
- **AI Engine**: Gemini 2.5 API
- **CRM System**: TwentyCRM

### Data Sources

- Webhooks from landing page forms
- Shared Google Sheets and uploaded CSV files
- External API calls

### Repository Structure

- `workflows/` — Exported n8n workflow JSON blueprints
- `scripts/` — Python helper scripts for parsing input payloads
- `docker-compose.yml` — Container configurations for n8n, postgres, and redis

### Features

- Event-driven trigger webhooks
- Auto-retry failed syncs with exponential backoff
- Encrypted credentials storage in n8n vault

## Result

### Metrics

- **90%** efficiency gain in prospect qualification time.
- **100%** automation rate, reducing operational manual errors to zero.
- **3x** improvement in speed-to-lead response times for key sales leads.
