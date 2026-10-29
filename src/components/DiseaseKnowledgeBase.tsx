import React, { useState } from 'react';
import { Search, Filter, BookOpen, Bug, ShieldCheck, ChevronRight, AlertTriangle, ExternalLink } from 'lucide-react';
import { DISEASE_RECORDS, DiseaseRecord } from '../data/plantVillageData';

interface DiseaseKnowledgeBaseProps {
  onSelectSampleFromLibrary?: (crop: string, condition: string) => void;
}

export const DiseaseKnowledgeBase: React.FC<DiseaseKnowledgeBaseProps> = ({ onSelectSampleFromLibrary }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedPathogen, setSelectedPathogen] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(DISEASE_RECORDS[0]?.id || null);

  const crops = ['All', 'Tomato', 'Corn (Maize)', 'Grape', 'Apple', 'Potato', 'Bell Pepper'];
  const pathogenTypes = ['All', 'Fungal', 'Oomycete', 'Bacterial', 'Healthy'];

  const filteredRecords = DISEASE_RECORDS.filter((rec) => {
    const matchesSearch =
      rec.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.canonicalClass.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCrop = selectedCrop === 'All' || rec.crop === selectedCrop;
    const matchesPathogen = selectedPathogen === 'All' || rec.pathogenType === selectedPathogen;

    return matchesSearch && matchesCrop && matchesPathogen;
  });

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-5 border-b border-stone-200 bg-stone-50/70">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-800" />
              <span>PlantVillage Pathological Reference Library</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Verified crop pathology standards, symptom taxonomy, and management protocols from 38 benchmark classes.
            </p>
          </div>
          <span className="text-xs font-mono text-stone-500">
            {filteredRecords.length} Classes Shown
          </span>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop, disease, or pathogen (e.g. Phytophthora, Late Blight)..."
              className="w-full text-xs pl-8 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900 placeholder:text-stone-400 bg-white"
            />
          </div>

          {/* Crop Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            {crops.map((crop) => (
              <button
                key={crop}
                type="button"
                onClick={() => setSelectedCrop(crop)}
                className={`px-2.5 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
                  selectedCrop === crop
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disease Record List */}
      <div className="divide-y divide-stone-200">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            No crop diseases match your current search criteria.
          </div>
        ) : (
          filteredRecords.map((item) => {
            const isExpanded = expandedId === item.id;
            const isHealthy = item.pathogenType === 'Healthy';

            return (
              <div key={item.id} className="transition-colors hover:bg-stone-50/40">
                {/* Collapsible Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-4 cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-semibold ${
                      isHealthy ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isHealthy ? <ShieldCheck className="w-4 h-4" /> : <Bug className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{item.crop}</span>
                        <span className="text-stone-300">·</span>
                        <span className={`text-xs font-medium ${isHealthy ? 'text-emerald-700' : 'text-stone-700'}`}>
                          {item.condition}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-[11px] font-mono text-stone-500">{item.pathogenType}</span>
                      </div>
                      <div className="text-[11px] font-serif italic text-stone-500 truncate">
                        {item.scientificName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-mono text-stone-400">
                      Yield loss risk: {item.typicalLossPercent}
                    </span>
                    <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs border-t border-stone-100 bg-stone-50/30 space-y-4">
                    <p className="text-stone-700 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Symptoms */}
                      <div className="p-3 bg-white border border-stone-200 rounded-lg">
                        <span className="font-semibold text-stone-900 block mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                          Key Symptoms
                        </span>
                        <ul className="space-y-1 text-stone-700">
                          {item.symptoms.map((s, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-700 font-bold">·</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Treatments */}
                      <div className="p-3 bg-white border border-stone-200 rounded-lg space-y-2">
                        <div>
                          <span className="font-semibold text-emerald-900 block font-mono text-[11px] uppercase tracking-wider">
                            Organic & Bio-Control
                          </span>
                          <span className="text-stone-700 text-[11px]">{item.organicTreatment}</span>
                        </div>
                        <div className="pt-2 border-t border-stone-100">
                          <span className="font-semibold text-stone-900 block font-mono text-[11px] uppercase tracking-wider">
                            Chemical Management
                          </span>
                          <span className="text-stone-700 text-[11px] font-mono">{item.chemicalTreatment}</span>
                        </div>
                      </div>
                    </div>

                    {/* Preventative Protocols */}
                    <div className="p-3 bg-white border border-stone-200 rounded-lg">
                      <span className="font-semibold text-stone-900 block mb-1 font-mono text-[11px] uppercase tracking-wider">
                        Preventative Agronomic Protocols
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-stone-600">
                        {item.preventativeMeasures.map((pm, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-stone-400">✓</span>
                            <span>{pm}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
