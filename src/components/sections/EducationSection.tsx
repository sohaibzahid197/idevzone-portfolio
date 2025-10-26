'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const educationData = [
  {
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'COMSATS University Islamabad',
    duration: '2020 – 2024',
    location: 'Islamabad, Pakistan',
    description: 'Comprehensive study of software engineering principles, algorithms, data structures, and modern development practices. Focused on full-stack development and mobile application programming.',
    achievements: [
      'Specialized in Mobile App Development',
      'Advanced Web Technologies',
      'Database Design & Management',
      'Software Engineering Principles'
    ]
  }
];

export default function EducationSection() {
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
    <section id="education" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/5 rounded-full blur-2xl"></div>
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
            Education & Learning
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            My academic foundation and continuous learning journey in software engineering.
          </p>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.institution}
              variants={itemVariants}
              className="mb-8"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {edu.degree}
                    </h3>
                    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      {edu.institution}
                    </h4>
                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{edu.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {edu.description}
                </p>

                {/* Achievements */}
                <div>
                  <h5 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Key Focus Areas
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {edu.achievements.map((achievement, achIndex) => (
                      <div
                        key={achIndex}
                        className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continuous Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800 max-w-4xl mx-auto">
            <GraduationCap className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Beyond formal education, I'm committed to staying current with the latest technologies and best practices 
              through online courses, certifications, and hands-on project development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Always Learning
              </div>
              <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                Industry Certifications
              </div>
              <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                Hands-on Projects
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
