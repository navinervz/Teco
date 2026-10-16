import React, { useState } from 'react';
import { Language, ProjectItem } from '../types';
import { PROJECTS_DATA } from '../data/tecoData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ArrowUpRight, ExternalLink, Workflow } from 'lucide-react';

interface WorkSectionProps {
  lang: Language;
  onSelectFlow?: (flowId: string) => void;
  onOpenBooking: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  lang,
  onSelectFlow,
  onOpenBooking
}) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'telegram'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = PROJECTS_DATA.filter(p => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  const renderMockVisualizer = (project: ProjectItem) => {
    switch (project.id) {
      case 'psyg':
        return (
          <div className="h-44 p-4 flex flex-col justify-between bg-[#060A14] font-mono text-[11px]" dir="ltr">
            <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/10 pb-2">
              <span className="text-white font-bold">psygstore.shop</span>
              <span className="text-[#60A5FA] font-semibold">AUTONOMOUS RADAR</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[#E2E8F0]">Xiaomi Poco C95 Pro</span>
                <span className="text-[#3B82F6] font-bold">−19% (Drop Alert)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[#E2E8F0]">Mazeres Pro Noise-Cancel</span>
                <span className="text-[#60A5FA] font-bold">−27% (Lowest 90d)</span>
              </div>
            </div>
            <div className="h-7 w-full flex items-center">
              <svg className="w-full h-full" viewBox="0 0 200 30" preserveAspectRatio="none">
                <path d="M0,25 L25,23 L50,26 L75,18 L100,16 L125,20 L150,11 L175,9 L200,4" fill="none" stroke="#3B82F6" strokeWidth="2" />
                <path d="M0,25 L25,23 L50,26 L75,18 L100,16 L125,20 L150,11 L175,9 L200,4 L200,30 L0,30 Z" fill="#2563EB" fillOpacity="0.15" />
              </svg>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
              <span className="text-[#60A5FA]">✓ {lang === 'fa' ? 'سیگنال: فرصت طلایی خرید' : 'Verdict: Optimal Buy Time'}</span>
              <span className="text-white/60">7 Retail Partners</span>
            </div>
          </div>
        );

      case 'arez':
        return (
          <div className="h-44 p-4 flex flex-col justify-between bg-[#060A14] font-mono text-[11px]" dir="ltr">
            <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/10 pb-2">
              <span className="text-white font-bold">arezwear.shop</span>
              <span className="text-[#3B82F6]">LOOKBOOK RADAR</span>
            </div>
            <div className="text-center py-2">
              <div className="font-extrabold text-2xl tracking-widest text-[#60A5FA]">
                AREZ
              </div>
              <div className="text-[10px] text-[#94A3B8] mt-0.5">MODULAR FASHION ARCHITECTURE</div>
            </div>
            <div className="flex justify-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded border border-white/10 text-[#94A3B8]">S</span>
              <span className="px-2.5 py-0.5 rounded border border-white/10 text-[#94A3B8]">M</span>
              <span className="px-2.5 py-0.5 rounded border border-[#3B82F6] bg-[#2563EB]/20 text-[#60A5FA] font-bold">L RESTOCKED</span>
              <span className="px-2.5 py-0.5 rounded border border-white/10 text-[#94A3B8]">XL</span>
            </div>
            <div className="text-center text-[10px] text-[#93C5FD]">
              {lang === 'fa' ? 'سایز L دوباره موجود شد (ارسال خودکار اعلان به خریدار)' : 'Size L Restocked · Automatic Notification Sent'}
            </div>
          </div>
        );

      case 'playfit':
        return (
          <div className="h-44 p-4 flex flex-col justify-between bg-[#060A14] font-mono text-[11px]" dir="ltr">
            <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/10 pb-2">
              <span className="text-white font-bold">North Vancouver, BC</span>
              <span className="text-[#FFB800]">PLAYFIT CENTRE</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-white font-sans">
                Every body has a <span className="text-[#FFB800]">first rep.</span>
              </div>
              <div className="flex gap-1 text-[9px] text-[#94A3B8]">
                <span className="px-2 py-0.5 rounded bg-white/5 text-white">Kids Foundation</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-white">Youth Track</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-white">Adult Mobility</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/25 text-[10px] text-[#E2E8F0]">
              <span className="text-[#FFB800] font-semibold">PlayFit Concierge:</span> Inbound booking streamed to CRM & Welcome Email
            </div>
          </div>
        );

      case 'site-doctor':
        return (
          <div className="h-44 p-4 flex flex-col justify-between bg-[#060A14] font-mono text-[11px]" dir="ltr">
            <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/10 pb-2">
              <span className="text-white font-bold">site-doctor-landing</span>
              <span className="text-[#A78BFA]">60s AUDIT ENGINE</span>
            </div>
            <div className="flex items-center gap-4 py-1">
              <div className="w-14 h-14 rounded-full border-2 border-[#A78BFA] flex items-center justify-center font-bold text-base text-[#A78BFA] shadow-[0_0_15px_rgba(167,139,250,0.3)]">
                98%
              </div>
              <div className="space-y-1 text-[10px] text-[#94A3B8]">
                <div>Server TTFB: <span className="text-[#60A5FA] font-bold">0.12s (Optimal)</span></div>
                <div>Core Web Vitals: <span className="text-[#60A5FA] font-bold">Passed</span></div>
                <div>Action Prescription: <span className="text-[#A78BFA] font-bold">Ready</span></div>
              </div>
            </div>
            <div className="text-[10px] text-[#94A3B8] text-center border-t border-white/10 pt-1">
              {lang === 'fa' ? 'گزارش راهبردی سئو و سرعت به ایمیل ارسال شد' : 'Optimization prescription emailed to client'}
            </div>
          </div>
        );

      case 'psyg-tg':
        return (
          <div className="h-44 p-4 flex flex-col justify-between bg-[#060A14] font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/10 pb-2" dir="ltr">
              <span className="text-white font-bold">@psygonline</span>
              <span className="text-[#60A5FA]">857 MEMBERS</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-[#E2E8F0] space-y-1 text-center">
              <div className="font-bold text-[#60A5FA]">«قیمت‌ها رو دنبال نکن؛ فرصت‌ها رو شکار کن»</div>
              <div className="text-[10px] text-[#94A3B8]">پایپ‌لاین انتشار خودکار فرصت‌های خرید</div>
            </div>
            <div className="text-[10px] text-[#94A3B8] text-center" dir="ltr">
              psygstore.shop · Autonomous Broadcast Funnel
            </div>
          </div>
        );

      case 'tecofi':
        return (
          <div className="h-44 p-4 flex flex-col justify-between bg-[#060A14] font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/10 pb-2" dir="ltr">
              <span className="text-white font-bold">@tecofinance</span>
              <span className="text-[#FFB800]">318 SUBSCRIBERS</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-[10px] text-[#94A3B8]">نظرسنجی زنده (۱ رأی مجاز به ازای هر کاربر):</div>
              <div className="p-2 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/25 text-xs flex justify-between">
                <span>پیش‌بینی روند هفتگی بیت‌کوین: صعودی</span>
                <span className="font-bold text-[#FFB800]">64%</span>
              </div>
            </div>
            <div className="text-[10px] text-[#94A3B8] text-center" dir="ltr">
              Immutable Ledger Sync · Real-time Votes
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#3B82F6]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{lang === 'fa' ? 'سوابق و پروژه‌های عملیاتی' : 'Proven Track Record'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              {lang === 'fa' ? 'پروژه‌های زنده، با داده‌های آماری واقعی و اثبات‌شده' : 'Live Deployments, Verifiable Commercial Impact'}
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              {lang === 'fa'
                ? 'هر کارت به یک پلتفرم در حال کار با کاربران حقیقی در ایران یا خارج از کشور متصل است و تمامی آمارها از دیتابیس‌های زنده استخراج شده‌اند'
                : 'Every project card connects to an active production deployment serving real customers across Iran, Canada, and international jurisdictions'}
            </p>
          </div>

          {/* Filter Tabs in Frosted Matte Glass */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/10 self-start md:self-auto backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] max-w-full overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'matte-tab-active'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {lang === 'fa' ? 'همه پروژه‌ها' : 'All Projects'}
            </button>
            <button
              type="button"
              onClick={() => setFilter('web')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'web'
                  ? 'matte-tab-active'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {lang === 'fa' ? 'وب‌سایت‌ها و وردپرس' : 'Web & WordPress'}
            </button>
            <button
              type="button"
              onClick={() => setFilter('telegram')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'telegram'
                  ? 'matte-tab-active'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {lang === 'fa' ? 'کانال و ربات تلگرام' : 'Telegram Systems'}
            </button>
          </div>
        </div>

        {/* Project Cards Grid with Rotating Sapphire Neon Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="neon-rotate-border luxury-card rounded-3xl p-[1px] group flex flex-col justify-between">
              <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] overflow-hidden flex flex-col justify-between h-full">
                <div>
                  {/* Visualizer Frame */}
                  <div className="border-b border-white/10">
                    {renderMockVisualizer(project)}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="text-[11px] font-mono text-[#60A5FA]">
                      {project.kicker[lang]}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                      {project.name[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#94A3B8] line-clamp-3 leading-relaxed">
                      {project.summary[lang]}
                    </p>

                    {/* Clean unboxed tags with typographic separator */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]/70 pt-1">
                      {project.tags.map((tag, tIdx) => (
                        <React.Fragment key={tIdx}>
                          <span>{tag}</span>
                          {tIdx < project.tags.length - 1 && <span aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between text-xs font-mono bg-white/[0.01]">
                  <div>
                    <span className="font-bold text-white text-sm font-mono">{project.metric.value} </span>
                    <span className="text-[#94A3B8]">{project.metric.label[lang]}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="h-8 px-3.5 rounded-full bg-white/[0.05] hover:bg-[#2563EB]/20 border border-white/10 hover:border-[#3B82F6]/60 text-white transition-all cursor-pointer text-xs font-medium"
                    >
                      {lang === 'fa' ? 'مشاهده جزئیات' : 'Inspect'}
                    </button>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full border border-white/10 text-[#94A3B8] hover:text-[#60A5FA] hover:border-[#3B82F6]/60 flex items-center justify-center transition-colors"
                      title={lang === 'fa' ? 'مشاهده وب‌سایت زنده' : 'View live project'}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Teco B2B Product Banner: SiteGen */}
        <div className="mt-12 neon-rotate-border luxury-card rounded-3xl p-[1px]">
          <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] p-7 sm:p-9">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/25 font-bold">
                    {lang === 'fa' ? 'محصول سازمانی تکو · آماده استقرار' : 'Teco Flagship Software · Ready for Deployment'}
                  </span>
                  <span className="text-[#94A3B8]">Autonomous Bilingual Site Builder</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                  {lang === 'fa' ? 'SiteGen: سامانه تولید خودکار وب‌سایت دوزبانه برای سازمان‌ها' : 'SiteGen: Autonomous Bilingual Website Generator'}
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
                  {lang === 'fa'
                    ? 'محصول نوآورانه استودیو تکو برای آژانس‌های تبلیغاتی، سازمان‌ها و شرکت‌های بین‌المللی که می‌خواهند برای کاربران یا شعب خود به سرعت وب‌سایت‌های دوزبانه، بهینه‌سازی‌شده برای سئو و منطبق با هویت برند را بدون درگیر شدن در ماه‌ها برنامه‌نویسی طاقت‌فرسا راه‌اندازی کنند'
                    : 'Teco’s enterprise software enabling marketing agencies and multi-brand enterprises to deploy bespoke bilingual web assets at scale through standardized autonomous pipelines'}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[#E2E8F0]">
                    {lang === 'fa' ? '۷۵ گره پردازشی' : '75-node workflow'}
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[#E2E8F0]">
                    {lang === 'fa' ? '۶ نقش تخصصی' : '6 agent roles'}
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[#E2E8F0]">
                    {lang === 'fa' ? 'فارسی و انگلیسی' : 'Bilingual RTL/LTR'}
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[#E2E8F0]">
                    WordPress & Next.js
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="liquid-btn h-12 px-6 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer text-white flex items-center justify-center gap-2"
                >
                  <Workflow className="w-4 h-4 text-[#93C5FD]" />
                  <span>{lang === 'fa' ? 'درخواست دمو و پیاده‌سازی سازمانی' : 'Request Enterprise Demo'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          lang={lang}
          onSelectFlow={onSelectFlow}
          onOpenBooking={onOpenBooking}
        />
      </div>
    </section>
  );
};
