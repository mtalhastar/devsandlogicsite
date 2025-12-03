import React from 'react';
import { CaseStudy } from '@/data/caseStudies';

interface Props { caseStudy: CaseStudy }

export default function CaseStudyCard({ caseStudy }: Props) {
  return (
    <div className="bg-white/3 border border-white/6 rounded-xl p-6 h-1/2 hover:shadow-lg transition-all duration-200">
      {/** optional image */}
      {('image' in caseStudy && caseStudy.image) ? (
        <div className="mb-4 rounded overflow-hidden aspect-video">
          <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-48 object-cover" />
        </div>
      ) : null}

      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{caseStudy.title}</h3>
          <div className="text-xs text-gray-400">{caseStudy.role} • {caseStudy.domain}</div>
        </div>
        <span className="text-sm text-purple-400 bg-purple-900/20 px-2 py-1 rounded">{caseStudy.domain}</span>
      </div>

      <p className="text-sm text-gray-300 mb-3">{caseStudy.objective}</p>

      <div className="mb-3">
        <strong className="text-sm text-gray-200">Challenge</strong>
        <p className="text-sm text-gray-300 mt-1">{caseStudy.challenge}</p>
      </div>

      <div className="mb-3">
        <strong className="text-sm text-gray-200">Key Technologies</strong>
        <ul className="text-sm text-gray-300 mt-1 list-disc list-inside space-y-1">
          {caseStudy.keyTechnologies.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>

      <div className="mb-3">
        <strong className="text-sm text-gray-200">Solution</strong>
        <ul className="text-sm text-gray-300 mt-1 list-disc list-inside space-y-1">
          {caseStudy.solution.map((s, idx) => <li key={idx}>{s}</li>)}
        </ul>
      </div>

      <div>
        <strong className="text-sm text-gray-200">Business Outcome</strong>
        <ul className="text-sm text-gray-300 mt-1 list-disc list-inside space-y-1">
          {caseStudy.businessOutcome.map((b, idx) => <li key={idx}>{b}</li>)}
        </ul>
      </div>
    </div>
  );
}
