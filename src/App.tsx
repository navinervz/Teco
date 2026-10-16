import React, { useState, useEffect } from 'react';
import { Language, BookingRequest } from './types';
import { getSavedBookings } from './utils/bookingStorage';
import { Navbar } from './components/Navbar';
import { VerticalNavRail } from './components/VerticalNavRail';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WorkSection } from './components/WorkSection';
import { AutomationLab } from './components/AutomationLab';
import { BlueprintSection } from './components/BlueprintSection';
import { MethodSection } from './components/MethodSection';
import { BookingSection } from './components/BookingSection';
import { BookingModal } from './components/BookingModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { Footer } from './components/Footer';
import { CheckCircle2, Copy, Check, FileCheck2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('teco_lang');
      return saved === 'en' ? 'en' : 'fa';
    } catch {
      return 'fa';
    }
  });

  const [isGlitching, setIsGlitching] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalInitialId, setPortalInitialId] = useState<string>('TECO-2026-894');
  const [selectedLabFlowId, setSelectedLabFlowId] = useState<string>('psyg-instagram');
  const [savedBookings, setSavedBookings] = useState<BookingRequest[]>([]);
  const [justBooked, setJustBooked] = useState<BookingRequest | null>(null);
  const [bannerCopied, setBannerCopied] = useState(false);

  // Sync language with document attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('teco_lang', lang);
    } catch {
      // Ignore
    }
  }, [lang]);

  // Load existing bookings from local storage
  useEffect(() => {
    const list = getSavedBookings();
    setSavedBookings(list);
    if (list.length > 0) {
      setPortalInitialId(list[0].id);
    }
  }, []);

  // Instant language switch with smooth effect
  const toggleLanguage = () => {
    setLang(prev => (prev === 'fa' ? 'en' : 'fa'));
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
    }, 200);
  };

  const handleSelectFlow = (flowId: string) => {
    setSelectedLabFlowId(flowId);
    const labEl = document.getElementById('lab');
    if (labEl) {
      labEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmitted = (booking: BookingRequest) => {
    setJustBooked(booking);
    setPortalInitialId(booking.id);
    setSavedBookings(getSavedBookings());
  };

  const handleOpenPortalWithId = (bookingId?: string) => {
    if (bookingId) {
      setPortalInitialId(bookingId);
    }
    setIsPortalOpen(true);
  };

  const copyLatestBooking = () => {
    if (!justBooked) return;
    navigator.clipboard.writeText(justBooked.id).then(() => {
      setBannerCopied(true);
      setTimeout(() => setBannerCopied(false), 2000);
    });
  };

  return (
    <div className={`min-h-screen bg-[#050811] text-[#E8EDF8] selection:bg-[#2563EB]/30 selection:text-[#60A5FA] relative overflow-x-hidden transition-all duration-200 ${isGlitching ? 'opacity-85' : 'opacity-100'}`}>
      
      {/* Top Pure Centered Sapphire TECO Wordmark (Fades out on scroll down, appears on scroll up) */}
      <Navbar />

      {/* Side Vertical Signal Rail Dock with Single Booking Entry and Working Language Switch */}
      <VerticalNavRail 
        lang={lang} 
        onToggleLang={toggleLanguage}
        onOpenPortal={() => handleOpenPortalWithId()}
        activeBookingsCount={savedBookings.length}
      />

      {/* Floating Active Booking Notification Bar (Positioned on inset-inline-end to never collide with the nav rail) */}
      {justBooked && (
        <aside 
          aria-label={lang === 'fa' ? 'اطلاعیه پیگیری پرونده' : 'Booking tracking notice'}
          className="fixed bottom-20 md:bottom-6 inset-inline-end-3 sm:inset-inline-end-6 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#080E1C]/95 border border-[#3B82F6]/40 shadow-[0_16px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex items-center justify-between gap-2.5 sm:gap-3 animate-in fade-in slide-in-from-bottom-4"
        >
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6] shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                <span>{lang === 'fa' ? 'پرونده ثبت شد:' : 'Intake Logged:'}</span>
                <span className="font-mono text-[#60A5FA]">{justBooked.id}</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#94A3B8] truncate">
                {lang === 'fa' ? 'پیش‌نویس قرارداد و پیش‌فاکتور صادر گردید' : 'Contract desk generated'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenPortalWithId(justBooked.id)}
              className="liquid-btn h-7 sm:h-8 px-2.5 sm:px-3 rounded-full text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1 cursor-pointer text-white"
            >
              <FileCheck2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{lang === 'fa' ? 'قرارداد' : 'Contract'}</span>
            </button>

            <button
              type="button"
              onClick={copyLatestBooking}
              className="liquid-btn-secondary h-7 sm:h-8 px-2 rounded-full text-white text-[11px] sm:text-xs font-mono flex items-center gap-1 cursor-pointer"
              title={lang === 'fa' ? 'کپی کد رهگیری' : 'Copy tracking code'}
            >
              {bannerCopied ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#60A5FA]" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => setJustBooked(null)}
              className="text-[#94A3B8] hover:text-white text-xs px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </aside>
      )}

      {/* Main Content with Mobile Bottom Clearance and Dedicated Tablet Rail Gutter */}
      <main id="main" className="pb-24 md:pb-12 md:ps-16 lg:ps-0 transition-all duration-200">
        <Hero 
          lang={lang} 
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenPortal={() => handleOpenPortalWithId()}
        />

        <ServicesSection 
          lang={lang} 
          onOpenBooking={() => setIsBookingOpen(true)} 
        />

        <WorkSection 
          lang={lang} 
          onSelectFlow={handleSelectFlow} 
          onOpenBooking={() => setIsBookingOpen(true)} 
        />

        <AutomationLab 
          lang={lang} 
          selectedFlowId={selectedLabFlowId}
          onSelectFlow={setSelectedLabFlowId}
        />

        <BlueprintSection 
          lang={lang} 
        />

        <MethodSection 
          lang={lang} 
        />

        <BookingSection 
          lang={lang} 
          onBookingSubmitted={handleBookingSubmitted}
          onOpenPortal={handleOpenPortalWithId}
        />
      </main>

      {/* Footer */}
      <Footer 
        lang={lang} 
        onOpenBooking={() => setIsBookingOpen(true)} 
        onOpenPortal={() => handleOpenPortalWithId()}
      />

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        onBookingSubmitted={handleBookingSubmitted}
        onOpenPortal={handleOpenPortalWithId}
      />

      {/* Client Portal & Digital Contract Desk Modal */}
      <ClientPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        lang={lang}
        initialBookingId={portalInitialId}
      />
    </div>
  );
}
