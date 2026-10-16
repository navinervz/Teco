import { ProjectItem, WorkflowItem, BotItem, ModuleItem } from '../types';

export const STUDIO_METRICS = {
  workflows: 29,
  nodes: 500,
  bots: 10,
  liveChannels: 6,
  auditDate: 'اکتبر ۲۰۲۶',
  auditDateEn: 'October 2026'
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'psyg',
    type: 'web',
    name: { fa: 'سامانه افیلیت و ردیاب قیمت سای‌جی · PSYG', en: 'PSYG Automated Deal Radar' },
    kicker: { fa: 'پلتفرم تجارت الکترونیک و تحلیل خودکار قیمت', en: 'E-Commerce Intelligence & Dynamic Affiliate Engine' },
    url: 'https://psygstore.shop',
    host: 'psygstore.shop',
    hue: '#4FE3C1',
    summary: {
      fa: 'پلتفرم مقیاس‌پذیر ردیابی قیمت و درآمدزایی افیلیت بدون نیاز به درج دستی کالا که روزانه صدها محصول دیجیتال را از مراجع اصلی پایش کرده و بر اساس تحلیل نوسانات به کاربر اعلام می‌کند چه زمانی بهترین وقت خرید است',
      en: 'High-throughput price tracking and affiliate revenue engine crawling hundreds of digital products daily with dynamic buying-opportunity recommendations'
    },
    built: {
      fa: [
        'سیستم خزنده خودکار قیمت‌ها با قابلیت پایش بدون وقفه از معتبرترین فروشگاه‌های ایران',
        'الگوریتم اختصاصی تفکیک تخفیف‌های واقعی از حباب‌های قیمتی و رتبه‌بندی فرصت‌های خرید',
        'سیستم هشدار ایمیلی افت قیمت متصل به پنل اختصاصی کاربران جهت افزایش نرخ بازگشت مشتری',
        'مجله خودکار سئو که بدون نیروی انسانی مداوم، مقالات راهنمای خرید را با الگوریتم‌های هوشمند تولید و منتشر می‌کند',
        '۶ پایپ‌لاین اتوماسیون سازمانی شامل همگام‌سازی محصولات، ایجنت پشتیبانی و کانال تلگرام'
      ],
      en: [
        'Automated multi-store price monitoring infrastructure with real-time change history logging',
        'Algorithmic deal ranking separating synthetic markdowns from genuine historical lows',
        'Automated price-drop alert dispatcher driving high user retention and conversion',
        'Autonomous editorial buyer guides generated and formatted to capture high-intent search traffic',
        'Six interconnected workflows bridging catalog sync, customer engagement, and distribution'
      ]
    },
    facts: [
      {
        label: { fa: 'فروشگاه‌های منبع داده', en: 'Monitored Retailers' },
        value: { fa: 'دیجی‌کالا، اسنپ‌شاپ، تکنولایف، اپکس‌ویژن، بامیلو، اکالا، زنبیل', en: 'Digikala, Snappshop, Technolife, Apexvision, Bamilo, Okala, Zanbil' }
      },
      {
        label: { fa: 'دسته‌بندی‌های کالا', en: 'Catalog Coverage' },
        value: { fa: 'گوشی موبایل، لپ‌تاپ، لوازم جانبی، ساعت هوشمند و تجهیزات صوتی', en: 'Smartphones, Laptops, Wearables, Audio Gear, Accessories' }
      },
      {
        label: { fa: 'معماری و انعطاف‌پذیری', en: 'Core Architecture' },
        value: { fa: 'فرانت‌اند فوق سریع همراه با پنل مدیریت منعطف و اتوماسیون ابری n8n', en: 'High-velocity frontend with flexible CMS control and autonomous cloud pipelines' }
      },
      {
        label: { fa: 'مدل تجاری و درآمد', en: 'Business Model' },
        value: { fa: 'درآمد غیرفعال پایدار بر پایه کمیسیون خرید افیلیت بدون تبلیغات آزاردهنده', en: 'Sustainable passive affiliate revenue model free from intrusive third-party ads' }
      }
    ],
    tags: ['Affiliate Engine', 'Autonomous Pipelines', 'Price Analytics', 'RTL Engine'],
    flows: ['psyg-content', 'psyg-assistant', 'psyg-instagram'],
    metric: {
      value: 6,
      label: { fa: 'ورک‌فلو خودکار شبانه‌روزی', en: 'Autonomous operational workflows' }
    }
  },
  {
    id: 'arez',
    type: 'web',
    name: { fa: 'پلتفرم مد و لوک‌بوک آرز · Arez', en: 'Arez Fashion & Restock Radar' },
    kicker: { fa: 'تکنولوژی مد و ردیابی خودکار موجودی سایز', en: 'Fashion-Tech & Size Restock Automation' },
    url: 'https://arezwear.shop',
    host: 'arezwear.shop',
    hue: '#5ED7FF',
    summary: {
      fa: 'پلتفرم تخصصی البسه با ظاهر لوک‌بوک مینیمال که مشکل اساسی خریداران پوشاک یعنی ناموجود شدن سایز را حل کرده و به محض شارژ مجدد لباس، خریدار را از طریق اعلان باخبر می‌سازد',
      en: 'A high-aesthetic fashion platform solving size stockouts by notifying shoppers the exact moment out-of-stock items return to partner shelves'
    },
    built: {
      fa: [
        'پیاده‌سازی بر بستر معماری مشترک افیلیت تکو با شخصی‌سازی کامل برای صنعت فشن و پوشاک',
        'ویترین لوک‌بوک جذاب برای جذب مخاطب در لایه اول و موتور جست‌وجوی موجودی در لایه دوم',
        'موتور هوشمند «موجود شد خبرم کن» با قابلیت فیلتر دقیق بر اساس سایز و رنگ مدنظر',
        'طراحی تیره با کنتراست فیروزه‌ای متناسب با سلیقه نسل جدید و خریداران بین‌المللی'
      ],
      en: [
        'Engineered on Teco’s modular affiliate framework with bespoke fashion-forward styling',
        'Editorial lookbook showcase layered over an automated multi-retailer inventory engine',
        'Targeted restock triggers configured for exact clothing sizes and color variations',
        'High-contrast luxury dark aesthetic optimized for high conversion and brand affinity'
      ]
    },
    facts: [
      {
        label: { fa: 'مجموعه‌های تحت پوشش', en: 'Covered Segments' },
        value: { fa: 'کت و پالتو، شلوار، کفش، پوشاک زنانه، مردانه و اکسسوری', en: 'Coats, Footwear, Trousers, Designer Apparel, Accessories' }
      },
      {
        label: { fa: 'مدل پیاده‌سازی', en: 'Deployment Framework' },
        value: { fa: 'معماری مشترک با کاهش ۸۰ درصدی زمان و هزینه توسعه', en: 'Reusable blueprint cutting 80% of development lead time and capital expenditure' }
      },
      {
        label: { fa: 'زبان و بازار', en: 'Localization' },
        value: { fa: 'طراحی راست‌به‌چپ با رعایت اصول تایپوگرافی مدرن فارسی', en: 'Native RTL layout with sophisticated Persian typographical hierarchy' }
      }
    ],
    tags: ['Fashion Tech', 'Lookbook UI', 'Restock Trigger', 'Modular Engine'],
    flows: [],
    metric: {
      value: 2,
      label: { fa: 'حوزه کاملاً متفاوت روی ۱ موتور فنی', en: 'Distinct industries on 1 shared engine' }
    }
  },
  {
    id: 'playfit',
    type: 'web',
    name: { fa: 'مرکز حرکتی پلی‌فیت ونکوور · PlayFit', en: 'PlayFit Movement Centre' },
    kicker: { fa: 'ونکوور شمالی، کانادا · وب‌سایت سینماتیک و اتوماسیون پذیرش', en: 'North Vancouver, Canada · High-Performance Web & Intake Automation' },
    url: 'https://playfit-lens.vercel.app',
    host: 'playfit-lens.vercel.app',
    hue: '#FFB547',
    summary: {
      fa: 'وب‌سایت بین‌المللی با روایت اسکرول سینماتیک برای یک مرکز ورزشی معتبر در ونکوور کانادا که همراه با دستیار هوشمند پذیرش، فرآیند ثبت‌نام جلسات آزمایشی را کاملاً مکانیزه کرده است',
      en: 'Cinematic brand website and autonomous client intake concierge for a premier movement and athletic performance centre in North Vancouver, British Columbia'
    },
    built: {
      fa: [
        'طراحی تجربه اسکرول سینماتیک و انتقال نرم میان ۶ لاین تمرینی از خردسالان تا بزرگسالان',
        'دستیار هوشمند PlayFit Concierge که زبان بازدیدکننده را تشخیص داده و به صورت ۲۴ ساعته لیدها را هدایت می‌کند',
        'قیف ثبت‌نام ۴ مرحله‌ای کلاس آزمایشی با اتصال فوری به دیتابیس و ایمیل‌های خودکار سازمانی',
        'تحویل نهایی به صورت پنل با مدیریت آسان جهت به‌روزرسانی آسان برنامه‌ها و مربیان توسط کارفرما'
      ],
      en: [
        'Cinematic scroll storytelling engineered with GSAP across six developmental athletic tracks',
        'PlayFit Concierge: intelligent bilingual conversational agent converting visitors around the clock',
        'Interactive 4-step trial intake funnel streaming qualified inquiries into team communication hubs',
        'Client-friendly content management implementation enabling non-technical staff to update rosters with ease'
      ]
    },
    facts: [
      {
        label: { fa: 'موقعیت جغرافیایی', en: 'Location' },
        value: { fa: 'ونکوور شمالی، بریتیش کلمبیا، کانادا', en: 'North Vancouver, British Columbia, Canada' }
      },
      {
        label: { fa: 'سیستم مدیریت محتوا', en: 'CMS & Delivery' },
        value: { fa: 'ترکیب فرانت‌اند مدرن با پنل مدیریت آسان متناسب با نیاز مشتری', en: 'Modern high-speed frontend integrated with intuitive client CMS control' }
      },
      {
        label: { fa: 'قابلیت بین‌المللی', en: 'Global Reach' },
        value: { fa: 'پشتیبانی کامل دوزبانه و ثبت مستقیم داده‌های مخاطبان کانادایی', en: 'Full bilingual capability with real-time Canadian lead routing' }
      }
    ],
    tags: ['Global Platform', 'Cinematic Scroll', 'Intake Automation', 'Vancouver BC'],
    flows: ['playfit-lead'],
    metric: {
      value: 2,
      label: { fa: 'پایپ‌لاین فعال دریافت لید و چت هوشمند', en: 'Active intake & concierge workflows' }
    }
  },
  {
    id: 'site-doctor',
    type: 'web',
    name: { fa: 'موتور ممیزی سلامت وب · Site Doctor', en: 'Site Doctor Diagnostic Engine' },
    kicker: { fa: 'ممیزی فنی، ارزیابی سئو و سرعت در ۶۰ ثانیه', en: '60-Second Technical SEO & Performance Diagnostic' },
    url: 'https://site-doctor-landing.vercel.app',
    host: 'site-doctor-landing.vercel.app',
    hue: '#B9A0FF',
    summary: {
      fa: 'سامانه خودکار تحلیل وب‌سایت که در ۶۰ ثانیه فاکتورهای حیاتی گوگل، کدهای سرور و نقاط ضعف سئو را اسکن کرده و گزارش راهبردی و رفع عیوب را مستقیماً به ایمیل کارفرما ارسال می‌کند',
      en: 'Turnkey diagnostic system analyzing server response times, Core Web Vitals, and technical SEO hygiene in under 60 seconds with automated executive email delivery'
    },
    built: {
      fa: [
        'لندینگ دوزبانه پرسرعت با اعتبارسنجی دقیق دامنه‌ها و پروتکل‌های امنیتی وب',
        'پایپ‌لاین خودکار استخراج ساختار سایت و سنجش معیارهای سرعت بارگذاری بدون نیاز به افزونه‌های سنگین',
        'تولید خودکار چک‌لیست اقدامات اصلاحی و ارسال ایمیل رسمی گزارش ممیزی به متقاضیان',
        'نسخه بات تلگرام برای بررسی فوری وضعیت وب‌سایت‌ها از روی تلفن همراه'
      ],
      en: [
        'High-velocity bilingual landing page with strict domain and header verification protocols',
        'Autonomous DOM inspection analyzing response latency and Core Web Vitals without heavy plugins',
        'Automated prescription generation and transactional email delivery directly to executives',
        'Telegram bot companion for on-the-go technical health inspections'
      ]
    },
    facts: [
      {
        label: { fa: 'فاکتورهای ارزیابی', en: 'Evaluated Signals' },
        value: { fa: 'پاسخ اولیه سرور (TTFB)، ساختار سئوی داخلی، هدرهای کش و متادیتا', en: 'TTFB, Core Web Vitals, Status Headers, Cache Rules, Metadata' }
      },
      {
        label: { fa: 'زمان تولید گزارش', en: 'Turnaround Time' },
        value: { fa: 'زیر ۶۰ ثانیه به صورت کاملاً خودکار و بدون دخالت انسان', en: 'Under 60 seconds completely autonomous from input to delivery' }
      },
      {
        label: { fa: 'مخاطبان هدف', en: 'Target Audience' },
        value: { fa: 'مدیران عامل، مدیران سئو و آژانس‌های مارکتینگ ایران و خارج از کشور', en: 'Founders, SEO directors, and marketing agencies globally' }
      }
    ],
    tags: ['Automated Audit', 'SEO Diagnostics', 'Fast Turnaround', 'Lead Magnet'],
    flows: ['site-doctor', 'sd-bot'],
    metric: {
      value: '60s',
      label: { fa: 'زمان پردازش و ارسال گزارش کامل', en: 'Diagnostic processing turnaround' }
    }
  },
  {
    id: 'psyg-tg',
    type: 'telegram',
    name: { fa: 'کانال خودکار شکار فرصت‌های خرید سای‌جی', en: 'PSYG Deal Broadcast Channel' },
    kicker: { fa: 'کانال خودکار تلگرام با انتشار هوشمند تخفیف‌ها', en: 'Autonomous Telegram Opportunity Pipeline' },
    url: 'https://t.me/psygonline',
    host: 't.me/psygonline',
    hue: '#4FE3C1',
    summary: {
      fa: 'کانال تخصصی رصد فرصت‌های خرید که صد در صد محتوای آن توسط اتوماسیون و بدون نیاز به ادمین تولید و منتشر می‌شود و به عنوان قیف هدایت ترافیک هدفمند عمل می‌کند',
      en: 'Curated shopping intelligence channel broadcasting automated price-drop alerts and buying opportunities directly into subscribers’ message streams'
    },
    built: {
      fa: [
        'پایپ‌لاین ۱۲ گره‌ای برای دریافت داده‌های افت قیمت و قالب‌بندی استاندارد پیام‌های تلگرامی',
        'تولید خودکار عکس اختصاصی برای هر آگهی و درج لینک ردیابی افیلیت',
        'انتشار منظم و هوشمند بر اساس جذابیت پیشنهاد بدون اسپم و ارسال پست‌های بی‌ارزش'
      ],
      en: [
        '12-node automated broadcast workflow managing formatting, discount badges, and tracking links',
        'Automated product visual generation coupled with direct affiliate attribution',
        'Intelligent rate-limiting ensuring only high-conviction buying opportunities trigger broadcasts'
      ]
    },
    facts: [
      {
        label: { fa: 'تعداد اعضای فعال', en: 'Subscribers' },
        value: { fa: '۸۵۷ کاربر واقعی و بدون عضو فیک (آمار پاییز ۲۰۲۶)', en: '857 verified organic subscribers without bots or synthetic metrics' }
      },
      {
        label: { fa: 'هزینه نگهداری', en: 'Operational Cost' },
        value: { fa: 'صفر ساعت کار نیروی انسانی جهت تولید و زمان‌بندی محتوا', en: 'Zero manual hours required for daily scheduling and copywriting' }
      }
    ],
    tags: ['Telegram Bot', 'Automated Channel', 'Lead Routing', 'Passive Channel'],
    flows: [],
    metric: {
      value: 857,
      label: { fa: 'مخاطب واقعی و فعال', en: 'Organic subscribers' }
    }
  },
  {
    id: 'tecofi',
    type: 'telegram',
    name: { fa: 'کانال تحلیل بازار و نرخ‌های لحظه‌ای TECOFi', en: 'TECOFi Financial Intelligence' },
    kicker: { fa: 'رسانه خودکار اقتصادی با موتور تعاملی نظرسنجی', en: 'Autonomous Market Feeds & Interactive Polling' },
    url: 'https://t.me/tecofinance',
    host: 't.me/tecofinance',
    hue: '#FFB547',
    summary: {
      fa: 'سیستم اطلاع‌رسانی خودکار مالی و ارز دیجیتال همراه با موتور تعاملی نظرسنجی با دکمه‌های اینلاین که داده‌های هر رأی را به طور مستقل ذخیره و آنالیز می‌کند',
      en: 'Autonomous financial intelligence pipeline publishing real-time rates and managing fraud-resistant one-vote-per-user community polls'
    },
    built: {
      fa: [
        'دریافت خودکار اخبار و نرخ‌ها، خلاصه‌سازی هوشمند و انتشار در ساعت‌های پربازدید روز',
        'موتور ضدتقلب نظرسنجی: بررسی شناسه یکتا در پایگاه داده ابری و جلوگیری از ثبت رأی تکراری',
        'به‌روزرسانی خودکار و بلادرنگ درصدهای پیام تلگرام به محض فشرده شدن دکمه توسط هر کاربر'
      ],
      en: [
        'Scheduled market rate ingestion with automated synthesis and peak-hour distribution',
        'Fraud-resistant polling engine validating user identity against cloud databases',
        'Live message editing reflecting recalculated vote distributions instantly in Telegram'
      ]
    },
    facts: [
      {
        label: { fa: 'مخاطبان تخصصی', en: 'Subscribers' },
        value: { fa: '۳۱۸ فعال حوزه مالی و بازارهای سرمایه', en: '318 specialized market professionals and traders' }
      },
      {
        label: { fa: 'یکپارچه‌سازی ابری', en: 'Cloud Sync' },
        value: { fa: 'اتصال مستقیم به گوگل شیتس به عنوان پایگاه داده امن آراء', en: 'Direct cloud spreadsheet synchronization acting as an immutable voting ledger' }
      }
    ],
    tags: ['FinTech Automation', 'Realtime Polling', 'Anti-Fraud Bot', 'Interactive'],
    flows: ['tg-content', 'tg-vote'],
    metric: {
      value: 318,
      label: { fa: 'مخاطب تخصصی بازار', en: 'Financial subscribers' }
    }
  }
];

