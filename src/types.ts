export type Language = 'fa' | 'en';

export interface LocalizedString {
  fa: string;
  en: string;
}

export interface LocalizedArray {
  fa: string[];
  en: string[];
}

export type StepType = 'trigger' | 'fetch' | 'logic' | 'code' | 'ai' | 'send';

export interface WorkflowStep {
  type: StepType;
  labelEn: string;
  labelFa: string;
}

export interface WorkflowItem {
  id: string;
  projectId: string;
  nodeCount: number;
  name: LocalizedString;
  description: LocalizedString;
  steps: WorkflowStep[];
}

export interface ProjectFact {
  label: LocalizedString;
  value: LocalizedString;
}

export interface ProjectItem {
  id: string;
  type: 'web' | 'telegram' | 'product';
  name: LocalizedString;
  kicker: LocalizedString;
  url: string;
  host: string;
  hue: string;
  summary: LocalizedString;
  built: LocalizedArray;
  facts: ProjectFact[];
  tags: string[];
  flows: string[];
  metric: {
    value: number | string;
    label: LocalizedString;
  };
}

export interface BotItem {
  number: string;
  name: string;
  description: LocalizedString;
}

export interface ModuleItem {
  title: LocalizedString;
  arezStatus: 'live' | 'planned';
}

export type ProjectStage = 
  | 'brief_submitted'      // بریف ارسال شده
  | 'consultation_scheduled' // جلسه بررسی و نیازسنجی
  | 'contract_issued'       // قرارداد دیجیتال و پیش‌فاکتور صادر شده
  | 'in_development'        // در حال توسعه و کدنویسی
  | 'automation_sync'       // تست اتوماسیون و استقرار
  | 'completed';            // تحویل نهایی و پشتیبانی

export interface MilestoneItem {
  title: LocalizedString;
  amount: string;
  status: 'paid' | 'pending' | 'ready';
  dueText: LocalizedString;
}

export interface DigitalContract {
  contractNumber: string;
  scopeOfWork: LocalizedString;
  deliverables: LocalizedArray;
  timelineDays: number;
  totalCost: string;
  depositAmount: string;
  signedAt?: string;
  signerName?: string;
  isSigned: boolean;
  milestones: MilestoneItem[];
}

export interface BookingRequest {
  id: string;
  createdAt: string;
  serviceType: string;
  serviceSubType?: string;
  selectedFeatures?: string[];
  clientName: string;
  email: string;
  contactNumber: string;
  preferredChannel: 'whatsapp' | 'telegram' | 'phone' | 'google_meet';
  preferredTime: string;
  targetMarket: 'iran' | 'canada' | 'global';
  estimatedBudget: string;
  projectDescription: string;
  status: 'pending' | 'reviewing' | 'contract_ready' | 'active';
  contract?: DigitalContract;
}
