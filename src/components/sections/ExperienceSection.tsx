'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';

const experienceData = [
  {
    company: 'Dzine Media',
    position: 'Full Stack Mobile App Developer',
    duration: 'Dec 2024 – Present',
    location: 'Remote',
    description: 'Leading development of cross-platform mobile applications using React Native, implementing advanced features like real-time communication, AI integrations, and subscription-based monetization models.',
    technologies: ['React Native', 'Node.js', 'Firebase', 'AI Integration', 'Subscriptions'],
    current: true
  },
  {
    company: 'Topsol Innovative Solutions',
    position: 'React Native Developer',
    duration: 'Sep 2024 – Dec 2024',
    location: 'Remote',
    description: 'Developed and maintained mobile applications for iOS and Android platforms, focusing on user experience optimization and performance improvements.',
    technologies: ['React Native', 'iOS', 'Android', 'Firebase', 'REST APIs'],
    current: false
  },
  {
    company: 'Sirovista',
    position: 'Frontend Developer',
    duration: 'Jan 2023 – Dec 2024',
    location: 'Remote',
    description: 'Built responsive web applications using modern frontend technologies, collaborated with design teams to implement pixel-perfect UI components.',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    current: false
  }
];

export default function ExperienceSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="experience" className="section-padding bg-[#0f0f0f] relative">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Career Path
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Experience
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl">
            My professional journey building innovative solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500/40 via-blue-500/20 to-transparent" />

            <div className="space-y-8">
              {experienceData.map((exp) => (
                <motion.div
                  key={exp.company}
                  variants={itemVariants}
                  className="relative pl-10"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#0f0f0f] border-2 border-blue-500 z-10">
                    {exp.current && (
                      <div className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" />
                    )}
                  </div>

                  <div className="bg-[#111] rounded-xl border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-blue-400 font-medium mb-3">{exp.position}</h4>

                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] text-neutral-300 text-xs font-medium rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