export const WORKFLOWS_DATA: WorkflowItem[] = [
  {
    id: 'site-doctor',
    projectId: 'site-doctor',
    nodeCount: 5,
    name: { fa: 'Site Doctor · ممیزی فنی و امنیتی وب', en: 'Site Doctor · Technical Web Audit' },
    description: {
      fa: 'دریافت آدرس هدف از کاربر، بررسی کدهای فرانت‌اند و وضعیت اتصال سرور، پاک‌سازی کدهای نامعتبر، ارزیابی هوشمند سئو و ارسال بلادرنگ نسخه به ایمیل متقاضی',
      en: 'Captures domain URL, inspects server headers, scrubs invalid markup, performs automated optimization diagnosis, and emails full report'
    },
    steps: [
      { type: 'trigger', labelEn: 'Landing Webhook', labelFa: 'دریافت درخواست از لندینگ' },
      { type: 'fetch', labelEn: 'Fetch Site Structure', labelFa: 'استخراج کدهای صفحه' },
      { type: 'code', labelEn: 'Sanitize & Clean Data', labelFa: 'پاک‌سازی و استخراج داده‌ها' },
      { type: 'ai', labelEn: 'Algorithmic Optimization', labelFa: 'تحلیل تخصصی بهینه‌سازی' },
      { type: 'send', labelEn: 'Dispatch Report to Email', labelFa: 'ارسال فوری نسخه به ایمیل' }
    ]
  },
  {
    id: 'sd-bot',
    projectId: 'site-doctor',
    nodeCount: 17,
    name: { fa: 'ربات تلگرامی Site Doctor', en: 'Site Doctor Telegram Bot' },
    description: {
      fa: 'دریافت دامنه داخل پیام‌رسان، اطلاع‌رسانی از آغاز تست، استعلام شاخص‌های عملکردی و ارسال کارنامه دسته‌بندی‌شده به کاربر در چند ثانیه',
      en: 'Accepts domain inside chat, begins telemetry diagnostics, evaluates response latency, and returns prioritized action items'
    },
    steps: [
      { type: 'trigger', labelEn: 'Telegram Message', labelFa: 'پیام حاوی دامنه در تلگرام' },
      { type: 'send', labelEn: 'Notify Scan Start', labelFa: 'اعلان شروع فرآیند اسکن' },
      { type: 'fetch', labelEn: 'Performance API Query', labelFa: 'استعلام شاخص‌های سرعت' },
      { type: 'fetch', labelEn: 'Server Security Audit', labelFa: 'بررسی هدرهای امنیتی سرور' },
      { type: 'ai', labelEn: 'Intelligent Synthesis', labelFa: 'پردازش و دسته‌بندی ایرادات' },
      { type: 'send', labelEn: 'Deliver Structured Summary', labelFa: 'ارسال گزارش نهایی در تلگرام' }
    ]
  },
  {
    id: 'psyg-instagram',
    projectId: 'psyg',
    nodeCount: 15,
    name: { fa: 'ایجنت هوشمند دایرکت و کامنت اینستاگرام', en: 'Autonomous Social Engagement Agent' },
    description: {
      fa: 'پاسخگویی سریع به دایرکت‌ها و کامنت‌های کاربران با دسترسی زنده به پایگاه داده محصولات جهت راهنمایی دقیق مشتریان بدون نیاز به ادمین دستی',
      en: 'Handles inbound customer questions and comments with real-time catalog query capabilities and conversational memory'
    },
    steps: [
      { type: 'trigger', labelEn: 'Social Webhook (DM/Comment)', labelFa: 'وب‌هوک پیام یا کامنت' },
      { type: 'logic', labelEn: 'Spam & Echo Filter', labelFa: 'حذف پیام‌های اسپم و تکراری' },
      { type: 'logic', labelEn: 'Intent Classification', labelFa: 'تشخیص قصد خرید و نیاز مشتری' },
      { type: 'ai', labelEn: 'Knowledge Base Search', labelFa: 'جست‌وجوی کاتالوگ و پاسخ هوشمند' },
      { type: 'logic', labelEn: 'Output Routing', labelFa: 'مسیریابی قالب ارسال' },
      { type: 'send', labelEn: 'Deliver Reply to User', labelFa: 'ارسال پاسخ مستقیم در اینستاگرام' }
    ]
  },
  {
    id: 'psyg-content',
    projectId: 'psyg',
    nodeCount: 10,
    name: { fa: 'تولید محتوای هوشمند و ارتقای سئو', en: 'Autonomous Editorial SEO Engine' },
    description: {
      fa: 'اجرای خودکار هر ۴۸ ساعت: بررسی پرفروش‌ترین محصولات، مقایسه با مطالب گذشته برای جلوگیری از تولید محتوای تکراری، نگارش مقاله تخصصی و انتشار مستقیم روی سایت',
      en: 'Executes every 48 hours: reviews high-demand products, audits past publications to avoid cannibalization, and publishes optimized buyer guides'
    },
    steps: [
      { type: 'trigger', labelEn: '48h Cron Trigger', labelFa: 'زمان‌بندی منظم هر دو روز' },
      { type: 'fetch', labelEn: 'Trending Products Query', labelFa: 'استعلام پربازدیدترین کالاها' },
      { type: 'fetch', labelEn: 'Audit Past Articles', labelFa: 'بررسی مقالات قبلی جهت تنوع' },
      { type: 'logic', labelEn: 'Quality Control Gate', labelFa: 'سنجش کیفیت و غنای محتوا' },
      { type: 'code', labelEn: 'Structure Outline', labelFa: 'تدوین ساختار استاندارد سئو' },
      { type: 'ai', labelEn: 'Intelligent Article Generator', labelFa: 'تولید متن تحلیلی و راهنمای خرید' },
      { type: 'send', labelEn: 'Direct CMS Publication', labelFa: 'انتشار مستقیم روی وب‌سایت' }
    ]
  },
  {
    id: 'psyg-assistant',
    projectId: 'psyg',
    nodeCount: 5,
    name: { fa: 'دستیار خرید هوشمند خریداران', en: 'On-Site Shopping Assistant' },
    description: {
      fa: 'پاسخگویی به سؤالات فنی خریداران داخل فروشگاه، تطبیق بودجه و نیاز کاربر با ویژگی‌های محصولات و ارائه بهترین گزینه‌های خرید',
      en: 'Interacts with on-site visitors, analyzes feature requirements and budgets, and recommends best-fit products from the catalog'
    },
    steps: [
      { type: 'trigger', labelEn: 'Visitor Chat Request', labelFa: 'درخواست چت از کاربر' },
      { type: 'code', labelEn: 'Context Preparation', labelFa: 'آماده‌سازی اطلاعات فنی کالا' },
      { type: 'ai', labelEn: 'Requirement Matching', labelFa: 'تطبیق هوشمند کالا با نیاز کاربر' },
      { type: 'code', labelEn: 'Format Recommendations', labelFa: 'قالب‌بندی خوانا و دکمه خرید' },
      { type: 'send', labelEn: 'Stream Answer to UI', labelFa: 'نمایش پاسخ در چت وب‌سایت' }
    ]
  },
  {
    id: 'playfit-lead',
    projectId: 'playfit',
    nodeCount: 8,
    name: { fa: 'پایپ‌لاین ثبت و پیگیری لیدهای PlayFit', en: 'PlayFit Trial Intake Pipeline' },
    description: {
      fa: 'دریافت درخواست جلسه آزمایشی از متقاضیان در ونکوور، ثبت فوری در پایگاه داده مشتریان، ارسال ایمیل خوشامدگویی و پیامک اطلاع‌رسانی به کادر پذیرش',
      en: 'Captures movement trial requests from Vancouver visitors, syncs lead to cloud databases, and triggers confirmation emails and staff alerts'
    },
    steps: [
      { type: 'trigger', labelEn: 'Trial Booking Webhook', labelFa: 'ثبت فرم نوبت آزمایشی' },
      { type: 'send', labelEn: 'Log into Cloud CRM', labelFa: 'ثبت پرونده در دیتابیس مشتریان' },
      { type: 'send', labelEn: 'User Confirmation Email', labelFa: 'ایمیل تأیید نوبت به متقاضی' },
      { type: 'send', labelEn: 'Staff Instant Notification', labelFa: 'هشدار فوری به کادر مدیریت' }
    ]
  },
  {
    id: 'bot-factory',
    projectId: 'bots',
    nodeCount: 18,
    name: { fa: 'الگوی استاندارد کارخانه ربات‌سازی', en: 'Production Bot Factory Pattern' },
    description: {
      fa: 'معماری مادر و پایدار ۱۰ ربات تلگرامی تکو: دریافت پیام، نرمال‌سازی داده‌ها، ثبت سابقه در لاگ مرکزی، مسیریابی و مدیریت قطعی با مدل جایگزین خودکار',
      en: 'Resilient baseline architecture powering 10 Telegram bots with automated payload normalization, CRM logging, and auto-failover capabilities'
    },
    steps: [
      { type: 'trigger', labelEn: 'Telegram Inbound Update', labelFa: 'دریافت پیام جدید در تلگرام' },
      { type: 'code', labelEn: 'Normalize Payload', labelFa: 'نرمال‌سازی اطلاعات پیام' },
      { type: 'logic', labelEn: 'Audit Log & Router', labelFa: 'ثبت در سامانه و تفکیک فرمان' },
      { type: 'ai', labelEn: 'Primary Engine → Fallback', labelFa: 'موتور هوشمند با پشتیبان قطعی' },
      { type: 'code', labelEn: 'Persian Typography Polish', labelFa: 'قالب‌بندی استاندارد خروجی فارسی' },
      { type: 'send', labelEn: 'Deliver Reply to User', labelFa: 'ارسال پاسخ نهایی به مخاطب' }
    ]
  },
  {
    id: 'mapminer',
    projectId: 'bots',
    nodeCount: 22,
    name: { fa: 'ربات جست‌وجوگر تجاری MapMiner Pro', en: 'MapMiner Pro Lead Search' },
    description: {
      fa: 'تحلیل نیاز تجاری کاربر، جست‌وجوی موقعیت جغرافیایی کسب‌وکارها، استخراج مشخصات تماس و تولید فایل اکسل و CSV برای بازاریابی تلفنی',
      en: 'Parses natural language business search queries, geocodes target boundaries, crawls contact details, and exports clean CSV databases'
    },
    steps: [
      { type: 'trigger', labelEn: 'Natural Language Query', labelFa: 'درخواست صنف و شهر در تلگرام' },
      { type: 'ai', labelEn: 'Target Parameter Extraction', labelFa: 'استخراج صنف و مختصات جغرافیایی' },
      { type: 'fetch', labelEn: 'Geocoding Boundary', labelFa: 'تعیین محدوده دقیق شهری' },
      { type: 'fetch', labelEn: 'Places Data Aggregation', labelFa: 'جمع‌آوری مشخصات تماس کسب‌وکارها' },
      { type: 'code', labelEn: 'Deduplicate & Build Sheet', labelFa: 'حذف تکراری‌ها و ساخت جدول اکسل' },
      { type: 'send', labelEn: 'Deliver Excel/CSV File', labelFa: 'ارسال فایل منظم به کاربر' }
    ]
  },
  {
    id: 'taskflow',
    projectId: 'bots',
    nodeCount: 26,
    name: { fa: 'دستیار مدیریت وظایف TaskFlow AI', en: 'TaskFlow Schedule Automation' },
    description: {
      fa: 'تبدیل متن‌های نامنظم و صداهای روزمره به برنامه‌های اجرایی، ذخیره زمان‌بندی و بررسی مداوم هر ۱۵ دقیقه برای یادآوری تعهدات کاری به کاربر',
      en: 'Transforms unstructured voice or text notes into prioritized milestones, checking every 15 minutes to trigger punctual reminders'
    },
    steps: [
      { type: 'trigger', labelEn: 'Voice or Text Message', labelFa: 'دریافت صوت یا متن برنامه کاری' },
      { type: 'ai', labelEn: 'Deconstruct Schedule', labelFa: 'تفکیک تاریخ، ساعت و اولویت کار' },
      { type: 'code', labelEn: 'Store Schedule Draft', labelFa: 'ذخیره در جدول زمان‌بندی' },
      { type: 'logic', labelEn: 'User Confirmation', labelFa: 'تأیید برنامه توسط کاربر' },
      { type: 'fetch', labelEn: '15-Minute Cron Poller', labelFa: 'بررسی خودکار هر ۱۵ دقیقه' },
      { type: 'send', labelEn: 'Dispatch Telegram Alert', labelFa: 'ارسال هشدار انجام کار در موعد' }
    ]
  },
  {
    id: 'tg-vote',
    projectId: 'tecofi',
    nodeCount: 7,
    name: { fa: 'موتور رأی‌گیری تعاملی کانال TECOFi', en: 'TECOFi Interactive Polling Engine' },
    description: {
      fa: 'مدیریت نظرسنجی‌های تحلیلی کانال تلگرام با اطمینان از ثبت دقیق یک رأی به ازای هر کاربر و به‌روزرسانی آنی نتایج روی پست',
      en: 'Manages channel poll engagement with tamper-proof single-vote validation and real-time live message percentage updates'
    },
    steps: [
      { type: 'trigger', labelEn: 'Inline Button Touch', labelFa: 'لمس گزینه در پیام تلگرام' },
      { type: 'fetch', labelEn: 'Query User Record', labelFa: 'استعلام سابقه رأی کاربر در دیتابیس' },
      { type: 'logic', labelEn: 'Fraud & Duplicate Guard', labelFa: 'جلوگیری از ثبت رأی تکراری' },
      { type: 'send', labelEn: 'Save Unique Ballot', labelFa: 'ذخیره رسمی رأی در سیستم ابری' },
      { type: 'code', labelEn: 'Calculate Percentages', labelFa: 'محاسبه درصدهای جدید جامعه آماری' },
      { type: 'send', labelEn: 'Edit Message in Telegram', labelFa: 'به‌روزرسانی پیام کانال در چند میلی‌ثانیه' }
    ]
  }
];

