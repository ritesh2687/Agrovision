import React from 'react';
import { History, Trash2, ChevronRight, ShieldCheck, AlertTriangle, Calendar } from 'lucide-react';
import { DiagnosisData } from './DiagnosisResult';

interface ScanHistoryProps {
  history: DiagnosisData[];
  onSelectHistoryItem: (item: DiagnosisData) => void;
  onClearHistory: () => void;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
      <div className="px-5 py-3.5 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-800" />
          <h2 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono">
            Recent Field Scans ({history.length})
          </h2>
        </div>
        <button
          type="button"
          onClick={onClearHistory}
          className="text-[11px] text-stone-500 hover:text-rose-600 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto">
        {history.map((item, idx) => {
          const isHealthy = item.condition.toLowerCase().includes('healthy');
          const timeStr = item.timestamp
            ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : 'Just now';

          return (
            <div
              key={idx}
              onClick={() => onSelectHistoryItem(item)}
              className="p-3.5 flex items-center justify-between gap-3 hover:bg-stone-50/80 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-md bg-stone-100 overflow-hidden border border-stone-200 shrink-0 flex items-center justify-center">
                  {item.leafImage ? (
                    <img src={item.leafImage} alt={item.condition} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-[9px] text-stone-400 font-mono">IMG</div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900 truncate">{item.crop}</span>
                    <span className="text-stone-300">·</span>
                    <span className={`text-xs font-medium truncate ${isHealthy ? 'text-emerald-700' : 'text-stone-700'}`}>
                      {item.condition}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                    <span>{timeStr}</span>
                    <span className="text-stone-300">·</span>
                    <span>{item.confidence.toFixed(1)}% conf</span>
                    <span className="text-stone-300">·</span>
                    <span className="truncate">{item.severity}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isHealthy ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
