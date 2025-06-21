import React, { useState } from 'react';
import { Map, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { AssetMapping } from '../../types';

interface AssetMappingsProps {
  mappings: AssetMapping[];
  onSave: (mappings: AssetMapping[]) => void;
}

export const AssetMappingsComponent: React.FC<AssetMappingsProps> = ({ mappings, onSave }) => {
  const [localMappings, setLocalMappings] = useState<AssetMapping[]>(mappings);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMapping, setNewMapping] = useState({ discordAsset: '', exchangeTicker: '' });

  const handleAddMapping = () => {
    if (newMapping.discordAsset && newMapping.exchangeTicker) {
      const mapping: AssetMapping = {
        id: Date.now().toString(),
        discordAsset: newMapping.discordAsset,
        exchangeTicker: newMapping.exchangeTicker,
      };
      const updatedMappings = [...localMappings, mapping];
      setLocalMappings(updatedMappings);
      onSave(updatedMappings);
      setNewMapping({ discordAsset: '', exchangeTicker: '' });
      setShowAddForm(false);
    }
  };

  const handleEditMapping = (id: string, updatedMapping: Partial<AssetMapping>) => {
    const updatedMappings = localMappings.map(mapping =>
      mapping.id === id ? { ...mapping, ...updatedMapping } : mapping
    );
    setLocalMappings(updatedMappings);
    onSave(updatedMappings);
    setEditingId(null);
  };

  const handleDeleteMapping = (id: string) => {
    const updatedMappings = localMappings.filter(mapping => mapping.id !== id);
    setLocalMappings(updatedMappings);
    onSave(updatedMappings);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-400/10 rounded-lg">
            <Map className="text-orange-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Asset Mappings</h2>
            <p className="text-gray-400 text-sm">Map Discord asset names to exchange tickers</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-500 text-gray-900 rounded-lg font-medium transition-colors"
        >
          <Plus size={16} />
          Add Mapping
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
          <h4 className="text-white font-medium mb-3">Add New Mapping</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Discord Asset (e.g., Bitcoin)"
              value={newMapping.discordAsset}
              onChange={(e) => setNewMapping({ ...newMapping, discordAsset: e.target.value })}
              className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
            />
            <input
              type="text"
              placeholder="Exchange Ticker (e.g., BTCUSDT)"
              value={newMapping.exchangeTicker}
              onChange={(e) => setNewMapping({ ...newMapping, exchangeTicker: e.target.value })}
              className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAddMapping}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-400 hover:bg-green-500 text-gray-900 rounded-lg text-sm font-medium transition-colors"
            >
              <Check size={14} />
              Add
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewMapping({ discordAsset: '', exchangeTicker: '' });
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Discord Asset</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Exchange Ticker</th>
              <th className="text-center py-3 px-4 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localMappings.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-400">
                  No asset mappings configured. Add your first mapping to get started.
                </td>
              </tr>
            ) : (
              localMappings.map((mapping) => (
                <tr key={mapping.id} className="border-b border-gray-700/50 hover:bg-gray-700/25 transition-colors">
                  <td className="py-3 px-4">
                    {editingId === mapping.id ? (
                      <input
                        type="text"
                        defaultValue={mapping.discordAsset}
                        onBlur={(e) => handleEditMapping(mapping.id, { discordAsset: e.target.value })}
                        className="px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-green-400"
                        autoFocus
                      />
                    ) : (
                      <span className="text-white">{mapping.discordAsset}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editingId === mapping.id ? (
                      <input
                        type="text"
                        defaultValue={mapping.exchangeTicker}
                        onBlur={(e) => handleEditMapping(mapping.id, { exchangeTicker: e.target.value })}
                        className="px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-green-400"
                      />
                    ) : (
                      <span className="text-gray-300 font-mono">{mapping.exchangeTicker}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setEditingId(editingId === mapping.id ? null : mapping.id)}
                        className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteMapping(mapping.id)}
                        className="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};