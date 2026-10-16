import React, { useState } from 'react';
import { Language, BookingRequest } from '../types';
import { saveBooking } from '../utils/bookingStorage';
import { 
  CheckCircle2, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  Phone, 
  Video, 
  Sliders,
  FileCheck2,
  ArrowUpRight,
  Layers,
  Cpu,
  Bot,
  Compass,
  ArrowLeft,
  ShieldCheck,
  CheckSquare,
  Square
} from 'lucide-react';

interface BookingSectionProps {
  lang: Language;
  onBookingSubmitted?: (booking: BookingRequest) => void;
  onOpenPortal?: (bookingId: string) => void;
}

interface ServiceSubOption {
  id: string;
  nameFa: string;
  nameEn: string;
  descFa: string;
  descEn: string;
}

interface ServiceFeature {
  id: string;
  labelFa: string;
  labelEn: string;
}

interface ServiceConfiguration {
  subTypes: ServiceSubOption[];
  features: ServiceFeature[];
  placeholderFa: string;
  placeholderEn: string;
}

const SERVICE_CONFIGS: Record<string, ServiceConfiguration> = {
  wordpress_custom: {
    subTypes: [
      {
        id: 'ecommerce_woo',
        nameFa: 'فروشگاهی ووکامرس پیشرفته',
        nameEn: 'Custom WooCommerce Store',
        descFa: 'انبارداری هوشمند، درگاه مستقیم، تسویه‌حساب سریع و تجربه خرید روان بدون قالب آماده',
        descEn: 'Smart inventory, multi-gateway checkout, high conversions and zero bloated templates'
      },
      {
        id: 'corporate_leadgen',
        nameFa: 'شرکتی و لیدجنریشن لایتنینگ',
        nameEn: 'Corporate & Lead-Gen Platform',
        descFa: 'معرفی خدمات برند، جذب سرنخ‌های سازمانی و ثبت فرم‌های مشاوره با لود زیر ۱ ثانیه',
        descEn: 'Brand presentation, enterprise lead magnets and sub-second page performance'
      },
      {
        id: 'portal_booking',
        nameFa: 'پورتال اختصاصی و سامانه رزرواسیون',
        nameEn: 'Client Portal & Booking Desk',
        descFa: 'سامانه رزرواسیون وقت، پنل دسترسی مشتریان و صدور خودکار پیش‌فاکتور دیجیتال',
        descEn: 'Appointment scheduling, client account area and automated digital invoicing'
      }
    ],
    features: [
      { id: 'speed_under_1s', labelFa: 'سرعت لود زیر ۱ ثانیه (Core Web Vitals ۹۵+)', labelEn: 'Sub-second load speed (PageSpeed 95+)' },
      { id: 'otp_sms', labelFa: 'ورود آسان با پیامک و کد یکبار مصرف (OTP)', labelEn: 'Mobile SMS OTP Passwordless Login' },
      { id: 'direct_gateway', labelFa: 'درگاه مستقیم شاپرک / PayPal / Stripe', labelEn: 'Direct Banking & International Gateway' },
      { id: 'multilingual', labelFa: 'چندزبانه حرفه‌ای (فارسی / انگلیسی)', labelEn: 'Native Multilingual Architecture (FA/EN)' },
      { id: 'crm_sync', labelFa: 'ارسال خودکار لیدها به CRM و Google Sheets', labelEn: 'Automated Lead Sync to CRM & Sheets' }
    ],
    placeholderFa: 'مثال: وب‌سایت شرکتی با پنل ساده وردپرس، فرم‌های ثبت سفارش و انتقال لیدها به CRM دیدار همراه با طراحی مینیمال و سرعت بالا',
    placeholderEn: 'e.g. Custom corporate website with WordPress CMS, lead capture connected to our CRM, and sub-second load times.'
  },
  affiliate_radar: {
    subTypes: [
      {
        id: 'tech_hardware',
        nameFa: 'تجهیزات دیجیتال، لپ‌تاپ و موبایل',
        nameEn: 'Digital Tech & Electronics',
        descFa: 'ردیابی نوسان قیمت گجت‌ها، مشخصات فنی و پیشنهاد پایین‌ترین قیمت بازار',
        descEn: 'Hardware deals tracking, live specs comparison and lowest-price alerts'
      },
      {
        id: 'travel_flight',
        nameFa: 'گردشگری، بلیط پرواز و هتل',
        nameEn: 'Travel, Flights & Booking Deals',
        descFa: 'پایش قیمت تورها و بلیط‌های لحظه آخری با هشدار خودکار ظرفیت',
        descEn: 'Last-minute flights and hotel tracker with automated vacancy alerts'
      },
      {
        id: 'gaming_consoles',
        nameFa: 'گیمینگ، کنسول و بازی‌های ویدیویی',
        nameEn: 'Gaming Consoles & Digital Keys',
        descFa: 'رصد تخفیف‌های استیم، پلی‌استیشن و فروشگاه‌های معتبر داخلی و خارجی',
        descEn: 'Steam, PlayStation deals tracking and authorized retailer monitors'
      }
    ],
    features: [
      { id: 'local_crawlers', labelFa: 'پایش خودکار فروشگاه‌های ایران (دیجی‌کالا، ترب، ایمالز)', labelEn: 'Local Iranian Market Scrapers (Digikala, Torob)' },
      { id: 'global_scrapers', labelFa: 'واکشی از آمازون و BestBuy کانادا و آمریکا', labelEn: 'Amazon, BestBuy & Walmart North America Crawlers' },
      { id: 'telegram_alert_bot', labelFa: 'ربات ارسال آنی کاهش قیمت به کانال تلگرام', labelEn: 'Instant Price Drop Telegram Broadcast Bot' },
      { id: 'cashback_engine', labelFa: 'موتور ریفرال و محاسبه خودکار پورسانت افیلیت', labelEn: 'Automated Affiliate Commission & Cashback Engine' },
      { id: 'live_tracker_table', labelFa: 'جدول زنده تغییرات قیمت با نمودار تاریخی', labelEn: 'Live Price History & Sparkline Analytics Table' }
    ],
    placeholderFa: 'مثال: می‌خواهیم پلتفرمی مشابه PSYG برای بازار لپ‌تاپ راه‌اندازی کنیم که قیمت‌ها را هر ۳۰ دقیقه چک کند و به کانال تلگرام بفرستد',
    placeholderEn: 'e.g. An automated deals platform for laptops scraping prices every 30m and sending drops to our Telegram channel.'
  },
  n8n_automation: {
    subTypes: [
      {
        id: 'crm_leads',
        nameFa: 'مدیریت و تزریق خودکار لید به CRM',
        nameEn: 'Autonomous Lead Ingestion & CRM Routing',
        descFa: 'ثبت خودکار فرم‌های سایت در CRM، تخصیص کارشناس و اعلان در پیام‌رسان',
        descEn: 'Website form to CRM mapping, automatic agent dispatch & notification'
      },
      {
        id: 'accounting_billing',
        nameFa: 'صدور خودکار پیش‌فاکتور و فاکتور رسمی',
        nameEn: 'Automated Quoting & Billing Ledger',
        descFa: 'تولید PDF فاکتور، ارسال ایمیل/پیامک و تسویه‌حساب آنی بدون نیروی دفتری',
        descEn: 'Instant PDF generation, SMS dispatch and accounting reconciliation'
      },
      {
        id: 'sheets_db_sync',
        nameFa: 'همگام‌سازی سایت با اکسل و گوگل‌شیتس',
        nameEn: 'Bi-Directional Sheets & DB Synchronization',
        descFa: 'انتقال دوطرفه اطلاعات کاربران، سفارشات و گزارش‌ها بین دیتابیس و شیت‌ها',
        descEn: 'Real-time database records streaming to Google Sheets and Airtable'
      }
    ],
    features: [
      { id: 'wordpress_webhook', labelFa: 'وب‌هوک اختصاصی متصل به فرم‌ها و سفارشات وردپرس', labelEn: 'WordPress Custom Webhook & Gravity/CF7 Bridge' },
      { id: 'messaging_alerts', labelFa: 'نوتیفیکیشن لحظه‌ای در تلگرام، بله و واتس‌اپ', labelEn: 'Real-Time Alerts via Telegram, WhatsApp, Bale' },
      { id: 'sms_gateway_kavenegar', labelFa: 'ارسال پیامک خدماتی فوری (کاوه‌نگار / SMS.ir)', labelEn: 'Instant Fast-Route Transactional SMS Gateway' },
      { id: 'docker_selfhosted', labelFa: 'استقرار سرور Docker سلف‌هاست روی سرور اختصاصی شما', labelEn: 'Dedicated Self-Hosted Docker Server Deployment' },
      { id: 'sla_maintenance', labelFa: 'پایش ۲۴/۷ پایپ‌لاین‌ها و بازیابی خودکار خطاها', labelEn: '24/7 Pipeline Error Catching & Auto-Retry Logic' }
    ],
    placeholderFa: 'مثال: اتوماسیونی می‌خواهیم که وقتی مشتری در سایت فرم پر کرد، همزمان در CRM ثبت شود و یک پیامک تایید به همراه وظیفه به ترلو ارسال شود',
    placeholderEn: 'e.g. When a lead submits a quote form, automatically create a CRM contact, send SMS, and create a ClickUp task.'
  },
  telegram_bot_factory: {
    subTypes: [
      {
        id: 'miniapp_store',
        nameFa: 'فروشگاه کامل تحت تلگرام (Mini App)',
        nameEn: 'Telegram Mini App (TMA) Storefront',
        descFa: 'سبد خرید سریع درون تلگرام، پرداخت مستقیم و ثبت آدرس کاربر',
        descEn: 'In-app checkout, direct bank payment and instant order processing'
      },
      {
        id: 'ticket_support',
        nameFa: 'سامانه پشتیبانی و تیکتینگ ۲۴ ساعته',
        nameEn: '24/7 Ticketing & Customer Service Bot',
        descFa: 'پاسخگویی به سوالات متداول، ارجاع هوشمند به اپراتور و رضایت‌سنجی',
        descEn: 'Automated FAQ resolution, support agent triage and satisfaction rating'
      },
      {
        id: 'signal_channel',
        nameFa: 'ربات انتشار محتوا و سیگنال در کانال',
        nameEn: 'Automated Channel Broadcaster & Feed Bot',
        descFa: 'انتشار زمان‌بندی‌شده، افزودن واترمرک و دکمه‌های شیشه‌ای اختصاصی',
        descEn: 'Scheduled broadcasts, custom inline buttons and channel watermarking'
      }
    ],
    features: [
      { id: 'direct_pay_bot', labelFa: 'درگاه پرداخت شاپرک / زرین‌پال داخل تلگرام', labelEn: 'Integrated In-Bot Payment Gateway' },
      { id: 'db_two_way_sync', labelFa: 'اتصال مستقیم دوطرفه به دیتابیس سایت و انبارداری', labelEn: 'Live Two-Way Sync with Website DB & Inventory' },
      { id: 'force_join', labelFa: 'قفل عضویت اجباری در کانال جهت رشد ممبر', labelEn: 'Smart Channel Sponsor Force-Join Verification' },
      { id: 'broadcast_panel', labelFa: 'پنل اختصاصی ارسال پیام همگانی زمان‌بندی‌شده', labelEn: 'Bulk Broadcast Scheduler & Segment Manager' },
      { id: 'excel_report', labelFa: 'خروجی اکسل از اطلاعات کاربران و تعاملات', labelEn: 'One-Click Excel Customer Data & Analytics Export' }
    ],
    placeholderFa: 'مثال: ربات تلگرامی می‌خواهیم که کاربران بتوانند کاتالوگ محصولات را ببینند، سفارش ثبت کنند و با درگاه پرداخت بانکی تسویه کنند',
    placeholderEn: 'e.g. A Telegram store bot where clients can browse products, place orders, and pay with instant gateway verification.'
  }
};

