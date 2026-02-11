'use client';

import type { Skill } from '@/types';

interface SkillsViewProps {
  skills: Skill[];
}

function SkillCard({ skill }: { skill: Skill }) {
  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'from-[var(--success)] to-emerald-500';
    if (proficiency >= 75) return 'from-blue-500 to-cyan-500';
    if (proficiency >= 60) return 'from-[var(--warning)] to-orange-500';
    return 'from-[var(--danger)] to-red-500';
  };

  return (
    <div className="gradient-border rounded-xl p-6 bg-[var(--card-bg)] hover:scale-[1.02] transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <h3 className="font-bold text-[var(--foreground)] mb-2 text-xl">{skill.name}</h3>
          <p className="text-sm text-[var(--muted)] mb-3 leading-relaxed">{skill.description}</p>
          <span className="text-xs text-[var(--foreground)] bg-[var(--card-hover)] px-3 py-1.5 rounded-lg font-medium">
            {skill.category}
          </span>
        </div>
        <div className="text-right ml-4">
          <p className="text-5xl font-bold gradient-text">{skill.proficiency}%</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="w-full bg-[var(--border)] rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency)} transition-all duration-700 shadow-lg shadow-[var(--primary)]/20`}
            style={{ width: `${skill.proficiency}%` }}
          />
        </div>
      </div>

      {skill.examples && skill.examples.length > 0 && (
        <div>
          <p className="text-xs text-[var(--muted)] mb-3 font-medium">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {skill.examples.map((example, index) => (
              <span
                key={index}
                className="text-xs text-[var(--foreground)] bg-[var(--card-hover)] px-3 py-1.5 rounded-lg font-medium"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SkillsView({ skills }: SkillsViewProps) {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text">Skills</h2>
        <p className="text-[var(--muted)] mt-2">Technical proficiencies and expertise areas</p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-5 flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mr-3 shadow-lg shadow-[var(--primary)]/50"></span>
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {skills
                .filter(skill => skill.category === category)
                .sort((a, b) => b.proficiency - a.proficiency)
                .map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-16 text-[var(--muted)]">
          <p className="text-2xl mb-3">🎯</p>
          <p className="text-lg font-medium mb-1">No skills found</p>
          <p className="text-sm">Skills will be tracked as Mike Jr. demonstrates expertise.</p>
        </div>
      )}
    </section>
  );
}
