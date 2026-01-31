import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import * as React from "react";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className }: SectionProps) {
  const containerVariants = {
    hidden: { 
      opacity: 0.01, 
      y: 30,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0.01, 
      y: 20,
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id={id} className={cn("py-20 md:py-32 px-6", className)}>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {(title || subtitle) && (
          <div className="mb-12 md:mb-16 space-y-3">
            {title && (
              <motion.h2 
                variants={itemVariants}
                className="text-2xl md:text-3xl font-sans font-semibold text-foreground tracking-tight"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                variants={itemVariants}
                className="text-muted-foreground text-base md:text-lg font-normal opacity-80"
              >
                {subtitle}
              </motion.p>
            )}
            <motion.div 
              variants={itemVariants}
              className="h-0.5 w-12 bg-primary/20 rounded-full mt-4" 
            />
          </div>
        )}
        <motion.div variants={itemVariants} className="space-y-10">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
