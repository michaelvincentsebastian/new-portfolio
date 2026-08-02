// ============================================================
// src/data/i18n.js
//
// Semua teks yang tampil di situs, dalam 2 bahasa.
// File JavaScript BIASA, tidak ada TypeScript sama sekali.
//
// Mau ganti nama, deskripsi, nomor telepon, dll? Edit langsung
// di sini. Tidak perlu paham "type" atau "interface".
// ============================================================

export const translations = {
  en: {
    nav: {
      home: "Home",
      techStack: "Tech Stack",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    home: {
      greeting: "Hi,",
      name: "I'm Vincent",
      position: "Data Engineer Intern @ PT. Data Andalan Utama",
      description:
        "Passionate Data Engineer dedicated to turning raw, messy data into high-performance pipelines and actionable insights. I bridge the gap between complex data infrastructure and strategic decision-making, ensuring data is not just stored, but empowered to drive business growth.",
      resumeBtn: "Download Resume",
      contactBtn: "Contact Me",
      whatILikeTitle: "Tagline",
      tags: [
        "Data Architecture",
        "Data Pipeline",
        "Data Transformation",
        "Intelligent Systems",
        "ETL/ELT",
        "Analytics Dashboard",
        "On-Premises",
      ],
    },
    techStack: {
      title: "Tech Stack",
      titleAccent: "& Tools",
      description:
        "The choice of technology and tools that I use to build robust data pipelines and elegant systems",
      categories: {
        programmingLanguages: "PROGRAMMING LANGUAGES",
        dataStorage: "DATA STORAGE",
        dataOrchestration: "DATA ORCHESTRATION",
        dataTransformation: "DATA TRANSFORMATION",
        dataIngestion: "DATA INGESTION",
        cloudPlatforms: "CLOUD PLATFORMS",
        dataVisualization: "DATA VISUALIZATION",
        professionalTools: "PROFESSIONAL TOOLS",
      },
    },
    projects: {
      title: "My",
      titleAccent: "Projects",
      description:
        "A handpicked selection of my work, from data pipelines to intelligent systems",
      viewProject: "View Details",
      viewAll: "View All Projects",
      backToProjects: "Back to all projects",
      role: "Role",
      status: "Status",
      year: "Year",
      techStackLabel: "Tech Stack",
      links: "Links",
      viewOnGithub: "View on GitHub",
      liveDemo: "Live Demo",
    },
    experience: {
      title: "My",
      titleAccent: "Journey",
      description: "A timeline of my educational and professional milestones",
      items: [
        {
          date: "Jul 2023",
          title: "Enrolled at SMK Nusaputera 1 Semarang",
          description:
            "Started my vocational high school journey in Computer Network and Telecommunication Engineering",
        },
        {
          date: "Oct 2024",
          title: "Student Council President",
          description:
            "Elected as President of the Student Council at SMK Nusaputera 1 Semarang (Oct 2024 - Sept 2025)",
        },
        {
          date: "Oct 2024",
          title: "3rd Place - GESIT Binus University",
          description:
            "Won 3rd place in the Ideation category at GESIT event held by Binus University @Semarang",
        },
        {
          date: "Dec 2024",
          title: "Gold Medal - KSAN Informatics",
          description:
            "Achieved a Gold Medal in the National Science Competition (KSAN) for Informatics",
        },
        {
          date: "Oct 2025",
          title: "Samsung Solve for Tomorrow - Semifinalist",
          description:
            "Reached the semifinal round in the Samsung Solve for Tomorrow competition",
        },
        {
          date: "Nov 2025 - Present",
          title: "Data Engineer Intern",
          description:
            "Currently interning as a Data Engineer at PT. Data Andalan Utama",
        },
      ],
    },
    contact: {
      title: "Keep in",
      titleAccent: "Touch",
      description:
        "Open for new opportunities and collaborations. Drop me a message and I'll get back to you as soon as possible.",
      sendMessage: "Send Message",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Project Inquiry",
      messageLabel: "Your Message",
      messagePlaceholder: "Write your message here...",
      sendBtn: "Send Message",
      sending: "Sending...",
      successMsg: "Message sent! I'll get back to you soon.",
      errorMsg: "Something went wrong. Please try again or email me directly.",
      contactInfo: "Contact Information",
      phone: "+62 878 9663 0757",
      phoneLabel: "Phone Number",
      location: "Semarang, Central Java, Indonesia",
      locationLabel: "Location",
      socialMedia: "Social Media",
      connectMessage:
        "Feel free to reach out to me through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      techStack: "Tech Stack",
      projects: "Proyek",
      experience: "Pengalaman",
      contact: "Kontak",
    },
    home: {
      greeting: "Hai,",
      name: "Saya Vincent",
      position: "Data Engineer Intern @ PT. Data Andalan Utama",
      description:
        "Data Engineer yang berdedikasi mengubah data mentah dan berantakan menjadi pipeline berkinerja tinggi dan wawasan yang dapat ditindaklanjuti. Saya menjembatani kesenjangan antara infrastruktur data yang kompleks dan pengambilan keputusan strategis, memastikan data tidak hanya disimpan, tetapi diberdayakan untuk mendorong pertumbuhan bisnis.",
      resumeBtn: "Unduh Resume",
      contactBtn: "Hubungi Saya",
      whatILikeTitle: "Tagline",
      tags: [
        "Arsitektur Data",
        "Pipeline Data",
        "Transformasi Data",
        "Sistem Cerdas",
        "ETL/ELT",
        "Dashboard Analitik",
        "On-Premises",
      ],
    },
    techStack: {
      title: "Tech Stack",
      titleAccent: "& Tools",
      description:
        "Pilihan teknologi dan alat yang saya gunakan untuk membangun pipeline data yang tangguh dan sistem yang elegan",
      categories: {
        programmingLanguages: "BAHASA PEMROGRAMAN",
        dataStorage: "PENYIMPANAN DATA",
        dataOrchestration: "ORKESTRASI DATA",
        dataTransformation: "TRANSFORMASI DATA",
        dataIngestion: "INGESTI DATA",
        cloudPlatforms: "PLATFORM CLOUD",
        dataVisualization: "VISUALISASI DATA",
        professionalTools: "ALAT PROFESIONAL",
      },
    },
    projects: {
      title: "Proyek",
      titleAccent: "Saya",
      description: "Pilihan karya terbaik saya, dari pipeline data hingga sistem cerdas",
      viewProject: "Lihat Detail",
      viewAll: "Lihat Semua Proyek",
      backToProjects: "Kembali ke semua proyek",
      role: "Peran",
      status: "Status",
      year: "Tahun",
      techStackLabel: "Tech Stack",
      links: "Tautan",
      viewOnGithub: "Lihat di GitHub",
      liveDemo: "Live Demo",
    },
    experience: {
      title: "Perjalanan",
      titleAccent: "Saya",
      description: "Timeline pencapaian pendidikan dan profesional saya",
      items: [
        {
          date: "Jul 2023",
          title: "Masuk SMK Nusaputera 1 Semarang",
          description:
            "Memulai perjalanan SMK di bidang Teknik Komputer dan Jaringan Telekomunikasi",
        },
        {
          date: "Okt 2024",
          title: "Ketua OSIS",
          description: "Terpilih sebagai Ketua OSIS SMK Nusaputera 1 Semarang (Okt 2024 - Sept 2025)",
        },
        {
          date: "Okt 2024",
          title: "Juara 3 - GESIT Binus University",
          description: "Meraih Juara 3 kategori Ideation di acara GESIT Binus University @Semarang",
        },
        {
          date: "Des 2024",
          title: "Medali Emas - KSAN Informatika",
          description: "Meraih Medali Emas di Kompetisi Sains Nasional (KSAN) bidang Informatika",
        },
        {
          date: "Okt 2025",
          title: "Samsung Solve for Tomorrow - Semifinalis",
          description: "Mencapai babak semifinal kompetisi Samsung Solve for Tomorrow",
        },
        {
          date: "Nov 2025 - Sekarang",
          title: "Data Engineer Intern",
          description: "Saat ini magang sebagai Data Engineer di PT. Data Andalan Utama",
        },
      ],
    },
    contact: {
      title: "Tetap",
      titleAccent: "Terhubung",
      description:
        "Terbuka untuk peluang dan kolaborasi baru. Kirimkan pesan dan saya akan membalas sesegera mungkin.",
      sendMessage: "Kirim Pesan",
      emailLabel: "Alamat Email",
      emailPlaceholder: "anda@contoh.com",
      subjectLabel: "Subjek",
      subjectPlaceholder: "Pertanyaan Proyek",
      messageLabel: "Pesan Anda",
      messagePlaceholder: "Tulis pesan Anda di sini...",
      sendBtn: "Kirim Pesan",
      sending: "Mengirim...",
      successMsg: "Pesan terkirim! Saya akan segera membalas.",
      errorMsg: "Terjadi kesalahan. Coba lagi atau email saya langsung.",
      contactInfo: "Informasi Kontak",
      phone: "+62 878 9663 0757",
      phoneLabel: "Nomor Telepon",
      location: "Semarang, Jawa Tengah, Indonesia",
      locationLabel: "Lokasi",
      socialMedia: "Media Sosial",
      connectMessage:
        "Jangan ragu untuk menghubungi saya melalui platform ini. Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda.",
    },
    footer: {
      rights: "Hak cipta dilindungi.",
    },
  },
};

// Helper kecil: ambil teks sesuai locale aktif
export function t(lang) {
  return translations[lang] ?? translations.en;
}
