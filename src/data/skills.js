// ============================================================
// src/data/skills.js
//
// Daftar tools/teknologi yang ditampilkan di section Skills.
// `key` harus cocok dengan key yang ada di categories pada
// src/data/i18n.js (skills.categories).
// ============================================================

export const skillsData = [
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
    key: "framework",
    items: [
      { name: "PySpark", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" },
      { name: "Pandas", icon: "/images/pandas.png" },
      { name: "PyArrow", icon: "https://arrow.apache.org/img/arrow-logo_chevrons_black-txt_white-bg.png" },
      { name: "Numpy", icon: "/images/numpy.svg" },
      { name: "Polars", icon: "https://images.seeklogo.com/logo-png/65/2/polars-logo-png_seeklogo-653265.png" },
    ],
  },
  {
    key: "databases",
    items: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "DuckDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg" },
      { name: "MySQL", icon: "/images/mariadb.webp" },
      { name: "MariaDB", icon: "/images/mariadb.webp" },
    ],
  },
  {
    key: "objectStorage",
    items: [
      { name: "MinIO", icon: "/images/minio.svg" },
      { name: "S3", icon: "/images/aws-s3.svg" },
    ],
  },
  {
    key: "orchestration",
    items: [
      { name: "n8n", icon: "/images/n8n.webp" },
      { name: "Airflow", icon: "/images/airflow.svg" },
    ],
  },
  {
    key: "cloudPlatforms",
    items: [
      { name: "AWS", icon: "/images/aws.webp" },
    ],
  },
  {
    key: "transformation",
    items: [
      { name: "dbt", icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAiZAAZAA0" },
      { name: "SQLMesh", icon: "https://cdn.prod.website-files.com/67f7cdf0feddc96ca194ff1a/67f7cdf0feddc96ca1950030_symbol-sqlmesh.svg" },
      { name: "Talend", icon: "https://upload.wikimedia.org/wikipedia/commons/7/70/TalendLogoCoral.png" },
    ],
  },
  {
    key: "communicationLayer",
    items: [
      { name: "Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
      { name: "Apache Flink", icon: "https://flink.apache.org/img/logo/png/1000/flink_squirrel_1000.png" },
    ],
  },
  {
    key: "operatingSystem",
    items: [
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Windows", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
    ],
  },
  {
    key: "dataOps",
    items: [
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "/images/github.webp" },
    ],
  },
  {
    key: "businessIntelligence",
    items: [
      { name: "Power BI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/250px-New_Power_BI_Logo.svg.png" },
      { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
    ],
  },
  {
    key: "professionalTools",
    items: [
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Notion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
      { name: "Postman", icon: "/images/postman.webp" },
      { name: "Antigravity", icon: "/images/antigravity.webp" },
    ],
  },
];
