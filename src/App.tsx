import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BotLogs } from './components/BotLogs';
import { DiscordSettingsComponent } from './components/settings/DiscordSettings';
import { TradingSettingsComponent } from './components/settings/TradingSettings';
import { ApiSettingsComponent } from './components/settings/ApiSettings';
import { SignalKeywordsComponent } from './components/settings/SignalKeywords';
import { AssetMappingsComponent } from './components/settings/AssetMappings';
import {
  BotStatus,
  DiscordSettings,
  TradingSettings,
  ApiSettings,
  SignalKeywords,
  AssetMapping,
  LogEntry,
  ActivePage,
  SettingsTab
} from './types';

function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>('discord');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Bot status state
  const [botStatus, setBotStatus] = useState<BotStatus>({
    isRunning: false,
    lastUpdate: new Date(),
  });

  // Settings states
  const [discordSettings, setDiscordSettings] = useState<DiscordSettings>({
    email: '',
    password: '',
    channelUrl: '',
  });

  const [tradingSettings, setTradingSettings] = useState<TradingSettings>({
    riskAmount: 100,
    riskRewardRatio: '1:2',
  });

  const [apiSettings, setApiSettings] = useState<ApiSettings>({
    apiKey: '',
    apiSecret: '',
  });

  const [signalKeywords, setSignalKeywords] = useState<SignalKeywords>({
    entry: 'buy, long, entry, open',
    stopLoss: 'stop loss, sl, stop',
    takeProfit: 'take profit, tp, target',
    closeTrade: 'close, exit, sell',
  });

  const [assetMappings, setAssetMappings] = useState<AssetMapping[]>([
    { id: '1', discordAsset: 'Bitcoin', exchangeTicker: 'BTCUSDT' },
    { id: '2', discordAsset: 'Ethereum', exchangeTicker: 'ETHUSDT' },
    { id: '3', discordAsset: 'Cardano', exchangeTicker: 'ADAUSDT' },
  ]);

  // Sample log entries
  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      level: 'success',
      message: 'Trade executed successfully: BTC/USDT Long position opened at $43,250',
      category: 'Trading'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      level: 'info',
      message: 'Signal detected in Discord channel: Entry signal for ETH/USDT',
      category: 'Signal Processing'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      level: 'warning',
      message: 'Risk threshold approaching: Current exposure at 85% of maximum',
      category: 'Risk Management'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 1000 * 60 * 18),
      level: 'error',
      message: 'Failed to connect to exchange API: Rate limit exceeded',
      category: 'API Connection'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      level: 'info',
      message: 'Bot started successfully. All systems operational.',
      category: 'System'
    },
  ]);

  const handleToggleBot = () => {
    setBotStatus(prev => ({
      isRunning: !prev.isRunning,
      lastUpdate: new Date(),
    }));
  };

  const renderSettingsContent = () => {
    switch (activeSettingsTab) {
      case 'discord':
        return <DiscordSettingsComponent settings={discordSettings} onSave={setDiscordSettings} />;
      case 'trading':
        return <TradingSettingsComponent settings={tradingSettings} onSave={setTradingSettings} />;
      case 'api':
        return <ApiSettingsComponent settings={apiSettings} onSave={setApiSettings} />;
      case 'keywords':
        return <SignalKeywordsComponent settings={signalKeywords} onSave={setSignalKeywords} />;
      case 'mappings':
        return <AssetMappingsComponent mappings={assetMappings} onSave={setAssetMappings} />;
      default:
        return <DiscordSettingsComponent settings={discordSettings} onSave={setDiscordSettings} />;
    }
  };

  const renderMainContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard botStatus={botStatus} onToggleBot={handleToggleBot} />;
      case 'settings':
        return renderSettingsContent();
      case 'logs':
        return <BotLogs logs={logs} />;
      default:
        return <Dashboard botStatus={botStatus} onToggleBot={handleToggleBot} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 font-sans">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        activeSettingsTab={activeSettingsTab}
        setActiveSettingsTab={setActiveSettingsTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <main className="flex-1 overflow-auto lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">TradingBot Pro</h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>
        
        <div className="p-4 lg:p-8">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}

export default App;