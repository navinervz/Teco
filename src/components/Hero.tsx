import React, { useState, useEffect } from 'react';
import { Language, WorkflowItem } from '../types';
import { STUDIO_METRICS, WORKFLOWS_DATA } from '../data/tecoData';
import { ArrowUpRight, Play, Pause, FileCheck2, ShieldCheck, CalendarCheck } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking, onOpenPortal }) => {
  const replayFlowIds = ['site-doctor', 'psyg-content', 'mapminer', 'taskflow'];
  const replayFlows: WorkflowItem[] = replayFlowIds
    .map(id => WORKFLOWS_DATA.find(f => f.id === id))
    .filter(Boolean) as WorkflowItem[];

  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentFlow = replayFlows[activeTabIdx] || replayFlows[0];

  useEffect(() => {
    if (!isPlaying || !currentFlow) return;

    const timer = setInterval(() => {
      setActiveStepIdx(prev => {
        if (prev < currentFlow.steps.length - 1) {
          return prev + 1;
        } else {
          setActiveTabIdx(t => (t + 1) % replayFlows.length);
          return 0;
        }
      });
    }, 1100);

    return () => clearInterval(timer);
  }, [isPlaying, currentFlow, replayFlows.length]);

  const stepKindColor: Record<string, { bg: string; text: string; dot: string }> = {
    trigger: { bg: 'bg-[#FFB800]/10 border-[#FFB800]/30', text: 'text-[#FFB800]', dot: 'bg-[#FFB800]' },
    fetch: { bg: 'bg-[#2563EB]/10 border-[#3B82F6]/30', text: 'text-[#60A5FA]', dot: 'bg-[#3B82F6]' },
    logic: { bg: 'bg-[#E2E8F0]/10 border-[#E2E8F0]/30', text: 'text-[#E2E8F0]', dot: 'bg-[#E2E8F0]' },
    code: { bg: 'bg-[#94A3B8]/10 border-[#94A3B8]/30', text: 'text-[#94A3B8]', dot: 'bg-[#94A3B8]' },
    ai: { bg: 'bg-[#A78BFA]/15 border-[#A78BFA]/30', text: 'text-[#A78BFA]', dot: 'bg-[#A78BFA]' },
    send: { bg: 'bg-[#1D4ED8]/15 border-[#2563EB]/30', text: 'text-[#93C5FD]', dot: 'bg-[#3B82F6]' }
  };

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 overflow-hidden">
      {/* Calm Ambient Lighting and Subtle Dot Matrix in Sapphire Blue */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="bg-tech-dots absolute inset-0 opacity-40" />
        <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full bg-[#2563EB]/12 blur-[180px]" />
        <div className="absolute top-64 -left-32 w-[550px] h-[550px] rounded-full bg-[#1D4ED8]/10 blur-[180px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#94A3B8] px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
              <span className="text-[#60A5FA] font-bold">TECO STUDIO</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-white/90">تهران و ونکوور</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-[#93C5FD]">ایران و بین‌الملل</span>
            </div>

            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.3] text-white">
              {lang === 'fa' ? (
                <>
                  <span className="block">مهندسی وب‌سایت‌های سفارشی</span>
                  <span className="bg-gradient-to-r from-[#93C5FD] via-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent block mt-1 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    با اتوماسیون کامل فرآیندها
                  </span>
                </>
              ) : (
                <>
                  <span className="block">High-Converting Digital Platforms</span>
                  <span className="bg-gradient-to-r from-[#93C5FD] via-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent block mt-1 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    Powered by Autonomous Workflows
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-loose max-w-xl">
              {lang === 'fa'
                ? 'استودیو تکو برای کسب‌وکارهای پیشرو در ایران و کانادا، پلتفرم‌های پرسرعت با مدیریت آسان وردپرس و سیستم‌های اتوماسیون سازمانی پیاده‌سازی می‌کند تا کارهای تکراری روزمره به صورت خودکار اجرا شوند و تیم شما فقط روی رشد و سودآوری تمرکز کند'
                : 'Teco engineers high-performance web platforms integrated with intuitive WordPress administrative control and autonomous backend workflows for ambitious brands across Iran, Canada, and global markets'}
            </p>

            {/* Sapphire Blue Liquid Glass CTAs with Blurred Gradient */}
            <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="liquid-btn h-11 min-[360px]:h-12 px-5 min-[360px]:px-7 rounded-xl min-[360px]:rounded-2xl text-xs sm:text-sm font-bold cursor-pointer text-white flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-[#93C5FD]" />
                <span>{lang === 'fa' ? 'شروع پروژه و رزرو نوبت مشاوره' : 'Start Project & Book Discovery'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenPortal}
                className="liquid-btn-secondary h-11 min-[360px]:h-12 px-4 min-[360px]:px-6 rounded-xl min-[360px]:rounded-2xl text-xs sm:text-sm font-semibold cursor-pointer flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4 text-[#60A5FA]" />
                <span>{lang === 'fa' ? 'میزکار قرارداد و پیش‌فاکتور' : 'Client Contract Desk'}</span>
              </button>
            </div>

            {/* Trust and Regional Presence Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-[#94A3B8] pt-2">
              <div className="flex items-center gap-1.5 font-medium text-white">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3B82F6]" />
                <span>{lang === 'fa' ? 'توسعه اختصاصی وردپرس با لود زیر ۱ ثانیه' : 'Custom WordPress Sub-Second Speed'}</span>
              </div>
              <span aria-hidden="true" className="text-white/20 hidden sm:inline">·</span>
              <span>{lang === 'fa' ? 'پشتیبانی پرداخت ریالی و ارزی (CAD / USDT)' : 'Dual Payment (IRR / CAD / USDT)'}</span>
              <span aria-hidden="true" className="text-white/20 hidden sm:inline">·</span>
              <span className="text-[#60A5FA]">{lang === 'fa' ? 'گارانتی رسمی ۶ ماهه بدون باگ' : '6-Month SLA Warranty'}</span>
            </div>
          </div>

          {/* Interactive Replay Board with Smooth Sapphire Neon Border */}
          <div className="lg:col-span-6">
            <div className="neon-rotate-border luxury-card rounded-3xl p-[1px]">
              <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <h2 className="text-xs sm:text-sm font-semibold text-white font-mono">
                      {lang === 'fa' ? 'پایپ‌لاین فعال اتوماسیون' : 'Active Autonomous Pipeline'}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-xl bg-white/[0.05] text-[#94A3B8] hover:text-white transition-colors cursor-pointer border border-white/5"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 text-[#60A5FA] border border-[#3B82F6]/30 font-bold">
                      29 {lang === 'fa' ? 'جریان فعال' : 'active'}
                    </span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="px-4 pt-3 flex gap-1.5 overflow-x-auto no-scrollbar border-b border-white/5 pb-2.5">
                  {replayFlows.map((flow, idx) => (
                    <button
                      key={flow.id}
                      type="button"
                      onClick={() => {
                        setActiveTabIdx(idx);
                        setActiveStepIdx(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all cursor-pointer ${
                        activeTabIdx === idx
                          ? 'matte-tab-active'
                          : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {flow.name[lang]}
                    </button>
                  ))}
                </div>

                {/* Board Body */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#94A3B8] font-mono">
                    <span className="text-white font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
                      {currentFlow.name[lang]}
                    </span>
                    <span className="text-[#60A5FA] font-semibold">
                      {currentFlow.nodeCount} {lang === 'fa' ? 'گره پردازشی متصل' : 'connected nodes'}
                    </span>
                  </div>

                  {/* Animated Steps Pipeline */}
                  <div className="space-y-2" dir="ltr">
                    {currentFlow.steps.map((step, sIdx) => {
                      const isPassed = sIdx < activeStepIdx;
                      const isCurrent = sIdx === activeStepIdx;
                      const style = stepKindColor[step.type] || stepKindColor.code;

                      return (
                        <div
                          key={sIdx}
                          className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                            isCurrent
                              ? `${style.bg} border-opacity-100 shadow-[0_0_20px_rgba(37,99,235,0.3)] scale-[1.01]`
                              : isPassed
                              ? 'bg-white/[0.02] border-white/5 opacity-75'
                              : 'bg-white/[0.01] border-white/5 opacity-40'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`w-2 h-2 rounded-full ${style.dot} shrink-0`} />
                            <span className={`text-[11px] font-mono font-semibold uppercase ${style.text} tracking-wider shrink-0`}>
                              {step.type}
                            </span>
                            <span className="text-xs text-white truncate font-medium">
                              {lang === 'fa' ? step.labelFa : step.labelEn}
                            </span>
                          </div>

                          <span className="text-[10px] font-mono text-[#94A3B8] shrink-0 font-bold">
                            {isCurrent ? (
                              <span className="text-[#60A5FA] animate-pulse">RUNNING...</span>
                            ) : isPassed ? (
                              'PASS ✓'
                            ) : (
                              'QUEUE'
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed pt-2 border-t border-white/5">
                    {currentFlow.description[lang]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Verification Strip in Sapphire & Slate */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="luxury-card rounded-2xl p-3.5 sm:p-5">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {STUDIO_METRICS.workflows}
              </div>
              <div className="text-[11px] sm:text-xs text-[#94A3B8] mt-1 sm:mt-1.5 font-medium leading-relaxed">
                {lang === 'fa' ? 'ورک‌فلو فعال در n8n سازمانی' : 'Active production workflows'}
              </div>
            </div>

            <div className="luxury-card rounded-2xl p-3.5 sm:p-5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#60A5FA] font-mono shadow-sm">
                +{STUDIO_METRICS.nodes}
              </div>
              <div className="text-[11px] sm:text-xs text-[#94A3B8] mt-1 sm:mt-1.5 font-medium leading-relaxed">
                {lang === 'fa' ? 'گره متصل و خودکارسازی‌شده' : 'Connected automated nodes'}
              </div>
            </div>

            <div className="luxury-card rounded-2xl p-3.5 sm:p-5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FFB800] font-mono">
                {STUDIO_METRICS.bots}
              </div>
              <div className="text-[11px] sm:text-xs text-[#94A3B8] mt-1 sm:mt-1.5 font-medium leading-relaxed">
                {lang === 'fa' ? 'ربات تلگرام روی کارخانه مشترک' : 'Telegram bots on shared factory'}
              </div>
            </div>

            <div className="luxury-card rounded-2xl p-3.5 sm:p-5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#93C5FD] font-mono">
                {STUDIO_METRICS.liveChannels}
              </div>
              <div className="text-[11px] sm:text-xs text-[#94A3B8] mt-1 sm:mt-1.5 font-medium leading-relaxed">
                {lang === 'fa' ? 'پلتفرم و کانال زنده تحت مدیریت' : 'Live products & channels'}
              </div>
            </div>
          </div>

          <div className="mt-3 text-start text-[11px] font-mono text-[#94A3B8]/60">
            {lang === 'fa' 
              ? `داده‌های پایش شده از زیرساخت اختصاصی ابری تکو، ${STUDIO_METRICS.auditDate}` 
              : `Verified telemetry from Teco cloud infrastructure, ${STUDIO_METRICS.auditDateEn}`}
          </div>
        </div>
      </div>
    </section>
  );
};
