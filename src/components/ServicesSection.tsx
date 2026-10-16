import React from 'react';
import { Language } from '../types';
import { Globe, Cpu, Bot, Send, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onOpenBooking }) => {
  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#3B82F6]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>{lang === 'fa' ? 'خدمات مهندسی و توسعه' : 'Core Capabilities'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {lang === 'fa' ? 'طراحی وب‌سایت‌های سفارشی و اتوماسیون بی‌وقفه فرآیندها' : 'Bespoke Web Systems & Autonomous Enterprise Engineering'}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {lang === 'fa'
              ? 'تکو برای برندها در ایران، کانادا و بازارهای بین‌المللی، سیستم‌هایی خلق می‌کند که با پنل کاربری آسان مدیریت می‌شوند و با اتوماسیون ابری، بدون نیاز به اپراتور دستی کارهای تکراری را پیش می‌برند'
              : 'Teco engineers autonomous systems for growing organizations across Iran and North America, combining intuitive content management with cloud-level automation'}
          </p>
        </div>

        {/* Bento Grid with Liquid Glass & Rotating Sapphire Neon Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Custom Websites & WordPress */}
          <div className="neon-rotate-border luxury-card rounded-3xl p-[1px] group">
            <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] p-7 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#60A5FA] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                  <Globe className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-mono text-[#60A5FA] block mb-1">01. Web Engineering & WordPress</span>
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'fa' ? 'وب‌سایت‌های سفارشی سازگار با وردپرس و پلتفرم‌های افیلیت' : 'Bespoke WordPress Websites & Affiliate Platforms'}
                  </h3>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {lang === 'fa'
                    ? 'طراحی و برنامه‌نویسی وب‌سایت‌های فوق‌سریع که پنل مدیریت ساده و قدرتمند وردپرس را در اختیار تیم شما می‌گذارند و در عین حال، با کدنویسی اصولی و بدون باگ‌های قالب‌های تجاری آماده، سرعت لود زیر ۱ ثانیه و بالاترین رتبه‌های سئو را در ایران و خارج از کشور تضمین می‌کنند'
                    : 'Bespoke web platforms pairing sub-second frontend speeds with intuitive custom WordPress administrative controls, eliminating bloated themes and optimizing search visibility'}
                </p>

                <div className="space-y-2.5 text-xs text-[#E2E8F0] pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>{lang === 'fa' ? 'مدیریت ساده و لذت‌بخش با وردپرس اختصاصی بدون وابستگی به برنامه‌نویس' : 'Frictionless custom WordPress CMS control'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                    <span>{lang === 'fa' ? 'پلتفرم‌های هوشمند ردیابی قیمت و درآمدزایی پایدار افیلیت' : 'Scalable price tracking & affiliate monetization engines'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#94A3B8]">
                  {lang === 'fa' ? 'نمونه‌های زنده: PSYG · Arez · PlayFit' : 'Proof: PSYG · Arez · PlayFit'}
                </span>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-[#60A5FA] hover:text-[#93C5FD] flex items-center gap-1 cursor-pointer font-sans font-bold transition-colors"
                >
                  <span>{lang === 'fa' ? 'شروع پروژه' : 'Book service'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Enterprise n8n Automation */}
          <div className="neon-rotate-border luxury-card rounded-3xl p-[1px] group">
            <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] p-7 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1D4ED8]/20 border border-[#2563EB]/35 flex items-center justify-center text-[#93C5FD] group-hover:shadow-[0_0_20px_rgba(29,78,216,0.4)] transition-all">
                  <Cpu className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-mono text-[#93C5FD] block mb-1">02. Autonomous Architecture</span>
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'fa' ? 'اتوماسیون سازمانی فرآیندهای تجاری با n8n' : 'Enterprise Process Automation with n8n'}
                  </h3>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {lang === 'fa'
                    ? 'ساخت پایپ‌لاین‌های خودکار که داده‌های پراکنده را از سراسر وب، فرم‌های مشتریان، فروشگاه‌ها یا فایل‌ها دریافت کرده و با پردازش هوشمند، در وب‌سایت، گوگل شیتس، نرم‌افزار CRM و پیام‌رسان‌ها سازماندهی می‌کنند'
                    : 'Turnkey data pipelines orchestrating inbound leads, catalog synchronization, and customer communications across cloud databases, spreadsheets, and messengers with zero downtime'}
                </p>

                <div className="space-y-2.5 text-xs text-[#E2E8F0] pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>{lang === 'fa' ? 'حذف خطاهای انسانی و نجات صدها ساعت وقت کارمندان در ماه' : 'Eliminate human errors and save hundreds of monthly operational hours'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                    <span>{lang === 'fa' ? 'سیستم پشتیبان و جابه‌جایی خودکار در صورت قطعی هر سرویس' : 'Automatic failover mechanisms ensuring 99.9% uptime'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#94A3B8]">
                  {lang === 'fa' ? '۲۹ پایپ‌لاین فعال · ۵۰۰ گره متصل' : '29 active workflows · 500 connected nodes'}
                </span>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-[#93C5FD] hover:text-white flex items-center gap-1 cursor-pointer font-sans font-bold transition-colors"
                >
                  <span>{lang === 'fa' ? 'درخواست اتوماسیون' : 'Automate business'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: AI Assistants & Concierges */}
          <div className="neon-rotate-border luxury-card rounded-3xl p-[1px] group">
            <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] p-7 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#7B61FF]/10 border border-[#7B61FF]/25 flex items-center justify-center text-[#A78BFA] group-hover:shadow-[0_0_20px_rgba(123,97,255,0.3)] transition-all">
                  <Bot className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-mono text-[#A78BFA] block mb-1">03. Intelligent Agents</span>
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'fa' ? 'دستیارهای هوشمند تجاری و چت‌بات‌های پاسخگو' : 'Intelligent Commercial Concierges & Conversational Agents'}
                  </h3>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {lang === 'fa'
                    ? 'ایجنت‌های هوشمندی که مستقیماً به پایگاه داده و محصولات شما متصل می‌شوند؛ به زبان کاربر پاسخ می‌دهند، لیدهای فروش را اعتبارسنجی می‌کنند و به دایرکت‌ها و کامنت‌های شبکه‌های اجتماعی پاسخ لحظه‌ای می‌دهند'
                    : 'Proprietary conversational agents trained on your business knowledge base, handling customer questions in real time, qualifying buyers, and replying to social DMs effortlessly'}
                </p>

                <div className="space-y-2.5 text-xs text-[#E2E8F0] pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A78BFA] shrink-0" />
                    <span>{lang === 'fa' ? 'پاسخگویی ۲۴ ساعته دوزبانه (فارسی و انگلیسی) بدون نیاز به شیفت شب' : '24/7 bilingual customer conversion without night shift overhead'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A78BFA] shrink-0" />
                    <span>{lang === 'fa' ? 'اتصال زنده به موجودی کالاها و ثبت خودکار درخواست‌ها' : 'Live inventory sync and instant lead qualification'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#94A3B8]">
                  {lang === 'fa' ? 'نمونه: PlayFit Concierge ونکوور · دستیار خرید PSYG' : 'Proof: Vancouver PlayFit Concierge · PSYG Shopping Bot'}
                </span>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-[#A78BFA] hover:text-[#60A5FA] flex items-center gap-1 cursor-pointer font-sans font-bold transition-colors"
                >
                  <span>{lang === 'fa' ? 'سفارش ایجنت' : 'Deploy agent'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Telegram Bot Factory */}
          <div className="neon-rotate-border luxury-card rounded-3xl p-[1px] group">
            <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] p-7 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/25 flex items-center justify-center text-[#FFB800] group-hover:shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all">
                  <Send className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-mono text-[#FFB800] block mb-1">04. Telegram Bot Ecosystem</span>
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'fa' ? 'کارخانه ربات‌های پیشرفته تلگرام با CRM اختصاصی' : 'Production Telegram Bot Factory & Integrated CRM'}
                  </h3>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {lang === 'fa'
                    ? 'ساخت ربات‌های خدماتی، خبری، نظرسنجی و فروشگاهی بر بستر کارخانه‌ای پایدار با دیتابیس مشترک، دکمه‌های تعاملی شیشه‌ای و سیستم ارتباطی ضد فیلترینگ جهت دسترسی همیشگی به مخاطبان'
                    : 'High-availability messaging bots built on a shared resilient foundation with integrated CRM ledgers, interactive inline buttons, and tamper-resistant user tracking'}
                </p>

                <div className="space-y-2.5 text-xs text-[#E2E8F0] pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0" />
                    <span>{lang === 'fa' ? '۱۰ ربات عملیاتی بدون قطعی بر بستر یکپارچه' : '10 battle-tested bots on a single unified architecture'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0" />
                    <span>{lang === 'fa' ? 'ثبت متمرکز سوابق تعاملات هر کاربر در پایگاه داده' : 'Persistent cross-bot customer activity tracking'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#94A3B8]">
                  {lang === 'fa' ? '۱۰ ربات عملیاتی روی زیرساخت یکپارچه' : '10 operational bots on shared factory'}
                </span>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-[#FFB800] hover:text-[#60A5FA] flex items-center gap-1 cursor-pointer font-sans font-bold transition-colors"
                >
                  <span>{lang === 'fa' ? 'سفارش ربات' : 'Build bot'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
