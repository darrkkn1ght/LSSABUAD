import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-secondary py-20 md:py-28 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay grayscale"
        style={{ backgroundImage: "url('/law-library.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-secondary" />
      <div className="container relative z-10 text-center">
        <div className="w-16 h-0.5 bg-primary mx-auto mb-4" />
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display font-bold text-3xl md:text-5xl text-white mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
