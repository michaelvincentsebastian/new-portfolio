import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import MobileNav from '@/components/MobileNav';
import HomeSection from '@/components/HomeSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import JourneySection from '@/components/JourneySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { getAllProjects, getAllExperiences } from '@/lib/content';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function PortfolioPage({ params }: PageProps) {
  const { lang } = await params;

  if (lang !== 'en' && lang !== 'id') {
    notFound();
  }

  const projects = getAllProjects(lang);
  const experiences = getAllExperiences(lang);
  const altHref = lang === 'en' ? '/id' : '/en';

  return (
    <>
      {/* Desktop Top Navbar */}
      <Navbar lang={lang} altHref={altHref} isProjectPage={false} />

      {/* Mobile Navigation Bars */}
      <MobileNav lang={lang} altHref={altHref} isProjectPage={false} />

      {/* Main Page Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-16 md:pt-20 pb-20 md:pb-16 flex-1 w-full">
        <HomeSection lang={lang} />
        <AboutSection lang={lang} />
        <SkillsSection lang={lang} />
        <ProjectsSection projects={projects} lang={lang} />
        <JourneySection experiences={experiences} lang={lang} />
        <ContactSection lang={lang} />
      </div>

      {/* Footer */}
      <Footer lang={lang} />
    </>
  );
}
