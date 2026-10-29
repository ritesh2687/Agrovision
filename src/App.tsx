import React, { useState, useEffect } from 'react';
import { Camera, BookOpen, Bot, Cpu, History, RefreshCw, ShieldCheck, Sprout, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { CameraScanner } from './components/CameraScanner';
import { DiagnosisResult, DiagnosisData } from './components/DiagnosisResult';
import { AgronomistChat } from './components/AgronomistChat';
import { DiseaseKnowledgeBase } from './components/DiseaseKnowledgeBase';
import { ModelArchitectureModal } from './components/ModelArchitectureModal';
import { ScanHistory } from './components/ScanHistory';
import { FIELD_SAMPLES } from './data/plantVillageData';

export default function App() {
  const [activeView, setActiveView] = useState<'scanner' | 'library' | 'chat'>('scanner');
  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [scanHistory, setScanHistory] = useState<DiagnosisData[]>([]);

  // Load scan history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('agrovision_scan_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setScanHistory(parsed);
          if (parsed.length > 0 && !currentDiagnosis) {
            setCurrentDiagnosis(parsed[0]);
          }
        }
      }
    } catch (e) {
      console.warn("Failed to parse scan history from localStorage:", e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (diagnosis: DiagnosisData) => {
    setScanHistory((prev) => {
      const updated = [diagnosis, ...prev.filter((item) => item.canonicalClass !== diagnosis.canonicalClass || item.timestamp !== diagnosis.timestamp)].slice(0, 10);
      try {
        localStorage.setItem('agrovision_scan_history', JSON.stringify(updated));
      } catch (err) {
        console.warn("Could not save to localStorage:", err);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setScanHistory([]);
    try {
      localStorage.removeItem('agrovision_scan_history');
    } catch (e) {
      console.warn(e);
    }
  };

  // Perform Image Classification
  const handlePerformDiagnosis = async (base64Image: string, sampleHint?: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          sampleHint: sampleHint
        })
      });

      const data: DiagnosisData = await response.json();
      const enrichedData: DiagnosisData = {
        ...data,
        leafImage: base64Image,
        timestamp: data.timestamp || new Date().toISOString()
      };

      setCurrentDiagnosis(enrichedData);
      saveToHistory(enrichedData);
      setActiveView('scanner');
    } catch (error) {
      console.error("Diagnosis request failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar Contract: 1-line Brand wordmark, 4-5 concise nav links, 1 primary action */}
      <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('scanner');
            }}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
              <Sprout className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
                AgroVision AI
              </span>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest -mt-0.5">
                Crop Disease Diagnosis
              </span>
            </div>
          </a>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-600">
            <button
              type="button"
              onClick={() => setActiveView('scanner')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === 'scanner' ? 'border-emerald-700 text-stone-900 font-semibold' : 'border-transparent'
              }`}
            >
              Leaf Scanner & Camera
            </button>
            <button
              type="button"
              onClick={() => setActiveView('library')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === 'library' ? 'border-emerald-700 text-stone-900 font-semibold' : 'border-transparent'
              }`}
            >
              PlantVillage Library
            </button>
            <button
              type="button"
              onClick={() => setActiveView('chat')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === 'chat' ? 'border-emerald-700 text-stone-900 font-semibold' : 'border-transparent'
              }`}
            >
              Agronomist Advisor
            </button>
            <button
              type="button"
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 text-stone-500 hover:text-emerald-800 flex items-center gap-1"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Project Specs</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveView('scanner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Scan Plant</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Editorial Sub-Header Banner (Quiet, elegant) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1 font-mono">
              <span>MobileNetV2 Transfer Learning</span>
              <span aria-hidden="true">·</span>
              <span>PlantVillage 38 Classes</span>
              <span aria-hidden="true">·</span>
              <span>Chandigarh University MCA(AIML)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Real-Time Crop Pathology & Treatment Advisory
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600 shrink-0">
            <span className="font-mono tabular-nums text-emerald-800 font-semibold">98.2%</span>
            <span>Validation Accuracy</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="font-mono tabular-nums text-stone-600">~140ms</span>
            <span>Edge Inference</span>
          </div>
        </div>

        {/* View 1: Main Scanner & Live Diagnosis Stage */}
        {activeView === 'scanner' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Camera Viewfinder & File Input (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <CameraScanner
                  onCapture={handlePerformDiagnosis}
                  isAnalyzing={isAnalyzing}
                />

                {/* Scan History Drawer */}
                <ScanHistory
                  history={scanHistory}
                  onSelectHistoryItem={(item) => {
                    setCurrentDiagnosis(item);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  onClearHistory={handleClearHistory}
                />
              </div>

              {/* Right Column: Diagnosis Results Stage (7 Cols) */}
              <div className="lg:col-span-7">
                {currentDiagnosis ? (
                  <DiagnosisResult
                    data={currentDiagnosis}
                    onAskAgronomist={() => {
                      setActiveView('chat');
                    }}
                  />
                ) : (
                  <div className="bg-white border border-stone-200 rounded-xl p-10 text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                      <Sprout className="w-7 h-7 text-emerald-800" />
                    </div>
                    <div className="max-w-md mx-auto">
                      <h3 className="text-base font-bold text-stone-900 mb-1">Awaiting Leaf Inspection</h3>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Activate your device camera or select a sample leaf on the left. The neural vision engine will analyze the leaf morphology, identify disease symptoms, compute confidence, and provide structured treatment guidance.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 max-w-sm mx-auto">
                      <span className="text-[11px] font-mono text-stone-400 block mb-2 uppercase tracking-wider">
                        Available Instant Benchmarks
                      </span>
                      <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() => handlePerformDiagnosis(FIELD_SAMPLES[0].svgMarkup, 'Tomato Late Blight')}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 transition-colors"
                        >
                          Tomato Late Blight
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePerformDiagnosis(FIELD_SAMPLES[1].svgMarkup, 'Corn Northern Leaf Blight')}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 transition-colors"
                        >
                          Corn Blight
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePerformDiagnosis(FIELD_SAMPLES[2].svgMarkup, 'Grape Black Rot')}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 transition-colors"
                        >
                          Grape Rot
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePerformDiagnosis(FIELD_SAMPLES[3].svgMarkup, 'Tomato healthy')}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 transition-colors"
                        >
                          Healthy Leaf
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Agronomy Advisory Strip (when diagnosis is available) */}
            {currentDiagnosis && (
              <div className="p-6 bg-white border border-stone-200 rounded-xl">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
                      <Bot className="w-4 h-4 text-emerald-800" />
                      <span>Interactive Field Agronomist Advisory</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Dedicated agricultural Q&A for {currentDiagnosis.crop} ({currentDiagnosis.condition}).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveView('chat')}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>Full Screen Chat View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <AgronomistChat diagnosisContext={currentDiagnosis} />
              </div>
            )}
          </div>
        )}

        {/* View 2: Disease Knowledge Base */}
        {activeView === 'library' && (
          <DiseaseKnowledgeBase
            onSelectSampleFromLibrary={(crop, condition) => {
              const matchedSample = FIELD_SAMPLES.find((s) => s.crop.includes(crop) || s.condition.includes(condition));
              if (matchedSample) {
                handlePerformDiagnosis(matchedSample.svgMarkup, `${crop} ${condition}`);
              } else {
                handlePerformDiagnosis(FIELD_SAMPLES[0].svgMarkup, `${crop} ${condition}`);
              }
            }}
          />
        )}

        {/* View 3: Agronomist Chat Dedicated View */}
        {activeView === 'chat' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                Senior Agronomist Field Q&A Assistant
              </h2>
              <button
                type="button"
                onClick={() => setActiveView('scanner')}
                className="text-xs text-emerald-800 hover:text-emerald-700 font-medium"
              >
                ← Back to Scanner
              </button>
            </div>
            <AgronomistChat diagnosisContext={currentDiagnosis} />
          </div>
        )}
      </main>

      {/* Model Architecture Specifications Modal */}
      <ModelArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      {/* Clean Editorial Footer (Quiet, respectful, no telemetry ticker) */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-800">AgroVision AI</span>
            <span>·</span>
            <span>Crop Disease Detection System</span>
            <span>·</span>
            <span>PlantVillage Dataset</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <button
              type="button"
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-stone-700 transition-colors"
            >
              MCA(AIML) Architecture
            </button>
            <span>·</span>
            <span>Chandigarh University</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
