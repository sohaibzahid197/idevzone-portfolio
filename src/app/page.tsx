import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import AboutSection from '@/components/sections/AboutSection';
import MyJourneySection from '@/components/sections/MyJourneySection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';
import CursorTrail from '@/components/CursorTrail';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <CursorTrail />
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <MyJourneySection />
        <ExperienceSection />
        <AchievementsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