export const BOTS_DATA: BotItem[] = [
  { number: '01', name: 'MapMiner Pro', description: { fa: 'جست‌وجوی خودکار موقعیت و اطلاعات تماس کسب‌وکارها با خروجی منظم اکسل', en: 'Automated business lead crawler with organized spreadsheet output' } },
  { number: '02', name: 'SoulMap Astro', description: { fa: 'محاسبه دقیق چارت و ارسال خودکار پیام‌های تحلیل روزانه راس ساعت ۷ صبح', en: 'Birth chart calculations with scheduled daily morning briefs' } },
  { number: '03', name: 'CoinSeer Pro', description: { fa: 'تحلیل فنی و هوشمند بازارهای مالی با سیستم ارزیابی کارنامه پیش‌بینی‌ها', en: 'Financial market intelligence with scored forecast verification' } },
  { number: '04', name: 'TaskFlow AI', description: { fa: 'برنامه‌ریز امور روزمره با تفکیک هوشمند تسک‌ها و یادآوری منظم هر ۱۵ دقیقه', en: 'Intelligent schedule organizer with 15-minute scheduled reminder alarms' } },
  { number: '05', name: 'Vision Scrape', description: { fa: 'استخراج هوشمند اطلاعات از صفحات وب و تحویل فایل ساختاریافته داده', en: 'Automated web data extraction delivering clean structured data files' } },
  { number: '06', name: 'Site Doctor', description: { fa: 'ممیزی فوری سرعت و سلامت وب‌سایت‌ها از داخل محیط تلگرام برای مدیران', en: 'Instant on-the-go website performance diagnostics inside chat' } },
  { number: '07', name: 'Viral Genius', description: { fa: 'کشف موضوعات داغ و ترند روز و تولید سناریوهای پربازدید شبکه‌های اجتماعی', en: 'Trend detection engine proposing high-impact content blueprints' } },
  { number: '08', name: 'CineMeme', description: { fa: 'تولید محتوای سرگرمی و ایده‌های خلاقانه رسانه‌ای بر اساس ترندهای روز', en: 'Curated entertainment engine generating topical media concepts' } },
  { number: '09', name: 'ByteMeme', description: { fa: 'ربات سرگرمی دنیای برنامه‌نویسی و مهندسی تکنولوژی', en: 'Software engineering culture and entertainment channel bot' } },
  { number: '10', name: 'Xmeme Game', description: { fa: 'ربات تعاملی متنی و اجرای چالش‌های گروهی در تلگرام', en: 'Interactive community challenges and text-based social game bot' } }
];

