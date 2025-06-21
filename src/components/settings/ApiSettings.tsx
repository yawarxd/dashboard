import React, { useState } from 'react';
import { Key, Check, EyeOff, Eye } from 'lucide-react';
import { ApiSettings } from '../../types';

interface ApiSettingsProps {
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

export const ApiSettingsComponent: React.FC<ApiSettingsProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState<ApiSettings>(settings);
  const [showSecret, setShowSecret] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-400/10 rounded-lg">
          <Key className="text-yellow-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">API Credentials</h2>
          <p className="text-gray-400 text-sm">Configure your exchange API credentials for trading</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            API Key
          </label>
          <input
            type="text"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors font-mono text-sm"
            placeholder="Enter your API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            API Secret
          </label>
          <div className="relative">
            <input
              type={showSecret ? 'text' : 'password'}
              value={formData.apiSecret}
              onChange={(e) => setFormData({ ...formData, apiSecret: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors font-mono text-sm pr-12"
              placeholder="Enter your API secret"
            />
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showSecret ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-black text-xs font-bold">!</span>
            </div>
            <div>
              <h4 className="text-yellow-400 font-medium mb-1">Security Notice</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your API credentials are stored securely and encrypted. Never share these credentials with anyone. 
                Ensure your API key has only the necessary permissions for trading.
              </p>
            </div>
          </div>
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
            'Save API Credentials'
          )}
        </button>
      </div>
    </div>
  );
};