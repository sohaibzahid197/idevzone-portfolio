'use client';

import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';
import SmoothScroll from '@/components/SmoothScroll';
import MagneticCursor from '@/components/MagneticCursor';
import Preloader from '@/components/Preloader';
import Marquee from '@/components/Marquee';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      {/* reducedMotion="user" makes every framer-motion animation below honour
          the OS "reduce motion" setting; the default is to ignore it. */}
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <div className={`min-h-screen bg-[#0a0a0a] ${preloaderDone ? '' : 'overflow-hidden max-h-screen'}`}>
            <MagneticCursor />
            <ScrollToTop />
            <Navbar />
            <main id="main-content" tabIndex={-1} className="focus:outline-none">
              <HeroSection />
              <Marquee />
              <ProjectsSection />
              <SkillsSection />
              <AboutSection />
              <ExperienceSection />
              <AchievementsSection />
              <EducationSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </MotionConfig>
    </>
  );
}
