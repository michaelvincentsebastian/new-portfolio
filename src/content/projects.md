---
projects:
  - id: "healthcare-audit-analytics"
    title: "Healthcare Audit, Compliance & Operational Risk Analytics Platform"
    tagline:
      en: "Analytics platform that turns fragmented healthcare data into standardized audit metrics, findings, and investigation worklists"
      id: "Platform analitik yang mengubah data healthcare yang fragmented menjadi audit metrics, findings, dan investigation worklists yang terstandardisasi"
    category:
      en: "Data Engineering"
      id: "Data Engineering"
    scope:
      - "Medallion Lakehouse"
      - "SQLMesh Transformation"
      - "Rule-Based Audit Engine"
      - "Data Quality & Validation"
      - "Data Serving"
      - "Data Visualizations"
    techStack:
      - "Python"
      - "SQL"
      - "DuckDB"
      - "DuckLake"
      - "SQLMesh"
      - "MinIO"
      - "PostgreSQL"
      - "FastAPI"
      - "Docker"
    cover: "/images/projects/healthcare-audit-analytics/image.jpeg"
    demo: ""
    github: "https://github.com/michaelvincentsebastian/healthcare-audit-analytics-platform"
    notionUrl: "https://tricky-haircut-92d.notion.site/Healthcare-Audit-Compliance-Operational-Risk-Analytics-217812ca09d58331a333811fcdc1e6a8"
    year: "2026"
    status: "Development"
    featured: true
    order: 1

  - id: "dafine"
    title: "dafine"
    tagline:
      en: "AI-Powered Data Cleaning & Self-Service Analytics"
      id: "Pembersihan Data Bertenaga AI & Analitik Mandiri (Self-Service Analytics)"
    category:
      en: "Data Product"
      id: "Data Product"
    scope:
      - "Automated Data Profiling"
      - "AI SQL Generation"
      - "Interactive Visualizations"
      - "Self-Service Analytics"
      - "BI Tools"
      - "Data Quality"
      - "No-code Data Processing"
    techStack:
      - "FastAPI"
      - "DuckDB"
      - "OpenRouter AI"
      - "Supabase"
      - "Vanilla JS"
    cover: "/images/projects/dafine/image.jpeg"
    demo: "https://dafine.vercel.app/frontend/login.html"
    github: "https://github.com/michaelvincentsebastian/dafine"
    notionUrl: "https://app.notion.com/p/f0f812ca09d5829db13601d7601cecb3"
    year: "2026"
    status: "Development"
    featured: true
    order: 2

  - id: "enlora"
    title: "Enlora"
    tagline:
      en: "Self-hosted, modular data platform unifying the entire data lifecycle"
      id: "Platform data self-hosted modular yang menyatukan seluruh siklus hidup data"
    category:
      en: "Data Engineering"
      id: "Data Engineering"
    scope:
      - "Lakehouse Architecture (DuckLake)"
      - "Automated Setup Wizard"
      - "Object Storage Integration"
      - "Modular Platform Design"
    techStack:
      - "PostgreSQL"
      - "MinIO"
      - "DuckDB"
      - "SQLMesh"
      - "FastAPI"
      - "React"
      - "Docker"
    cover: "/images/projects/enlora/image.jpeg"
    demo: ""
    github: "https://github.com/michaelvincentsebastian/enlora"
    notionUrl: "https://app.notion.com/p/d20812ca09d58355bde201c02856e5b6"
    year: "2026"
    status: "Development"
    featured: true
    order: 3
---

# Projects Data Source

File ini adalah satu-satunya tempat untuk mengelola seluruh data proyek portfolio.
Untuk menambah, mengubah, atau menghapus proyek, cukup edit data di blok YAML frontmatter di atas:

### Panduan Field Proyek:
- `id`: Unique identifier / slug proyek.
- `title`: Judul proyek.
- `tagline`: Deskripsi singkat atau subtitle (bisa teks biasa atau format `{ en: "...", id: "..." }`).
- `category`: Bidang/kategori proyek (contoh: "Data Engineering", "Data Product").
- `scope`: List metode/aktivitas utama proyek.
- `techStack`: List teknologi atau tools yang digunakan (opsional).
- `cover`: Path ke gambar cover proyek. Biarkan `""` jika belum ada gambar.
- `demo`: URL demo live / website aplikasi. Biarkan `""` jika tidak ada demo.
- `github`: URL repository GitHub proyek. Biarkan `""` jika repository private/tidak ada.
- `notionUrl`: URL Notion Case Study / Detail Page proyek.
- `year`: Tahun pembuatan/pengerjaan proyek.
- `status`: Status proyek (contoh: `"Completed"`, `"In Progress"`, `"Production"`).
- `featured`: `true` atau `false`.
- `order`: Nomor urutan tampilan (angka terkecil tampil paling awal).