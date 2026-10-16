import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { 
  Code2, 
  Layers, 
  Briefcase, 
  Cpu, 
  ShieldCheck, 
  GitBranch, 
  Calendar, 
  FileCheck2,
  ChevronUp,
  Globe
} from 'lucide-react';

interface VerticalNavRailProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenPortal?: () => void;
  activeBookingsCount?: number;
}

interface RailSection {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  labelFa: string;
  labelEn: string;
  shortFa: string;
  shortEn: string;
  descFa: string;
  descEn: string;
  badgeFa: string;
  badgeEn: string;
}

export const VerticalNavRail: React.FC<VerticalNavRailProps> = ({ 
  lang, 
  onToggleLang,
  onOpenPortal,
  activeBookingsCount = 0
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Exactly 7 core sections with ONLY ONE unified Start Project & Booking item (#contact)
  const sections: RailSection[] = [
    { 
      id: 'hero', 
      icon: Code2,
      labelFa: 'معرفی استودیو', 
      labelEn: 'Studio Hero',
      shortFa: 'معرفی',
      shortEn: 'Hero',
      descFa: 'طراحی وب‌سایت‌های وردپرسی و اتوماسیون سازمانی',
      descEn: 'High-converting WordPress engineering & automation',
      badgeFa: '۰۱', 
      badgeEn: '01' 
    },
    { 
      id: 'services', 
      icon: Layers,
      labelFa: 'خدمات تخصصی', 
      labelEn: 'Core Services',
      shortFa: 'خدمات',
      shortEn: 'Services',
      descFa: 'توسعه وردپرس، هوک‌های اختصاصی و اتوماسیون n8n',
      descEn: 'WordPress dev, custom hooks & n8n workflows',
      badgeFa: '۰۲', 
      badgeEn: '02' 
    },
    { 
      id: 'work', 
      icon: Briefcase,
      labelFa: 'نمونه‌کارها و نتایج', 
      labelEn: 'Live Projects',
      shortFa: 'پروژه‌ها',
      shortEn: 'Work',
      descFa: 'پروژه‌های واقعی پیاده‌شده در ایران و کانادا',
      descEn: 'Proven platforms in Iran & international markets',
      badgeFa: '۰۳', 
      badgeEn: '03' 
    },
    { 
      id: 'lab', 
      icon: Cpu,
      labelFa: 'آزمایشگاه زنده', 
      labelEn: 'Automation Lab',
      shortFa: 'آزمایشگاه',
      shortEn: 'Lab',
      descFa: 'شبیه‌ساز گام‌به‌گام نودها و فرآیندهای خودکار',
      descEn: 'Interactive node pipeline & execution runner',
      badgeFa: '۰۴', 
      badgeEn: '04' 
    },
    { 
      id: 'blueprint', 
      icon: ShieldCheck,
      labelFa: 'بلوپرینت فنی', 
      labelEn: 'Engine Blueprint',
      shortFa: 'بلوپرینت',
      shortEn: 'Blueprint',
      descFa: 'موتور مشترک پایش قیمت و افیلیت هوشمند',
      descEn: 'Shared deal tracking & affiliate architecture',
      badgeFa: '۰۵', 
      badgeEn: '05' 
    },
    { 
      id: 'method', 
      icon: GitBranch,
      labelFa: 'روش اجرای کار', 
      labelEn: 'Delivery Method',
      shortFa: 'روش‌کار',
      shortEn: 'Method',
      descFa: 'فرآیند شفاف ۴ مرحله‌ای از کشف تا استقرار',
      descEn: '4-stage transparent deployment lifecycle',
      badgeFa: '۰۶', 
      badgeEn: '06' 
    },
    { 
      id: 'contact', 
      icon: Calendar,
      labelFa: 'شروع پروژه و رزرو نوبت', 
      labelEn: 'Start Project & Booking',
      shortFa: 'شروع',
      shortEn: 'Book',
      descFa: 'ثبت درخواست، ارسال ایمیل و مشاوره مستقیم',
      descEn: 'Submit project brief & schedule direct call',
      badgeFa: '۰۷', 
      badgeEn: '07' 
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }

      // Check current section
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollMiddle = scrollY + window.innerHeight * 0.38;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const top = el.offsetTop;
          if (scrollMiddle >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Desktop & Tablet Vertical Rail (Pristine sapphire capsule, scaled safely for tablets) */}
      <aside
        aria-label={lang === 'fa' ? 'ناوبری عمودی دسترسی سریع' : 'Vertical Quick Access Dock'}
        className="hidden md:flex fixed inset-inline-start-2 lg:inset-inline-start-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none scale-85 lg:scale-100 origin-inline-start transition-all duration-200 pointer-events-auto"
      >
        {/* Frosted Matte Glass Vertical Capsule Rail with Sapphire Blue Aura */}
        <div className="relative p-1.5 sm:p-2 rounded-full backdrop-blur-2xl bg-[#060A18]/85 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col items-center gap-1.5 sm:gap-2">
          
          {/* Language Switcher Button on the Rail */}
          <div className="relative group">
            <button
              type="button"
              onClick={onToggleLang}
              title={lang === 'fa' ? 'تغییر به زبان انگلیسی' : 'Switch to Persian'}
              aria-label={lang === 'fa' ? 'Switch language to English' : 'تغییر زبان به فارسی'}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.04] backdrop-blur-md hover:bg-[#2563EB]/20 text-[#94A3B8] hover:text-white border border-white/10 hover:border-[#60A5FA]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90"
            >
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#93C5FD] tracking-tight">
                {lang === 'fa' ? 'EN' : 'فا'}
              </span>
            </button>

            {/* Tooltip for Language */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 ${
                lang === 'fa' ? 'right-12' : 'left-12'
              } opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none z-50`}
            >
              <div className="px-3 py-1.5 rounded-xl bg-[#080D1E]/95 backdrop-blur-2xl border border-[#2563EB]/30 shadow-2xl text-start whitespace-nowrap">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span className="text-[#93C5FD]">{lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Scroll To Top Trigger */}
          <button 
            type="button"
            onClick={scrollToTop}
            title={lang === 'fa' ? 'بازگشت به ابتدای صفحه' : 'Scroll to top'}
            aria-label={lang === 'fa' ? 'بازگشت به ابتدای صفحه' : 'Scroll to top'}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08] text-[#8E9DBE] hover:text-[#93C5FD] border border-transparent hover:border-white/10 flex items-center justify-center cursor-pointer transition-all group"
          >
            <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>

          {/* Vertical Progress Groove Line in Sapphire Blue */}
          <div className="w-[2px] h-6 sm:h-8 bg-white/10 relative rounded-full overflow-hidden my-0.5">
            <div 
              className="w-full bg-gradient-to-b from-[#1D4ED8] via-[#2563EB] to-[#60A5FA] rounded-full transition-all duration-150 shadow-[0_0_8px_#3B82F6]"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {/* The 7 Unique Section Action Icons */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <div key={sec.id} className="relative group">
                  <button
                    type="button"
                    onClick={() => scrollTo(sec.id)}
                    aria-label={lang === 'fa' ? sec.labelFa : sec.labelEn}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none relative ${
                      isActive
                        ? 'bg-gradient-to-b from-[#2563EB]/35 to-[#1D4ED8]/25 backdrop-blur-md text-[#93C5FD] border border-[#60A5FA]/60 shadow-[0_0_16px_rgba(37,99,235,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] scale-110'
                        : 'text-[#8E9DBE] hover:text-white hover:bg-white/[0.07] border border-transparent hover:scale-105'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />

                    {/* Active Sapphire Micro Beacon */}
                    {isActive && (
                      <span className="absolute -top-0.5 -end-0.5 w-2 h-2 rounded-full bg-[#60A5FA] shadow-[0_0_8px_#3B82F6]" />
                    )}
                  </button>

                  {/* Floating Rich Tooltip Card (Shown on hover) */}
                  <div 
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      lang === 'fa' ? 'right-12 origin-left' : 'left-12 origin-right'
                    } opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none z-50`}
                  >
                    <div className="p-3 w-56 rounded-2xl bg-[#080D1E]/95 backdrop-blur-2xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.8)] text-start space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#93C5FD] px-1.5 py-0.5 rounded-md bg-[#2563EB]/15 border border-[#3B82F6]/30">
                          {lang === 'fa' ? sec.badgeFa : sec.badgeEn}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-mono text-[#60A5FA] flex items-center gap-1 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                            {lang === 'fa' ? 'بخش کنونی' : 'Active'}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-white">
                        {lang === 'fa' ? sec.labelFa : sec.labelEn}
                      </div>
                      <div className="text-[11px] text-[#94A3B8] leading-tight">
                        {lang === 'fa' ? sec.descFa : sec.descEn}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-5 sm:w-6 h-[1px] bg-white/10 my-0.5" />

          {/* Digital Contract Desk Trigger */}
          {onOpenPortal && (
            <div className="relative group">
              <button
                type="button"
                onClick={onOpenPortal}
                title={lang === 'fa' ? 'ورود به میزکار قرارداد و پیش‌فاکتور' : 'Open Contract Desk'}
                aria-label={lang === 'fa' ? 'ورود به میزکار قرارداد و پیش‌فاکتور' : 'Open Contract Desk'}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1E40AF]/20 backdrop-blur-md text-[#93C5FD] hover:text-white border border-[#3B82F6]/35 hover:border-[#60A5FA]/60 hover:shadow-[0_0_16px_rgba(37,99,235,0.35)] hover:scale-110 flex items-center justify-center transition-all cursor-pointer relative"
              >
                <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {activeBookingsCount > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-[#3B82F6] border-2 border-[#070B16] animate-pulse" />
                )}
              </button>

              {/* Tooltip for Portal */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 ${
                  lang === 'fa' ? 'right-12' : 'left-12'
                } opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none z-50`}
              >
                <div className="p-2.5 w-52 rounded-xl bg-[#080D1E]/95 backdrop-blur-2xl border border-[#3B82F6]/40 shadow-2xl text-start">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>{lang === 'fa' ? 'میزکار قرارداد و پیش‌فاکتور' : 'Digital Contract Desk'}</span>
                  </div>
                  <div className="text-[10px] text-[#A0ABBA] mt-0.5">
                    {lang === 'fa' ? 'مشاهده پیش‌نویس، تایید مراحل و پرداخت' : 'Review milestones, sign & pay'}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </aside>

      {/* 2. Mobile Native-Style App Bottom Navigation Bar (Responsive for all phones from 320px up to 767px) */}
      <nav
        aria-label={lang === 'fa' ? 'ناوبری همراه اپلیکیشن' : 'Mobile App Navigation'}
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#060A18]/96 backdrop-blur-2xl border-t border-white/12 shadow-[0_-12px_40px_rgba(0,0,0,0.92)] px-1 min-[360px]:px-2 pt-1 pb-[max(0.45rem,env(safe-area-inset-bottom))] select-none"
      >
        <div className="flex items-center justify-between gap-0.5 min-[360px]:gap-1 max-w-md mx-auto w-full">
          {/* Core Mobile Tabs */}
          {[
            { id: 'hero', icon: Code2, labelFa: 'معرفی', labelEn: 'Intro' },
            { id: 'services', icon: Layers, labelFa: 'خدمات', labelEn: 'Services' },
            { id: 'work', icon: Briefcase, labelFa: 'پروژه‌ها', labelEn: 'Projects' },
            { id: 'lab', icon: Cpu, labelFa: 'آزمایشگاه', labelEn: 'Lab' }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`flex-1 py-1 px-0.5 min-[360px]:px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 active:scale-95 cursor-pointer min-w-0 ${
                  isActive
                    ? 'text-[#93C5FD] font-bold'
                    : 'text-[#8E9DBE] hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 transition-transform ${isActive ? 'scale-110 text-[#60A5FA]' : ''}`} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
                  )}
                </div>
                <span className="text-[9px] min-[360px]:text-[10px] tracking-tight leading-none mt-0.5 min-[360px]:mt-1 truncate max-w-full">
                  {lang === 'fa' ? item.labelFa : item.labelEn}
                </span>
              </button>
            );
          })}

          {/* Central Highlighted: Start Project & Booking */}
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className={`px-2 min-[360px]:px-3 py-1 min-[360px]:py-1.5 rounded-xl min-[360px]:rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 active:scale-95 cursor-pointer shrink-0 ${
              activeSection === 'contact'
                ? 'bg-gradient-to-b from-[#2563EB]/40 to-[#1D4ED8]/30 border border-[#60A5FA]/60 text-white shadow-[0_0_16px_rgba(37,99,235,0.45)]'
                : 'bg-[#2563EB]/20 border border-[#3B82F6]/40 text-[#93C5FD]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 text-[#93C5FD]" />
            <span className="text-[9px] min-[360px]:text-[10px] font-bold font-mono leading-none">
              {lang === 'fa' ? 'رزرو' : 'Book'}
            </span>
          </button>

          {/* Digital Contract Desk Button with Badge */}
          {onOpenPortal && (
            <button
              type="button"
              onClick={onOpenPortal}
              className="flex-1 py-1 px-0.5 min-[360px]:px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[#8E9DBE] hover:text-white active:scale-95 transition-all cursor-pointer relative min-w-0"
            >
              <div className="relative">
                <FileCheck2 className="w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 text-[#60A5FA]" />
                {activeBookingsCount > 0 && (
                  <span className="absolute -top-1 -end-1 w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                )}
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] tracking-tight leading-none mt-0.5 min-[360px]:mt-1 truncate max-w-full">
                {lang === 'fa' ? 'قرارداد' : 'Desk'}
              </span>
            </button>
          )}

          {/* Mobile Language Switcher Button */}
          <button
            type="button"
            onClick={onToggleLang}
            title={lang === 'fa' ? 'English' : 'فارسی'}
            className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 rounded-lg min-[360px]:rounded-xl bg-white/[0.04] border border-white/10 text-[#93C5FD] hover:text-white flex items-center justify-center active:scale-90 transition-all cursor-pointer shrink-0"
          >
            <span className="font-mono text-[9px] min-[360px]:text-[10px] font-bold">
              {lang === 'fa' ? 'EN' : 'فا'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
