import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Bug, Sparkles, Layers, Volume2, Printer, CheckCircle2, ChevronRight, BarChart3, Clock, Compass, FileText } from 'lucide-react';

export interface DiagnosisData {
  crop: string;
  condition: string;
  scientificName: string;
  canonicalClass: string;
  confidence: number;
  uncertaintyWarning: boolean;
  severity: string;
  biologicalCause: string;
  visualSymptoms: string[];
  topAlternativePredictions: Array<{ label: string; confidence: number }>;
  immediateActions: string[];
  organicTreatment: string;
  chemicalTreatment: string;
  preventionProtocol: string[];
  weatherSusceptibility: string;
  multilingualSummaries: {
    hindi: string;
    punjabi: string;
    spanish: string;
  };
  symptomHotspots: Array<{ x: number; y: number; radius: number; label: string }>;
  engine?: string;
  timestamp?: string;
  leafImage?: string;
}

interface DiagnosisResultProps {
  data: DiagnosisData;
  onAskAgronomist: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ data, onAskAgronomist }) => {
  const [activeTab, setActiveTab] = useState<'treatment' | 'symptoms' | 'probabilities' | 'prevention'>('treatment');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'pa' | 'es'>('en');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const isHealthy = data.condition.toLowerCase().includes('healthy');
  const isUncertain = data.uncertaintyWarning || data.confidence < 70;

  // Print Report Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs print:shadow-none print:border-none">
      {/* Top Telemetry / Status Ribbon */}
      <div className="px-6 py-4 border-b border-stone-200 bg-stone-50/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isHealthy ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
            {isHealthy ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">Classification Result</span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-mono text-stone-600">{data.canonicalClass}</span>
            </div>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <span>{data.crop}</span>
              <span className="text-stone-400 font-normal">/</span>
              <span className={isHealthy ? 'text-emerald-700' : 'text-amber-800'}>{data.condition}</span>
            </h1>
          </div>
        </div>

        {/* Confidence Metric & Language Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">Prediction Confidence</div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
              {data.confidence.toFixed(1)}<span className="text-xs text-stone-500 font-normal ml-0.5">%</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="p-2 text-xs text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors print:hidden"
            title="Print or Save Diagnostic Summary"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Uncertainty Notice (Project Scope: Transparent Uncertainty Threshold Handling) */}
      {isUncertain && (
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Uncertainty Notice (&lt;70% threshold):</strong> Confidence is below the definitive threshold. Inspect leaf underside, verify lighting, or re-capture closer to the lesion.
            </span>
          </div>
          <span className="px-2 py-0.5 bg-amber-200/80 rounded font-mono text-[11px] shrink-0">Scout Inspection Advised</span>
        </div>
      )}

      {/* Regional Language Advisory Banner (Presentation Slide 10: Multilingual Support) */}
      <div className="px-6 py-2.5 bg-stone-100/70 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-stone-600 font-medium">
          <Compass className="w-3.5 h-3.5 text-stone-500" />
          <span>Regional Language Translation:</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSelectedLanguage('en')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${selectedLanguage === 'en' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:text-stone-900'}`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setSelectedLanguage('hi')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${selectedLanguage === 'hi' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:text-stone-900'}`}
          >
            हिन्दी (Hindi)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLanguage('pa')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${selectedLanguage === 'pa' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:text-stone-900'}`}
          >
            ਪੰਜਾਬੀ (Punjabi)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLanguage('es')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${selectedLanguage === 'es' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Español
          </button>
        </div>
      </div>

      {/* Multilingual Advisory Box if non-English selected */}
      {selectedLanguage !== 'en' && (
        <div className="px-6 py-3 bg-emerald-50/70 border-b border-emerald-200 text-emerald-950 text-xs leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">
              {selectedLanguage === 'hi' && "किसान परामर्श (Hindi Summary): "}
              {selectedLanguage === 'pa' && "ਕਿਸਾਨ ਸਲਾਹ (Punjabi Summary): "}
              {selectedLanguage === 'es' && "Resumen Agronómico (Spanish Summary): "}
            </span>
            <span>
              {selectedLanguage === 'hi' && data.multilingualSummaries.hindi}
              {selectedLanguage === 'pa' && data.multilingualSummaries.punjabi}
              {selectedLanguage === 'es' && data.multilingualSummaries.spanish}
            </span>
          </div>
        </div>
      )}

      {/* Main Grid: Visual Analysis Stage + Diagnostics Panel */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Leaf Inspection & Attention Heatmap (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-900 relative">
            <div className="aspect-square relative flex items-center justify-center bg-stone-950">
              {data.leafImage ? (
                <img
                  src={data.leafImage}
                  alt="Diagnosed crop leaf"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">
                  Leaf image captured
                </div>
              )}

              {/* Grad-CAM / Attention Hotspots Overlay */}
              {showHeatmap && data.symptomHotspots && data.symptomHotspots.length > 0 && (
                <div className="absolute inset-0 pointer-events-auto">
                  {data.symptomHotspots.map((spot, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                      style={{
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        width: `${Math.max(spot.radius * 2, 28)}px`,
                        height: `${Math.max(spot.radius * 2, 28)}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`absolute rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        activeHotspot === idx
                          ? 'border-amber-400 bg-amber-500/40 ring-4 ring-amber-400/40 z-20'
                          : 'border-rose-400 bg-rose-500/25 hover:border-amber-400 hover:bg-amber-400/30'
                      }`}
                      title={spot.label}
                    >
                      <span className="w-2 h-2 rounded-full bg-white shadow-xs"></span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Heatmap Toggle & Hotspot Legend */}
            <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-xs text-stone-300">
              <button
                type="button"
                onClick={() => setShowHeatmap(!showHeatmap)}
                className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{showHeatmap ? 'Hide Feature Heatmap' : 'Show Feature Heatmap'}</span>
              </button>
              <span className="text-[11px] font-mono text-stone-400">
                {data.symptomHotspots?.length || 0} attention markers
              </span>
            </div>
          </div>

          {/* Active Hotspot Callout */}
          {activeHotspot !== null && data.symptomHotspots[activeHotspot] && (
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs">
              <span className="font-semibold text-stone-900">Marker #{activeHotspot + 1}: </span>
              <span className="text-stone-700">{data.symptomHotspots[activeHotspot].label}</span>
            </div>
          )}

          {/* Key Parameters Matrix */}
          <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 space-y-3">
            <h2 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono">
              Diagnostic Telemetry
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block text-[11px]">Scientific Name</span>
                <span className="font-serif italic font-medium text-stone-900">{data.scientificName}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Biological Agent</span>
                <span className="font-medium text-stone-900">{data.biologicalCause}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Severity Index</span>
                <span className="font-medium text-stone-900">{data.severity}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Inference Engine</span>
                <span className="font-mono text-[11px] text-stone-700">{data.engine || 'MobileNetV2'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Treatment & Advisory Tabs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Segmented Tab Controls */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 print:hidden">
            <button
              type="button"
              onClick={() => setActiveTab('treatment')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'treatment' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Management & Advisory
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('symptoms')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'symptoms' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Symptoms & Weather
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('probabilities')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'probabilities' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Softmax Distribution
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('prevention')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'prevention' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Field Prevention
            </button>
          </div>

          {/* TAB 1: Treatment & Field Advisory */}
          {activeTab === 'treatment' && (
            <div className="space-y-4">
              {/* Immediate Field Action */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
                <div className="flex items-center gap-2 mb-2 text-rose-900 font-semibold text-xs uppercase tracking-wider font-mono">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Immediate Field Quarantine Steps</span>
                </div>
                <ul className="space-y-1.5 text-xs text-rose-950 leading-relaxed">
                  {data.immediateActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">·</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organic / Biological Controls */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
                <div className="flex items-center gap-2 mb-1.5 text-emerald-900 font-semibold text-xs uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Organic & Biological Advisory</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {data.organicTreatment}
                </p>
              </div>

              {/* Chemical Treatment & Dosage */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70">
                <div className="flex items-center gap-2 mb-1.5 text-stone-900 font-semibold text-xs uppercase tracking-wider font-mono">
                  <FileText className="w-4 h-4 text-stone-700" />
                  <span>Chemical Advisory & Exact Dosage</span>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed font-mono">
                  {data.chemicalTreatment}
                </p>
              </div>

              {/* Consult Agronomist Action */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-100 print:hidden">
                <span className="text-xs text-stone-500">Need specific spraying timetable or tank mixing advice?</span>
                <button
                  type="button"
                  onClick={onAskAgronomist}
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  Ask Agronomy Assistant
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Symptoms & Weather */}
          {activeTab === 'symptoms' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-stone-200 bg-white">
                <h2 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono mb-2.5">
                  Pathological Symptoms Observed
                </h2>
                <ul className="space-y-2 text-xs text-stone-700">
                  {data.visualSymptoms.map((symp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{symp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60">
                <h2 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono mb-1.5">
                  Microclimate & Weather Sensitivity
                </h2>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {data.weatherSusceptibility}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Softmax Probabilities (Matching Presentation & Notebook) */}
          {activeTab === 'probabilities' && (
            <div className="space-y-4 p-4 rounded-xl border border-stone-200 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono">
                  MobileNetV2 Softmax Predictions
                </h2>
                <span className="text-[11px] text-stone-500 font-mono">Sum = 100%</span>
              </div>

              {/* Primary prediction */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900">{data.crop} - {data.condition} (Top-1)</span>
                  <span className="font-mono font-bold text-stone-900">{data.confidence.toFixed(1)}%</span>
                </div>
                <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${Math.min(data.confidence, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Alternative predictions */}
              <div className="space-y-3 pt-3 border-t border-stone-100">
                <span className="text-[11px] text-stone-500 font-mono">Differential Top Competitors:</span>
                {data.topAlternativePredictions && data.topAlternativePredictions.map((alt, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-stone-600">
                      <span>{alt.label}</span>
                      <span className="font-mono tabular-nums">{alt.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-stone-400 rounded-full"
                        style={{ width: `${Math.min(alt.confidence * 4, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Prevention Protocol */}
          {activeTab === 'prevention' && (
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
              <h2 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono">
                Long-Term Cultural & Agronomic Prevention
              </h2>
              <ul className="space-y-2 text-xs text-stone-700">
                {data.preventionProtocol.map((protocol, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5"></span>
                    <span>{protocol}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
