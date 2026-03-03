import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/utils';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon: Icon, href, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link
        to={href}
        className="glass-card glass-card-hover p-6 flex flex-col items-center text-center h-full group"
      >
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
          color || "bg-accent-purple/20 text-accent-purple"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-accent-purple transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-center text-accent-purple text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          Try it now →
        </div>
      </Link>
    </motion.div>
  );
};
