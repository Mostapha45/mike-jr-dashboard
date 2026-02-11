'use client';

import type { Skill } from '@/types';

interface SkillsViewProps {
  skills: Skill[];
}

function SkillCard({ skill }: { skill: Skill }) {
  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'from-green-500 to-emerald-500';
    if (proficiency >= 75) return 'from-blue-500 to-cyan-500';
    if (proficiency >= 60) return 'from-[var(--warning)] to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-lg p-6 border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--foreground)] text-lg mb-1">{skill.name}</h3>
          <p className="text-sm text-[var(--muted)] mb-2">{skill.description}</p>
          <span className="text-xs text-[var(--muted)] bg-[var(--border)] px-2 py-1 rounded">
            {skill.category}
          </span>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            {skill.proficiency}%
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-[var(--border)] rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency)} transition-all duration-500`}
            style={{ width: `${skill.proficiency}%` }}
          />
        </div>
      </div>

      {/* Examples */}
      {skill.examples && skill.examples.length > 0 && (
        <div>
          <p className="text-xs text-[var(--muted)] mb-2">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {skill.examples.map((example, index) => (
              <span
                key={index}
                className="text-xs text-[var(--foreground)] bg-[var(--border)] px-3 py-1.5 rounded"
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
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-[var(--muted)] mt-1">Technical proficiencies and expertise areas</p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] mr-2"></span>
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="text-center py-12 text-[var(--muted)]">
          <p className="text-lg mb-2">No skills found</p>
          <p className="text-sm">Skills will be tracked as Mike Jr. demonstrates expertise.</p>
        </div>
      )}
    </section>
  );
}
