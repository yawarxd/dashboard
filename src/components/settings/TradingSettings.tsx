import React, { useState } from 'react';
import { TrendingUp, Check } from 'lucide-react';
import { TradingSettings } from '../../types';

interface TradingSettingsProps {
  settings: TradingSettings;
  onSave: (settings: TradingSettings) => void;
}

export const TradingSettingsComponent: React.FC<TradingSettingsProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState<TradingSettings>(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-400/10 rounded-lg">
          <TrendingUp className="text-green-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Trading Configuration</h2>
          <p className="text-gray-400 text-sm">Configure your trading parameters and risk management</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Risk Amount ($)
          </label>
          <input
            type="number"
            value={formData.riskAmount}
            onChange={(e) => setFormData({ ...formData, riskAmount: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
            placeholder="100"
            min="0"
            step="0.01"
          />
          <p className="text-gray-500 text-xs mt-1">Maximum amount to risk per trade</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Risk/Reward Ratio
          </label>
          <select
            value={formData.riskRewardRatio}
            onChange={(e) => setFormData({ ...formData, riskRewardRatio: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
          >
            <option value="1:1">1:1 (Conservative)</option>
            <option value="1:2">1:2 (Balanced)</option>
            <option value="1:3">1:3 (Aggressive)</option>
            <option value="2:3">2:3 (Custom)</option>
          </select>
          <p className="text-gray-500 text-xs mt-1">Risk to reward ratio for each trade</p>
        </div>

        <div className="bg-gray-700/50 rounded-xl p-4">
          <h4 className="text-white font-medium mb-2">Risk Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Max Risk per Trade:</span>
              <span className="text-white">${formData.riskAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Risk/Reward Ratio:</span>
              <span className="text-white">{formData.riskRewardRatio}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Expected Profit:</span>
              <span className="text-green-400">
                ${(formData.riskAmount * parseFloat(formData.riskRewardRatio.split(':')[1])).toFixed(2)}
              </span>
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
            'Save Trading Settings'
          )}
        </button>
      </div>
    </div>
  );
};