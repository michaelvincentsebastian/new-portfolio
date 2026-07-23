// =========================================================
// PROJECTS LOADER
// Baca content/projects/manifest.json, ambil tiap file .md,
// parse frontmatter + isi, lalu render jadi project card.
//
// CARA NAMBAH PROJECT BARU (tanpa sentuh HTML/CSS/JS):
// 1. Buat file baru di content/projects/nama-project.md, isi seperti ini:
//
//      ---
//      title: Nama Project
//      status: done            <- atau "progress"
//      tags: Python, Docker, PostgreSQL
//      image: assets/images/projects/nama-file.jpg   <- kosongkan kalau tidak ada gambar
//      repo: https://github.com/username/repo         <- kosongkan kalau belum ada
//      ---
//      Deskripsi project kamu di sini, boleh beberapa kalimat.
//
// 2. Tambahkan nama file itu ke array di content/projects/manifest.json
// 3. Commit & push — selesai, tidak perlu edit apapun yang lain.
// =========================================================

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw.trim() };

  const [, frontmatter, body] = match;
  const data = {};

  frontmatter.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    data[key] = value;
  });

  return { data, content: body.trim() };
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderProjectCard({ data, content }) {
  const isDone = (data.status || "").toLowerCase() === "done";
  const tags = (data.tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const cover = data.image
    ? `<img src="${escapeHtml(data.image)}" alt="Tampilan ${escapeHtml(data.title || "")}" loading="lazy" />`
    : "";

  const repoLink = data.repo
    ? `<a href="${escapeHtml(data.repo)}" target="_blank" rel="noopener noreferrer" class="text-link">Lihat Repo →</a>`
    : "";

  const article = document.createElement("article");
  article.className = "project-card reveal";
  article.innerHTML = `
    <div class="project-card__cover ${data.image ? "" : "project-card__cover--gradient"}">
      ${cover}
      <span class="status-badge ${isDone ? "status-badge--done" : "status-badge--progress"}">
        ${isDone ? "Completed" : "In Progress"}
      </span>
    </div>
    <div class="project-card__body">
      <h3>${escapeHtml(data.title || "Untitled Project")}</h3>
      <p>${escapeHtml(content)}</p>
      <ul class="project-card__tags">
        ${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}
      </ul>
      <div class="project-card__links">${repoLink}</div>
    </div>
  `;
  return article;
}

async function loadProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  try {
    const manifestRes = await fetch("content/projects/manifest.json");
    const filenames = await manifestRes.json();

    const files = await Promise.all(
      filenames.map((name) => fetch(`content/projects/${name}`).then((r) => r.text()))
    );

    grid.innerHTML = "";
    files.map(parseFrontmatter).forEach((parsed) => {
      const card = renderProjectCard(parsed);
      grid.appendChild(card);
      // Daftarkan ke IntersectionObserver reveal & scrollspy kalau sudah di-init
      if (window.__revealObserver) window.__revealObserver.observe(card);
    });
  } catch (err) {
    grid.innerHTML = `<p style="color:var(--text-muted)">Gagal memuat daftar project. Coba refresh halaman.</p>`;
    console.error("Gagal memuat project:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadProjects);
