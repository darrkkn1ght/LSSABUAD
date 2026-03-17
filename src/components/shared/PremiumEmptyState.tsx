import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PremiumEmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: React.ReactNode;
}

export function PremiumEmptyState({ icon: Icon, title, message, action }: PremiumEmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center glass-panel rounded-3xl border-white/5 bg-secondary/5"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
        <div className="relative h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center border border-white/10 shadow-2xl">
          <Icon className="h-10 w-10 text-primary" />
        </div>
      </div>
      
      <h3 className="font-display font-bold text-2xl text-secondary mb-3">
        {title}
      </h3>
      
      <p className="text-secondary/60 font-body italic max-w-md mx-auto mb-8 leading-relaxed">
        "{message}"
      </p>
      
      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
