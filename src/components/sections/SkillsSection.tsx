'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Smartphone, Server, Database, Wrench, Star } from 'lucide-react';
import { skills } from '@/lib/data';
import { useRef } from 'react';

const categoryIcons = {
  frontend: Code,
  mobile: Smartphone,
  backend: Server,
  database: Database,
  tools: Wrench
};

const categoryLabels = {
  frontend: 'Frontend',
  mobile: 'Mobile Development',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & Technologies'
};

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  mobile: 'from-purple-500 to-pink-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-orange-500 to-red-500',
  tools: 'from-indigo-500 to-blue-500'
};

const skillLevels = {
  'React': 95,
  'Next.js': 90,
  'TypeScript': 88,
  'Tailwind CSS': 92,
  'JavaScript': 85,
  'React Native': 80,
  'Expo': 75,
  'Node.js': 85,
  'Express.js': 80,
  'Python': 75,
  'MongoDB': 82,
  'PostgreSQL': 78,
  'Git': 90,
  'Docker': 70,
  'AWS': 65
};

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section ref={containerRef} id="skills" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-lg" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I work with to create exceptional digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            const colorClass = categoryColors[category as keyof typeof categoryColors];
            
            return (
              <motion.div
                key={category}
                variants={categoryVariants}
                className="group relative"
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 bg-gradient-to-r ${colorClass} rounded-xl shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {categorySkills.map((skill, index) => {
                      const level = skillLevels[skill.name as keyof typeof skillLevels] || 75;
                      return (
                        <motion.div
                          key={skill.name}
                          variants={skillVariants}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="group/skill relative"
                        >
                          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 bg-gradient-to-r ${colorClass} rounded-full`}></div>
                              <span className="text-slate-700 dark:text-slate-300 font-medium">
                                {skill.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(level / 20)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-slate-300 dark:text-slate-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
                            />
                          </div>

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm rounded-lg opacity-0 group-hover/skill:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                            {level}% Proficiency
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-100"></div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500 -z-10`}></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Continuous Learning & Growth
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm passionate about staying up-to-date with the latest technologies and best practices. 
              My skill set is constantly evolving as I explore new frameworks, tools, and methodologies 
              to deliver cutting-edge solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                Always Learning
              </div>
              <div className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Industry Best Practices
              </div>
              <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                Modern Technologies
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
