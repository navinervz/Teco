import { BookingRequest, DigitalContract } from '../types';

const STORAGE_KEY = 'teco_bookings_v2';

// Pre-configured live demo contract for immediate client testing
const DEMO_BOOKING: BookingRequest = {
  id: 'TECO-2026-894',
  createdAt: new Date().toISOString(),
  serviceType: 'website',
  clientName: 'استارتاپ آوانگارد',
  email: 'founder@avangard.io',
  contactNumber: '+98 912 345 6789',
  preferredChannel: 'google_meet',
  preferredTime: 'afternoon',
  targetMarket: 'global',
  estimatedBudget: 'standard',
  projectDescription: 'طراحی وب‌سایت اختصاصی سازگار با وردپرس و پنل مدیریت آسان، همراه با سیستم خودکار جذب لید و اتصال به CRM بین‌المللی',
  status: 'contract_ready',
  contract: {
    contractNumber: 'TC-CTR-2026-089',
    scopeOfWork: {
      fa: 'توسعه وب‌سایت اختصاصی، پیاده‌سازی بک‌اند قدرتمند با مدیریت آسان وردپرس، طراحی رابط کاربری سفارشی و اتصال پایپ‌لاین‌های خودکارسازی لید',
      en: 'Bespoke web platform engineering with custom WordPress administrative control, high-converting UX design, and automated lead ingestion pipelines'
    },
    deliverables: {
      fa: [
        'معماری فنی اختصاصی فرانت‌اند با لود سریع زیر ۱ ثانیه',
        'پیاده‌سازی پنل مدیریت محتوای حرفه‌ای و ساده با وردپرس اختصاصی',
        'اتوماسیون کامل دریافت فرم‌ها و انتقال بلادرنگ به شیتس و ایمیل سازمانی',
        'بهینه‌سازی فنی سئو برای رتبه‌گیری در بازار ایران و مارکت بین‌المللی',
        'گارانتی فنی ۶ ماهه و پشتیبانی اختصاصی بدون قطعی'
      ],
      en: [
        'Custom high-performance frontend architecture with sub-second page loads',
        'Client-friendly custom WordPress management dashboard with flexible modules',
        'Automated lead streaming into cloud databases and team communication channels',
        'Technical international SEO foundation optimized for global search visibility',
        '6-month comprehensive technical warranty and SLA support'
      ]
    },
    timelineDays: 21,
    totalCost: '۷۵,۰۰۰,۰۰۰ تومان ($1,650 CAD)',
    depositAmount: '۲۵,۰۰۰,۰۰۰ تومان ($550 CAD)',
    isSigned: false,
    milestones: [
      {
        title: { fa: 'پیش‌پرداخت شروع پروژه و تحلیل معماری', en: 'Project Initiation & Architecture Deposit' },
        amount: '۲۵,۰۰۰,۰۰۰ تومان ($550 CAD)',
        status: 'ready',
        dueText: { fa: 'جهت صدور دستور شروع کار و فاز طراحی', en: 'Due upon signing to commence UI/UX phase' }
      },
      {
        title: { fa: 'تأیید پروتوتایپ نهایی و شروع کدنویسی وردپرس', en: 'Prototype Approval & WordPress Integration' },
        amount: '۲۵,۰۰۰,۰۰۰ تومان ($550 CAD)',
        status: 'pending',
        dueText: { fa: 'پس از تایید کامل دمو و فاز اول توسعه', en: 'Due upon interactive prototype approval' }
      },
      {
        title: { fa: 'تست نهایی، اتوماسیون کامل و تحویل سورس کد', en: 'Final QA, Autonomous Pipelines & Launch' },
        amount: '۲۵,۰۰۰,۰۰۰ تومان ($550 CAD)',
        status: 'pending',
        dueText: { fa: 'پس از استقرار روی سرور اصلی و آموزش پنل', en: 'Due upon deployment and handover' }
      }
    ]
  }
};

export function getSavedBookings(): BookingRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [DEMO_BOOKING];
    }
    const parsed: BookingRequest[] = JSON.parse(raw);
    if (!parsed.some(b => b.id === DEMO_BOOKING.id)) {
      return [DEMO_BOOKING, ...parsed];
    }
    return parsed;
  } catch {
    return [DEMO_BOOKING];
  }
}