export const BLUEPRINT_MODULES: ModuleItem[] = [
  { title: { fa: 'پایش مستمر و خودکار قیمت‌ها از فروشگاه‌های معتبر', en: 'Continuous price monitoring across major retailers' }, arezStatus: 'live' },
  { title: { fa: 'سیستم اطلاع‌رسانی ایمیلی افت قیمت و حباب‌سنجی', en: 'Automated price-drop alert and threshold notification system' }, arezStatus: 'live' },
  { title: { fa: 'فهرست علاقه‌مندی‌ها و راهنمایی تحلیلی خرید', en: 'User watchlists and analytical timing advice' }, arezStatus: 'live' },
  { title: { fa: 'تولید خودکار مقالات مجله و ارتقای مداوم سئو', en: 'Autonomous editorial articles and continuous search rankings' }, arezStatus: 'planned' },
  { title: { fa: 'خبرنامه هوشمند اختصاصی فرصت‌های تخفیف', en: 'Automated personalized discount digest' }, arezStatus: 'planned' },
  { title: { fa: 'دستیار هوشمند پاسخگویی به خریداران در سایت', en: 'Autonomous customer advisory and product matching bot' }, arezStatus: 'planned' },
  { title: { fa: 'پایپ‌لاین انتشار خودکار تخفیف‌ها در کانال تلگرام', en: 'Autonomous channel broadcast pipeline' }, arezStatus: 'planned' },
  { title: { fa: 'همگام‌سازی و دسته‌بندی کاتالوگ فروشگاه‌ها', en: 'Continuous catalog indexing and taxonomy normalization' }, arezStatus: 'planned' }
];

export const TECH_STACK = [
  'WordPress اختصاصی و سفارشی',
  'Next.js 15 & React 19',
  'n8n Enterprise Automation',
  'Tailwind CSS',
  'TypeScript',
  'Supabase & PostgreSQL',
  'Resend Email API',
  'Cloudflare CDN',
  'Google Sheets & Workspace APIs',
  'GSAP Animation Suite',
  'Telegram Bot Architecture',
  'Vercel Global Edge Network'
];
