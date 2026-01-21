
export enum AppTab {
  DASHBOARD = 'dashboard',
  AI_LAB = 'ai_lab',
  SCRIPT_EXPORT = 'script_export'
}

export interface AutomationResult {
  transcript: string;
  summary: string;
  businessPlan: string;
  ghlNote: string;
}

export interface GHLConfig {
  apiKey: string;
  zoomWebhookSecret: string;
  targetLocationId: string;
}
