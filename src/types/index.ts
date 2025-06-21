export interface BotStatus {
  isRunning: boolean;
  lastUpdate: Date;
}

export interface DiscordSettings {
  email: string;
  password: string;
  channelUrl: string;
}

export interface TradingSettings {
  riskAmount: number;
  riskRewardRatio: string;
}

export interface ApiSettings {
  apiKey: string;
  apiSecret: string;
}

export interface SignalKeywords {
  entry: string;
  stopLoss: string;
  takeProfit: string;
  closeTrade: string;
}

export interface AssetMapping {
  id: string;
  discordAsset: string;
  exchangeTicker: string;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  category: string;
}

export type ActivePage = 'dashboard' | 'settings' | 'logs';
export type SettingsTab = 'discord' | 'trading' | 'api' | 'keywords' | 'mappings';