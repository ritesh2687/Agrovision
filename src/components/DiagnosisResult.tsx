import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Bug, Sparkles, Layers, Volume2, VolumeX, Pause, Printer, CheckCircle2, ChevronRight, BarChart3, Clock, Compass, FileText, Bot } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

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
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  onAskAgronomist: () => void;
  onOpenVoiceAssistant?: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  data,
  currentLanguage = 'en',
  onLanguageChange,
  onAskAgronomist,
  onOpenVoiceAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<'treatment' | 'symptoms' | 'probabilities' | 'prevention'>('treatment');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Audio Playback state for Voice Readout
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = TRANSLATIONS[currentLanguage].result;
  const isHealthy = data.condition.toLowerCase().includes('healthy');
  const isUncertain = data.uncertaintyWarning || data.confidence < 70;

  // Cleanup audio on unmount or new diagnosis
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [data]);

  // Construct spoken summary text based on active language
  const getSpokenSummary = (lang: Language): string => {
    if (lang === 'hi') {
      return `फसल रोग निदान परिणाम: यह ${data.crop} की पत्ती है। पहचाना गया रोग: ${data.condition}। भविष्यवाणी सटीकता: ${data.confidence.toFixed(1)} प्रतिशत। ${
        isHealthy
          ? "पौधा पूरी तरह स्वस्थ है। किसी कीटनाशक की आवश्यकता नहीं है।"
          : `गंभीरता स्तर: ${data.severity}। तुरंत कदम: ${data.immediateActions[0] || 'प्रभावित पत्तियों को अलग करें'}। रासायनिक उपचार: ${data.chemicalTreatment}। जैविक उपचार: ${data.organicTreatment}`
      }`;
    } else if (lang === 'pa') {
      return `ਫਸਲ ਬਿਮਾਰੀ ਨਿਦਾਨ: ਇਹ ${data.crop} ਦੀ ਫਸਲ ਹੈ। ਰੋਗ: ${data.condition}। ਸ਼ੁੱਧਤਾ: ${data.confidence.toFixed(1)} ਪ੍ਰਤੀਸ਼ਤ। ${
        isHealthy ? "ਪੌਦਾ ਬਿਲਕੁਲ ਤੰਦਰੁਸਤ ਹੈ।" : `ਸਲਾਹ: ${data.immediateActions[0] || 'ਬਿਮਾਰ ਪੱਤੇ ਵੱਖ ਕਰੋ'}. ਰਸਾਇਣਕ ਇਲਾਜ: ${data.chemicalTreatment}`
      }`;
    } else if (lang === 'es') {
      return `Diagnóstico: Cultivo ${data.crop}, Condición ${data.condition}, con ${data.confidence.toFixed(1)}% de confianza. ${
        isHealthy ? "Planta saludable." : `Acción inmediata: ${data.immediateActions[0] || 'Aislar hojas infectadas'}. Tratamiento: ${data.chemicalTreatment}`
      }`;
    }

    return `Diagnostic result: ${data.crop} leaf diagnosed with ${data.condition} at ${data.confidence.toFixed(1)}% confidence. Severity is ${data.severity}. Immediate action: ${
      data.immediateActions[0] || 'Isolate infected leaves'
    }. Recommended chemical treatment: ${data.chemicalTreatment}. Organic advice: ${data.organicTreatment}.`;
  };

  // Play Spoken Audio Handler using Gemini TTS with browser synthesis fallback
  const handleToggleVoiceReadout = async () => {
    if (isPlayingAudio) {
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    setIsLoadingAudio(true);
    const spokenText = getSpokenSummary(currentLanguage);

    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: spokenText,
          language: currentLanguage,
          voiceName: 'Kore',
        }),
      });

      const resData = await response.json();

      if (resData.audioBase64) {
        const audioUrl = `data:audio/wav;base64,${resData.audioBase64}`;
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          setIsPlayingAudio(false);
        };
        audio.onerror = () => {
          fallbackBrowserSpeech(spokenText);
        };

        await audio.play();
        setIsPlayingAudio(true);
      } else {
        fallbackBrowserSpeech(spokenText);
      }
    } catch (e) {
      console.warn("Server TTS error, falling back to browser synthesis:", e);
      fallbackBrowserSpeech(spokenText);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const fallbackBrowserSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'pa' ? 'pa-IN' : currentLanguage === 'es' ? 'es-ES' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs print:shadow-none print:border-none">
      {/* Top Telemetry / Status Ribbon */}
      <div className="px-6 py-4 border-b border-stone-200 bg-stone-50/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isHealthy ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
            {isHealthy ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">{t.classificationTag}</span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-mono text-stone-600 truncate max-w-[220px]">{data.canonicalClass}</span>
            </div>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <span>{data.crop}</span>
              <span className="text-stone-400 font-normal">/</span>
              <span className={isHealthy ? 'text-emerald-700' : 'text-amber-800'}>{data.condition}</span>
            </h1>
          </div>
        </div>

        {/* Confidence Metric & Audio Readout & Print Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Spoken Voice Assistant Button on Result */}
          <button
            type="button"
            onClick={handleToggleVoiceReadout}
            disabled={isLoadingAudio}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 shadow-xs ${
              isPlayingAudio
                ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-300 animate-pulse'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white border-emerald-900'
            }`}
            title={isPlayingAudio ? t.stopAudio : t.listenAudio}
          >
            {isLoadingAudio ? (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
            ) : isPlayingAudio ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
            <span>
              {isPlayingAudio ? t.audioPlaying : t.listenAudio}
            </span>
          </button>

          <div className="text-right pl-2 border-l border-stone-200">
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">{t.confidenceTag}</div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900 leading-none mt-0.5">
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

      {/* Uncertainty Notice (<70% threshold handling) */}
      {isUncertain && (
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{t.uncertaintyNotice}</span>
          </div>
          <span className="px-2 py-0.5 bg-amber-200/80 rounded font-mono text-[11px] shrink-0 font-medium">
            {t.scoutAdvised}
          </span>
        </div>
      )}

      {/* Language Switcher Bar */}
      <div className="px-6 py-2.5 bg-stone-100/70 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-stone-600 font-medium">
          <Compass className="w-3.5 h-3.5 text-stone-500" />
          <span>{t.langSelect}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onLanguageChange?.('hi')}
            className={`px-3 py-1 rounded text-xs transition-colors ${currentLanguage === 'hi' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'}`}
          >
            हिन्दी (Hindi)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange?.('en')}
            className={`px-3 py-1 rounded text-xs transition-colors ${currentLanguage === 'en' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'}`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange?.('pa')}
            className={`px-3 py-1 rounded text-xs transition-colors ${currentLanguage === 'pa' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'}`}
          >
            ਪੰਜਾਬੀ (Punjabi)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange?.('es')}
            className={`px-3 py-1 rounded text-xs transition-colors ${currentLanguage === 'es' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'}`}
          >
            Español
          </button>
        </div>
      </div>

      {/* Multilingual Advisory Box if Hindi/Punjabi/Spanish selected */}
      {currentLanguage !== 'en' && (
        <div className="px-6 py-3 bg-emerald-50/70 border-b border-emerald-200 text-emerald-950 text-xs leading-relaxed flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">
              {currentLanguage === 'hi' && "किसान परामर्श (Hindi Summary): "}
              {currentLanguage === 'pa' && "ਕਿਸਾਨ ਸਲਾਹ (Punjabi Summary): "}
              {currentLanguage === 'es' && "Resumen Agronómico (Spanish Summary): "}
            </span>
            <span>
              {currentLanguage === 'hi' && data.multilingualSummaries.hindi}
              {currentLanguage === 'pa' && data.multilingualSummaries.punjabi}
              {currentLanguage === 'es' && data.multilingualSummaries.spanish}
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
              {t.telemetryTitle}
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block text-[11px]">{t.scientificName}</span>
                <span className="font-serif italic font-medium text-stone-900">{data.scientificName}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">{t.biologicalAgent}</span>
                <span className="font-medium text-stone-900">{data.biologicalCause}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">{t.severityIndex}</span>
                <span className="font-medium text-stone-900">{data.severity}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">{t.engine}</span>
                <span className="font-mono text-[11px] text-stone-700">{data.engine || 'MobileNetV2'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Treatment & Advisory Tabs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Segmented Tab Controls */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 print:hidden overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('treatment')}
              className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'treatment' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.tabs.treatment}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('symptoms')}
              className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'symptoms' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.tabs.symptoms}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('probabilities')}
              className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'probabilities' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.tabs.probabilities}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('prevention')}
              className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'prevention' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.tabs.prevention}
            </button>
          </div>

          {/* TAB 1: Treatment & Field Advisory */}
          {activeTab === 'treatment' && (
            <div className="space-y-4">
              {/* Immediate Field Action */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
                <div className="flex items-center gap-2 mb-2 text-rose-900 font-semibold text-xs uppercase tracking-wider font-mono">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{t.quarantineTitle}</span>
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
                  <span>{t.organicTitle}</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {data.organicTreatment}
                </p>
              </div>

              {/* Chemical Treatment & Dosage */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70">
                <div className="flex items-center gap-2 mb-1.5 text-stone-900 font-semibold text-xs uppercase tracking-wider font-mono">
                  <FileText className="w-4 h-4 text-stone-700" />
                  <span>{t.chemicalTitle}</span>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed font-mono">
                  {data.chemicalTreatment}
                </p>
              </div>

              {/* Consult Agronomist / Voice Action */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 print:hidden">
                <span className="text-xs text-stone-500">{t.consultPrompt}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onOpenVoiceAssistant || onAskAgronomist}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{t.askAdvisor}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Symptoms & Weather */}
          {activeTab === 'symptoms' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-stone-200 bg-white">
                <h2 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono mb-2.5">
                  {t.symptomsTitle}
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
                  {t.weatherTitle}
                </h2>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {data.weatherSusceptibility}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Softmax Probabilities */}
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
                {t.preventionTitle}
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
