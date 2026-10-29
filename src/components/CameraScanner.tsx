import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, Upload, Sparkles, AlertCircle, CheckCircle2, Zap, Sliders, Image as ImageIcon } from 'lucide-react';
import { FIELD_SAMPLES, FieldSample } from '../data/plantVillageData';

interface CameraScannerProps {
  onCapture: (base64Image: string, sampleHint?: string) => void;
  isAnalyzing: boolean;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onCapture, isAnalyzing }) => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [hasTorch, setHasTorch] = useState<boolean>(false);
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<FieldSample | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Start Camera Stream
  const startCamera = useCallback(async (mode: 'environment' | 'user') => {
    setCameraError(null);
    try {
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraActive(true);
      setCapturedPreview(null);
      setSelectedSample(null);

      // Check for torch capability
      const track = stream.getVideoTracks()[0];
      const capabilities: any = track.getCapabilities ? track.getCapabilities() : {};
      setHasTorch(Boolean(capabilities?.torch));
    } catch (err: any) {
      console.warn("Camera access failed or unavailable:", err);
      let errorMsg = "Could not connect to camera.";
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg = "Camera permission was denied. Please allow camera access in your browser or use the file upload / field sample buttons below.";
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMsg = "No camera hardware detected on this device. You can upload an image or test with pre-loaded field samples.";
      }
      setCameraError(errorMsg);
      setCameraActive(false);
    }
  }, []);

  // Stop Camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setTorchOn(false);
  }, []);

  // Toggle Torch
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track && hasTorch) {
      try {
        const nextState = !torchOn;
        await (track as any).applyConstraints({
          advanced: [{ torch: nextState }],
        });
        setTorchOn(nextState);
      } catch (err) {
        console.error("Torch error:", err);
      }
    }
  };

  // Flip Camera
  const flipCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture Frame from Video
  const handleSnap = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Crop center square
    const minDim = Math.min(video.videoWidth, video.videoHeight);
    const startX = (video.videoWidth - minDim) / 2;
    const startY = (video.videoHeight - minDim) / 2;

    ctx.drawImage(video, startX, startY, minDim, minDim, 0, 0, 640, 640);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    setCapturedPreview(dataUrl);
    stopCamera();
    onCapture(dataUrl);
  };

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCapturedPreview(dataUrl);
      stopCamera();
      setSelectedSample(null);
      onCapture(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Test Sample Selector
  const handleSelectFieldSample = (sample: FieldSample) => {
    setSelectedSample(sample);
    setCapturedPreview(sample.svgMarkup);
    stopCamera();
    onCapture(sample.svgMarkup, `${sample.crop} ${sample.condition}`);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
      {/* Viewfinder Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-stone-50/70">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <h2 className="text-sm font-semibold text-stone-900 tracking-tight">Leaf Viewfinder & Sensor Feed</h2>
          <span className="text-xs text-stone-600 font-mono">224×224 Model Frame</span>
        </div>
        <div className="flex items-center gap-2">
          {cameraActive && (
            <>
              {hasTorch && (
                <button
                  type="button"
                  onClick={toggleTorch}
                  className={`p-1.5 text-xs rounded border transition-colors ${
                    torchOn ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                  }`}
                  title="Toggle Torch/Flash"
                >
                  <Zap className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={flipCamera}
                className="p-1.5 text-xs rounded border border-stone-200 bg-white text-stone-600 hover:text-stone-900 transition-colors"
                title="Switch Camera"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Scanner Viewport */}
      <div className="relative aspect-4/3 bg-stone-950 flex items-center justify-center overflow-hidden">
        {/* Hidden internal canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Live Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
        />

        {/* Captured Preview / Selected Sample */}
        {!cameraActive && capturedPreview && (
          <div className="relative w-full h-full flex items-center justify-center bg-stone-900">
            <img
              src={capturedPreview}
              alt="Leaf sample for disease diagnosis"
              className="max-w-full max-h-full object-contain"
            />
            {selectedSample && (
              <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-sm border border-stone-700/60 text-white text-xs px-2.5 py-1 rounded">
                Sample: {selectedSample.crop} · {selectedSample.condition}
              </div>
            )}
          </div>
        )}

        {/* Standby / Initial State */}
        {!cameraActive && !capturedPreview && (
          <div className="p-8 text-center max-w-sm">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400">
              <Camera className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-stone-100 mb-1">Camera Standby</h3>
            <p className="text-xs text-stone-400 mb-5 leading-relaxed">
              Launch real-time camera inspection, upload a field photo, or select a pre-loaded crop leaf sample below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => startCamera(facingMode)}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Camera className="w-3.5 h-3.5" />
                Enable Camera
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Photo
              </button>
            </div>
          </div>
        )}

        {/* Camera Reticle Overlay */}
        {cameraActive && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            {/* 224x224 Target Focus Frame */}
            <div className="relative w-64 h-64 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-emerald-400"></div>
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-emerald-400"></div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-emerald-400"></div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-emerald-400"></div>

              {/* Center Crosshair */}
              <div className="w-4 h-0.5 bg-emerald-400/60"></div>
              <div className="h-4 w-0.5 bg-emerald-400/60 absolute"></div>

              {/* Scanning sweep bar when active */}
              {isAnalyzing && (
                <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse top-1/2 -translate-y-1/2"></div>
              )}
            </div>

            <div className="mt-3 bg-stone-900/80 backdrop-blur-sm border border-stone-700/60 text-stone-200 text-xs px-3 py-1 rounded-full font-mono">
              Align infected leaf within the reticle
            </div>
          </div>
        )}

        {/* Processing Indicator */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-stone-950/75 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20">
            <div className="w-10 h-10 border-3 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-semibold tracking-wide">MobileNetV2 Inference</p>
            <p className="text-xs text-stone-400 mt-1 font-mono">Extracting feature maps & computing softmax probabilities...</p>
          </div>
        )}
      </div>

      {/* Camera Error Alert */}
      {cameraError && (
        <div className="p-3 bg-amber-50 border-t border-amber-200 text-amber-900 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Camera Access Notice:</span> {cameraError}
          </div>
        </div>
      )}

      {/* Control Action Toolbar */}
      <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {cameraActive ? (
            <>
              <button
                type="button"
                onClick={handleSnap}
                disabled={isAnalyzing}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-sm transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
                Capture & Diagnose
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="px-3 py-2.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors"
              >
                Close Camera
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => startCamera(facingMode)}
                disabled={isAnalyzing}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-sm transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
              >
                <Camera className="w-3.5 h-3.5" />
                Open Live Camera
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="px-3 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </>
          )}
        </div>

        {capturedPreview && (
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Image Ready for Analysis</span>
          </div>
        )}
      </div>

      {/* Field Benchmark Test Samples */}
      <div className="px-5 py-3.5 border-t border-stone-200 bg-white">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Or Test Instant Benchmark Samples (PlantVillage Dataset)</span>
          </div>
          <span className="text-[11px] text-stone-500">1-click test</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FIELD_SAMPLES.map((sample) => {
            const isSelected = selectedSample?.id === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectFieldSample(sample)}
                disabled={isAnalyzing}
                className={`p-2 rounded-lg border text-left transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="w-9 h-9 rounded-md overflow-hidden bg-stone-100 border border-stone-200 shrink-0 flex items-center justify-center">
                  <img src={sample.svgMarkup} alt={sample.condition} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-stone-900 truncate">{sample.crop}</div>
                  <div className="text-[11px] text-stone-500 truncate">{sample.condition}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
