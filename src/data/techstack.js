// ============================================================
// src/data/techstack.js
//
// Daftar tools/teknologi yang ditampilkan di section Tech Stack.
// Mau tambah/hapus/ganti tool? Edit array di bawah ini.
//
// `key` harus cocok dengan key yang ada di categories pada
// src/data/i18n.js (techStack.categories) supaya labelnya
// otomatis ikut bahasa yang aktif.
// ============================================================

export const techStackData = [
  {
    key: "programmingLanguages",
    items: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
    ],
  },
  {
    key: "dataStorage",
    items: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "DuckDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg" },
      { name: "MinIO", icon: "/images/minio.svg" },
      { name: "DuckLake", icon: "https://ducklake.select/images/logo/DuckLake-dark-icon.png" },
    ],
  },
  {
    key: "dataOrchestration",
    items: [
      { name: "n8n", icon: "/images/n8n.webp" },
      { name: "Airflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg", soon: true },
    ],
  },
  {
    key: "dataTransformation",
    items: [
      { name: "dbt", icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAiZAAZAA0", soon: true },
      { name: "SQLMesh", icon: "https://cdn.prod.website-files.com/67f7cdf0feddc96ca194ff1a/67f7cdf0feddc96ca1950030_symbol-sqlmesh.svg" },
      { name: "Talend", icon: "https://upload.wikimedia.org/wikipedia/commons/7/70/TalendLogoCoral.png" },
      { name: "Apache Spark", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg", soon: true },
    ],
  },
  {
    key: "dataIngestion",
    items: [
      { name: "Airbyte", icon: "/images/airbyte.png", soon: true },
      { name: "Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg", soon: true },
      { name: "Python Script", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
  {
    key: "cloudPlatforms",
    items: [{ name: "AWS S3", icon: "/images/aws-s3.svg" }],
  },
  {
    key: "dataVisualization",
    items: [
      { name: "Power BI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/250px-New_Power_BI_Logo.svg.png" },
      { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
    ],
  },
  {
    key: "professionalTools",
    items: [
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Notion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
    ],
  },
];
