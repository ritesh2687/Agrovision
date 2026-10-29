import React from 'react';
import { X, Cpu, Layers, GitBranch, Database, CheckCircle2, Award, ExternalLink } from 'lucide-react';

interface ModelArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelArchitectureModal: React.FC<ModelArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200 flex items-start justify-between bg-stone-50/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Project Architecture & Specifications</span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              AgroVision AI: AI-Powered Crop Disease Detection System
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Chandigarh University · School of Computing & Information Sciences · MCA (AIML)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-xs text-stone-700">
          {/* Project Team */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
            <h3 className="font-semibold text-stone-900 mb-2 font-mono uppercase tracking-wider text-[11px]">
              Project Contributors (Chandigarh University)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 bg-white rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block">Himanshu Gehlot</span>
                <span className="text-stone-500 font-mono">25LMMC3093</span>
              </div>
              <div className="p-2 bg-white rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block">Ajulendra P. Singh</span>
                <span className="text-stone-500 font-mono">25LMMC3041</span>
              </div>
              <div className="p-2 bg-white rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block">Ritesh Prajapati</span>
                <span className="text-stone-500 font-mono">25LMMC3017</span>
              </div>
              <div className="p-2 bg-white rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block">Sayan Mitra</span>
                <span className="text-stone-500 font-mono">25LMMC3096</span>
              </div>
            </div>
          </div>

          {/* Neural Architecture Pipeline */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-3 font-mono uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-800" />
              <span>Deep Learning Inference Pipeline</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="font-mono text-stone-400 block text-[10px] mb-1">STAGE 1</span>
                <span className="font-semibold text-stone-900 block text-xs">Image Input</span>
                <span className="text-[11px] text-stone-500 font-mono">Camera / File</span>
                <div className="mt-2 text-[10px] text-stone-400">Secure File Validation</div>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="font-mono text-stone-400 block text-[10px] mb-1">STAGE 2</span>
                <span className="font-semibold text-stone-900 block text-xs">Preprocessing</span>
                <span className="text-[11px] text-stone-500 font-mono">224 × 224 × 3</span>
                <div className="mt-2 text-[10px] text-stone-400">Rescale 1/255.0 Normalization</div>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="font-mono text-stone-400 block text-[10px] mb-1">STAGE 3</span>
                <span className="font-semibold text-stone-900 block text-xs">MobileNetV2</span>
                <span className="text-[11px] text-stone-500 font-mono">Transfer Learning</span>
                <div className="mt-2 text-[10px] text-stone-400">Inverted Residual Blocks</div>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="font-mono text-stone-400 block text-[10px] mb-1">STAGE 4</span>
                <span className="font-semibold text-stone-900 block text-xs">Softmax Probabilities</span>
                <span className="text-[11px] text-stone-500 font-mono">38 Classes</span>
                <div className="mt-2 text-[10px] text-stone-400">Confidence Score & Advisory</div>
              </div>
            </div>
          </div>

          {/* Training Specifications */}
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
            <h3 className="font-semibold text-stone-900 font-mono uppercase tracking-wider text-[11px]">
              Model Training Hyperparameters (from Notebook AI_PCDps)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block text-[11px]">Base Architecture</span>
                <span className="font-mono font-medium text-stone-900">MobileNetV2 / VGG16</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Optimizer</span>
                <span className="font-mono font-medium text-stone-900">Adam (lr = 0.0001)</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Loss Function</span>
                <span className="font-mono font-medium text-stone-900">Categorical Crossentropy</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Data Augmentation</span>
                <span className="font-mono font-medium text-stone-900">Rot 40°, Zoom, Shear 0.2</span>
              </div>
            </div>
          </div>

          {/* Model Accuracy & Loss Visualization representation */}
          <div className="p-4 bg-stone-950 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold font-mono text-emerald-400">Training & Validation Convergence (15 Epochs)</span>
              <span className="text-[11px] text-stone-400 font-mono">Validation Accuracy: 98.2%</span>
            </div>
            {/* SVG Loss and Accuracy Curve */}
            <div className="h-32 w-full pt-2">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                {/* Gridlines */}
                <line x1="20" y1="20" x2="380" y2="20" stroke="#333" strokeDasharray="3 3" />
                <line x1="20" y1="50" x2="380" y2="50" stroke="#333" strokeDasharray="3 3" />
                <line x1="20" y1="80" x2="380" y2="80" stroke="#333" strokeDasharray="3 3" />
                {/* Accuracy Line (Rising green) */}
                <path
                  d="M 20 85 Q 80 60 140 35 T 260 22 T 380 18"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />
                {/* Loss Line (Dropping amber) */}
                <path
                  d="M 20 20 Q 80 45 140 70 T 260 82 T 380 86"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Legend */}
                <circle cx="40" cy="94" r="3" fill="#10B981" />
                <text x="50" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">Accuracy: 98.2%</text>
                <circle cx="160" cy="94" r="3" fill="#F59E0B" />
                <text x="170" y="96" fill="#FDE68A" fontSize="9" fontFamily="monospace">Loss: 0.1139</text>
              </svg>
            </div>
          </div>

          {/* Project Future Scope (Slide 10) */}
          <div className="p-4 border border-stone-200 rounded-xl bg-stone-50/50">
            <h3 className="font-semibold text-stone-900 mb-2 font-mono uppercase tracking-wider text-[11px]">
              Future Scope Roadmap Implemented in AgroVision AI
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Regional multilingual language support (Hindi, Punjabi, Spanish)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Transparent uncertainty threshold handling (&lt;70% safety margin)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Automated severity index & lesion surface estimation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Real-time camera viewfinder with 224x224 reticle normalization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500 font-mono">AgroVision AI · MCA(AIML) Capstone</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-semibold"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
