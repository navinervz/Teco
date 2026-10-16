import React from 'react';
import { Language } from '../types';
import { PROJECTS_DATA, STUDIO_METRICS } from '../data/tecoData';
import { ArrowUpRight, FileCheck2, CalendarCheck } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenBooking, onOpenPortal }) => {
  return (
    <footer className="border-t border-white/10 bg-[#050811] py-16 text-sm relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <a 
              href="#hero" 
              className="text-xl font-extrabold tracking-wider text-sapphire-glow transition-all inline-flex items-center gap-2.5 font-mono"
            >
              <span>TECO</span>
            </a>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-loose max-w-sm">
              {lang === 'fa'
                ? 'استودیوی مهندسی پلتفرم‌های وب و اتوماسیون سازمانی فرآیندها برای کسب‌وکارهای ایران و کانادا؛ ما وب‌سایت‌های سفارشی متصل به وردپرس می‌سازیم و فرآیندهای تکراری را خودکارسازی می‌کنیم'
                : 'Custom web engineering and autonomous enterprise workflow studio serving organizations across Iran, Canada, and global jurisdictions'}
            </p>

            <div className="text-xs font-mono text-[#94A3B8]/60">
              {lang === 'fa' 
                ? `آمار تأییدشده زیرساخت ابری تکو: ${STUDIO_METRICS.workflows} ورک‌فلو فعال · ${STUDIO_METRICS.nodes} گره متصل · ${STUDIO_METRICS.auditDate}`
                : `Verified telemetry: ${STUDIO_METRICS.workflows} active workflows · ${STUDIO_METRICS.nodes} connected nodes · ${STUDIO_METRICS.auditDateEn}`}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono text-[#60A5FA] uppercase tracking-wider font-bold">
              {lang === 'fa' ? 'پروژه‌های عملیاتی زنده' : 'Live Deployments'}
            </div>
            <ul className="space-y-1.5 text-xs font-mono" dir="ltr">
              {PROJECTS_DATA.map(p => (
                <li key={p.id}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94A3B8] hover:text-[#60A5FA] transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <span>{p.host}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#3B82F6]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Col with Liquid Buttons */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono text-[#FFB800] uppercase tracking-wider font-bold">
              {lang === 'fa' ? 'مشاوره و شروع پروژه' : 'Direct Engagement'}
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {lang === 'fa'
                ? 'برای بررسی پروژه یا پیگیری قرارداد دیجیتال و پیش‌فاکتور از بخش‌های زیر استفاده کنید'
                : 'Submit project requirements or access your authenticated contract desk'}
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={onOpenBooking}
                className="liquid-btn w-full h-11 px-4 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-2 text-white"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#93C5FD]" />
                <span>{lang === 'fa' ? 'ثبت درخواست بوکینگ' : 'Book Discovery Call'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onOpenPortal}
                className="liquid-btn-secondary w-full h-11 px-4 rounded-xl text-xs font-semibold cursor-pointer flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>{lang === 'fa' ? 'ورود به پنل قرارداد و پرداخت' : 'Client Contract Desk'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div>
            {lang === 'fa' ? '© ۲۰۲۶ استودیو مهندسی تکو (TECO) · همه‌ی حقوق محفوظ است' : '© 2026 TECO · All rights reserved'}
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-[#60A5FA] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              SYSTEMS ACTIVE
            </span>
            <span>IRAN & CANADA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
