// =========================================================
// 1. THEME TOGGLE (dark/light, disimpan di localStorage)
// =========================================================
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", current);
  localStorage.setItem("theme", current);
});

// =========================================================
// 2. MOBILE MENU TOGGLE
// =========================================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// =========================================================
// 3. SCROLLSPY — highlight menu sesuai section yang aktif
// =========================================================
const sections = document.querySelectorAll("main .section[id]");
const navItems = document.querySelectorAll(".nav-link");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);
sections.forEach((section) => spyObserver.observe(section));

// =========================================================
// 4. SCROLL REVEAL — fade-in elemen saat masuk viewport
// =========================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
window.__revealObserver = revealObserver; // dipakai oleh js/projects.js untuk card yang di-render belakangan

// =========================================================
// 5. FOOTER YEAR
// =========================================================
document.getElementById("year").textContent = new Date().getFullYear();

// =========================================================
// 6. CONTACT FORM -> WEB3FORMS (tanpa server/backend)
// =========================================================
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Mengirim...";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const payload = {
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    message: form.querySelector('[name="message"]').value,
    botcheck: form.querySelector('[name="botcheck"]').checked,
  };

  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.success) {
      formStatus.textContent = "Pesan terkirim! Terima kasih, saya akan segera membalas.";
      formStatus.className = "form-status success";
      form.reset();
    } else {
      throw new Error(data.message || "Gagal mengirim");
    }
  } catch (err) {
    formStatus.textContent = "Gagal mengirim pesan. Coba lagi sebentar lagi.";
    formStatus.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Kirim Pesan";
  }
});

// =========================================================
// 7. PARTICLE BACKGROUND (canvas, ringan, tanpa library)
// =========================================================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let animId;

const colors = ["#06b6d4", "#22d3ee", "#0891b2", "#67e8f9"];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

function initParticles() {
  particles = [];
  const count = Math.min(60, Math.floor(window.innerWidth / 25));
  for (let i = 0; i < count; i++) particles.push(createParticle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fill();
  });

  ctx.globalAlpha = 0.05;
  ctx.strokeStyle = "#06b6d4";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  animId = requestAnimationFrame(animate);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

resize();
initParticles();
if (!reduceMotion) animate();

window.addEventListener("resize", () => {
  resize();
  initParticles();
});
