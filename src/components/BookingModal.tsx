import React from 'react';
import { Language, BookingRequest } from '../types';
import { BookingSection } from './BookingSection';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onBookingSubmitted?: (booking: BookingRequest) => void;
  onOpenPortal?: (bookingId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  onBookingSubmitted,
  onOpenPortal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#080D1E]/95 backdrop-blur-2xl border border-white/12 shadow-[0_25px_70px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.12)] z-10 p-2 sm:p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 inset-inline-end-5 z-20 w-10 h-10 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-[#94A3B8] hover:text-white hover:border-[#60A5FA]/60 hover:bg-[#2563EB]/20 flex items-center justify-center transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          aria-label={lang === 'fa' ? 'بستن' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-2">
          <BookingSection 
            lang={lang} 
            onBookingSubmitted={onBookingSubmitted} 
            onOpenPortal={(id) => {
              onClose();
              if (onOpenPortal) onOpenPortal(id);
            }}
          />
        </div>
      </div>
    </div>
  );
};
