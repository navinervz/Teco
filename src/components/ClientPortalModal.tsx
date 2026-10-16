import React, { useState, useRef } from 'react';
import { Language, BookingRequest } from '../types';
import { getSavedBookings, updateBooking } from '../utils/bookingStorage';
import { 
  FileCheck2, 
  CreditCard, 
  ShieldCheck, 
  Printer, 
  X, 
  Check, 
  Clock, 
  Building2, 
  Lock, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  PenTool,
  Download,
  Stamp,
  QrCode
} from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialBookingId?: string;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialBookingId
}) => {
  const bookings = getSavedBookings();
  const [selectedId, setSelectedId] = useState<string>(initialBookingId || (bookings[0]?.id || 'TECO-2026-894'));
  const [activeTab, setActiveTab] = useState<'contract' | 'payments' | 'nda_terms' | 'timeline'>('contract');
  const [signerInput, setSignerInput] = useState('');
  const [signatureCanvasDrawn, setSignatureCanvasDrawn] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [referenceInput, setReferenceInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  if (!isOpen) return null;

  const currentBooking = bookings.find(b => b.id === selectedId) || bookings[0];
  const contract = currentBooking?.contract;

  // Drawing signature on canvas with Sapphire Blue Ink
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setSignatureCanvasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#3B82F6'; // Royal Sapphire Blue ink
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureCanvasDrawn(false);
  };

  const handleSignContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerInput.trim() || !contract || !currentBooking) return;

    const updated: BookingRequest = {
      ...currentBooking,
      contract: {
        ...contract,
        isSigned: true,
        signerName: signerInput.trim(),
        signedAt: new Date().toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    };

    updateBooking(updated);
    setSignerInput('');
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceInput.trim() || !contract || !currentBooking) return;

    const updatedMilestones = contract.milestones.map((ms, idx) => {
      if (idx === 0) {
        return { ...ms, status: 'paid' as const };
      }
      if (idx === 1 && ms.status === 'pending') {
        return { ...ms, status: 'ready' as const };
      }
      return ms;
    });

    const updated: BookingRequest = {
      ...currentBooking,
      contract: {
        ...contract,
        milestones: updatedMilestones
      }
    };

    updateBooking(updated);
    setPaymentSuccess(true);
    setReferenceInput('');
  };

  const printContract = () => {
    window.print();
  };

  if (!currentBooking) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <div className="p-8 rounded-3xl bg-[#080D1E] border border-white/10 text-center space-y-4 max-w-md">
          <p className="text-sm text-[#94A3B8]">
            {lang === 'fa' ? 'هیچ پرونده‌ای یافت نشد. لطفاً ابتدا فرم شروع پروژه را تکمیل فرمایید.' : 'No active file found. Please submit project brief first.'}
          </p>
          <button 
            type="button" 
            onClick={onClose}
            className="liquid-btn px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            {lang === 'fa' ? 'متوجه شدم' : 'Dismiss'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Glass Modal Window */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#080D1E] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 p-4 sm:p-7 space-y-6">
        
        {/* Modal Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#60A5FA] shadow-[0_0_20px_rgba(37,99,235,0.3)] shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  {lang === 'fa' ? 'میزکار رسمی قرارداد و پیش‌فاکتور دیجیتال' : 'Official Digital Contract & Escrow Desk'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2563EB]/20 text-[#93C5FD] border border-[#3B82F6]/30 font-bold">
                  TECO SECURE
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                {lang === 'fa' ? 'مدیریت حقوقی پروژه، امضای آنلاین معتبر و تسویه مرحله‌ای مایل‌استون‌ها' : 'Legally binding execution, authenticated e-signature & milestone escrow'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={printContract}
              title={lang === 'fa' ? 'نسخه چاپی یا خروجی PDF' : 'Print / Export PDF'}
              className="h-10 px-3.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 text-[#94A3B8] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <Printer className="w-4 h-4 text-[#93C5FD]" />
              <span className="hidden sm:inline">{lang === 'fa' ? 'خروجی رسمی' : 'Export'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/60 hover:bg-[#2563EB]/20 text-[#94A3B8] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              aria-label={lang === 'fa' ? 'بستن' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Selector Bar if multiple exist */}
        {bookings.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            <span className="text-[#94A3B8] shrink-0">{lang === 'fa' ? 'پرونده‌های فعال:' : 'Active Files:'}</span>
            {bookings.map(b => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedId(b.id)}
                className={`px-3 py-1.5 rounded-xl border whitespace-nowrap cursor-pointer transition-all ${
                  selectedId === b.id
                    ? 'bg-[#2563EB]/25 text-[#60A5FA] border-[#3B82F6] font-bold shadow-[0_0_12px_rgba(37,99,235,0.3)]'
                    : 'bg-white/[0.03] text-[#94A3B8] border-white/10 hover:border-white/20'
                }`}
              >
                {b.id} · {b.clientName}
              </button>
            ))}
          </div>
        )}

        {/* Executive Overview Strip in Sapphire and Obsidian */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#050814] border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-[#94A3B8] block text-[11px] mb-1">{lang === 'fa' ? 'طرف اول قرارداد (کارفرما):' : 'Client Organization:'}</span>
            <span className="text-white font-bold text-sm truncate block font-sans">{currentBooking.clientName}</span>
          </div>

          <div>
            <span className="text-[#94A3B8] block text-[11px] mb-1">{lang === 'fa' ? 'شماره پرونده و شناسه استعلام:' : 'Agreement Ref:'}</span>
            <span className="text-[#60A5FA] font-bold text-sm font-mono">{currentBooking.id}</span>
          </div>

          <div>
            <span className="text-[#94A3B8] block text-[11px] mb-1">{lang === 'fa' ? 'وضعیت حقوقی سند:' : 'Legal Validity:'}</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{contract?.isSigned ? (lang === 'fa' ? 'رسمی و امضا شده' : 'Executed & Active') : (lang === 'fa' ? 'آماده امضای طرفین' : 'Pending Client Signature')}</span>
            </span>
          </div>

          <div>
            <span className="text-[#94A3B8] block text-[11px] mb-1">{lang === 'fa' ? 'مدت زمان تعهد تحویل:' : 'Turnaround Window:'}</span>
            <span className="text-white font-bold">{contract?.timelineDays} {lang === 'fa' ? 'روز کاری رسمی' : 'Business Days'}</span>
          </div>
        </div>

        {/* Tab Controls with Frosted Matte Glass Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-2.5 text-xs font-mono overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('contract')}
            className={`matte-tab ${
              activeTab === 'contract'
                ? 'matte-tab-active'
                : 'matte-tab-inactive'
            }`}
          >
            {lang === 'fa' ? '۱. مفاد قرارداد و شرح خدمات' : '1. Scope of Work'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payments')}
            className={`matte-tab ${
              activeTab === 'payments'
                ? 'matte-tab-active'
                : 'matte-tab-inactive'
            }`}
          >
            {lang === 'fa' ? '۲. مایل‌استون‌های پرداخت و فاکتور' : '2. Payment Milestones'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('nda_terms')}
            className={`matte-tab ${
              activeTab === 'nda_terms'
                ? 'matte-tab-active'
                : 'matte-tab-inactive'
            }`}
          >
            {lang === 'fa' ? '۳. تعهد محرمانگی (NDA) و گارانتی' : '3. NDA & Warranty SLA'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`matte-tab ${
              activeTab === 'timeline'
                ? 'matte-tab-active'
                : 'matte-tab-inactive'
            }`}
          >
            {lang === 'fa' ? '۴. نقشه پیشرفت پروژه' : '4. Delivery Roadmap'}
          </button>
        </div>

        {/* Tab 1: Contract & Scope */}
        {activeTab === 'contract' && contract && (
          <div className="space-y-6">
            {/* Scope of Work */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'موضوع قرارداد و محدوده فنی پروژه (Scope of Work)' : 'Project Mandate & Scope of Work'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed p-4 rounded-2xl bg-[#050814] border border-white/10">
                {contract.scopeOfWork[lang]}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-[#93C5FD] uppercase tracking-wider">
                {lang === 'fa' ? 'تعهدات اجرایی استودیو تکو' : 'Firm Engineering Deliverables'}
              </h3>
              <div className="space-y-2">
                {contract.deliverables[lang].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#050814] border border-white/10 flex items-start gap-3 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-[#E2E8F0] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Overview */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[#94A3B8] block mb-1">{lang === 'fa' ? 'مبلغ کل برآورد توافق‌شده:' : 'Total Mandate Budget:'}</span>
                <span className="text-base sm:text-xl font-bold text-white">{contract.totalCost}</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block mb-1">{lang === 'fa' ? 'پیش‌پرداخت شروع طراحی و کدنویسی:' : 'Phase 1 Commencement Escrow:'}</span>
                <span className="text-base sm:text-xl font-bold text-[#60A5FA]">{contract.depositAmount}</span>
              </div>
            </div>

            {/* Interactive Signature Desk */}
            <div className="p-6 rounded-3xl bg-[#050814] border border-[#2563EB]/30 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#F59E0B]">
                  <PenTool className="w-4 h-4" />
                  <span>{lang === 'fa' ? 'پد اختصاصی امضای دیجیتال کارفرما' : 'Client Digital Signature Pad'}</span>
                </div>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  {lang === 'fa' ? 'مطابق با استاندارد تجارت الکترونیک' : 'E-Sign Compliant'}
                </span>
              </div>

              {contract.isSigned ? (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{lang === 'fa' ? 'قرارداد رسماً توسط نماینده کارفرما امضا و تأیید گردید' : 'Contract Authenticated & Digitally Signed'}</span>
                      </div>
                      <div className="text-xs text-[#94A3B8] font-mono mt-1">
                        {lang === 'fa' ? `امضاکننده مجاز: ${contract.signerName} · تاریخ ثبت در سامانه: ${contract.signedAt}` : `Authorized Signatory: ${contract.signerName} on ${contract.signedAt}`}
                      </div>
                    </div>

                    {/* Official Teco Holographic Seal */}
                    <div className="hidden sm:flex flex-col items-center justify-center p-2 rounded-xl border border-[#3B82F6]/50 bg-[#2563EB]/15 text-[#93C5FD] font-mono text-[10px]">
                      <Stamp className="w-6 h-6 mb-0.5" />
                      <span>TECO CERTIFIED</span>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSignContract} className="space-y-4">
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {lang === 'fa'
                      ? 'با رسم امضا در کادر زیر و درج نام نماینده مجاز، نسخه الکترونیکی قرارداد تأیید شده و لینک پیش‌فاکتور پرداخت فاز اول فعال می‌گردد'
                      : 'Draw your signature on the pad and input authorized signatory name to execute the agreement'}
                  </p>

                  {/* Canvas Signature Pad with Sapphire Blue styling */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-mono text-[#94A3B8]">
                      <span>{lang === 'fa' ? 'محل رسم امضا با موس یا لمس صفحه:' : 'Signature Canvas:'}</span>
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="text-[#60A5FA] hover:underline cursor-pointer"
                      >
                        {lang === 'fa' ? 'پاک کردن امضا' : 'Clear Canvas'}
                      </button>
                    </div>

                    <div className="border border-white/15 rounded-2xl bg-[#040711] overflow-hidden focus-within:border-[#3B82F6]">
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={120}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="w-full h-28 cursor-crosshair touch-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <input
                      type="text"
                      required
                      value={signerInput}
                      onChange={e => setSignerInput(e.target.value)}
                      placeholder={lang === 'fa' ? 'نام و سمت نماینده مجاز جهت امضا' : 'Authorized Representative Full Name'}
                      className="glass-input flex-1 h-12 px-4 rounded-xl text-white text-xs placeholder-[#94A3B8]/40"
                    />

                    <button
                      type="submit"
                      className="liquid-btn h-12 px-7 rounded-xl font-extrabold text-xs cursor-pointer whitespace-nowrap text-white"
                    >
                      {lang === 'fa' ? 'امضای نهایی قرارداد و تأیید پیش‌فاکتور' : 'Sign & Authenticate Agreement'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Payments & Milestones */}
        {activeTab === 'payments' && contract && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                {lang === 'fa' ? 'جدول پرداخت‌های مرحله‌ای (Escrow Milestones)' : 'Milestone Escrow Schedule'}
              </h3>
              <p className="text-xs text-[#94A3B8]">
                {lang === 'fa'
                  ? 'پرداخت‌های پروژه در ۳ مرحله کنترل‌شده صورت می‌پذیرد و هر مرحله منوط به تایید خروجی همان فاز است'
                  : 'Funds are unlocked in 3 discrete phases strictly tied to verified milestone delivery'}
              </p>
            </div>

            {/* Milestones List */}
            <div className="space-y-3">
              {contract.milestones.map((ms, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    ms.status === 'paid'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : ms.status === 'ready'
                      ? 'bg-[#2563EB]/15 border-[#3B82F6]'
                      : 'bg-[#050814] border-white/10 opacity-70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-[#94A3B8]">
                          {lang === 'fa' ? `فاز ${idx + 1}` : `Phase ${idx + 1}`}
                        </span>
                        <span className="font-bold text-white text-sm">
                          {ms.title[lang]}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#94A3B8] mt-1">
                        {ms.dueText[lang]}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-mono">
                      <span className="font-bold text-white text-sm">{ms.amount}</span>
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        ms.status === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : ms.status === 'ready'
                          ? 'bg-[#2563EB]/25 text-[#93C5FD] border border-[#3B82F6]'
                          : 'bg-white/5 text-[#94A3B8]'
                      }`}>
                        {ms.status === 'paid' ? (lang === 'fa' ? 'واریز شده ✓' : 'Settled') : ms.status === 'ready' ? (lang === 'fa' ? 'آماده پرداخت' : 'Due Now') : (lang === 'fa' ? 'در انتظار فاز' : 'Pending Phase')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Banking Details Box */}
            <div className="p-6 rounded-3xl bg-[#050814] border border-white/10 space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#60A5FA]" />
                <span>{lang === 'fa' ? 'مشخصات حساب‌های رسمی جهت واریز' : 'Official Banking Channels'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[#60A5FA] font-bold">{lang === 'fa' ? 'شماره شبا ایران (بانک تجارت):' : 'Iranian Bank Wire (IRR):'}</div>
                  <div className="text-[#E2E8F0] select-all font-mono">IR92 0180 0000 0000 1234 5678 90</div>
                  <div className="text-[11px] text-[#94A3B8]">{lang === 'fa' ? 'به نام استودیو مهندسی تکو' : 'Account: Teco Studio Ltd'}</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[#93C5FD] font-bold">{lang === 'fa' ? 'حساب کانادا و بین‌الملل (CAD / USD):' : 'Canada & Global (CAD / USD):'}</div>
                  <div className="text-[#E2E8F0] select-all font-mono">Interac: billing@tecostudio.io</div>
                  <div className="text-[11px] text-[#94A3B8]">{lang === 'fa' ? 'پشتیبانی از Interac ،Wise و تتر USDT' : 'Interac, Wise & USDT Accepted'}</div>
                </div>
              </div>

              {paymentSuccess ? (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{lang === 'fa' ? 'رسید پرداخت شما تأیید شد و فاز اجرایی پروژه فعال گردید' : 'Transaction receipt verified · Milestone 1 active'}</span>
                </div>
              ) : (
                <form onSubmit={handleSimulatePayment} className="flex flex-col sm:flex-row gap-3 pt-2">
                  <input
                    type="text"
                    required
                    value={referenceInput}
                    onChange={e => setReferenceInput(e.target.value)}
                    placeholder={lang === 'fa' ? 'شماره ارجاع واریز، کد پیگیری فیش یا هش تراکنش' : 'Transaction confirmation ref / receipt ID'}
                    className="glass-input flex-1 h-12 px-4 rounded-xl text-white text-xs placeholder-[#94A3B8]/40"
                  />
                  <button
                    type="submit"
                    className="liquid-btn-secondary h-12 px-7 rounded-xl font-bold text-xs cursor-pointer whitespace-nowrap"
                  >
                    {lang === 'fa' ? 'ثبت شناسه فیش و فعال‌سازی' : 'Register Payment Receipt'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: NDA & Warranty Terms */}
        {activeTab === 'nda_terms' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <h3 className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
              {lang === 'fa' ? 'تعهدات حقوقی، محرمانگی اطلاعات (NDA) و مالکیت سورس‌کد' : 'Intellectual Property & Non-Disclosure Covenants'}
            </h3>

            <div className="space-y-3 text-[#E2E8F0] leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#050814] border border-white/10 space-y-1">
                <div className="font-bold text-[#60A5FA]">{lang === 'fa' ? 'ماده ۱: مالکیت صد در صدی سورس‌کد و دیتابیس' : 'Article 1: 100% IP & Code Ownership'}</div>
                <div className="text-xs text-[#94A3B8]">
                  {lang === 'fa' 
                    ? 'کلیه حقوق مادی و معنوی فرانت‌اند، کدهای سفارشی وردپرس، سناریوهای اتوماسیون n8n و پایگاه‌های داده پس از تسویه فاز نهایی رسماً به کارفرما واگذار می‌گردد'
                    : 'All intellectual property, proprietary codebase, custom WordPress plugins, and n8n orchestration topologies transfer entirely to the client upon project completion'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#050814] border border-white/10 space-y-1">
                <div className="font-bold text-[#93C5FD]">{lang === 'fa' ? 'ماده ۲: تعهد عدم افشا و محرمانگی (Mutual NDA)' : 'Article 2: Confidentiality & Non-Disclosure'}</div>
                <div className="text-xs text-[#94A3B8]">
                  {lang === 'fa'
                    ? 'استودیو تکو متعهد است کلیه اطلاعات تجاری، لیست مشتریان، ساختار دیتابیس و داده‌های مالی کارفرما را به عنوان اسرار تجاری محرمانه حفظ نماید'
                    : 'Teco strictly binds itself under mutual non-disclosure regarding client business logic, customer records, and internal commercial databases'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#050814] border border-white/10 space-y-1">
                <div className="font-bold text-[#F59E0B]">{lang === 'fa' ? 'ماده ۳: گارانتی فنی ۶ ماهه بدون قید و شرط' : 'Article 3: 6-Month Comprehensive Warranty'}</div>
                <div className="text-xs text-[#94A3B8]">
                  {lang === 'fa'
                    ? 'تمامی باگ‌های احتمالی، خطاهای اتصال پایپ‌لاین‌ها و مشکلات سروری تا ۶ ماه پس از تحویل، به صورت رایگان و بلادرنگ توسط تیم تکو رفع می‌گردد'
                    : 'All functional bugs, API breaking changes, and deployment hiccups are resolved under our comprehensive 6-month zero-cost SLA guarantee'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Delivery Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
              {lang === 'fa' ? 'نقشه مراحل اجرایی پروژه' : 'Active Engineering Lifecycle'}
            </h3>

            <div className="space-y-3">
              {[
                { stageFa: 'ثبت بریف اولیه و نیازسنجی تجاری', stageEn: 'Intake Brief & Business Mandate', status: 'done' },
                { stageFa: 'جلسه مشاوره اختصاصی و تعریف محدوده کار', stageEn: 'Discovery Review & Architecture Sign-Off', status: 'done' },
                { stageFa: 'صدور و امضای قرارداد دیجیتال و پیش‌فاکتور', stageEn: 'Digital Contract & Escrow Activation', status: contract?.isSigned ? 'done' : 'current' },
                { stageFa: 'توسعه فرانت‌اند اختصاصی و اتصال پنل وردپرس', stageEn: 'Custom Frontend & WordPress Deployment', status: 'pending' },
                { stageFa: 'استقرار پایپ‌لاین‌های اتوماسیون n8n و هوش مصنوعی', stageEn: 'Autonomous Pipeline & Agent Deployment', status: 'pending' },
                { stageFa: 'تست نهایی، آموزش کادر و تحویل مالکیت سورس‌کد', stageEn: 'Final QA, Handover & Lifetime Warranty', status: 'pending' }
              ].map((step, sIdx) => (
                <div
                  key={sIdx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs sm:text-sm ${
                    step.status === 'done'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                      : step.status === 'current'
                      ? 'bg-[#2563EB]/15 border-[#3B82F6] text-white font-bold'
                      : 'bg-[#050814] border-white/10 text-[#94A3B8]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                      step.status === 'done'
                        ? 'bg-emerald-500 text-white font-bold'
                        : step.status === 'current'
                        ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_8px_#3B82F6]'
                        : 'bg-white/10 text-[#94A3B8]'
                    }`}>
                      {step.status === 'done' ? '✓' : sIdx + 1}
                    </span>
                    <span>{lang === 'fa' ? step.stageFa : step.stageEn}</span>
                  </div>

                  <span className="text-[11px] font-mono">
                    {step.status === 'done' ? (lang === 'fa' ? 'تکمیل شده' : 'Complete') : step.status === 'current' ? (lang === 'fa' ? 'در حال اجرا' : 'In Progress') : (lang === 'fa' ? 'گام بعدی' : 'Queued')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
