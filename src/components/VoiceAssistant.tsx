import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, RefreshCw, Play, Pause, RotateCcw, Send, Bot, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { DiagnosisData } from './DiagnosisResult';
import { Language, TRANSLATIONS } from '../data/translations';

interface VoiceMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  audioUrl?: string;
  timestamp: string;
}

interface VoiceAssistantProps {
  diagnosisContext: DiagnosisData | null;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  diagnosisContext,
  currentLanguage,
  onLanguageChange,
}) => {
  const t = TRANSLATIONS[currentLanguage].voice;

  const [isListening, setIsListening] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [manualInput, setManualInput] = useState<string>('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize initial greeting based on language and diagnosis context
  useEffect(() => {
    const isHindi = currentLanguage === 'hi';
    const isPunjabi = currentLanguage === 'pa';
    const isSpanish = currentLanguage === 'es';

    let initialGreeting = "";
    if (diagnosisContext) {
      if (isHindi) {
        initialGreeting = `नमस्कार किसान भाई! आपकी ${diagnosisContext.crop} में ${diagnosisContext.condition} (सटीकता: ${diagnosisContext.confidence.toFixed(1)}%) की पहचान हुई है। आप माइक दबाकर दवा की मात्रा, छिड़काव का समय, या जैविक उपाय बोलकर पूछ सकते हैं।`;
      } else if (isPunjabi) {
        initialGreeting = `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਤੁਹਾਡੀ ਫਸਲ ${diagnosisContext.crop} ਵਿੱਚ ${diagnosisContext.condition} ਪਾਈ ਗਈ ਹੈ। ਦਵਾਈ ਦੀ ਸਹੀ ਮਾਤਰਾ ਬਾਰੇ ਬੋਲ ਕੇ ਪੁੱਛੋ।`;
      } else if (isSpanish) {
        initialGreeting = `¡Hola agricultor! Se ha diagnosticado ${diagnosisContext.condition} en ${diagnosisContext.crop} con ${diagnosisContext.confidence.toFixed(1)}% de certeza. Toque el micrófono para consultar dosis y tratamientos.`;
      } else {
        initialGreeting = `Hello farmer! Your ${diagnosisContext.crop} was diagnosed with ${diagnosisContext.condition} (${diagnosisContext.confidence.toFixed(1)}% confidence). Tap the microphone to ask about spray dosage, timing, or prevention.`;
      }
    } else {
      if (isHindi) {
        initialGreeting = "नमस्कार किसान मित्र! मैं आपका कृषि वॉयस सहायक हूँ। आप माइक दबाकर किसी भी फसल रोग, दवा के छिड़काव, जैविक खाद या मौसम से जुड़े सवाल हिन्दी में पूछ सकते हैं।";
      } else if (isPunjabi) {
        initialGreeting = "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਵੌਇਸ ਮਿੱਤਰ ਹਾਂ। ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਜਾਂ ਛਿੜਕਾਅ ਬਾਰੇ ਪੁੱਛਣ ਲਈ ਮਾਈਕ ਦਬਾਓ।";
      } else if (isSpanish) {
        initialGreeting = "¡Bienvenido! Soy su asistente de voz agronómico. Toque el micrófono para hacer preguntas sobre plagas, dosis o tratamientos.";
      } else {
        initialGreeting = "Welcome! I am your AgroVision Voice Assistant. Tap the microphone to speak and ask any question about crop diseases, dosage, or organic treatment.";
      }
    }

    setMessages([
      {
        id: 'init-msg',
        role: 'assistant',
        text: initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [diagnosisContext, currentLanguage]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing, isListening]);

  // Audio Playback helper
  const playAudio = useCallback((audioUrl: string) => {
    if (isMuted) return;

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    audioPlayerRef.current = audio;
    setIsPlayingAudio(true);

    audio.onended = () => {
      setIsPlayingAudio(false);
    };

    audio.onerror = (e) => {
      console.warn("Audio playback failed, trying browser speech synthesis fallback:", e);
      setIsPlayingAudio(false);
    };

    audio.play().catch((err) => {
      console.warn("Auto-play error:", err);
      setIsPlayingAudio(false);
    });
  }, [isMuted]);

  // Browser SpeechSynthesis Fallback if Gemini audio is absent or fails
  const speakWithBrowserSynthesis = useCallback((textToSpeak: string, lang: Language) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'pa' ? 'pa-IN' : lang === 'es' ? 'es-ES' : 'en-IN';
    utterance.rate = 0.95;

    // Pick best matching voice if available
    const voices = window.speechSynthesis.getVoices();
    const voiceMatch = voices.find((v) => v.lang.startsWith(utterance.lang));
    if (voiceMatch) {
      utterance.voice = voiceMatch;
    }

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  // Stop currently playing audio
  const stopAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  // Submit Query to Voice Assistant Backend
  const handleQuerySubmit = async (queryText: string) => {
    if (!queryText.trim() || isProcessing) return;

    stopAudio();
    const userMsg: VoiceMessage = {
      id: String(Date.now()),
      role: 'user',
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setTranscript('');
    setManualInput('');
    setIsProcessing(true);
    setSpeechError(null);

    try {
      const response = await fetch('/api/voice-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: queryText.trim(),
          diagnosisContext,
          language: currentLanguage,
          chatHistory: messages.slice(-4).map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      const data = await response.json();
      const replyText = data.reply || "फसल की सुरक्षा के लिए अनुशंसित मात्रा में ही दवा का छिड़काव करें।";

      let audioUrl: string | undefined;
      if (data.audioBase64) {
        audioUrl = `data:audio/wav;base64,${data.audioBase64}`;
      }

      const assistantMsg: VoiceMessage = {
        id: String(Date.now() + 1),
        role: 'assistant',
        text: replyText,
        audioUrl,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Automatically speak the response
      if (!isMuted) {
        if (audioUrl) {
          playAudio(audioUrl);
        } else {
          speakWithBrowserSynthesis(replyText, currentLanguage);
        }
      }
    } catch (err: any) {
      console.error("Voice assistant request error:", err);
      const fallbackReply = currentLanguage === 'hi'
        ? "माफ करें, नेटवर्क में देरी हुई है। फफूंदनाशक का छिड़काव 2 से 2.5 ग्राम प्रति लीटर पानी के अनुपात में सुबह या शाम के समय करें।"
        : "Network delay. Please apply standard fungicide at 2.0 to 2.5 grams per liter in early morning or late dusk.";

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 2),
          role: 'assistant',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speakWithBrowserSynthesis(fallbackReply, currentLanguage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Start Speech Recognition
  const startListening = () => {
    stopAudio();
    setSpeechError(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(t.speechNotSupported);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLanguage === 'hi'
        ? 'hi-IN'
        : currentLanguage === 'pa'
        ? 'pa-IN'
        : currentLanguage === 'es'
        ? 'es-ES'
        : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setSpeechError(t.micPermissionNotice);
        } else if (event.error !== 'no-speech') {
          setSpeechError(`Error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // If we captured words, submit them
        if (transcript.trim().length > 1) {
          handleQuerySubmit(transcript.trim());
        }
      };

      recognition.start();
    } catch (err: any) {
      console.error("Failed to start speech recognition:", err);
      setSpeechError("Could not access microphone.");
      setIsListening(false);
    }
  };

  // Stop Speech Recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Quick Spoken Prompts depending on language
  const quickPrompts = currentLanguage === 'hi'
    ? [
        "टमाटर के झुलसा रोग (Late Blight) का तुरंत इलाज क्या है?",
        "दवा छिड़कने का सही समय और पानी का अनुपात क्या रखें?",
        "बारिश से पहले कौन सा फफूंदनाशक छिड़कना सुरक्षित है?",
        "पत्तियों पर काले धब्बे आने से कैसे रोकें?",
      ]
    : currentLanguage === 'pa'
    ? [
        "ਟਮਾਟਰ ਦੇ ਝੁਲਸਾ ਰੋਗ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਇਲਾਜ ਕੀ ਹੈ?",
        "ਦਵਾਈ ਦਾ ਸਹੀ ਘੋਲ ਕਿੰਨੇ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾਉਣਾ ਚਾਹੀਦਾ ਹੈ?",
        "ਕੀ ਬਾਰਿਸ਼ ਤੋਂ ਪਹਿਲਾਂ ਸਪਰੇਅ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ?",
      ]
    : currentLanguage === 'es'
    ? [
        "¿Cuál es el tratamiento inmediato para el tizón tardío?",
        "¿Cuál es la dosis exacta por litro de agua?",
        "¿Es seguro fumigar antes de la lluvia?",
      ]
    : [
        "What is the exact dosage for Late Blight treatment?",
        "Can I apply fungicide if rain is expected in 4 hours?",
        "How to prevent disease spread to neighboring rows?",
        "What organic bio-controls work best?",
      ];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs flex flex-col">
      {/* Header Bar */}
      <div className="px-6 py-4 border-b border-stone-200 bg-stone-50/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
            <Mic className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-semibold text-emerald-800">
                {currentLanguage === 'hi' ? 'कृषि वॉयस मित्र' : 'Krishi Voice Mitra'}
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-mono text-stone-500">
                Gemini 3.8 Flash-Lite TTS
              </span>
            </div>
            <h2 className="text-base font-bold text-stone-900 tracking-tight">
              {t.title}
            </h2>
          </div>
        </div>

        {/* Controls: Language Selector & Audio Mute */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center p-0.5 bg-stone-200/70 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-3 py-1 rounded-md transition-colors ${
                currentLanguage === 'hi' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-md transition-colors ${
                currentLanguage === 'en' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('pa')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                currentLanguage === 'pa' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ਪੰਜਾਬੀ
            </button>
          </div>

          {/* Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={() => {
              if (!isMuted) stopAudio();
              setIsMuted(!isMuted);
            }}
            className={`p-2 rounded-lg border transition-colors ${
              isMuted
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
            title={isMuted ? "Unmute Spoken Audio" : "Mute Spoken Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Active Diagnosis Context Pill / Indicator */}
      {diagnosisContext && (
        <div className="px-6 py-2.5 bg-emerald-50/60 border-b border-emerald-100 flex flex-wrap items-center justify-between text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>{currentLanguage === 'hi' ? 'सक्रिय फसल संदर्भ: ' : 'Active Diagnosis Context: '}</strong>
              {diagnosisContext.crop} · {diagnosisContext.condition} ({diagnosisContext.severity})
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-800">
            {diagnosisContext.confidence.toFixed(1)}% {currentLanguage === 'hi' ? 'सटीकता' : 'conf'}
          </span>
        </div>
      )}

      {/* Hero Voice Interaction Console */}
      <div className="p-6 bg-gradient-to-b from-stone-50/60 to-white border-b border-stone-200 flex flex-col items-center justify-center text-center">
        {/* Animated Wave or Microphone Halo */}
        <div className="relative mb-4 flex items-center justify-center">
          {/* Pulsing Audio Ripples when Listening */}
          {isListening && (
            <>
              <div className="absolute w-28 h-28 rounded-full bg-emerald-500/20 animate-ping"></div>
              <div className="absolute w-20 h-20 rounded-full bg-emerald-500/30 animate-pulse"></div>
            </>
          )}

          {/* Pulsing Ripples when Playing Spoken Audio */}
          {isPlayingAudio && !isListening && (
            <>
              <div className="absolute w-28 h-28 rounded-full bg-amber-500/20 animate-ping"></div>
              <div className="absolute w-20 h-20 rounded-full bg-amber-500/30 animate-pulse"></div>
            </>
          )}

          {/* Central Main Mic Button */}
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all shadow-md active:scale-95 disabled:opacity-50 ${
              isListening
                ? 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-200'
                : isPlayingAudio
                ? 'bg-amber-600 hover:bg-amber-700 text-white ring-4 ring-amber-200'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white ring-4 ring-emerald-100 hover:ring-emerald-200'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : isPlayingAudio ? (
              <Volume2 className="w-8 h-8 animate-bounce" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* State Label & Transcript */}
        <div className="space-y-1 max-w-lg">
          <div className="text-sm font-bold text-stone-900 tracking-tight">
            {isListening
              ? t.listening
              : isProcessing
              ? t.processing
              : isPlayingAudio
              ? (currentLanguage === 'hi' ? 'उत्तर बोलकर सुनाया जा रहा है...' : 'Speaking answer out loud...')
              : t.tapToSpeak}
          </div>

          <p className="text-xs text-stone-500 leading-relaxed">
            {transcript ? (
              <span className="font-medium text-emerald-900 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 inline-block font-mono">
                "{transcript}"
              </span>
            ) : (
              t.speakInstruction
            )}
          </p>
        </div>

        {/* Audio Playing Controller */}
        {isPlayingAudio && (
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={stopAudio}
              className="px-3 py-1 text-xs font-semibold text-stone-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>{t.stopAudio || 'Pause Audio'}</span>
            </button>
          </div>
        )}

        {/* Speech Error Banner */}
        {speechError && (
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{speechError}</span>
          </div>
        )}
      </div>

      {/* Quick Spoken Prompts Grid */}
      <div className="px-6 py-3.5 border-b border-stone-200 bg-stone-50/50">
        <div className="text-[11px] font-mono font-semibold uppercase text-stone-500 mb-2 tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
          <span>{t.quickPromptsTitle}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuerySubmit(prompt)}
              disabled={isProcessing || isListening}
              className="p-2.5 rounded-lg border border-stone-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/50 text-left transition-all text-xs text-stone-700 hover:text-stone-900 flex items-center justify-between gap-2 group disabled:opacity-50"
            >
              <span className="line-clamp-1">{prompt}</span>
              <Volume2 className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Conversational Stream Display */}
      <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto bg-stone-50/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                msg.role === 'user'
                  ? 'bg-stone-900 text-white'
                  : 'bg-emerald-800 text-white shadow-xs'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`space-y-1.5 max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-stone-900 text-white rounded-tr-xs'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>

              {/* Spoken Audio Replay Button */}
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
                  <span>{msg.timestamp}</span>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (msg.audioUrl) {
                        playAudio(msg.audioUrl);
                      } else {
                        speakWithBrowserSynthesis(msg.text, currentLanguage);
                      }
                    }}
                    className="hover:text-emerald-800 transition-colors flex items-center gap-1 font-semibold text-emerald-800"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t.replayAudio}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-center gap-2.5 text-stone-500 text-xs p-2">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-700" />
            <span>{currentLanguage === 'hi' ? 'कृषि विशेषज्ञ सलाह तैयार कर रहे हैं...' : 'Generating agronomic advisory & voice...'}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Manual Text Input Fallback */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleQuerySubmit(manualInput);
        }}
        className="p-4 border-t border-stone-200 bg-white flex items-center gap-2.5"
      >
        <input
          type="text"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          placeholder={
            currentLanguage === 'hi'
              ? "या यहाँ टाइप करें: दवा की मात्रा, छिड़काव का समय, फफूंद रोकथाम..."
              : "Or type your question: spray dosage, organic treatments, weather..."
          }
          className="flex-1 text-xs px-3.5 py-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900 placeholder:text-stone-400 bg-stone-50/50"
        />
        <button
          type="submit"
          disabled={!manualInput.trim() || isProcessing}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors disabled:opacity-40 flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{currentLanguage === 'hi' ? 'पूछें' : 'Send'}</span>
        </button>
      </form>
    </div>
  );
};
