'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { projects } from '@/lib/data';
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'fullstack', label: 'Web + Mobile' }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.techStack.includes('React') || project.techStack.includes('Next.js');
    if (activeFilter === 'mobile') return project.techStack.includes('React Native') || project.techStack.includes('Expo');
    if (activeFilter === 'fullstack') return project.techStack.includes('Node.js') || project.techStack.includes('MongoDB');
    return true;
  });

  return (
    <section ref={containerRef} id="projects" className="py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      {/* 3D Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl" />
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
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for creating amazing digital experiences.
          </p>
        </motion.div>

        {/* Enhanced Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group perspective-1000"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <motion.div
                whileHover={{ 
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 dark:border-slate-700 transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Floating Tech Stack Badges */}
                  <div className="absolute top-4 right-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {project.techStack.slice(0, 3).map((tech: string, techIndex: number) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        className="px-2 py-1 bg-white/90 dark:bg-slate-800/90 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-full backdrop-blur-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        >
                          <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech: string, techIndex: number) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-all duration-200 hover:border-blue-500 dark:hover:border-blue-400"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
