'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import Icon from './Icon';
import { ProjectItem } from '@/lib/content';
import { t } from '@/lib/data/i18n';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  lang: string;
}

export default function ProjectsSection({ projects, lang }: ProjectsSectionProps) {
  const [selectedField, setSelectedField] = useState('ALL');
  const [selectedScope, setSelectedScope] = useState('ALL');
  const [isFieldOpen, setIsFieldOpen] = useState(false);
  const [isScopeOpen, setIsScopeOpen] = useState(false);

  const fieldDropdownRef = useRef<HTMLDivElement>(null);
  const scopeDropdownRef = useRef<HTMLDivElement>(null);

  const label = t(lang).projects;

  // Close dropdowns on outside click or Escape key (only when a dropdown is open)
  useEffect(() => {
    if (!isFieldOpen && !isScopeOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        fieldDropdownRef.current &&
        !fieldDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFieldOpen(false);
      }
      if (
        scopeDropdownRef.current &&
        !scopeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsScopeOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsFieldOpen(false);
        setIsScopeOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFieldOpen, isScopeOpen]);

  // 1. Extract all unique fields/categories
  const fields = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.data.category) {
        set.add(p.data.category);
      }
    });
    return Array.from(set);
  }, [projects]);

  // 2. Extract available technical scopes (drill-down based on selected field)
  const availableScopes = useMemo(() => {
    const set = new Set<string>();
    const scopedProjects =
      selectedField === 'ALL'
        ? projects
        : projects.filter((p) => p.data.category === selectedField);

    scopedProjects.forEach((p) => {
      p.data.scope?.forEach((sc) => {
        if (sc) set.add(sc);
      });
    });

    return Array.from(set);
  }, [projects, selectedField]);

  // If currently selected scope is not in the new available scopes list, reset to ALL
  useEffect(() => {
    if (selectedScope !== 'ALL' && !availableScopes.includes(selectedScope)) {
      setSelectedScope('ALL');
    }
  }, [availableScopes, selectedScope]);

  // 3. Filtered projects based on Field & Scope
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const { data } = project;

      // Field filter
      if (selectedField !== 'ALL' && data.category !== selectedField) {
        return false;
      }

      // Scope filter
      if (selectedScope !== 'ALL') {
        const hasScope = data.scope?.includes(selectedScope);
        if (!hasScope) return false;
      }

      return true;
    });
  }, [projects, selectedField, selectedScope]);

  const handleResetFilters = () => {
    setSelectedField('ALL');
    setSelectedScope('ALL');
    setIsFieldOpen(false);
    setIsScopeOpen(false);
  };

  const isFiltered = selectedField !== 'ALL' || selectedScope !== 'ALL';

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-[var(--glass-border)] relative section-optimize">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {label.title} <span className="text-[var(--accent-primary)]">{label.titleAccent}</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">
          {label.description}
        </p>
        <div className="h-1 w-14 bg-[var(--accent-primary)] rounded-full mx-auto mt-4" />
      </div>

      {/* Drill-down Dropdown Controls Container */}
      <div className="max-w-3xl mx-auto mb-12 relative z-30">
        <div className="mocha-glass rounded-3xl p-4 sm:p-5 border border-[var(--glass-border)] shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Dropdown 1: Field / Domain Filter */}
            <div className="relative" ref={fieldDropdownRef}>
              <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 px-1">
                {label.filterFieldLabel}
              </label>

              <button
                type="button"
                onClick={() => {
                  setIsFieldOpen(!isFieldOpen);
                  setIsScopeOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[var(--bg-surface)] border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isFieldOpen
                    ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-md'
                    : selectedField !== 'ALL'
                    ? 'border-[var(--accent-primary)]/60 text-[var(--text-primary)]'
                    : 'border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-[var(--glass-border-hover)]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon name="layers" size={15} className="text-[var(--accent-primary)] shrink-0" />
                  <span className="truncate">
                    {selectedField === 'ALL' ? label.allFields : selectedField}
                  </span>
                </div>
                <Icon
                  name={isFieldOpen ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  className={`text-[var(--text-muted)] shrink-0 ml-2 transition-transform duration-200 ${
                    isFieldOpen ? 'text-[var(--accent-primary)]' : ''
                  }`}
                />
              </button>

              {/* Field Dropdown Popover (Opaque Solid Elevated Surface) */}
              {isFieldOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-2 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border-hover)] shadow-2xl shadow-black/80 overflow-hidden py-1.5 max-h-64 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedField('ALL');
                      setIsFieldOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      selectedField === 'ALL'
                        ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]/50 hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                      <span>{label.allFields}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">
                        ({projects.length})
                      </span>
                      {selectedField === 'ALL' && (
                        <Icon name="check" size={13} className="text-[var(--accent-primary)]" />
                      )}
                    </div>
                  </button>

                  <div className="h-px bg-[var(--glass-border)] my-1" />

                  {fields.map((field) => {
                    const count = projects.filter((p) => p.data.category === field).length;
                    const isSelected = selectedField === field;

                    return (
                      <button
                        key={field}
                        type="button"
                        onClick={() => {
                          setSelectedField(field);
                          setIsFieldOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)] font-semibold'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]/50 hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <span className="truncate">{field}</span>
                        <div className="flex items-center gap-1.5 ml-2 shrink-0">
                          <span className="font-mono text-[11px] text-[var(--text-muted)]">
                            ({count})
                          </span>
                          {isSelected && (
                            <Icon name="check" size={13} className="text-[var(--accent-primary)]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 2: Technical Scope Drill-Down Filter */}
            <div className="relative" ref={scopeDropdownRef}>
              <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 px-1">
                {label.filterScopeLabel}
              </label>

              <button
                type="button"
                onClick={() => {
                  setIsScopeOpen(!isScopeOpen);
                  setIsFieldOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[var(--bg-surface)] border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isScopeOpen
                    ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-md'
                    : selectedScope !== 'ALL'
                    ? 'border-[var(--accent-primary)]/60 text-[var(--text-primary)]'
                    : 'border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-[var(--glass-border-hover)]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon name="tag" size={15} className="text-[var(--accent-primary)] shrink-0" />
                  <span className="truncate">
                    {selectedScope === 'ALL' ? label.allScopes : selectedScope}
                  </span>
                </div>
                <Icon
                  name={isScopeOpen ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  className={`text-[var(--text-muted)] shrink-0 ml-2 transition-transform duration-200 ${
                    isScopeOpen ? 'text-[var(--accent-primary)]' : ''
                  }`}
                />
              </button>

              {/* Scope Dropdown Popover (Opaque Solid Elevated Surface) */}
              {isScopeOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-2 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border-hover)] shadow-2xl shadow-black/80 overflow-hidden py-1.5 max-h-64 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedScope('ALL');
                      setIsScopeOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      selectedScope === 'ALL'
                        ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]/50 hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                      <span>{label.allScopes}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">
                        ({availableScopes.length})
                      </span>
                      {selectedScope === 'ALL' && (
                        <Icon name="check" size={13} className="text-[var(--accent-primary)]" />
                      )}
                    </div>
                  </button>

                  <div className="h-px bg-[var(--glass-border)] my-1" />

                  {availableScopes.map((scope) => {
                    const isSelected = selectedScope === scope;

                    return (
                      <button
                        key={scope}
                        type="button"
                        onClick={() => {
                          setSelectedScope(scope);
                          setIsScopeOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)] font-semibold'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]/50 hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <span className="truncate">{scope}</span>
                        {isSelected && (
                          <Icon name="check" size={13} className="text-[var(--accent-primary)] ml-2 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Active Filter Summary Chips */}
          {isFiltered && (
            <div className="mt-3.5 pt-3 border-t border-[var(--glass-border)]/60 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedField !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-[11px] font-semibold text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    <span>{selectedField}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedField('ALL')}
                      className="hover:opacity-75 cursor-pointer ml-0.5"
                      aria-label="Remove field filter"
                    >
                      <Icon name="close" size={11} />
                    </button>
                  </span>
                )}

                {selectedScope !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-[11px] font-semibold text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                    <span>{selectedScope}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedScope('ALL')}
                      className="hover:opacity-75 cursor-pointer ml-0.5"
                      aria-label="Remove scope filter"
                    >
                      <Icon name="close" size={11} />
                    </button>
                  </span>
                )}

                <span className="font-mono text-xs text-[var(--text-muted)] ml-1">
                  {label.resultsCount.replace('{count}', filteredProjects.length.toString())}
                </span>
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="font-mono text-xs text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Icon name="close" size={12} />
                <span>{label.clearFilter}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Projects (Positioned below the filter dropdown layer) */}
      <div className="relative z-10">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={`${project.data.id}-${project.data.lang}`}
                project={project}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mocha-glass rounded-3xl p-12 text-center max-w-xl mx-auto mt-4 border border-[var(--glass-border)]">
            <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface)] border border-[var(--glass-border)] mx-auto flex items-center justify-center text-[var(--text-muted)] mb-4">
              <Icon name="layers" size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-1">
              {label.noResultsTitle}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              {label.noResultsDesc}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white font-heading text-xs font-semibold hover:bg-[var(--accent-primary-hover)] transition-all cursor-pointer"
            >
              {label.clearFilter}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
