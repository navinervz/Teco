import React from 'react';
import { Language } from '../types';
import { TECH_STACK } from '../data/tecoData';
import { MessageSquareCode, Search, Code2, Rocket } from 'lucide-react';

interface MethodSectionProps {
  lang: Language;
}

export const MethodSection: React.FC<MethodSectionProps> = ({ lang }) => {
  const steps = [
    {
      number: '01',
      titleFa: 'مشاوره‌ی عمیق و تدوین استراتژی تجاری',
      titleEn: 'Discovery & Strategic Architecture',
      descFa: 'بررسی دقیق مدل درآمدی، رقبا و ساختار کسب‌وکار شما؛ هیچ پکیج کلیشه‌ای یا قالب آماده‌ای در کار نیست و راه‌حل از پایه برای شما طراحی می‌شود',
      descEn: 'Rigorous dialogue dissecting business metrics, conversion funnels, and constraints with zero pre-baked generic templates',
      icon: MessageSquareCode,
      color: 'text-[#60A5FA]'
    },
    {
      number: '02',
      titleFa: 'تحقیق عمیق بازار با ایجنت‌های هوشمند',
      titleEn: 'Data-Driven Market & Competitor Audit',
      descFa: 'تیم مهندسی تکو با ایجنت‌های اختصاصی، سرعت سایت‌های رقبا، کلمات کلیدی، حفره‌های سئو و نیازهای پنهان کاربران را استخراج می‌کند',
      descEn: 'In-house intelligence agents map competitive gaps, Core Web Vitals, and keyword opportunities across local and global markets',
      icon: Search,
      color: 'text-[#3B82F6]'
    },
    {
      number: '03',
      titleFa: 'توسعه اختصاصی و اتصال پنل آسان وردپرس',
      titleEn: 'Custom Engineering & WordPress Integration',
      descFa: 'طراحی رابط کاربری پریمیوم با کدنویسی تمیز فرانت‌اند و اتصال به پنل مدیریت آسان وردپرس تا دست شما برای تغییرات محتوایی کاملاً باز باشد',
      descEn: 'High-speed frontend implementation married to intuitive custom WordPress CMS control, empowering your team with complete autonomy',
      icon: Code2,
      color: 'text-[#FFB800]'
    },
    {
      number: '04',
      titleFa: 'اتوماسیون کامل فرآیندها و استقرار مطمئن',
      titleEn: 'Autonomous Automation & Turnkey Handover',
      descFa: 'تمام کارهای تکراری (ثبت سرنخ، قیمت‌گذاری، اطلاع‌رسانی و مدیریت داده‌ها) به پایپ‌لاین‌های خودکار n8n تبدیل شده و پروژه با پشتیبانی رسمی تحویل می‌گردد',
      descEn: 'Repetitive bottlenecks are orchestrated into autonomous cloud workflows, concluding with seamless production deployment and SLA warranty',
      icon: Rocket,
      color: 'text-[#A78BFA]'
    }
  ];

  return (
    <section id="method" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#3B82F6]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>{lang === 'fa' ? 'روش اجرای پروژه‌ها' : 'Delivery Framework'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {lang === 'fa' ? 'از اولین جلسه تا سامانه‌ای که خودش بدون توقف کار می‌کند' : 'From Initial Discovery to an Autonomous Revenue Engine'}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            {lang === 'fa'
              ? 'فرآیند ۴ مرحله‌ای شفاف و منظم که زمان تحویل را به حداقل رسانده و بالاترین استانداردهای مهندسی نرم‌افزار را تضمین می‌کند'
              : 'A transparent, disciplined 4-stage engineering lifecycle designed for high velocity, flawless code quality, and zero project surprises'}
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, sIdx) => {
            const Icon = st.icon;
            return (
              <div key={st.number} className="neon-rotate-border luxury-card rounded-3xl p-[1px] group">
                <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] p-6 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black font-mono text-white/20 group-hover:text-[#60A5FA] transition-colors">
                        {st.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${st.color}`} />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                      {lang === 'fa' ? st.titleFa : st.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {lang === 'fa' ? st.descFa : st.descEn}
                    </p>
                  </div>

                  <div className="pt-3 text-[11px] font-mono text-[#94A3B8]/60 border-t border-white/10 font-bold">
                    Phase {sIdx + 1} of 4
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Daily Tech Stack Bar */}
        <div className="neon-rotate-border luxury-card rounded-3xl p-[1px]">
          <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider font-bold">
              {lang === 'fa' ? 'زیرساخت‌ها و ابزارهای استاندارد در پروژه‌های تکو:' : 'Technologies and frameworks powering our deployments:'}
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono" dir="ltr">
              {TECH_STACK.map((tool, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[#E2E8F0] hover:border-[#3B82F6]/60 hover:text-[#60A5FA] hover:bg-[#2563EB]/10 transition-all cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
