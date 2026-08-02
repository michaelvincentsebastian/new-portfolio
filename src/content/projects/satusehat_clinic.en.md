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

## Overview

Automated Prospecting Engine is an intelligent automation system built with n8n to revolutionize how the Sales team manages incoming leads. It integrates a Gemini 2.5-based AI agent to automatically qualify and segment prospects, replacing a slow manual process with a fully automated pipeline — from raw input all the way to CRM sync.

## The Problem

The Sales team faced major inefficiencies handling the daily influx of prospect data. Sorting and qualification were done manually, leading to slow response times, low-quality leads being processed alongside high-priority ones, and lost conversion potential due to delayed follow-up.

## Role & Responsibilities

As Data Engineer & Automation Developer:

- Designed and built the automation workflow in n8n from scratch to production
- Integrated Gemini 2.5 as an AI agent for lead qualification and scoring
- Built the connection between n8n and TwentyCRM via REST API
- Defined segmentation parameters and lead-routing rules

## How It Works

1. **Data Input / Trigger** — Prospect data arrives via form, spreadsheet, or API endpoint and automatically triggers the n8n workflow. *(n8n Webhook)*
2. **Data Preprocessing** — Raw data is normalized, duplicates removed, and missing fields filled with defaults. *(n8n + Python)*
3. **AI Qualification** — The AI agent analyzes each prospect based on industry fit, company size, and needs, then returns a qualification score. *(Gemini 2.5 AI Agent)*
4. **Segmentation & Routing** — Prospects are segmented by score and routed to the right queue (Hot, Warm, Cold). *(n8n Router)*
5. **CRM Sync** — Classified prospects are synced to TwentyCRM with segment, priority, and AI-generated notes already attached. *(TwentyCRM API)*

## Key Features

- **AI-Powered Lead Scoring** — Gemini 2.5 analyzes each prospect in depth and returns a qualification score based on precise business parameters.
- **Automatic Segmentation** — Prospects are automatically classified into Hot, Warm, and Cold segments, no manual intervention needed.
- **CRM Auto-Sync** — All classified prospect data is synced directly into TwentyCRM with full metadata and AI notes.
- **Real-time Notifications** — The Sales team gets real-time alerts when new Hot leads come in, enabling response within minutes.

## Results

The system fully automated a qualification process that used to be entirely manual. The Sales team can now focus on high-quality, pre-segmented, AI-prioritized leads.

- **90%** time saved on per-lead qualification
- **100%** automation rate across the entire pipeline
- **3x** faster response time to Hot leads
