import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { t } from '@/lib/data/i18n';

export function generateStaticParams() {
  const enProjects = getAllProjects('en');
  const idProjects = getAllProjects('id');
  const params: { lang: string; slug: string }[] = [];

  enProjects.forEach((p) => {
    params.push({ lang: 'en', slug: p.data.projectSlug });
  });
  idProjects.forEach((p) => {
    params.push({ lang: 'id', slug: p.data.projectSlug });
  });

  return params;
}

interface ProjectPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug, lang);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.data.title,
    description: project.data.tagline,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;

  if (lang !== 'en' && lang !== 'id') {
    notFound();
  }

  const project = getProjectBySlug(slug, lang);

  if (!project) {
    notFound();
  }

  const otherLang = lang === 'en' ? 'id' : 'en';
  const altProject = getProjectBySlug(slug, otherLang);
  const altHref = altProject ? `/${otherLang}/projects/${slug}` : `/${otherLang}`;
  const label = t(lang).projects;
  const item = project.data;

  return (
    <>
      <Navbar lang={lang} altHref={altHref} isProjectPage={true} />
      <MobileNav lang={lang} altHref={altHref} isProjectPage={true} />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-24 md:pt-32 pb-20 flex-1 w-full">
        <a
          href={`/${lang}#projects`}
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors py-2 px-3 rounded-lg bg-[var(--bg-surface)]/50 border border-[var(--glass-border)] w-fit"
        >
          <Icon name="arrow-left" size={14} />
          <span>{label.backToProjects}</span>
        </a>

        <div className="mocha-glass rounded-3xl p-8 sm:p-12 mt-6 border border-[var(--glass-border)] text-center">
          {item.category && (
            <span className="inline-block rounded-full border border-[var(--glass-border)] bg-[var(--bg-surface)] px-3.5 py-1 font-mono text-xs font-semibold text-[var(--text-secondary)] mb-4">
              {item.category}
            </span>
          )}

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
            {item.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            {item.tagline}
          </p>

          {item.notionUrl && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={item.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white px-7 py-3.5 text-sm font-semibold font-heading transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <Icon name="notion" size={18} />
                <span>{label.viewNotion}</span>
                <Icon name="external-link" size={15} />
              </a>

              {item.demo && (
                <a
                  href={item.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-surface)] hover:bg-[var(--glass-bg-hover)] text-[var(--text-primary)] px-6 py-3.5 text-sm font-semibold font-heading transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Icon name="external-link" size={16} />
                  <span>{label.liveDemo}</span>
                </a>
              )}

              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-surface)] hover:bg-[var(--glass-bg-hover)] text-[var(--text-primary)] px-6 py-3.5 text-sm font-semibold font-heading transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Icon name="github" size={17} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer lang={lang} />
    </>
  );
}
