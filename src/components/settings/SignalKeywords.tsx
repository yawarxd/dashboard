import React, { useState } from 'react';
import { Hash, Check } from 'lucide-react';
import { SignalKeywords } from '../../types';

interface SignalKeywordsProps {
  settings: SignalKeywords;
  onSave: (settings: SignalKeywords) => void;
}

export const SignalKeywordsComponent: React.FC<SignalKeywordsProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState<SignalKeywords>(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-400/10 rounded-lg">
          <Hash className="text-purple-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Signal Keywords</h2>
          <p className="text-gray-400 text-sm">Configure keywords that trigger trading actions</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Entry Keywords
          </label>
          <input
            type="text"
            value={formData.entry}
            onChange={(e) => setFormData({ ...formData, entry: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
            placeholder="buy, long, entry, open"
          />
          <p className="text-gray-500 text-xs mt-1">Comma-separated keywords that signal trade entry</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Stop Loss Keywords
          </label>
          <input
            type="text"
            value={formData.stopLoss}
            onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
            placeholder="stop loss, sl, stop"
          />
          <p className="text-gray-500 text-xs mt-1">Keywords that indicate stop loss levels</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Take Profit Keywords
          </label>
          <input
            type="text"
            value={formData.takeProfit}
            onChange={(e) => setFormData({ ...formData, takeProfit: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
            placeholder="take profit, tp, target"
          />
          <p className="text-gray-500 text-xs mt-1">Keywords that indicate profit targets</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Close Trade Keywords
          </label>
          <input
            type="text"
            value={formData.closeTrade}
            onChange={(e) => setFormData({ ...formData, closeTrade: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
            placeholder="close, exit, sell"
          />
          <p className="text-gray-500 text-xs mt-1">Keywords that signal trade closure</p>
        </div>

        <div className="bg-gray-700/50 rounded-xl p-4">
          <h4 className="text-white font-medium mb-3">Keyword Preview</h4>
          <div className="space-y-2 text-sm">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="flex flex-wrap gap-1">
                <span className="text-gray-400 capitalize min-w-20">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <div className="flex flex-wrap gap-1">
                  {value.split(',').map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-600 rounded text-xs text-gray-200">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
            'Save Signal Keywords'
          )}
        </button>
      </div>
    </div>
  );
};