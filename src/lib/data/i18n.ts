// ============================================================
// src/lib/data/i18n.ts
//
// Semua teks yang tampil di situs, dalam 2 bahasa (EN & ID).
// ============================================================

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    journey: string;
    contact: string;
  };
  home: {
    greeting: string;
    name: string;
    position: string;
    description: string;
    resumeBtn: string;
    contactBtn: string;
    locationLabel: string;
    locationTitle: string;
    locationDetail: string;
  };
  about: {
    title: string;
    titleAccent: string;
    tabLabels: string[];
    paragraphs: string[];
  };
  skills: {
    title: string;
    titleAccent: string;
    description: string;
    categories: Record<string, string>;
  };
  projects: {
    title: string;
    titleAccent: string;
    description: string;
    filterFieldLabel: string;
    filterScopeLabel: string;
    allFields: string;
    allScopes: string;
    viewProject: string;
    viewNotion: string;
    viewAll: string;
    backToProjects: string;
    role: string;
    status: string;
    year: string;
    links: string;
    viewOnGithub: string;
    liveDemo: string;
    resultsCount: string;
    noResultsTitle: string;
    noResultsDesc: string;
    clearFilter: string;
  };
  journey: {
    title: string;
    titleAccent: string;
    description: string;
    timelineTitle: string;
    items: Array<{
      id: string;
      date: string;
      title: string;
      description: string;
    }>;
    awardsTitle: string;
    awardsTitleAccent: string;
    awards: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    title: string;
    titleAccent: string;
    description: string;
    sendMessage: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sending: string;
    successMsg: string;
    errorMsg: string;
    contactInfo: string;
    phone: string;
    phoneLabel: string;
    location: string;
    locationLabel: string;
    socialMedia: string;
    connectMessage: string;
  };
  footer: {
    rights: string;
  };
}

