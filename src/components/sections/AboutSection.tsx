'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Award, Users, Code, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function AboutSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600"
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/profile-photo.jpeg"
                  alt="Sohaib Zahid - Full Stack Web & Mobile App Developer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-sm"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-sm"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  About Me
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </div>

              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  I'm a passionate Full Stack Developer with 2+ years of experience building cross-platform mobile and web applications using modern technologies like React Native, Next.js, and AI integrations. I've delivered 15+ applications with advanced features like subscriptions, in-app purchases, real-time communication, and NLP-powered AI systems.
                </p>
                <p>
                  I focus on building smooth user experiences and scalable solutions for long-term growth. My expertise spans from mobile app development to web applications, with a strong focus on AI integration and modern development practices.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing 
                  to open-source projects, or sharing knowledge with the developer community. 
                  I'm always excited to take on new challenges and work with amazing teams.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { number: '50+', label: 'Projects Completed', icon: Code },
                  { number: '5+', label: 'Years Experience', icon: Calendar },
                  { number: '30+', label: 'Happy Clients', icon: Users },
                  { number: '15+', label: 'Technologies', icon: Award }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Let's Connect
              </motion.button>
            </motion.div>
              </div>
            </div>
          </div>
        </section>
      );
    }
