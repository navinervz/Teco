import React, { useState } from 'react';
import { Language } from '../types';
import { BLUEPRINT_MODULES } from '../data/tecoData';

interface BlueprintSectionProps {
  lang: Language;
}

export const BlueprintSection: React.FC<BlueprintSectionProps> = ({ lang }) => {
  const [activeNiche, setActiveNiche] = useState<'psyg' | 'arez'>('psyg');

  const nicheDetails = {
    psyg: {
      titleFa: 'سای‌جی · PSYG Store',
      titleEn: 'PSYG Consumer Electronics',
      descFa: 'حوزه کالای دیجیتال شامل گوشی موبایل، لپ‌تاپ، لوازم جانبی و تجهیزات صوتی که تمرکز اصلی آن بر تحلیل تاریخچه قیمت‌ها و راهنمایی هوشمند خرید در زمان افت ارزش کالا است',
      descEn: 'Consumer electronics niche covering smartphones, laptops, and wearables focused on historical price drop analysis and timely deal alerts',
      color: '#60A5FA'
    },
    arez: {
      titleFa: 'آرز · Arez Fashion Wear',
      titleEn: 'Arez Luxury Fashion',
      descFa: 'حوزه تخصصی مد و پوشاک که ویترین لوک‌بوک آنلاین را با اطلاع‌رسانی از شارژ مجدد سایز ترکیب کرده و مشتریان را به خریداران وفادار تبدیل می‌کند',
      descEn: 'High-end apparel and fashion lookbook tracking restocks by specific size and color, transforming abandoned visits into active purchases',
      color: '#3B82F6'
    }
  };

  const active = nicheDetails[activeNiche];

  return (
    <section id="blueprint" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#3B82F6]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>{lang === 'fa' ? 'بلوپرینت اختصاصی افیلیت' : 'Modular Engine Blueprint'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {lang === 'fa' ? 'یک موتور پایدار، چندین حوزه تجاری سودآور' : 'One Proven Core, Infinite Profitable Niches'}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            {lang === 'fa'
              ? 'پلتفرم‌های PSYG و Arez بر پایه یک بلوپرینت فنی مشترک توسعه یافته‌اند؛ هسته استخراج داده و پایش قیمت‌ها آماده است و برای هر کارفرما تنها لایه هویت بصری و رابط کاربری به صورت اختصاصی طراحی می‌شود'
              : 'PSYG and Arez demonstrate how a single resilient backend engine can power disparate industries with rapid deployment and zero compromise on brand prestige'}
          </p>
        </div>

        {/* Blueprint Box */}
        <div className="neon-rotate-border luxury-card rounded-3xl p-[1px]">
          <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] p-6 sm:p-8 space-y-8">
            {/* Segmented Switcher in Frosted Matte Glass */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/10 w-fit backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <button
                type="button"
                onClick={() => setActiveNiche('psyg')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                  activeNiche === 'psyg'
                    ? 'matte-tab-active'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                PSYG (کالای دیجیتال)
              </button>
              <button
                type="button"
                onClick={() => setActiveNiche('arez')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                  activeNiche === 'arez'
                    ? 'matte-tab-active'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Arez (پوشاک و مد)
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Shared Engine Modules */}
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2 font-bold">
                  {lang === 'fa' ? 'ماژول‌های موتور مشترک آماده استقرار:' : 'Pre-Engineered Core Modules:'}
                </div>

                <div className="space-y-2">
                  {BLUEPRINT_MODULES.map((m, mIdx) => {
                    const isLiveInArez = m.arezStatus === 'live';
                    const isArez = activeNiche === 'arez';
                    const isCurrentLive = !isArez || isLiveInArez;

                    return (
                      <div
                        key={mIdx}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                          isCurrentLive
                            ? 'bg-white/[0.03] border-white/10 text-white'
                            : 'bg-white/[0.01] border-white/5 text-[#94A3B8]/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                          <span className={`w-2 h-2 rounded-full ${isCurrentLive ? 'bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]' : 'bg-[#FFB800]'}`} />
                          <span>{m.title[lang]}</span>
                        </div>

                        <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                          isCurrentLive
                            ? 'border-[#3B82F6]/40 bg-[#2563EB]/15 text-[#60A5FA] font-bold'
                            : 'border-[#FFB800]/30 bg-[#FFB800]/10 text-[#FFB800]'
                        }`}>
                          {isCurrentLive ? (lang === 'fa' ? 'فعال در تولید' : 'Live') : (lang === 'fa' ? 'فاز ۲ توسعه' : 'Phase 2')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Niche Identity Layer */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-[#94A3B8]">
                    {lang === 'fa' ? 'لایه‌ی هویتی و رابط کاربری اختصاصی' : 'Domain-Specific Identity Layer'}
                  </span>
                  <span className="text-xs font-mono font-bold" style={{ color: active.color }}>
                    {activeNiche.toUpperCase()}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">
                  {lang === 'fa' ? active.titleFa : active.titleEn}
                </h4>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {lang === 'fa' ? active.descFa : active.descEn}
                </p>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-[#E2E8F0] space-y-1.5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                    <span>{lang === 'fa' ? 'مزیت اقتصادی برای کارفرمایان تکو:' : 'Core Economic Advantage:'}</span>
                  </div>
                  <div className="text-[#94A3B8] leading-relaxed">
                    {lang === 'fa'
                      ? 'کاهش ۷۰ درصدی زمان پیاده‌سازی و سرمایه‌گذاری اولیه، چرا که چرخ را از ابتدا اختراع نمی‌کنیم و از زیرساخت تست‌شده استفاده می‌کنیم'
                      : 'Cuts 70% of engineering turnaround time and capital risk by building atop a battle-tested data engine'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