export function saveBooking(booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status' | 'contract'>): BookingRequest {
  const existing = getSavedBookings();
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const newId = `TECO-2026-${randomSuffix}`;

  // Dynamic scope and deliverables crafted according to exact chosen service
  let scopeOfWork = {
    fa: `طراحی و پیاده‌سازی سیستم اختصاصی برای ${booking.clientName} با قابلیت مدیریت وردپرس، امنیت پیشرفته و اتوماسیون هوشمند فرآیندها`,
    en: `Custom engineering and automated infrastructure deployment for ${booking.clientName} with high-speed delivery and scalable architecture`
  };

  let deliverables = {
    fa: [
      'طراحی ساختار رابط کاربری منطبق با هویت برند و بدون باگ‌های قالب‌های عمومی',
      'پیاده‌سازی هسته امن با سرعت لود فوق‌العاده',
      'راه‌اندازی فرآیندهای اتوماسیون جهت حذف کارهای دستی و پاسخگویی سریع',
      'پشتیبانی مستقیم کارشناسان ارشد تکو در ایران و کانادا'
    ],
    en: [
      'Bespoke digital interface crafted for high conversions and brand prestige',
      'Secure scalable foundation with intuitive admin dashboard',
      'End-to-end automation workflows eliminating repetitive operational tasks',
      'Direct SLA engineering support across Iran and international timezones'
    ]
  };

  if (booking.serviceType === 'wordpress_custom') {
    scopeOfWork = {
      fa: `مهندسی وب‌سایت اختصاصی با پنل مدیریت آسان وردپرس، طراحی رابط بدون قالب آماده و بهینه‌سازی سرعت برای برند ${booking.clientName}`,
      en: `Bespoke WordPress CMS platform engineering with custom lightweight frontend and sub-second load times for ${booking.clientName}`
    };
    deliverables = {
      fa: [
        'کدنویسی فرانت‌اند اختصاصی فوق سریع با کسب امتیاز ۹۵+ در Core Web Vitals',
        'پیاده‌سازی پنل مدیریت محتوای وردپرس سفارشی‌سازی‌شده و بدون پیچیدگی',
        'اتصال درگاه‌های بانکی شاپرک یا بین‌المللی و سیستم احراز هویت پیامکی',
        'همگام‌سازی خودکار فرم‌ها و سرنخ‌ها با نرم‌افزار CRM و ایمیل سازمانی',
        'گارانتی ۶ ماهه عملکرد بی‌نقص و آموزش اختصاصی کاربری'
      ],
      en: [
        'Custom clean-coded frontend scoring 95+ on Google PageSpeed Insights',
        'Streamlined WordPress administration panel tailored specifically to company workflow',
        'Seamless payment gateway integration and instant SMS OTP onboarding',
        'Automated lead routing into corporate CRM and cloud databases',
        '6-month comprehensive technical warranty and operational handover'
      ]
    };
  } else if (booking.serviceType === 'affiliate_radar') {
    scopeOfWork = {
      fa: `پیاده‌سازی موتور هوشمند رصد و رهگیری قیمت‌ها و سیستم افیلیت خودکار (مدل PSYG & Arez) برای ${booking.clientName}`,
      en: `High-availability automated deal intelligence and affiliate pricing radar for ${booking.clientName}`
    };
    deliverables = {
      fa: [
        'کرولرها و اسکرپرهای اختصاصی بدون بلاک برای واکشی قیمت از پلتفرم‌های هدف',
        'موتور مقایسه و محاسبه حاشیه سود و درآمدزایی از ترافیک ارگانیک',
        'ربات ارسال آنی آفرها و افت قیمت‌ها به کانال‌ها و پیام‌رسان‌ها',
        'داشبورد مانیتورینگ متمرکز و پایش بلادرنگ سلامت نودها',
        'معماری مقیاس‌پذیر بدون هزینه جانبی و نگهداری مستمر پایگاه داده'
      ],
      en: [
        'Resilient distributed scraper cluster bypassing cloudflare & anti-bot traps',
        'Automated margin calculation engine and monetization tracking suite',
        'Instant deal broadcast engine streaming price drops to messaging channels',
        'Real-time uptime and node telemetry dashboard with alert dispatchers',
        'Scalable database storage architecture and hands-off autonomous execution'
      ]
    };
  } else if (booking.serviceType === 'n8n_automation') {
    scopeOfWork = {
      fa: `طراحی و استقرار زنجیره اتوماسیون سازمانی n8n و یکپارچه‌سازی سامانه‌ها برای مجموعه ${booking.clientName}`,
      en: `Enterprise n8n automated process orchestration and multi-system integration for ${booking.clientName}`
    };
    deliverables = {
      fa: [
        'نقشه‌برداری و مهندسی مجدد فرآیندهای دستی و انتقال به سناریوهای خودکار n8n',
        'اتصال دوطرفه وب‌سایت، سیستم مدیریت مشتریان (CRM) و نرم‌افزارهای حسابداری',
        'پیاده‌سازی سیستم صدور آنی پیش‌فاکتور، فاکتور و رسید تراکنش',
        'راه‌اندازی سرور اختصاصی Docker سلف‌هاست با بالاترین سطح امنیت داده‌ها',
        'پایش خودکار خطاهای شبکه و بازیابی بلادرنگ تراکنش‌های معلق'
      ],
      en: [
        'Complete workflow mapping and transition from manual tasks to n8n pipelines',
        'Bidirectional sync between website CMS, CRM ledgers, and financial platforms',
        'Instant automated invoice, quote, and payment receipt dispatch mechanism',
        'Hardened self-hosted Docker server deployment guaranteeing total data privacy',
        'Automated error fallback and dead-letter queue management'
      ]
    };
  } else if (booking.serviceType === 'telegram_bot_factory') {
    scopeOfWork = {
      fa: `توسعه اکوسیستم ربات اختصاصی تلگرام متصل به دیتابیس متمرکز و درگاه بانکی برای ${booking.clientName}`,
      en: `Production Telegram bot ecosystem with central database synchronization and gateway hooks for ${booking.clientName}`
    };
    deliverables = {
      fa: [
        'پیاده‌سازی ربات با معماری مدرن و وب‌اپلیکیشن تلگرام (Telegram Mini App)',
        'اتصال مستقیم به پایگاه داده مرکزی سایت جهت بروزرسانی همزمان محصولات و موجودی',
        'درگاه پرداخت درون‌برنامه‌ای امن و صدور کد پیگیری یکتا برای مشتریان',
        'پنل ادمین جهت ارسال پیام‌های گروهی، تعریف تخفیف و گزارش‌گیری اکسل',
        'پایداری بالا روی سرورهای بدون قطعی با سرعت پاسخگویی زیر چند میلی‌ثانیه'
      ],
      en: [
        'High-performance Telegram bot runtime with Telegram Mini App (TMA) capabilities',
        'Direct two-way synchronization with central web database & real-time inventory',
        'In-chat direct checkout flow with automated payment reconciliation',
        'Administrative command center with broadcast campaigns and Excel export',
        'Ultra-low-latency deployment on high-availability cloud infrastructure'
      ]
    };
  }

  const contract: DigitalContract = {
    contractNumber: `TC-CTR-${randomSuffix}`,
    scopeOfWork,
    deliverables,
    timelineDays: booking.estimatedBudget === 'urgent' ? 14 : 28,
    totalCost: 'قابل تعیین پس از مشاوره فنی (برآورد اولیه)',
    depositAmount: '۳۰٪ مبلغ کل قرارداد',
    isSigned: false,
    milestones: [
      {
        title: { fa: 'پیش‌پرداخت شروع طراحی و کدنویسی', en: 'Project Initiation Deposit' },
        amount: '۳۰٪ از کل قرارداد',
        status: 'ready',
        dueText: { fa: 'پس از توافق در جلسه مشاوره', en: 'Due after discovery approval' }
      },
      {
        title: { fa: 'تکمیل فاز میانی و تحویل نسخه آزمایشی', en: 'Mid-term Prototype Review' },
        amount: '۴۰٪ از کل قرارداد',
        status: 'pending',
        dueText: { fa: 'پس از تایید عملکرد پنل و ظاهر سایت', en: 'Due upon staging approval' }
      },
      {
        title: { fa: 'تحویل نهایی، اتصال دامنه و تسویه حساب', en: 'Final Deployment & Handover' },
        amount: '۳۰٪ از کل قرارداد',
        status: 'pending',
        dueText: { fa: 'همزمان با انتقال مالکیت کامل و آموزش', en: 'Due upon live production release' }
      }
    ]
  };

  const newBooking: BookingRequest = {
    ...booking,
    id: newId,
    createdAt: new Date().toISOString(),
    status: 'reviewing',
    contract
  };

  const updated = [newBooking, ...existing.filter(b => b.id !== newBooking.id)];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }

  return newBooking;
}

export function updateBooking(updatedBooking: BookingRequest): void {
  const existing = getSavedBookings();
  const updated = existing.map(b => b.id === updatedBooking.id ? updatedBooking : b);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}
