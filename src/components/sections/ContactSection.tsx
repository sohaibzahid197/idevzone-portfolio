'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'mail':
        return <Mail className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you. 
              Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Send me a message
              </h3>
              
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-300"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-300 resize-none"
                        placeholder="Tell me about your project or how I can help you..."
                      />
                    </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-white rounded-full ml-2"
                  />
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Let's connect
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Email</h4>
                    <p className="text-slate-600 dark:text-slate-300">letsdev.sohaib@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Phone</h4>
                    <p className="text-slate-600 dark:text-slate-300">+92 321 3181197</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Location</h4>
                    <p className="text-slate-600 dark:text-slate-300">Faisalabad, Pakistan</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Response Time</h4>
                    <p className="text-slate-600 dark:text-slate-300">Usually within 24 hours</p>
                  </div>
                </motion.div>
              </div>

                  {/* Social Links */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Connect with me
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          {getIcon(social.icon)}
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {social.name}
                          </span>
                        </motion.a>
                      ))}
                      
                      {/* WhatsApp Button */}
                      <motion.a
                        href="https://wa.me/923213181197"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">WhatsApp</span>
                      </motion.a>
                    </div>
                  </div>

              {/* Availability Status */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Available for Work
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  I'm currently available for freelance projects and full-time opportunities. 
                  Let's discuss how I can help bring your ideas to life!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
