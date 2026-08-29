import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: true,
});

export interface LocalizedString {
  en?: string;
  id?: string;
  [key: string]: string | undefined;
}

export interface RawProjectItem {
  id?: string;
  projectSlug?: string;
  title: string;
  tagline: string | LocalizedString;
  category?: string | LocalizedString;
  scope?: Array<string | LocalizedString>;
  techStack?: string[];
  cover?: string;
  github?: string;
  demo?: string;
  notionUrl?: string;
  detailUrl?: string;
  year?: string;
  status?: string;
  featured?: boolean;
  order?: number;
  lang?: 'en' | 'id';
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  projectSlug: string;
  category: string;
  scope: string[];
  techStack: string[];
  cover?: string;
  github?: string;
  demo?: string;
  notionUrl?: string;
  year: string;
  status: string;
  featured?: boolean;
  order: number;
  lang: 'en' | 'id';
}

export interface ProjectItem {
  data: ProjectData;
  rawContent?: string;
  htmlContent?: string;
  tabs?: {
    general: string;
    technical: string;
    result: string;
  };
}

export interface ExperienceData {
  title: string;
  institution: string;
  period: string;
  lang: 'en' | 'id';
  id: string;
}

export interface ExperienceItem {
  data: ExperienceData;
  htmlContent: string;
}

const contentDir = path.join(process.cwd(), 'src/content');
const projectsFile = path.join(contentDir, 'projects.md');
const projectsDir = path.join(contentDir, 'projects');
const experienceDir = path.join(contentDir, 'experience');

function resolveLocalized(value: string | LocalizedString | undefined, lang: string, fallback = ''): string {
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  return value[lang] || value.en || value.id || fallback;
}

function resolveScope(scope: Array<string | LocalizedString> | undefined, lang: string): string[] {
  if (!Array.isArray(scope)) return [];
  return scope.map((item) => (typeof item === 'string' ? item : item[lang] || item.en || item.id || '')).filter(Boolean);
}

function cleanCoverPath(cover?: string): string | undefined {
  if (!cover || typeof cover !== 'string' || !cover.trim()) return undefined;
  let cleaned = cover.trim();
  cleaned = cleaned.replace(/^\/?public\//, '/');
  if (!cleaned.startsWith('/') && !cleaned.startsWith('http')) {
    cleaned = `/${cleaned}`;
  }
  return cleaned;
}

export function getAllProjects(lang: string = 'en'): ProjectItem[] {
  const currentLang = (lang === 'id' ? 'id' : 'en') as 'en' | 'id';

  // 1. Try reading the centralized projects.md file
  if (fs.existsSync(projectsFile)) {
    const fileContents = fs.readFileSync(projectsFile, 'utf8');
    const { data } = matter(fileContents);

    if (data && Array.isArray(data.projects)) {
      const rawList = data.projects as RawProjectItem[];
      const projects: ProjectItem[] = rawList.map((item, index) => {
        const slug = item.id || item.projectSlug || `project-${index}`;
        const title = item.title || 'Untitled Project';
        const tagline = resolveLocalized(item.tagline, currentLang);
        const category = resolveLocalized(item.category, currentLang, 'Other');
        const scope = resolveScope(item.scope, currentLang);
        const techStack = Array.isArray(item.techStack) ? item.techStack : [];
        const cover = cleanCoverPath(item.cover);
        const github = item.github || undefined;
        const demo = item.demo || undefined;
        const notionUrl = item.notionUrl || item.detailUrl || undefined;
        const year = item.year || '';
        const status = item.status || '';
        const featured = item.featured ?? false;
        const order = item.order ?? index + 1;

        const projectData: ProjectData = {
          id: slug,
          projectSlug: slug,
          title,
          tagline,
          category,
          scope,
          techStack,
          cover,
          github,
          demo,
          notionUrl,
          year,
          status,
          featured,
          order,
          lang: currentLang,
        };

        return {
          data: projectData,
        };
      });

      return projects.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
    }
  }

  // 2. Fallback to individual markdown files in src/content/projects/
  if (fs.existsSync(projectsDir)) {
    const files = fs.readdirSync(projectsDir);
    const projects: ProjectItem[] = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const fullPath = path.join(projectsDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const typedData = data as Partial<ProjectData>;

      if (typedData.lang === currentLang || !typedData.lang) {
        const slug = typedData.projectSlug || file.replace(/\.(en|id)?\.md$/, '');
        projects.push({
          data: {
            id: slug,
            projectSlug: slug,
            title: typedData.title || 'Untitled Project',
            tagline: typedData.tagline || '',
            category: typedData.category || 'General',
            scope: typedData.scope || [],
            techStack: typedData.techStack || [],
            cover: typedData.cover,
            github: typedData.github,
            demo: typedData.demo,
            notionUrl: typedData.notionUrl,
            year: typedData.year || '',
            status: typedData.status || '',
            order: typedData.order ?? 99,
            lang: currentLang,
          },
          rawContent: content,
          htmlContent: marked.parse(content) as string,
        });
      }
    }

    return projects.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
  }

  return [];
}

export function getProjectBySlug(slug: string, lang: string = 'en'): ProjectItem | undefined {
  const all = getAllProjects(lang);
  return all.find((p) => p.data.projectSlug === slug || p.data.id === slug);
}

export function getAllExperiences(lang?: string): ExperienceItem[] {
  if (!fs.existsSync(experienceDir)) return [];
  const files = fs.readdirSync(experienceDir);

  const experiences: ExperienceItem[] = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const fullPath = path.join(experienceDir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const typedData = data as ExperienceData;

    if (!lang || typedData.lang === lang) {
      experiences.push({
        data: typedData,
        htmlContent: marked.parse(content) as string
      });
    }
  }

  return experiences;
}

export function getExperienceById(id: string, lang: string): ExperienceItem | undefined {
  const all = getAllExperiences(lang);
  return all.find((e) => e.data.id === id && e.data.lang === lang);
}
