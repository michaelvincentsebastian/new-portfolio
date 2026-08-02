// ============================================================
// src/content.config.ts
//
// Ini SATU-SATUNYA file yang berisi sedikit "TypeScript".
// Isinya cuma mendefinisikan bentuk data project (skema),
// bukan menulis project itu sendiri. Anda hampir tidak akan
// pernah perlu menyentuh file ini lagi setelah setup awal.
//
// Menambah project baru dilakukan di src/content/projects/
// dengan file Markdown biasa, BUKAN di sini.
// ============================================================

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    // Judul project
    title: z.string(),
    // Kalimat singkat 1 baris di bawah judul
    tagline: z.string(),
    // "id" dipakai untuk mengelompokkan versi EN & ID dari project yang sama
    // Contoh: futuramap.id.md dan futuramap.en.md sama-sama punya slug: "futuramap"
    projectSlug: z.string(),
    // Bahasa konten: "en" atau "id"
    lang: z.enum(["en", "id"]),
    // Tahun pengerjaan
    year: z.string(),
    // Status project
    status: z.enum(["Completed", "In Progress", "Archived"]),
    // Daftar teknologi yang dipakai, tampil sebagai badge
    techStack: z.array(z.string()),
    // Gambar cover (opsional), path relatif ke /public
    cover: z.string().optional(),
    // Link opsional
    github: z.string().optional(),
    demo: z.string().optional(),
    // Urutan tampil di halaman daftar project (angka kecil = lebih atas)
    order: z.number().default(0),
  }),
});

export const collections = { projects };
