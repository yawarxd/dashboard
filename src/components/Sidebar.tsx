import React, { useState } from 'react';
import { 
  BarChart3, 
  Settings, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  MessageSquare,
  TrendingUp,
  Key,
  Hash,
  Map,
  X
} from 'lucide-react';
import { ActivePage, SettingsTab } from '../types';

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  activeSettingsTab: SettingsTab;
  setActiveSettingsTab: (tab: SettingsTab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  activeSettingsTab,
  setActiveSettingsTab,
  isOpen,
  onClose
}) => {
  const [settingsExpanded, setSettingsExpanded] = useState(activePage === 'settings');

  const handleSettingsClick = () => {
    setSettingsExpanded(!settingsExpanded);
    if (!settingsExpanded) {
      setActivePage('settings');
    }
  };

  const handleSettingsTabClick = (tab: SettingsTab) => {
    setActiveSettingsTab(tab);
    setActivePage('settings');
    setSettingsExpanded(true);
  };

  const handlePageClick = (page: ActivePage) => {
    setActivePage(page);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const settingsItems = [
    { id: 'discord' as SettingsTab, label: 'Discord', icon: MessageSquare },
    { id: 'trading' as SettingsTab, label: 'Trading', icon: TrendingUp },
    { id: 'api' as SettingsTab, label: 'API Credentials', icon: Key },
    { id: 'keywords' as SettingsTab, label: 'Signal Keywords', icon: Hash },
    { id: 'mappings' as SettingsTab, label: 'Asset Mappings', icon: Map },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 border-r border-gray-800 h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-green-400" size={24} />
            TradingBot Pro
          </h1>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => handlePageClick('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activePage === 'dashboard'
                ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <BarChart3 size={20} />
            <span className="font-medium">Dashboard</span>
          </button>

          <div>
            <button
              onClick={handleSettingsClick}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activePage === 'settings'
                  ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Settings size={20} />
              <span className="font-medium flex-1 text-left">Settings</span>
              {settingsExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {settingsExpanded && (
              <div className="ml-4 mt-2 space-y-1">
                {settingsItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleSettingsTabClick(item.id);
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                      activePage === 'settings' && activeSettingsTab === item.id
                        ? 'bg-green-400/10 text-green-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handlePageClick('logs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activePage === 'logs'
                ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FileText size={20} />
            <span className="font-medium">Bot Logs</span>
          </button>
        </nav>
      </div>
    </>
  );
};