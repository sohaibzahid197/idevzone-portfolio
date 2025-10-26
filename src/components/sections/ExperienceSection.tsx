'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building } from 'lucide-react';

const experienceData = [
  {
    company: 'Dzine Media',
    position: 'Full Stack Mobile App Developer',
    duration: 'Dec 2024 – Present',
    location: 'Remote',
    description: 'Leading development of cross-platform mobile applications using React Native, implementing advanced features like real-time communication, AI integrations, and subscription-based monetization models.',
    technologies: ['React Native', 'Node.js', 'Firebase', 'AI Integration', 'Subscription Models']
  },
  {
    company: 'Topsol Innovative Solutions',
    position: 'React Native Developer',
    duration: 'Sep 2024 – Dec 2024',
    location: 'Remote',
    description: 'Developed and maintained mobile applications for iOS and Android platforms, focusing on user experience optimization and performance improvements.',
    technologies: ['React Native', 'iOS', 'Android', 'Firebase', 'REST APIs']
  },
  {
    company: 'Sirovista',
    position: 'Frontend Developer',
    duration: 'Jan 2023 – Dec 2024',
    location: 'Remote',
    description: 'Built responsive web applications using modern frontend technologies, collaborated with design teams to implement pixel-perfect UI components.',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma']
  }
];

export default function ExperienceSection() {
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

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>

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
            Professional Experience
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            My journey in software development, building innovative solutions and growing with each opportunity.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  variants={itemVariants}
                  className={`flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                      {/* Company & Duration */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {exp.company}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Calendar className="w-4 h-4" />
                            {exp.duration}
                          </div>
                        </div>
                      </div>

                      {/* Position */}
                      <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                        {exp.position}
                      </h4>

                      {/* Location */}
                      <div className="flex items-center gap-2 mb-4 text-slate-600 dark:text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 flex-shrink-0 z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="w-full md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto">
            <Briefcase className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready for New Challenges
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm always excited to take on new projects and work with amazing teams. 
              Let's discuss how I can contribute to your next big idea.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
