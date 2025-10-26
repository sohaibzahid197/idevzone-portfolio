'use client';

import { motion } from 'framer-motion';
import { Rocket, Brain, DollarSign, Star, Users, Zap, Coins } from 'lucide-react';

const achievementsData = [
  {
    icon: Rocket,
    title: 'Delivered 15+ mobile applications',
    description: 'across iOS, Android & macOS platforms',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
  },
  {
    icon: Brain,
    title: 'Integrated 20+ third-party APIs',
    description: 'and AI services for enhanced functionality',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
  },
  {
    icon: DollarSign,
    title: 'Expertise in subscription-based',
    description: 'monetization models and payment systems',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
  },
  {
    icon: Star,
    title: 'Maintained 4.5+ star App Store ratings',
    description: 'across multiple published applications',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
  },
  {
    icon: Users,
    title: 'Contributed to cross-functional teams',
    description: 'in agile development environments',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20'
  },
  {
    icon: Zap,
    title: 'Improved performance by up to 40%',
    description: 'faster load times in optimization projects',
    color: 'from-red-500 to-pink-500',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20'
  },
  {
    icon: Coins,
    title: 'Built and launched AI-integrated apps',
    description: 'with advanced NLP features and capabilities',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20'
  }
];

export default function AchievementsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="achievements" className="py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl"></div>
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
            Key Achievements
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Highlights of my professional journey and the impact I've made through innovative development.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${achievement.bgColor} rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 h-full`}>
                {/* Icon */}
                <div className={`inline-flex p-3 bg-gradient-to-r ${achievement.color} rounded-xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                  {achievement.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500 -z-10`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Impact Summary
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Quantifiable results from my development work
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '15+', label: 'Apps Delivered', icon: Rocket },
                { number: '20+', label: 'APIs Integrated', icon: Brain },
                { number: '10K+', label: 'Active Users', icon: Users },
                { number: '4.5+', label: 'App Store Rating', icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
                >
                  <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
