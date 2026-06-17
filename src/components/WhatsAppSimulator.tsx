import React, { useState, useRef, useEffect } from 'react';
import { Send, Smartphone, Sparkles, Smile, Phone, Video, MoreVertical, Paperclip } from 'lucide-react';

// Inline Type Definition so you don't need external imports
export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  type: 'text' | 'options';
  options?: string[];
}

export default function WhatsAppSimulator() {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const initialOptions = [
    'Browse Service Models',
    'Automation Booking Demo',
    'Estimation & Pricing',
    'How it Boosts Sales'
  ];

  // Initial messages state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: `bot-${Date.now()}-1`,
      sender: 'bot',
      text: "👋 Hi there! Welcome to *Ali AI Agency*. I'm Ali Ahmad Ansari, and my team builds smart automated systems so you can focus on growing your business while we handle the busywork.",
      timestamp: getCurrentTime(),
      type: 'text'
    },
    {
      id: `bot-${Date.now()}-2`,
      sender: 'bot',
      text: "Explore how my AI can streamline your sales, capture leads, and provide 24/7 client care right here. What would you like to explore today?",
      timestamp: getCurrentTime(),
      type: 'options',
      options: initialOptions
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll logic (block: 'nearest' prevents the whole webpage from jumping)
  const scrollToNewestMessage = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    scrollToNewestMessage();
  }, [messages, isTyping]);

  const getBotResponse = (option: string): string => {
    const cleanOption = option.toLowerCase().trim();

    if (cleanOption.includes('service') || cleanOption.includes('models') || cleanOption.includes('browse')) {
      return "We have two powerful setups tailored for your business:\n\n🤖 *1) The Option Bot (Standard)*\nA highly efficient button-based bot. It introduces your business, answers FAQs, and captures customer phone numbers directly into a Google Sheet. Works 24/7 on autopilot!\n\n🧠 *2) The Option Bot + AI (Gemini)*\nOur premium system. It includes everything above PLUS interactive, human-like conversations. It dynamically extracts custom data (Name, Date, Time, Business intent) and adapts to any customer query.";
    }

    if (cleanOption.includes('booking') || cleanOption.includes('demo') || cleanOption.includes('automate')) {
      return "Let me ask you this:\n🤔 1. Are you losing sleep answering the exact same customer queries every single night?\n🤔 2. How many high-paying leads are slipping away just because you couldn't reply within 5 minutes?\n\nIf that made you think, it's time to upgrade.\n\n📅 *To lock in an actual video call with our founder Ali Ahmad Ansari, scroll down to our gorgeous 'Book a Video Call' section below to instantly reserve your preferred Google Meet slot!*";
    }

    if (cleanOption.includes('estimation') || cleanOption.includes('pricing') || cleanOption.includes('price')) {
      return "We build stable, quick-adapting systems designed to keep your business ahead of the generation. It's a one-time investment for a lifetime of automation:\n\n💼 *Standard Option Bot:* ₹7,000\n🚀 *Advanced AI Bot (Gemini):* ₹9,000\n\nNo hidden fees. Just trustworthy, scalable tech that pays for itself in the first few bookings.";
    }

    if (cleanOption.includes('sales') || cleanOption.includes('boosts') || cleanOption.includes('boost')) {
      return "Speed = Sales! ⚡\nToday's customers don't wait. By replying in seconds, qualifying leads 24/7, and automatically organizing their data into your sheets, our bots turn cold clicks into warm, ready-to-buy clients before your competitors even wake up.";
    }

    return "💡 *Received!* I am keeping tabs on your interest. Our founder *Ali Ahmad Ansari* can build absolute precision engines for your unique requirements.\n\nUse the interactive menu buttons to explore our workflow live.";
  };

  const handleSendMessage = (textToSend: string, sourceOption?: string) => {
    if (!textToSend.trim()) return;

    // 1. Append user selection
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      sender: 'user',
      text: textToSend,
      timestamp: getCurrentTime(),
      type: 'text'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // 2. Simulate typing and send bot reply
    setTimeout(() => {
      const responseText = getBotResponse(textToSend);
      
      // Calculate remaining options (The Waterfall Loop)
      const selected = sourceOption || textToSend;
      const remainingOptions = initialOptions.filter(
        (opt) => opt.toLowerCase().trim() !== selected.toLowerCase().trim()
      );

      const activeOptions = remainingOptions.length < 4 ? remainingOptions : initialOptions;

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: responseText,
        timestamp: getCurrentTime(),
        type: 'options',
        options: activeOptions
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  // Parses WhatsApp-style asterisk formatting securely
  const renderMessageTextWithFormatting = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const normalizedLine = line.replace(/\*\*/g, '*');
      const parts = normalizedLine.split(/\*([^*]+)\*/g);
      
      return (
        <p key={idx} className="mb-1 last:mb-0 text-slate-900 leading-relaxed font-normal break-words">
          {parts.map((p, pIdx) => {
            if (pIdx % 2 === 1) {
              return (
                <strong key={pIdx} className="font-extrabold text-[#000000]">
                  {p}
                </strong>
              );
            }
            return p;
          })}
        </p>
      );
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4" id="whatsapp-simulator">
      
      {/* Decorative Card Container with Elegant Border */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-whatsapp-teal/10 rounded-full blur-3xl -z-10"></div>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800 mb-10 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#128C7E]/20 text-[#25D366] border border-[#128C7E]/30 rounded-full text-xs font-semibold tracking-wider uppercase select-none animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              WhatsApp Conversational Agency Suite
            </div>
            
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Interactive WhatsApp Simulator
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-2xl">
              We design bespoke live tools that you can test physically. Chat with our complete smartphone mockup below to experience our automated WhatsApp lead capture sequence.
            </p>
          </div>
        </div>

        {/* Live Smartphone Interactive Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
          
          {/* Left Side Content Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#25D366] shrink-0 bg-[#128C7E]/20 p-1 rounded-lg" />
              Live Conversational Sandbox
            </h3>
            
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Most web agencies just list static paragraphs. **Ali AI Agency** gives you a full-fidelity sandbox to test. Click on any of the interactive buttons directly inside the chat response bubbles to experience simulated sequences:
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="font-extrabold text-[#25D366] block">📊 Service Models</span>
                <span className="text-slate-400">Instantly browse our full suite of support helpdesks, interactive commerce catalogs, and qualifying algorithms.</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="font-extrabold text-[#25D366] block">💰 Estimation & ROI</span>
                <span className="text-slate-400">Discover custom pricing frameworks and calculate how much you save on 24/7 staff support.</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="font-extrabold text-[#25D366] block">🤖 Interactive Floating Widget</span>
                <span className="text-[#94a3b8] leading-normal">
                  Notice the <strong className="text-[#25D366]">Floating Green WhatsApp Bubble</strong> on the bottom-right of your screen? That is our custom lead capture flow running live! Go ahead and tap it to test client conversion.
                </span>
              </div>
            </div>

            {/* CTA to Book Call */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('book-call')}
                className="bg-[#25D366] hover:bg-[#1ebd5b] text-slate-950 font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow"
              >
                <Video className="w-4 h-4" />
                Reserve Call with Ali
              </button>
              <span className="text-slate-500 font-mono text-[10px]/snug block">Active Hub:<br/>Lucknow Region</span>
            </div>
          </div>

          {/* Right Side Smartphone Mockup Column */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[340px] h-[550px] bg-slate-950 rounded-[35px] p-2.5 shadow-2xl border-4 border-slate-800 flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
              
              {/* Speaker Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 bg-slate-950 rounded-b-lg z-20 flex items-center justify-center">
                <div className="w-10 h-0.5 bg-slate-800 rounded-full"></div>
              </div>

              {/* Chat Header */}
              <div className="bg-[#075E54] text-white pt-5 pb-2 px-3 relative flex items-center justify-between shadow-md shrink-0 select-none">
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative w-8 h-8 rounded-full bg-slate-600/50 flex items-center justify-center text-white font-medium text-[11px] border-2 border-[#25D366] overflow-hidden">
                    AA
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#25D366] rounded-full border border-[#075E54]"></div>
                  </div>
                  <div>
                    <h4 className="font-black text-[11px] leading-none">Ali AI Assistant</h4>
                    <span className="text-[9px] text-[#25D366] font-medium leading-none">online</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-200">
                  <Video className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                  <Phone className="w-3 h-3 cursor-pointer hover:text-white" />
                  <MoreVertical className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                </div>
              </div>

              {/* Chat Messages Body Screen */}
              <div 
                ref={chatContainerRef} 
                className="flex-1 bg-[#ECE5DD] p-3 overflow-y-auto space-y-3 relative flex flex-col custom-scrollbar" 
                style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(18,140,126,0.06) 0%, rgba(229,221,213,0.3) 100%)' }}
              >
                <div className="self-center bg-white/80 backdrop-blur-sm shadow-sm border border-slate-200 text-slate-500 text-[9px] px-2 py-0.5 rounded font-medium tracking-wide uppercase leading-none select-none">
                  Today
                </div>

                {messages.map((msg, index) => {
                  const isLastMessage = index === messages.length - 1;
                  const showOptionsInBubble = msg.sender === 'bot' && msg.type === 'options' && msg.options && msg.options.length > 0;

                  return (
                    <div
                      key={msg.id}
                      className={`max-w-[85%] rounded-xl shadow-sm flex flex-col relative text-black text-left overflow-hidden ${
                        msg.sender === 'user'
                          ? 'bg-[#DCF8C6] self-end rounded-tr-none px-2.5 py-1.5 text-[11px]'
                          : 'bg-white self-start rounded-tl-none text-[11px]'
                      }`}
                    >
                      {/* Message Text Area */}
                      <div className={showOptionsInBubble ? 'pt-2 px-2.5 pb-1' : ''}>
                        <div className="whitespace-pre-line leading-relaxed break-words">
                          {renderMessageTextWithFormatting(msg.text)}
                        </div>

                        {/* Timestamp */}
                        <div className="text-right flex items-center justify-end gap-0.5 mt-1 text-[8px] text-slate-400">
                          <span>{msg.timestamp}</span>
                          {msg.sender === 'user' && (
                            <span className="text-[#38bdf8] font-bold">✓✓</span>
                          )}
                        </div>
                      </div>

                      {/* Attached Quick-Reply Buttons (WhatsApp Meta Logic) */}
                      {showOptionsInBubble && (
                        <div className="border-t border-slate-100 mt-2 flex flex-col divide-y divide-slate-100/90 select-none">
                          {msg.options!.map((opt, oIdx) => {
                            const isActive = isLastMessage;

                            return (
                              <button
                                key={oIdx}
                                disabled={!isActive || isTyping}
                                onClick={() => handleSendMessage(opt, opt)}
                                className={`w-full py-2.5 px-3 text-center text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors focus:outline-none ${
                                  isActive && !isTyping
                                    ? 'text-[#0070e3] hover:bg-slate-50 active:bg-slate-100 cursor-pointer'
                                    : 'text-slate-400 cursor-not-allowed bg-slate-50/50'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Animated Typing Bar */}
                {isTyping && (
                  <div className="bg-white text-slate-800 self-start rounded-xl rounded-tl-none px-2.5 py-2.5 text-xs shadow-sm flex items-center gap-1 max-w-[50px] animate-pulse">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-[#128C7E] rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                  </div>
                )}

                {/* Target scroll anchor node */}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Console */}
              <div className="p-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2 shrink-0 select-none">
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded-full shrink-0 focus:outline-none">
                  <Smile className="w-4 h-4" />
                </button>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputText.trim()) {
                      handleSendMessage(inputText);
                    }
                  }}
                  className="flex-1 flex gap-1 items-center"
                >
                  <div className="flex-1 bg-white border border-slate-200 rounded-full px-2.5 py-1.5 flex items-center gap-1">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Or type standard response..."
                      className="flex-1 text-[11px] focus:outline-none text-slate-800 bg-transparent w-full"
                    />
                    <Paperclip className="w-3 h-3 text-slate-400" />
                  </div>

                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className={`p-1.5 rounded-full flex items-center justify-center shrink-0 focus:outline-none ${
                      inputText.trim()
                        ? 'bg-[#128C7E] text-white cursor-pointer hover:bg-[#0e7165]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3 h-3 ml-0.5" />
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}