export const BookingSection: React.FC<BookingSectionProps> = ({ 
  lang, 
  onBookingSubmitted,
  onOpenPortal 
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form state
  const [serviceType, setServiceType] = useState('wordpress_custom');
  const [serviceSubType, setServiceSubType] = useState<string>('ecommerce_woo');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['speed_under_1s', 'direct_gateway']);
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [targetMarket, setTargetMarket] = useState<'iran' | 'canada' | 'global'>('iran');
  const [estimatedBudget, setEstimatedBudget] = useState('standard');
  const [preferredChannel, setPreferredChannel] = useState<'whatsapp' | 'telegram' | 'phone' | 'google_meet'>('telegram');
  const [preferredTime, setPreferredTime] = useState('afternoon');
  const [projectDescription, setProjectDescription] = useState('');

  // Handle service selection and sync default sub-type and features
  const handleSelectService = (id: string) => {
    setServiceType(id);
    const config = SERVICE_CONFIGS[id];
    if (config) {
      if (config.subTypes.length > 0) {
        setServiceSubType(config.subTypes[0].id);
      }
      if (config.features.length >= 2) {
        setSelectedFeatures([config.features[0].id, config.features[1].id]);
      } else {
        setSelectedFeatures([]);
      }
    }
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  // Submission state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const services = [
    {
      id: 'wordpress_custom',
      icon: Layers,
      nameFa: 'وب‌سایت اختصاصی با پنل مدیریت آسان وردپرس',
      nameEn: 'Custom Website with Intuitive WordPress CMS',
      descFa: 'کدنویسی اختصاصی فرانت‌اند با سرعت بی‌نهایت، همراه با پنل وردپرس برای مدیریت آسان محتوا',
      descEn: 'Bespoke high-performance frontend paired with intuitive custom WordPress control'
    },
    {
      id: 'affiliate_radar',
      icon: Compass,
      nameFa: 'پلتفرم افیلیت و ردیاب خودکار قیمت',
      nameEn: 'Affiliate & Automated Deals Radar',
      descFa: 'مشابه موتور موفق PSYG و Arez با پایش خودکار قیمت‌ها و درآمدزایی پایدار بدون تبلیغات',
      descEn: 'Automated deal intelligence engine modeled after PSYG & Arez'
    },
    {
      id: 'n8n_automation',
      icon: Cpu,
      nameFa: 'اتوماسیون کامل فرآیندها با n8n سازمانی',
      nameEn: 'Enterprise n8n Workflow Automation',
      descFa: 'انتقال خودکار اطلاعات بین وب‌سایت، CRM، شیت‌ها و پیام‌رسان‌ها بدون دخالت دست',
      descEn: 'Orchestrating multi-system pipelines eliminating manual repetitive tasks'
    },
    {
      id: 'telegram_bot_factory',
      icon: Bot,
      nameFa: 'کارخانه ربات‌های اختصاصی تلگرام',
      nameEn: 'Production Telegram Bot Ecosystem',
      descFa: 'ربات‌های پیشرفته فروشگاهی، اطلاع‌رسانی، نظرسنجی و پشتیبانی با اتصال به دیتابیس متمرکز',
      descEn: 'Resilient high-availability messaging bots integrated with unified CRM ledgers'
    }
  ];

  const currentConfig = SERVICE_CONFIGS[serviceType] || SERVICE_CONFIGS.wordpress_custom;
  const currentServiceObj = services.find(s => s.id === serviceType) || services[0];
  const currentSubTypeObj = currentConfig.subTypes.find(st => st.id === serviceSubType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !clientName || !contactNumber) {
      setFormError(lang === 'fa' ? 'لطفاً نام، آدرس ایمیل و شماره تماس معتبر را وارد نمایید' : 'Please complete all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError(lang === 'fa' ? 'آدرس ایمیل وارد شده معتبر نمی‌باشد' : 'Please provide a valid work email');
      return;
    }

    const booking = saveBooking({
      serviceType,
      serviceSubType,
      selectedFeatures,
      clientName,
      email,
      contactNumber,
      preferredChannel,
      preferredTime,
      targetMarket,
      estimatedBudget,
      projectDescription
    });

    setConfirmedBooking(booking);
    setStep(4);
    if (onBookingSubmitted) {
      onBookingSubmitted(booking);
    }
  };

  const getBriefText = () => {
    if (!confirmedBooking) return '';
    const selectedService = services.find(s => s.id === confirmedBooking.serviceType);
    const subTypeMatch = currentConfig.subTypes.find(st => st.id === confirmedBooking.serviceSubType);
    
    if (lang === 'fa') {
      return `[پرونده ثبت پروژه استودیو تکو]
شناسه پیگیری: ${confirmedBooking.id}
نام کارفرما: ${confirmedBooking.clientName}
خدمت انتخابی: ${selectedService ? selectedService.nameFa : confirmedBooking.serviceType}
زیرشاخه تخصصی: ${subTypeMatch ? subTypeMatch.nameFa : confirmedBooking.serviceSubType || 'عمومی'}
ایمیل: ${confirmedBooking.email}
راه ارتباطی: ${confirmedBooking.contactNumber}
کانال ترجیحی ارتباط: ${confirmedBooking.preferredChannel}
زمان مناسب تماس: ${confirmedBooking.preferredTime}
بازار هدف: ${confirmedBooking.targetMarket}
توضیحات بریف: ${confirmedBooking.projectDescription}`;
    } else {
      return `[TECO Studio Project Brief Intake]
Tracking Token: ${confirmedBooking.id}
Client Name: ${confirmedBooking.clientName}
Service: ${selectedService ? selectedService.nameEn : confirmedBooking.serviceType}
Specialized Sub-Type: ${subTypeMatch ? subTypeMatch.nameEn : confirmedBooking.serviceSubType || 'General'}
Email: ${confirmedBooking.email}
Direct Contact: ${confirmedBooking.contactNumber}
Preferred Channel: ${confirmedBooking.preferredChannel}
Callback Window: ${confirmedBooking.preferredTime}
Target Market: ${confirmedBooking.targetMarket}
Details: ${confirmedBooking.projectDescription}`;
    }
  };

  const copyBrief = () => {
    const text = getBriefText();
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#2563EB]/15 border border-[#3B82F6]/30">
            <Sliders className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{lang === 'fa' ? 'شروع پروژه و صدور قرارداد' : 'Start Project & Digital Agreement'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {lang === 'fa' ? 'درخواست خود را ثبت کنید؛ بقیه‌اش طبق فرآیند رسمی پیش می‌رود' : 'Submit Your Brief, Follow the Streamlined Intake Flow'}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            {lang === 'fa'
              ? 'ابتدا ایمیل و نیازهای خود را ثبت می‌کنید؛ پس از تماس و مشاوره، پنل اختصاصی قرارداد دیجیتال و فرم پرداخت مرحله‌ای برای شما صادر می‌گردد'
              : 'Submit your email and project mandate; following technical discovery, your authenticated digital agreement and milestone escrow invoice will be issued'}
          </p>
        </div>

        {/* 3 Steps Overview Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs font-mono">
          <div className="p-4 rounded-2xl luxury-card space-y-1">
            <div className="text-[#60A5FA] font-bold">{lang === 'fa' ? '۱. انتخاب خدمت و بریف دقیق' : '1. Service & Precise Scope'}</div>
            <div className="text-[11px] text-[#94A3B8]">{lang === 'fa' ? 'تنظیم امکانات اختصاصی بر اساس انتخاب شما' : 'Dynamic engineering parameters'}</div>
          </div>
          <div className="p-4 rounded-2xl luxury-card space-y-1">
            <div className="text-[#93C5FD] font-bold">{lang === 'fa' ? '۲. تماس و تأییدیه فنی' : '2. Discovery Review'}</div>
            <div className="text-[11px] text-[#94A3B8]">{lang === 'fa' ? 'تماس کارشناس زیر ۴ ساعت کاری' : 'Engineer callback under 4h'}</div>
          </div>
          <div className="p-4 rounded-2xl luxury-card space-y-1">
            <div className="text-[#FFB800] font-bold">{lang === 'fa' ? '۳. قرارداد دیجیتال و پرداخت' : '3. Contract & Escrow'}</div>
            <div className="text-[11px] text-[#94A3B8]">{lang === 'fa' ? 'ورود به پنل اختصاصی و پیش‌فاکتور' : 'Unlock digital agreement desk'}</div>
          </div>
        </div>

        {/* Booking Card Container with Sapphire Neon Border */}
        <div className="neon-rotate-border luxury-card rounded-3xl p-[1px]">
          <div className="bg-[#080E1C] rounded-[calc(1.5rem-1px)] p-4 min-[360px]:p-6 sm:p-10 relative overflow-hidden">
            
            {/* Stepper Header (Ultra responsive for 320px+ mobile and tablets) */}
            {step !== 4 && (
              <div className="flex items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-white/10 text-[11px] sm:text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-1.5 sm:gap-2 transition-colors cursor-pointer ${
                    step === 1 ? 'text-[#60A5FA] font-bold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] transition-all shrink-0 ${
                    step === 1 
                      ? 'bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white font-bold shadow-[0_0_12px_rgba(37,99,235,0.4)] border border-[#60A5FA]/40' 
                      : 'bg-white/10 text-white'
                  }`}>1</span>
                  <span className="hidden min-[380px]:inline">{lang === 'fa' ? 'نوع خدمت' : 'Capability'}</span>
                  <span className="min-[380px]:hidden">{lang === 'fa' ? 'خدمت' : '1'}</span>
                </button>

                <span className="w-4 sm:w-8 h-[1px] bg-white/10 shrink-0" />

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-1.5 sm:gap-2 transition-colors cursor-pointer ${
                    step === 2 ? 'text-[#60A5FA] font-bold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] transition-all shrink-0 ${
                    step === 2 
                      ? 'bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white font-bold shadow-[0_0_12px_rgba(37,99,235,0.4)] border border-[#60A5FA]/40' 
                      : 'bg-white/10 text-white'
                  }`}>2</span>
                  <span className="hidden min-[380px]:inline">{lang === 'fa' ? 'امکانات اختصاصی' : 'Custom Scope'}</span>
                  <span className="min-[380px]:hidden">{lang === 'fa' ? 'امکانات' : '2'}</span>
                </button>

                <span className="w-4 sm:w-8 h-[1px] bg-white/10 shrink-0" />

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`flex items-center gap-1.5 sm:gap-2 transition-colors cursor-pointer ${
                    step === 3 ? 'text-[#60A5FA] font-bold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] transition-all shrink-0 ${
                    step === 3 
                      ? 'bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white font-bold shadow-[0_0_12px_rgba(37,99,235,0.4)] border border-[#60A5FA]/40' 
                      : 'bg-white/10 text-white'
                  }`}>3</span>
                  <span className="hidden min-[380px]:inline">{lang === 'fa' ? 'تایید و تماس' : 'Review & Contact'}</span>
                  <span className="min-[380px]:hidden">{lang === 'fa' ? 'تماس' : '3'}</span>
                </button>
              </div>
            )}

            {formError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
                {formError}
              </div>
            )}

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'fa' ? 'کدام شاخه مهندسی مدنظر شماست؟' : 'Which engineering capability do you require?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8]">
                    {lang === 'fa' ? 'یکی از راه‌حل‌های فنی تکو را انتخاب نمایید تا مراحل بعد دقیقاً بر اساس آن تنظیم گردد:' : 'Select your primary engineering discipline to configure tailored parameters:'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map(s => {
                    const isSelected = serviceType === s.id;
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleSelectService(s.id)}
                        className={`p-4 rounded-2xl border text-start transition-all cursor-pointer backdrop-blur-md ${
                          isSelected
                            ? 'border-[#60A5FA]/60 bg-gradient-to-b from-[#2563EB]/25 to-[#1D4ED8]/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_25px_rgba(37,99,235,0.25)]'
                            : 'border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#3B82F6]/30 text-[#93C5FD]' : 'bg-white/5 text-[#94A3B8]'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className={`text-sm font-bold ${isSelected ? 'text-[#93C5FD]' : 'text-white'}`}>
                              {lang === 'fa' ? s.nameFa : s.nameEn}
                            </span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />}
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          {lang === 'fa' ? s.descFa : s.descEn}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="liquid-btn h-11 px-7 rounded-xl text-xs font-bold cursor-pointer text-white"
                  >
                    {lang === 'fa' ? 'گام بعدی: جزئیات و امکانات تخصصی' : 'Next: Tailored Specifications'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Dynamic Tailored Specifications */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Active Service Badge & Switcher */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB]/15 via-white/[0.02] to-transparent border border-[#3B82F6]/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#2563EB]/25 border border-[#60A5FA]/40 flex items-center justify-center text-[#93C5FD] shrink-0">
                      <currentServiceObj.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono text-[#94A3B8] uppercase">
                        {lang === 'fa' ? 'شاخه مهندسی فعال' : 'Selected Capability'}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">
                        {lang === 'fa' ? currentServiceObj.nameFa : currentServiceObj.nameEn}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-[#93C5FD] hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  >
                    {lang === 'fa' ? 'تغییر شاخه' : 'Change'}
                  </button>
                </div>

                {/* Sub-type Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-[#94A3B8] font-bold">
                    {lang === 'fa' ? '۱. نوع سناریو و اولویت پیاده‌سازی:' : '1. Architecture & Deployment Sub-Type:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {currentConfig.subTypes.map(st => {
                      const isSelected = serviceSubType === st.id;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setServiceSubType(st.id)}
                          className={`p-3 rounded-xl border text-start transition-all cursor-pointer backdrop-blur-md flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#60A5FA]/60 bg-gradient-to-b from-[#2563EB]/25 to-[#1D4ED8]/15 text-[#93C5FD] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_16px_rgba(37,99,235,0.25)]'
                              : 'border-white/10 bg-white/[0.025] text-[#94A3B8] hover:text-white hover:border-white/20 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white">
                              {lang === 'fa' ? st.nameFa : st.nameEn}
                            </span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />}
                          </div>
                          <p className="text-[11px] text-[#94A3B8] leading-snug">
                            {lang === 'fa' ? st.descFa : st.descEn}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Specific Features Checklist */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-[#94A3B8] font-bold">
                    {lang === 'fa' ? '۲. امکانات و ماژول‌های فنی موردنیاز (انتخاب موارد دلخواه):' : '2. Key Technical Modules (Select applicable):'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentConfig.features.map(feat => {
                      const isChecked = selectedFeatures.includes(feat.id);
                      return (
                        <button
                          key={feat.id}
                          type="button"
                          onClick={() => toggleFeature(feat.id)}
                          className={`p-2.5 rounded-xl border text-xs text-start transition-all cursor-pointer flex items-center gap-2.5 ${
                            isChecked
                              ? 'border-[#60A5FA]/50 bg-[#2563EB]/15 text-white font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                              : 'border-white/10 bg-white/[0.02] text-[#94A3B8] hover:text-white hover:border-white/20'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-[#3B82F6] text-white' : 'border border-white/20 bg-white/5'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="leading-tight">
                            {lang === 'fa' ? feat.labelFa : feat.labelEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Geography and Delivery Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-2 font-bold">
                      {lang === 'fa' ? '۳. تمرکز جغرافیایی و بازار هدف:' : '3. Target Market Geography:'}
                    </label>
                    <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2">
                      {[
                        { id: 'iran', labelFa: 'ایران (ریالی / RTL)', labelEn: 'Iran' },
                        { id: 'canada', labelFa: 'کانادا و بین‌الملل', labelEn: 'Canada / NA' },
                        { id: 'global', labelFa: 'چندزبانه ارزی', labelEn: 'Global' }
                      ].map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setTargetMarket(m.id as any)}
                          className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all cursor-pointer backdrop-blur-md text-center ${
                            targetMarket === m.id
                              ? 'border-[#60A5FA]/60 bg-gradient-to-b from-[#2563EB]/25 to-[#1D4ED8]/15 text-[#93C5FD] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]'
                              : 'border-white/10 bg-white/[0.025] text-[#94A3B8] hover:text-white hover:border-white/20 hover:bg-white/[0.05]'
                          }`}
                        >
                          {lang === 'fa' ? m.labelFa : m.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-2 font-bold">
                      {lang === 'fa' ? '۴. اولویت زمان‌بندی تحویل:' : '4. Delivery Priority:'}
                    </label>
                    <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2">
                      {[
                        { id: 'urgent', labelFa: 'فوری (< ۱۴ روز)', labelEn: 'Fast-Track' },
                        { id: 'standard', labelFa: 'معمولی (۲-۴ هفته)', labelEn: 'Standard' },
                        { id: 'enterprise', labelFa: 'جامع مرحله‌ای', labelEn: 'Phased' }
                      ].map(b => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setEstimatedBudget(b.id)}
                          className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all cursor-pointer backdrop-blur-md text-center ${
                            estimatedBudget === b.id
                              ? 'border-[#60A5FA]/60 bg-gradient-to-b from-[#2563EB]/25 to-[#1D4ED8]/15 text-[#93C5FD] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]'
                              : 'border-white/10 bg-white/[0.025] text-[#94A3B8] hover:text-white hover:border-white/20 hover:bg-white/[0.05]'
                          }`}
                        >
                          {lang === 'fa' ? b.labelFa : b.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contextual description textarea */}
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 font-bold">
                    {lang === 'fa' ? '۵. توضیحات تکمیلی یا نیازمندی‌های ویژه (اختیاری):' : '5. Additional Context or Special Requirements:'}
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={e => setProjectDescription(e.target.value)}
                    rows={3}
                    placeholder={lang === 'fa' ? currentConfig.placeholderFa : currentConfig.placeholderEn}
                    className="glass-input w-full p-3.5 rounded-xl text-xs placeholder-[#94A3B8]/40"
                  />
                </div>

                <div className="flex flex-col-reverse min-[380px]:flex-row justify-between gap-2.5 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="liquid-btn-secondary h-11 px-5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5 w-full min-[380px]:w-auto"
                  >
                    <span>{lang === 'fa' ? 'بازگشت' : 'Back'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="liquid-btn h-11 px-6 rounded-xl font-bold text-xs cursor-pointer text-white flex items-center justify-center gap-1.5 w-full min-[380px]:w-auto"
                  >
                    <span>{lang === 'fa' ? 'گام بعدی: بررسی نهایی و تماس' : 'Next: Review & Contact'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Booking Submission */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Executive Technical Summary Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0B1530] to-[#060B1C] border border-[#3B82F6]/30 shadow-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="text-xs font-mono font-bold text-[#60A5FA] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
                      <span>{lang === 'fa' ? 'خلاصه فنی مشخصات انتخاب‌شده' : 'Configured Technical Specification'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-[11px] font-mono text-[#93C5FD] hover:text-white cursor-pointer"
                    >
                      {lang === 'fa' ? 'ویرایش مشخصات' : 'Edit Spec'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#94A3B8] text-[11px] block">{lang === 'fa' ? 'خدمت اصلی:' : 'Core Discipline:'}</span>
                      <span className="text-white font-bold">{lang === 'fa' ? currentServiceObj.nameFa : currentServiceObj.nameEn}</span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8] text-[11px] block">{lang === 'fa' ? 'معماری و سناریو:' : 'Sub-Architecture:'}</span>
                      <span className="text-[#93C5FD] font-semibold">{currentSubTypeObj ? (lang === 'fa' ? currentSubTypeObj.nameFa : currentSubTypeObj.nameEn) : 'Standard'}</span>
                    </div>
                  </div>

                  {selectedFeatures.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[#94A3B8] text-[11px] block mb-1.5">{lang === 'fa' ? 'ماژول‌های انتخاب‌شده:' : 'Chosen Modules:'}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedFeatures.map(featId => {
                          const feat = currentConfig.features.find(f => f.id === featId);
                          if (!feat) return null;
                          return (
                            <span key={featId} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#2563EB]/20 text-[#93C5FD] border border-[#3B82F6]/30">
                              {lang === 'fa' ? feat.labelFa : feat.labelEn}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'fa' ? 'اطلاعات کارفرما جهت صدور پرونده و تماس' : 'Direct Executive Contact'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8]">
                    {lang === 'fa'
                      ? 'ایمیل معتبر سازمانی خود را وارد کنید تا کارشناسان ارشد تکو برای جلسه مشاوره با شما ارتباط بگیرند'
                      : 'Provide your verified business email for discovery coordination and contract dispatch:'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 font-bold">
                      {lang === 'fa' ? 'نام شما یا نام برند / شرکت *' : 'Client or Organization Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder={lang === 'fa' ? 'مثال: علیرضا نیازی / شرکت آریانو' : 'e.g. Marcus Vance / Horizon Inc'}
                      className="glass-input w-full h-11 px-3.5 rounded-xl text-xs placeholder-[#94A3B8]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 font-bold">
                      {lang === 'fa' ? 'آدرس ایمیل معتبر *' : 'Work Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="founder@company.com"
                      className="glass-input w-full h-11 px-3.5 rounded-xl text-xs placeholder-[#94A3B8]/40"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 font-bold">
                      {lang === 'fa' ? 'شماره تماس یا آیدی تلگرام / واتس‌اپ *' : 'Direct Phone or Telegram/WhatsApp *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactNumber}
                      onChange={e => setContactNumber(e.target.value)}
                      placeholder={lang === 'fa' ? 'مثال: 0912xxxxxxx یا @telegram_id' : 'e.g. +1 (604) xxx-xxxx or @telegram_handle'}
                      className="glass-input w-full h-11 px-3.5 rounded-xl text-xs placeholder-[#94A3B8]/40"
                    />
                  </div>
                </div>

                {/* Communication Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 font-bold">
                      {lang === 'fa' ? 'شیوه ترجیحی جلسه و ارتباط:' : 'Preferred Channel:'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'telegram', labelFa: 'تلگرام', labelEn: 'Telegram', icon: MessageSquare },
                        { id: 'whatsapp', labelFa: 'واتس‌اپ', labelEn: 'WhatsApp', icon: MessageSquare },
                        { id: 'google_meet', labelFa: 'گوگل میت', labelEn: 'Google Meet', icon: Video },
                        { id: 'phone', labelFa: 'تماس تلفنی', labelEn: 'Direct Phone', icon: Phone }
                      ].map(ch => {
                        const Icon = ch.icon;
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => setPreferredChannel(ch.id as any)}
                            className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-md ${
                              preferredChannel === ch.id
                                ? 'border-[#60A5FA]/60 bg-gradient-to-b from-[#2563EB]/25 to-[#1D4ED8]/15 text-[#93C5FD] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_16px_rgba(37,99,235,0.25)]'
                                : 'border-white/10 bg-white/[0.025] text-[#94A3B8] hover:text-white hover:border-white/20 hover:bg-white/[0.05]'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{lang === 'fa' ? ch.labelFa : ch.labelEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 font-bold">
                      {lang === 'fa' ? 'بازه ساعتی مناسب برای تماس:' : 'Convenient Time Window:'}
                    </label>
                    <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2">
                      {[
                        { id: 'morning', labelFa: 'صبح (۱۰ تا ۱۳)', labelEn: 'Morning' },
                        { id: 'afternoon', labelFa: 'عصر (۱۴ تا ۱۸)', labelEn: 'Afternoon' },
                        { id: 'evening', labelFa: 'شب (۱۹ تا ۲۲)', labelEn: 'Evening' }
                      ].map(tw => (
                        <button
                          key={tw.id}
                          type="button"
                          onClick={() => setPreferredTime(tw.id)}
                          className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all cursor-pointer backdrop-blur-md text-center ${
                            preferredTime === tw.id
                              ? 'border-[#F59E0B]/50 bg-gradient-to-b from-[#F59E0B]/20 to-[#B45309]/10 text-[#FDE68A] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_16px_rgba(245,158,11,0.2)]'
                              : 'border-white/10 bg-white/[0.025] text-[#94A3B8] hover:text-white hover:border-white/20 hover:bg-white/[0.05]'
                          }`}
                        >
                          {lang === 'fa' ? tw.labelFa : tw.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse min-[420px]:flex-row justify-between items-stretch min-[420px]:items-center gap-2.5 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="liquid-btn-secondary h-11 px-5 rounded-xl text-xs cursor-pointer text-center justify-center w-full min-[420px]:w-auto"
                  >
                    {lang === 'fa' ? 'بازگشت' : 'Back'}
                  </button>

                  <button
                    type="submit"
                    className="liquid-btn h-11 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer text-white w-full min-[420px]:w-auto"
                  >
                    <Send className="w-4 h-4 text-[#93C5FD]" />
                    <span>{lang === 'fa' ? 'ثبت نهایی درخواست و ایجاد پرونده' : 'Submit Brief & Generate Intake Code'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Success & Confirmation */}
            {step === 4 && confirmedBooking && (
              <div className="space-y-6 text-start">
                <div className="p-4 rounded-2xl bg-[#2563EB]/15 border border-[#3B82F6]/30 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#60A5FA] shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {lang === 'fa' ? 'درخواست شما با موفقیت در سیستم ثبت گردید' : 'Intake Brief Logged Successfully'}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {lang === 'fa'
                        ? 'پرونده شما در اولویت قرار گرفت و کارشناس ارشد تکو در کمتر از ۴ ساعت کاری جهت هماهنگی جلسه با شما تماس خواهد گرفت'
                        : 'Your inquiry has entered the priority queue and our engineering director will follow up under 4 business hours'}
                    </p>
                  </div>
                </div>

                {/* Confirmation Ticket Card */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[11px] font-mono text-[#94A3B8] block">
                        {lang === 'fa' ? 'کد رهگیری اختصاصی پروژه شما:' : 'Official Project Tracking Reference:'}
                      </span>
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#60A5FA]">
                        {confirmedBooking.id}
                      </span>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#2563EB]/20 text-[#60A5FA] border border-[#3B82F6]/40 font-bold">
                      {lang === 'fa' ? 'در صف تماس' : 'Discovery Queued'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-[#94A3B8] block">{lang === 'fa' ? 'نام کارفرما:' : 'Client Organization:'}</span>
                      <span className="text-white font-medium">{confirmedBooking.clientName}</span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8] block">{lang === 'fa' ? 'ایمیل:' : 'Registered Email:'}</span>
                      <span className="text-white font-medium truncate block">{confirmedBooking.email}</span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8] block">{lang === 'fa' ? 'راه ارتباطی:' : 'Direct Handle:'}</span>
                      <span className="text-white font-medium">{confirmedBooking.contactNumber}</span>
                    </div>
                  </div>

                  {/* Direct Link to Open Digital Contract & Invoicing Portal */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/[0.03] p-4 rounded-2xl">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-[#A78BFA]" />
                        <span>{lang === 'fa' ? 'پیش‌نویس قرارداد دیجیتال و فاکتور پروژه آماده است' : 'Digital Contract & Milestone Invoices Prepared'}</span>
                      </div>
                      <div className="text-[11px] text-[#94A3B8]">
                        {lang === 'fa' ? 'جهت بررسی مفاد، امضای دیجیتال و پرداخت پیش‌پرداخت وارد پنل شوید' : 'Review deliverables, digitally sign agreement, and manage milestone escrow'}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenPortal && onOpenPortal(confirmedBooking.id)}
                      className="liquid-btn h-10 px-5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-white"
                    >
                      <span>{lang === 'fa' ? 'ورود به پنل قرارداد و پرداخت' : 'Open Contract Portal'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Copyable Brief */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono text-[#94A3B8]">
                        {lang === 'fa' ? 'متن بریف کامل جهت ارسال در شبکه‌های اجتماعی:' : 'Copyable Brief Summary:'}
                      </span>
                      <button
                        type="button"
                        onClick={copyBrief}
                        className="text-xs font-mono text-[#60A5FA] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? (lang === 'fa' ? 'کپی شد' : 'Copied') : (lang === 'fa' ? 'کپی بریف' : 'Copy Brief')}</span>
                      </button>
                    </div>
                    <pre className="p-3.5 rounded-2xl bg-[#050811] border border-white/10 text-[11px] text-[#E2E8F0] font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
                      {getBriefText()}
                    </pre>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`https://t.me/teco_admin?text=${encodeURIComponent(getBriefText())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-btn-secondary h-11 px-5 rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
                    <span>{lang === 'fa' ? 'ارسال فوری در تلگرام پشتیبانی تکو' : 'Send via Telegram'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setConfirmedBooking(null);
                      setStep(1);
                    }}
                    className="h-11 px-4 rounded-xl text-[#94A3B8] hover:text-white text-xs transition-colors cursor-pointer"
                  >
                    {lang === 'fa' ? 'ثبت درخواست برای پروژه‌ای دیگر' : 'Submit Another Request'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
