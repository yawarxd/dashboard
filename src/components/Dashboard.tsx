import React from 'react';
import { BotControlCard } from './BotControlCard';
import { TrendingUp, DollarSign, Target, AlertTriangle } from 'lucide-react';
import { BotStatus } from '../types';

interface DashboardProps {
  botStatus: BotStatus;
  onToggleBot: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ botStatus, onToggleBot }) => {
  const stats = [
    { label: 'Total Trades', value: '147', change: '+12%', icon: TrendingUp, color: 'green' },
    { label: 'Profit/Loss', value: '$2,847.32', change: '+5.2%', icon: DollarSign, color: 'green' },
    { label: 'Win Rate', value: '68.4%', change: '+2.1%', icon: Target, color: 'blue' },
    { label: 'Risk Score', value: 'Medium', change: 'Stable', icon: AlertTriangle, color: 'yellow' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Monitor your trading bot performance and control operations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BotControlCard botStatus={botStatus} onToggle={onToggleBot} />
        </div>
        
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-400/10' :
                  stat.color === 'blue' ? 'bg-blue-400/10' :
                  'bg-yellow-400/10'
                }`}>
                  <stat.icon className={`${
                    stat.color === 'green' ? 'text-green-400' :
                    stat.color === 'blue' ? 'text-blue-400' :
                    'text-yellow-400'
                  }`} size={20} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Trade Executed', symbol: 'BTC/USDT', result: '+$245.67', time: '2 min ago', success: true },
              { action: 'Signal Detected', symbol: 'ETH/USDT', result: 'Processing', time: '5 min ago', success: null },
              { action: 'Trade Executed', symbol: 'ADA/USDT', result: '-$89.43', time: '12 min ago', success: false },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.symbol} · {activity.time}</p>
                </div>
                <span className={`font-semibold ${
                  activity.success === true ? 'text-green-400' :
                  activity.success === false ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {activity.result}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
          <div className="space-y-4">
            {[
              { component: 'Discord Connection', status: 'Connected', health: 'good' },
              { component: 'Exchange API', status: 'Active', health: 'good' },
              { component: 'Signal Processing', status: 'Running', health: 'good' },
              { component: 'Risk Management', status: 'Monitoring', health: 'warning' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">{item.component}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.health === 'good' ? 'bg-green-400' :
                    item.health === 'warning' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`} />
                  <span className="text-sm text-gray-400">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};