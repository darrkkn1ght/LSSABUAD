import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
  showBlur?: boolean;
}

export function PageHero({ 
  title, 
  subtitle, 
  backgroundImage = '/law-library.png', 
  className,
  showBlur = true 
}: PageHeroProps) {
  return (
    <section className={cn("relative min-h-[40vh] flex items-center bg-secondary overflow-hidden", className)}>
      {/* Background with Parallax effect (subtle) */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      
      {/* Decorative Gradients */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-secondary/40 via-secondary/80 to-secondary" />
      {showBlur && (
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 z-10" />
      )}

      <div className="container relative z-20 pt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-0.5 bg-primary mb-6" 
          />
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="font-display font-bold text-4xl md:text-7xl text-white mb-6 leading-tight tracking-tight"
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-white/60 text-lg md:text-xl font-body italic max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Subtle Scroll Hint or Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
