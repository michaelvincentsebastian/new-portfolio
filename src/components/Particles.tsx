import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = ["#06b6d4", "#22d3ee", "#0891b2", "#67e8f9"];

    function hexToRgba(hex: string, alpha: number): string {
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function init() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Adjust particle count dynamically based on width
      const count = Math.floor(Math.min(60, window.innerWidth / 25));
      particles = [];

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.0 + 0.5; // 0.5px to 2.5px
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // slow random movement
          vy: (Math.random() - 0.5) * 0.3,
          size: size,
          opacity: Math.random() * 0.6 + 0.2, // opacity between 0.2 and 0.8
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection network lines first (under the particles)
      const particleCount = particles.length;
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if particles are closer than 150px
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.05; // opacity around 0.05
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update each particle
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles to the opposite side if they go out of bounds
        if (p.x < -p.size) p.x = canvas.width + p.size;
        else if (p.x > canvas.width + p.size) p.x = -p.size;

        if (p.y < -p.size) p.y = canvas.height + p.size;
        else if (p.y > canvas.height + p.size) p.y = -p.size;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, p.opacity);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    function handleResize() {
      init();
    }

    // Attach resize listener
    window.addEventListener("resize", handleResize);

    // Initial setup
    init();
    draw();

    // Clean up function to prevent overlapping loops if page swaps or component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default Particles;