export const translations: Record<'en' | 'id', Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      journey: "Journey",
      contact: "Contact",
    },
    home: {
      greeting: "Hi,",
      name: "I'm Vincent",
      position: "Analytics Engineer Intern @ PT. Data Andalan Utama",
      description:
        "Passionate <strong>Analytics Engineer Intern</strong> focused on transforming business requirements into scalable analytics solutions. I design and build end-to-end data platforms—from understanding business domains and engineering lakehouse architectures to developing reliable data pipelines, business-ready datasets, APIs, and analytics applications that enable data-driven decision-making.",
      resumeBtn: "Download Resume",
      contactBtn: "Contact Me",
      locationLabel: "Semarang, Indonesia",
      locationTitle: "Current Location",
      locationDetail: "Semarang, Central Java, Indonesia",
    },
    about: {
      title: "About",
      titleAccent: "Me",
      tabLabels: ["Who I Am", "Current Role", "Goal & Focus"],
      paragraphs: [
        "Hi! I'm Michael Vincent Sebastian Handojo, a Computer Science student at BINUS Online with a strong interest in Data and Artificial Intelligence. I believe that valuable data is more than just collected—it should be transformed into solutions that solve business problems and support informed decision-making.",
        "As an Analytics Engineer Intern, I design and develop end-to-end analytics solutions, from understanding business requirements and application domains to designing data storage architectures, building data pipelines, transforming business data, and delivering dashboards and analytics applications.",
        "I am passionate about exploring modern data technologies, particularly lakehouse architectures, data platforms, and AI-driven analytics. My goal is to build intelligent, scalable, and impactful data solutions by combining data engineering, analytics, and artificial intelligence."
      ],
    },
    skills: {
      title: "Skills",
      titleAccent: "",
      description:
        "The terminology and tools that I use and have experience in to build an end-to-end data solution.",
      categories: {
        programmingLanguages: "Programming Language",
        framework: "Framework",
        databases: "Databases",
        objectStorage: "Object Storage",
        orchestration: "Orchestration",
        cloudPlatforms: "Cloud Platform",
        transformation: "Transformation",
        communicationLayer: "Streaming & Messaging",
        operatingSystem: "Operating System",
        dataOps: "DataOps",
        businessIntelligence: "Business Intelligence",
        professionalTools: "Other Tools",
      },
    },
    projects: {
      title: "Selected",
      titleAccent: "Works",
      description:
        "A curated collection of analytics engineering projects focusing on scalable data pipelines and robust visualization architectures.",
      filterFieldLabel: "Field / Domain",
      filterScopeLabel: "Technical Scope",
      allFields: "All Fields",
      allScopes: "All Scopes",
      viewProject: "View Details",
      viewNotion: "Case Study",
      viewAll: "View All Projects",
      backToProjects: "Back to all projects",
      role: "Role",
      status: "Status",
      year: "Year",
      links: "Links",
      viewOnGithub: "View on GitHub",
      liveDemo: "Live Demo",
      resultsCount: "Showing {count} projects",
      noResultsTitle: "No projects found",
      noResultsDesc: "Try adjusting your filter selection.",
      clearFilter: "Reset Filters",
    },
    journey: {
      title: "Journey",
      titleAccent: "",
      description: "A timeline of my educational and professional milestones and key recognitions.",
      timelineTitle: "Experience",
      items: [
        {
          id: "smk_nusaputera",
          date: "Jul 2023 - May 2026",
          title: "TKJ - SMK Nusaputera 1 Semarang",
          description: "Computer Network and Telecommunication Engineering student",
        },
        {
          id: "osis_president",
          date: "Oct 2024 - Sept 2025",
          title: "Student Council President",
          description: "Elected as President of the Student Council at SMK Nusaputera 1 Semarang",
        },
        {
          id: "internship_analytics",
          date: "Nov 2025 - Present",
          title: "Analytics Engineer Intern",
          description: "PT. Data Andalan Utama",
        },
        {
          id: "binus_online",
          date: "Aug 2026 - Jul 2030",
          title: "Computer Science - BINUS Online",
          description: "Undergraduate student majoring in Computer Science",
        },
      ],
      awardsTitle: "Awards &",
      awardsTitleAccent: "Medals",
      awards: [
        {
          title: "3rd Place - GESIT Binus University",
          description: "Ideation category at GESIT event by Binus University @Semarang",
        },
        {
          title: "Gold Medal - KSAN Informatics",
          description: "Gold Medal in the National Science Competition (KSAN) for Informatics",
        },
        {
          title: "Samsung Solve for Tomorrow - Semifinalist",
          description: "Semifinalist in Samsung Solve for Tomorrow national competition",
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
      about: "Tentang",
      skills: "Skills",
      projects: "Proyek",
      journey: "Perjalanan",
      contact: "Kontak",
    },
    home: {
      greeting: "Hai,",
      name: "Saya Vincent",
      position: "Analytics Engineer Intern @ PT. Data Andalan Utama",
      description:
        "Seorang <strong>Analytics Engineer Intern</strong> yang berfokus pada transformasi kebutuhan bisnis menjadi solusi analitik yang skalabel. Berpengalaman merancang dan membangun platform data end-to-end, mulai dari memahami domain bisnis, membangun arsitektur lakehouse, mengembangkan data pipeline yang andal, memodelkan dataset yang siap digunakan untuk kebutuhan bisnis, hingga menyediakan API dan aplikasi analitik yang mendukung pengambilan keputusan berbasis data.",
      resumeBtn: "Unduh Resume",
      contactBtn: "Hubungi Saya",
      locationLabel: "Semarang, Indonesia",
      locationTitle: "Lokasi Saat Ini",
      locationDetail: "Semarang, Jawa Tengah, Indonesia",
    },
    about: {
      title: "Tentang",
      titleAccent: "Saya",
      tabLabels: ["Tentang Saya", "Peran Saat Ini", "Fokus & Tujuan"],
      paragraphs: [
        "Hi! Saya Michael Vincent Sebastian Handojo, merupakan mahasiswa BINUS Online Program Studi Teknik Informatika yang memiliki minat pada bidang Data dan Artificial Intelligence. Saya percaya bahwa data yang bernilai bukan hanya sekadar dikumpulkan, tetapi juga diolah menjadi solusi yang mampu menjawab kebutuhan bisnis dan mendukung pengambilan keputusan.",
        "Saat ini saya memiliki pengalaman sebagai Analytics Engineer Intern, dengan tanggung jawab merancang dan membangun solusi analitik secara end-to-end. Mulai dari memahami kebutuhan bisnis dan domain aplikasi, merancang arsitektur penyimpanan, membangun data pipeline, melakukan transformasi data berbasis logika bisnis, hingga mengembangkan dashboard dan aplikasi analitik yang dapat digunakan oleh pengguna.",
        "Saya senang mempelajari teknologi baru, terutama yang berkaitan dengan modern data platform, lakehouse architecture, data engineering, serta penerapan Artificial Intelligence dalam ekosistem data. Ke depan, saya ingin mengembangkan solusi yang menggabungkan data engineering, analytics, dan AI untuk menghasilkan sistem yang lebih cerdas, efisien, dan memberikan dampak nyata bagi organisasi."
      ],
    },
    skills: {
      title: "Skills",
      titleAccent: "",
      description:
        "Terminologi dan alat yang saya gunakan serta saya kuasai untuk membangun data solution dari ujung ke ujung.",
      categories: {
        programmingLanguages: "Programming Language",
        framework: "Framework",
        databases: "Databases",
        objectStorage: "Object Storage",
        orchestration: "Orchestration",
        cloudPlatforms: "Cloud Platform",
        transformation: "Transformasi",
        communicationLayer: "Streaming & Messaging",
        operatingSystem: "Sistem Operasi",
        dataOps: "DataOps",
        businessIntelligence: "Business Intelligence",
        professionalTools: "Other Tools",
      },
    },
    projects: {
      title: "Pilihan",
      titleAccent: "Karya",
      description: "Pilihan karya terbaik saya, dari pipeline data hingga sistem analitik cerdas.",
      filterFieldLabel: "Bidang / Domain",
      filterScopeLabel: "Technical Scope",
      allFields: "Semua Bidang",
      allScopes: "Semua Scope",
      viewProject: "Lihat Detail",
      viewNotion: "Detail Proyek",
      viewAll: "Lihat Semua Proyek",
      backToProjects: "Kembali ke semua proyek",
      role: "Peran",
      status: "Status",
      year: "Tahun",
      links: "Tautan",
      viewOnGithub: "Lihat di GitHub",
      liveDemo: "Live Demo",
      resultsCount: "Menampilkan {count} proyek",
      noResultsTitle: "Proyek tidak ditemukan",
      noResultsDesc: "Coba ubah opsi filter bidang atau technical scope.",
      clearFilter: "Reset Filter",
    },
    journey: {
      title: "Journey",
      titleAccent: "",
      description: "Timeline pencapaian pendidikan, profesional, dan prestasi saya.",
      timelineTitle: "Pengalaman",
      items: [
        {
          id: "smk_nusaputera",
          date: "Jul 2023 - Mei 2026",
          title: "TKJ - SMK Nusaputera 1 Semarang",
          description: "Siswa Teknik Komputer Jaringan & Telekomunikasi",
        },
        {
          id: "osis_president",
          date: "Okt 2024 - Sept 2025",
          title: "Ketua OSIS",
          description: "Terpilih sebagai Ketua OSIS SMK Nusaputera 1 Semarang",
        },
        {
          id: "internship_analytics",
          date: "Nov 2025 - Sekarang",
          title: "Magang Analytics Engineer",
          description: "PT. Data Andalan Utama",
        },
        {
          id: "binus_online",
          date: "Agu 2026 - Jul 2030",
          title: "Teknik Informatika - BINUS Online",
          description: "Mahasiswa program kelas online di Universitas Bina Nusantara",
        },
      ],
      awardsTitle: "Penghargaan &",
      awardsTitleAccent: "Medali",
      awards: [
        {
          title: "Juara 3 - GESIT Binus University",
          description: "Ideation category di acara GESIT Binus University @Semarang",
        },
        {
          title: "Medali Emas - KSAN Informatika",
          description: "Medali Emas di Kompetisi Sains Nasional (KSAN) bidang Informatika",
        },
        {
          title: "Samsung Solve for Tomorrow - Semifinalis",
          description: "Semifinalis kompetisi nasional Samsung Solve for Tomorrow",
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

export function t(lang: string): Translations {
  return translations[lang === 'id' ? 'id' : 'en'];
}
