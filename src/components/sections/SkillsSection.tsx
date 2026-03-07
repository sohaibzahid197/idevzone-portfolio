'use client';

import { motion } from 'framer-motion';
import { Code, Smartphone, Server, Database, Wrench } from 'lucide-react';
import { skills } from '@/lib/data';

const categoryConfig = {
  frontend: { icon: Code, label: 'Frontend', color: '#3b82f6' },
  mobile: { icon: Smartphone, label: 'Mobile', color: '#a855f7' },
  backend: { icon: Server, label: 'Backend', color: '#22c55e' },
  database: { icon: Database, label: 'Database', color: '#f59e0b' },
  tools: { icon: Wrench, label: 'Tools & Tech', color: '#6366f1' }
};

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="section-padding bg-[#0f0f0f] relative">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            What I Work With
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(Object.entries(skillsByCategory) as [string, typeof skills][]).map(([category, categorySkills]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            const IconComponent = config.icon;

            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-[#111] rounded-xl border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="p-2.5 rounded-lg"
                      style={{ backgroundColor: `${config.color}15` }}
                    >
                      <IconComponent className="w-5 h-5" style={{ color: config.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {config.label}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: config.color }}
                        />
                        <span className="text-neutral-300 text-sm font-medium">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
