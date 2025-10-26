'use client';

import { motion } from 'framer-motion';
import { Code, Users, Award, Calendar } from 'lucide-react';

const journeyData = [
  {
    year: '2024',
    title: 'Full Stack Mobile Developer',
    company: 'Dzine Media',
    description: 'Leading cross-platform mobile app development with AI integrations',
    icon: Code,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    year: '2024',
    title: 'React Native Developer',
    company: 'Topsol Innovative Solutions',
    description: 'Mobile app development for iOS and Android platforms',
    icon: Users,
    color: 'from-purple-500 to-pink-500'
  },
  {
    year: '2023',
    title: 'Frontend Developer',
    company: 'Sirovista',
    description: 'Building responsive web applications with modern technologies',
    icon: Award,
    color: 'from-green-500 to-emerald-500'
  }
];

export default function MyJourneySection() {
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
    <section id="journey" className="py-16 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            My Journey
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A brief overview of my professional growth and key career milestones
          </p>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {journeyData.map((item, index) => (
              <motion.div
                key={`${item.year}-${item.company}-${index}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 h-full">
                  {/* Year Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-gradient-to-r ${item.color} text-white`}>
                    <item.icon className="w-4 h-4" />
                    {item.year}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {item.company}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500 -z-10`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto">
            <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Ready for the Next Chapter
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Always learning, always growing. Let's create something amazing together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
