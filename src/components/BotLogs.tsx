import React, { useState } from 'react';
import { FileText, Filter, Download, Search } from 'lucide-react';
import { LogEntry } from '../types';

interface BotLogsProps {
  logs: LogEntry[];
}

export const BotLogs: React.FC<BotLogsProps> = ({ logs }) => {
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400 bg-red-400/10';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10';
      case 'success': return 'text-green-400 bg-green-400/10';
      default: return 'text-blue-400 bg-blue-400/10';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return '⚠️';
      case 'warning': return '⚡';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Bot Logs</h1>
        <p className="text-gray-400">Monitor your trading bot's activity and debug issues</p>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
            />
          </div>
          
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-3 bg-green-400 hover:bg-green-500 text-gray-900 rounded-xl font-medium transition-colors">
            <Download size={20} />
            Export
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>No logs found matching your criteria</p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/75 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{getLevelIcon(log.level)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(log.level)}`}>
                        {log.level.toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-xs">{log.category}</span>
                      <span className="text-gray-500 text-xs ml-auto">
                        {log.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-200 text-sm break-words">{log.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};