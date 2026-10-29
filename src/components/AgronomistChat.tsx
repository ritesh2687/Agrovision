import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { DiagnosisData } from './DiagnosisResult';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AgronomistChatProps {
  diagnosisContext: DiagnosisData | null;
}

export const AgronomistChat: React.FC<AgronomistChatProps> = ({ diagnosisContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: diagnosisContext
        ? `Hello! I am your AgroVision Agronomic Advisor. I'm ready to assist with customized field questions regarding your ${diagnosisContext.crop} diagnosed with ${diagnosisContext.condition}. Feel free to ask about spray dilution rates, weather windows, pre-harvest safety intervals, or organic preventative options.`
        : "Hello! I am your AgroVision Agronomic Advisor. Scan a crop leaf or ask me any general questions about crop disease prevention, fungicide application rates, or soil health."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Update welcome greeting when context changes
  useEffect(() => {
    if (diagnosisContext) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Updated focus to your current scan: ${diagnosisContext.crop} with ${diagnosisContext.condition}. Recommended emergency response: ${diagnosisContext.immediateActions[0] || 'Keep foliage dry and isolate diseased leaves.'}`
        }
      ]);
    }
  }, [diagnosisContext]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userText,
          diagnosisContext,
          chatHistory: newMessages.slice(-6)
        })
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: "Ensure proper fungicide mixing at label rates and avoid spraying in direct midday sun." }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Network error communicating with agronomy service. Maintain recommended dosage of 2-2.5 g/L and consult your local agricultural extension service." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What is the exact dosage per liter of water?",
    "Can I apply treatment if rain is expected in 4 hours?",
    "How many days before harvest is it safe to spray?",
    "How can I prevent this disease from spreading to neighboring rows?"
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-[520px]">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-stone-900 tracking-tight">Agronomist Assistant</h2>
            <div className="text-[11px] text-stone-500 font-mono">
              {diagnosisContext ? `Active Context: ${diagnosisContext.crop} · ${diagnosisContext.condition}` : 'General Field Advisory'}
            </div>
          </div>
        </div>
        <span className="text-[11px] text-stone-500 font-mono">Real-time Q&A</span>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50/20">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-xs ${
                msg.role === 'user'
                  ? 'bg-stone-900 text-white'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`p-3 rounded-xl text-xs leading-relaxed max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-stone-900 text-white rounded-tr-xs'
                  : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs shadow-xs'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-stone-500 text-xs p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
            <span>Consulting agronomic reference database...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 border-t border-stone-200 bg-stone-50/60 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setInput(q);
            }}
            className="text-[11px] text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 px-2.5 py-1 rounded whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-3 border-t border-stone-200 bg-white flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about spraying, dosage, weather, or crop health..."
          className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900 placeholder:text-stone-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors disabled:opacity-40 flex items-center gap-1 shadow-xs"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
