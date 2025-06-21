import React, { useState } from 'react';
import { Eye, EyeOff, MessageSquare, Check } from 'lucide-react';
import { DiscordSettings } from '../../types';

interface DiscordSettingsProps {
  settings: DiscordSettings;
  onSave: (settings: DiscordSettings) => void;
}

export const DiscordSettingsComponent: React.FC<DiscordSettingsProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState<DiscordSettings>(settings);
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-400/10 rounded-lg">
          <MessageSquare className="text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Discord Configuration</h2>
          <p className="text-gray-400 text-sm">Connect your bot to Discord for signal monitoring</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors pr-12"
              placeholder="Your Discord password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Channel URL
          </label>
          <input
            type="url"
            value={formData.channelUrl}
            onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
            placeholder="https://discord.com/channels/..."
          />
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-green-400 hover:bg-green-500 text-gray-900 hover:shadow-lg hover:shadow-green-400/25'
          }`}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={20} />
              Saved Successfully
            </span>
          ) : (
            'Save Discord Settings'
          )}
        </button>
      </div>
    </div>
  );
};