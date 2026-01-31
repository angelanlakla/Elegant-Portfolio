import { useEffect, useRef } from "react";

export function ParticleText({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 100, active: false };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      baseColor: string;
      activeColor: string;
      vx: number;
      vy: number;
      friction: number;
      ease: number;
      isCenter: boolean;
      shakeOffset: { x: number; y: number };

      constructor(x: number, y: number, centerX: number, centerY: number, densityVal: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = 0;
        this.vy = 0;
        this.isCenter = densityVal > 200;
        this.size = this.isCenter ? 1.4 : 0.8;
        
        // Brand Colors: Primary #5F7285 (Grayish blue), Warm Highlight (Soft Amber/Rose tint)
        this.baseColor = this.isCenter ? "hsla(210, 17%, 45%, 1)" : "hsla(214, 20%, 74%, 0.4)";
        // Warm color for active state: slightly more saturation and warmer hue
        this.activeColor = this.isCenter ? "hsla(30, 20%, 60%, 1)" : "hsla(30, 25%, 85%, 0.8)";
        this.color = this.baseColor;
        this.ease = 0.08;
        this.friction = 0.92;
        this.shakeOffset = { x: 0, y: 0 };
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Slightly denser size when active to suggest "re-arrangement" and "understanding"
        const currentSize = mouse.active ? this.size * 1.1 : this.size;
        ctx.arc(this.x + this.shakeOffset.x, this.y + this.shakeOffset.y, currentSize, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update(time: number) {
        // Subtle Breathing
        const breatheX = Math.sin(time * 0.001 + this.baseX * 0.05) * 0.3;
        const breatheY = Math.cos(time * 0.001 + this.baseY * 0.05) * 0.3;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius && mouse.active) {
          // Hover: Move slightly towards the baseline/re-arranging, not pushed away
          // This creates the "gathering" or "being understood" feeling
          const force = (mouse.radius - distance) / mouse.radius;
          
          // Re-arrangement logic: pull towards baseX/baseY but with a slight bias towards mouse
          // instead of simple repulsion
          const targetX = this.baseX + (dx * 0.1);
          const targetY = this.baseY + (dy * 0.1);
          
          const dxTarget = targetX - this.x;
          const dyTarget = targetY - this.y;
          
          this.vx += dxTarget * 0.05;
          this.vy += dyTarget * 0.05;
          
          // Transition to warm color
          this.color = this.activeColor;
        } else {
          // Return with ease
          const dxBase = this.baseX - this.x + breatheX;
          const dyBase = this.baseY - this.y + breatheY;
          this.vx += dxBase * this.ease;
          this.vy += dyBase * this.ease;
          this.color = this.baseColor;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
      }
    }

    const init = () => {
      particles = [];
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.font = "600 72px 'Inter'";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, centerX, centerY);
      
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      ctx.clearRect(0, 0, width, height);

      const step = 4; 
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 128) {
            particles.push(new Particle(x, y, centerX, centerY, data[index + 3]));
          }
        }
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
        const container = canvas.parentElement;
        if (!container) return;
        canvas.width = container.clientWidth;
        canvas.height = 120;
        init();
    }

    handleResize();
    requestAnimationFrame(animate);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [text]);

  return (
    <div className="w-full max-w-[600px] mx-auto h-[120px] relative">
        <canvas ref={canvasRef} className="w-full h-full cursor-default" />
    </div>
  );
}
