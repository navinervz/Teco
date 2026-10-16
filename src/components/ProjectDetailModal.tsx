import React from 'react';
import { ProjectItem, Language, WorkflowItem } from '../types';
import { WORKFLOWS_DATA } from '../data/tecoData';
import { X, ExternalLink, ArrowRight, Check } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  lang: Language;
  onSelectFlow?: (flowId: string) => void;
  onOpenBooking: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  lang,
  onSelectFlow,
  onOpenBooking
}) => {
  if (!project) return null;

  const linkedFlows: WorkflowItem[] = (project.flows || [])
    .map(fid => WORKFLOWS_DATA.find(f => f.id === fid))
    .filter(Boolean) as WorkflowItem[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#080D1E] border border-white/12 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 p-5 sm:p-8 space-y-6">
        {/* Close Button (RTL / LTR compliant) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 sm:top-5 inset-inline-end-4 sm:inset-inline-end-5 z-20 w-10 h-10 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/60 hover:bg-[#2563EB]/20 text-[#94A3B8] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          aria-label={lang === 'fa' ? 'بستن' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-5 space-y-2">
          <div className="text-xs font-mono text-[#60A5FA]">
            {project.kicker[lang]}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.name[lang]}
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            {project.summary[lang]}
          </p>
        </div>

        {/* Built Features */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#60A5FA]">
            {lang === 'fa' ? 'دستاوردهای مهندسی و ارزش‌های محقق‌شده' : 'Key Technical Deliverables'}
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[#E2E8F0]">
            {project.built[lang].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#2563EB]/20 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5 border border-[#3B82F6]/30">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Facts Grid */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#93C5FD]">
            {lang === 'fa' ? 'مشخصات معماری و زیرساخت فنی' : 'Technical Specifications'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.facts.map((fact, fIdx) => (
              <div key={fIdx} className="p-3.5 rounded-xl bg-white/[0.025] border border-white/10">
                <div className="text-[11px] font-mono text-[#94A3B8]">
                  {fact.label[lang]}
                </div>
                <div className="text-xs sm:text-sm text-white font-medium mt-1 leading-snug">
                  {fact.value[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Linked Automated Workflows */}
        {linkedFlows.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F59E0B]">
              {lang === 'fa' ? 'پایپ‌لاین‌های خودکار n8n متصل به این پروژه' : 'Connected Automated Pipelines'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {linkedFlows.map(flow => (
                <button
                  key={flow.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onSelectFlow) onSelectFlow(flow.id);
                  }}
                  className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-[#E2E8F0] hover:border-[#60A5FA] hover:text-[#93C5FD] hover:bg-[#2563EB]/15 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{flow.name[lang]}</span>
                  <span className="text-[#94A3B8]">({flow.nodeCount} {lang === 'fa' ? 'گره' : 'nodes'})</span>
                  <ArrowRight className="w-3 h-3 text-[#3B82F6]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-btn h-11 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 text-white"
            >
              <span>{lang === 'fa' ? 'مشاهده سامانه زنده در وب' : 'Inspect Live Platform'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="liquid-btn-secondary h-11 px-5 rounded-xl font-medium text-xs sm:text-sm cursor-pointer justify-center"
            >
              {lang === 'fa' ? 'سفارش پروژه‌ای با معماری مشابه' : 'Engineer Similar Architecture'}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer text-center py-2 sm:py-0"
          >
            {lang === 'fa' ? 'بستن' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
