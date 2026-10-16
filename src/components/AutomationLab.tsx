import React, { useState } from 'react';
import { Language, WorkflowItem } from '../types';
import { WORKFLOWS_DATA, BOTS_DATA } from '../data/tecoData';
import { Play, Pause, ShieldCheck, Key, Database, Bell } from 'lucide-react';

interface AutomationLabProps {
  lang: Language;
  selectedFlowId?: string;
  onSelectFlow?: (flowId: string) => void;
}

export const AutomationLab: React.FC<AutomationLabProps> = ({
  lang,
  selectedFlowId,
  onSelectFlow
}) => {
  const [currentId, setCurrentId] = useState(selectedFlowId || 'psyg-instagram');
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  React.useEffect(() => {
    if (selectedFlowId) {
      setCurrentId(selectedFlowId);
      setActiveStep(0);
    }
  }, [selectedFlowId]);

  const currentFlow = WORKFLOWS_DATA.find(f => f.id === currentId) || WORKFLOWS_DATA[0];

  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % currentFlow.steps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying, currentFlow.steps.length]);

  const stepKindLabels: Record<string, { fa: string; en: string; color: string }> = {
    trigger: { fa: 'شروع / ماشه رویداد', en: 'Trigger', color: 'text-[#FFB800] bg-[#FFB800]/10 border-[#FFB800]/30' },
    fetch: { fa: 'دریافت هوشمند داده', en: 'Fetch', color: 'text-[#60A5FA] bg-[#2563EB]/15 border-[#3B82F6]/30' },
    logic: { fa: 'منطق و قوانین تجاری', en: 'Logic', color: 'text-[#E2E8F0] bg-[#E2E8F0]/10 border-[#E2E8F0]/30' },
    code: { fa: 'پردازش و تبدیل ساختار', en: 'Process', color: 'text-[#94A3B8] bg-[#94A3B8]/10 border-[#94A3B8]/30' },
    ai: { fa: 'موتور هوش مصنوعی', en: 'AI Engine', color: 'text-[#A78BFA] bg-[#A78BFA]/15 border-[#A78BFA]/30' },
    send: { fa: 'خروجی نهایی و ارسال', en: 'Output', color: 'text-[#93C5FD] bg-[#1D4ED8]/20 border-[#2563EB]/35' }
  };

  return (
    <section id="lab" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#3B82F6]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>{lang === 'fa' ? 'آزمایشگاه اتوماسیون سازمانی' : 'Autonomous Systems Lab'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {lang === 'fa' ? 'معماری خطوط انتقال داده، گره به گره' : 'Enterprise Automation Pipelines, Node by Node'}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            {lang === 'fa'
              ? 'پایپ‌لاین‌های عملیاتی تکو را به صورت زنده بررسی کنید تا ببینید داده‌ها چگونه بدون دخالت دست، بین وب‌سایت‌ها، دیتابیس‌ها و پیام‌رسان‌ها به گردش درمی‌آیند'
              : 'Inspect live production topologies orchestrating data between web apps, cloud ledgers, and communication channels without human friction'}
          </p>
        </div>

        {/* Interactive Lab Stage */}
        <div className="neon-rotate-border luxury-card rounded-3xl p-[1px]">
          <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Workflow Picker */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-e border-white/10 p-4 max-h-[500px] overflow-y-auto space-y-1.5 bg-white/[0.01]">
              <div className="px-3 py-2 text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider font-bold">
                {lang === 'fa' ? 'فهرست ورک‌فلوهای عملیاتی' : 'Active Pipeline Index'}
              </div>

              {WORKFLOWS_DATA.map(flow => {
                const isSelected = flow.id === currentId;
                return (
                  <button
                    key={flow.id}
                    type="button"
                    onClick={() => {
                      setCurrentId(flow.id);
                      setActiveStep(0);
                      if (onSelectFlow) onSelectFlow(flow.id);
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between text-start transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#2563EB]/25 to-[#1D4ED8]/15 backdrop-blur-md text-[#93C5FD] border border-[#60A5FA]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_16px_rgba(37,99,235,0.25)] font-bold'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04] border border-transparent'
                    }`}
                  >
                    <span className="truncate pe-2 font-sans font-medium">{flow.name[lang]}</span>
                    <span className="shrink-0 text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#93C5FD] font-bold">
                      {flow.nodeCount} {lang === 'fa' ? 'گره' : 'n'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Visual Pipeline Simulator */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {currentFlow.name[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-xl leading-relaxed">
                      {currentFlow.description[lang]}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#2563EB]/15 text-[#60A5FA] border border-[#3B82F6]/30 font-bold">
                      {currentFlow.nodeCount} {lang === 'fa' ? 'گره خودکار' : 'nodes'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-8 px-3 rounded-full bg-white/[0.05] hover:bg-[#2563EB]/20 border border-white/10 text-xs font-mono text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlaying ? (lang === 'fa' ? 'توقف' : 'Pause') : (lang === 'fa' ? 'پخش' : 'Play')}</span>
                    </button>
                  </div>
                </div>

                {/* Node Pipeline Diagram */}
                <div className="py-8 space-y-3" dir="ltr">
                  <div className="text-[11px] font-mono text-[#94A3B8] mb-2 font-bold">
                    {lang === 'fa' ? 'مسیر جریان منطقی داده‌ها:' : 'Sequential Node Execution Topology:'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {currentFlow.steps.map((s, idx) => {
                      const isDone = idx < activeStep;
                      const isCurrent = idx === activeStep;
                      const meta = stepKindLabels[s.type] || stepKindLabels.code;

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border text-xs transition-all duration-300 ${
                            isCurrent
                              ? `${meta.color} scale-[1.02] shadow-[0_0_20px_rgba(37,99,235,0.4)]`
                              : isDone
                              ? 'bg-white/[0.03] border-white/10 text-[#E2E8F0]'
                              : 'bg-white/[0.01] border-white/5 text-[#94A3B8]/60'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                            <span className="font-bold uppercase tracking-wider">{s.type}</span>
                            <span className="text-white/40">#{idx + 1}</span>
                          </div>
                          <div className="font-medium text-white truncate">
                            {lang === 'fa' ? s.labelFa : s.labelEn}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8]">
                <span className="text-white font-semibold">{lang === 'fa' ? 'تایپ گره‌ها:' : 'Node Types:'}</span>
                {Object.entries(stepKindLabels).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${val.color.split(' ')[0]}`} />
                    <span>{lang === 'fa' ? val.fa : val.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shared Core Infrastructure & Bot Factory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          
          {/* Shared Core */}
          <div className="lg:col-span-5 luxury-card rounded-3xl p-7 space-y-5">
            <div>
              <span className="text-xs font-mono text-[#60A5FA] uppercase tracking-wider block mb-1 font-bold">
                Shared Architecture
              </span>
              <h3 className="text-xl font-bold text-white">
                {lang === 'fa' ? 'هسته‌ی پایدار اتوماسیون سازمانی' : 'Shared Resilient Infrastructure'}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                {lang === 'fa'
                  ? 'چهار ماژول مرکزی که پایداری، امنیت و مانیتورینگ همه پروژه‌ها را تضمین می‌کنند'
                  : 'Four foundational micro-services governing reliability and zero-downtime operations'}
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  titleFa: 'دروازه هوشمند با مدل پشتیبان و مدیریت قطعی',
                  titleEn: 'Intelligent AI Gateway with Dual Failover',
                  icon: ShieldCheck,
                  color: 'text-[#3B82F6]'
                },
                {
                  titleFa: 'چرخش خودکار کلیدهای API جهت رفع محدودیت‌ها',
                  titleEn: 'Autonomous API Key Rotation',
                  icon: Key,
                  color: 'text-[#60A5FA]'
                },
                {
                  titleFa: 'پایگاه داده متمرکز و لاگ یکپارچه مشتریان',
                  titleEn: 'Unified Customer Activity Ledger',
                  icon: Database,
                  color: 'text-[#FFB800]'
                },
                {
                  titleFa: 'گزارش روزانه ادمین و مانیتورینگ سلامت سرورها',
                  titleEn: 'Daily Ops & Telemetry Admin Dispatcher',
                  icon: Bell,
                  color: 'text-[#A78BFA]'
                }
              ].map((core, cIdx) => {
                const Icon = core.icon;
                return (
                  <div key={cIdx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3 hover:border-white/10 transition-colors">
                    <Icon className={`w-4 h-4 ${core.color} shrink-0`} />
                    <span className="text-xs sm:text-sm text-[#E2E8F0] font-medium">
                      {lang === 'fa' ? core.titleFa : core.titleEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bot Factory 10 Bots */}
          <div className="lg:col-span-7 luxury-card rounded-3xl p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#FFB800] uppercase tracking-wider block mb-1 font-bold">
                  Telegram Factory
                </span>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'fa' ? 'کارخانه ۱۰ ربات اختصاصی تلگرام' : 'Production Telegram Bot Factory'}
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/25 font-bold">
                Shared CRM
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {lang === 'fa'
                ? '۱۰ ربات فعال بر پایه یک ساختار استاندارد صنعتی با احراز هویت، ثبت اطلاعات، هوش مصنوعی پشتیبان و خروجی فارسی بدون نقص'
                : '10 battle-tested bots on a single unified architecture ensuring persistent customer activity tracking and instant response delivery'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[290px] overflow-y-auto pe-1">
              {BOTS_DATA.map(bot => (
                <div key={bot.number} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white font-mono" dir="ltr">{bot.name}</span>
                    <span className="text-[10px] font-mono text-[#FFB800] font-bold">#{bot.number}</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] leading-snug line-clamp-2">
                    {bot.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
