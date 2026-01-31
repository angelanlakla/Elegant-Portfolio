import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React, { useRef, useState } from "react";

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  description?: string;
  achievements?: string[];
  type?: string;
}

export function ExperienceCard({ company, role, period, description, achievements, type }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="spotlight-card rounded-xl p-6 md:p-8 transition-all group relative ml-4 md:ml-0"
      style={{
        "--mouse-x": `${position.x}px`,
        "--mouse-y": `${position.y}px`,
        "--active": opacity,
      } as React.CSSProperties}
    >
      {/* Vertical Timeline Linkage */}
      <div className="absolute -left-[33px] md:-left-[41px] top-0 bottom-0 w-[2px] bg-primary/10 hidden md:block" />
      <div className="absolute -left-[37px] md:-left-[45px] top-8 w-3 h-3 rounded-full bg-primary border-4 border-background hidden md:block" />

      <div className="md:grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 relative z-20">
        {/* Left Column: Meta Info */}
        <div className="mb-4 md:mb-0 md:text-right space-y-1">
          <h3 className="text-lg font-semibold text-foreground font-sans">{company}</h3>
          <div className="flex flex-wrap md:justify-end gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wider">
            <span className="inline-flex items-center gap-1">
              {period}
            </span>
          </div>
          {type && (
            <Badge variant="secondary" className="mt-2 font-normal text-[10px] px-2 py-0 h-5 bg-secondary text-secondary-foreground border-none">
              {type}
            </Badge>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="space-y-3 pb-10 md:pb-0">
          <h4 className="text-base font-medium text-primary/90">{role}</h4>
          {description && (
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
          {achievements && achievements.length > 0 && (
            <ul className="space-y-2">
              {achievements.map((item, index) => (
                <li key={index} className="text-muted-foreground/90 text-sm leading-relaxed flex items-start gap-2">
                  <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
