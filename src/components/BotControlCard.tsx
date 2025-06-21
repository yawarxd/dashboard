import React from 'react';
import { Play, Square, Activity } from 'lucide-react';
import { BotStatus } from '../types';

interface BotControlCardProps {
  botStatus: BotStatus;
  onToggle: () => void;
}

export const BotControlCard: React.FC<BotControlCardProps> = ({ botStatus, onToggle }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="text-green-400" size={24} />
          Bot Control
        </h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          botStatus.isRunning 
            ? 'bg-green-400/10 text-green-400 border border-green-400/20' 
            : 'bg-red-400/10 text-red-400 border border-red-400/20'
        }`}>
          {botStatus.isRunning ? 'Running' : 'Stopped'}
        </div>
      </div>

      <div className="text-center">
        <div className="mb-4">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
            botStatus.isRunning 
              ? 'bg-green-400/10 border-2 border-green-400/30' 
              : 'bg-red-400/10 border-2 border-red-400/30'
          }`}>
            {botStatus.isRunning ? (
              <Activity className="text-green-400 animate-pulse" size={32} />
            ) : (
              <Square className="text-red-400" size={32} />
            )}
          </div>
          <p className="text-gray-300 text-sm">
            Last updated: {botStatus.lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        <button
          onClick={onToggle}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
            botStatus.isRunning
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/25'
              : 'bg-green-400 hover:bg-green-500 text-gray-900 shadow-lg hover:shadow-green-400/25'
          }`}
        >
          {botStatus.isRunning ? (
            <span className="flex items-center justify-center gap-2">
              <Square size={20} />
              Stop Bot
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Play size={20} />
              Start Bot
            </span>
          )}
        </button>
      </div>
    </div>
  );
};