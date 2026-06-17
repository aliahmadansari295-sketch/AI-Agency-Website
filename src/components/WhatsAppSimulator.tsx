/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Smartphone, Sparkles, Smile, Phone, Video, MoreVertical, Paperclip } from 'lucide-react';
import { ChatMessage } from '../types';

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

  // Initial messages state implementing the cascading Interactive Template Messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: "👋 Hi there! Welcome to *Ali AI Agency*. I'm Ali Ahmad Ansari, and my team builds smart automated systems so you can focus on growing your business while we handle the busywork.",
      timestamp: '09:00 AM',
      type: 'text'
    },
    {
      id: 'init-2',
      sender: 'bot',
      text: "Explore how my AI can streamline your sales, capture leads, and provide 24/7 client care right here. What would you like to explore today?",
      timestamp: '09:01 AM',
      type: 'options',
      options: initialOptions
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic utilizing block: 'nearest' to ensure smooth focus adjustment
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

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Render User Message on the right
    const userMsg: ChatMessage = {
      id: 'user-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: textToSend,
      timestamp: getCurrentTime(),
      type: 'text'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // 2. Perform mock business network latency typing
    setTimeout(() => {
      const responseText = getBotResponse(textToSend);

      // Find which option was clicked or matched, then filter it out to get the REMAINING 3 buttons
      const matchedOption = initialOptions.find(
        (opt) => opt.toLowerCase().trim() === textToSend.toLowerCase().trim()
      );

      let remainingOptions: string[] = [];
      if (matchedOption) {
        remainingOptions = initialOptions.filter((opt) => opt !== matchedOption);
      } else {
        // If they typed manually, filter out whatever fits best or show the first 3
        remainingOptions = initialOptions.slice(0, 3);
      }

      // 3. Render Bot Message on the left with REMAINING buttons attached
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9),
        sender: 'bot',
        text: responseText,
        timestamp: getCurrentTime(),
        type: 'options',
        options: remainingOptions
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  // Safe wrapper translating asterisks *bold text* and newlines safely to human-readable bubbles
  const renderMessageTextWithFormatting = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // Standardize double asterisks to single asterisks
      const normalizedLine = line.replace(/\*\*/g, '*');
      const parts = normalizedLine.split(/\*([^*]+)\*/g);

      return (
        <p key={idx} className="mb-1 last:mb-0 text-slate-900 leading-relaxed font-normal break-words whitespace-pre-wrap">
          {parts.map((p, pIdx) => {
            if (pIdx % 2 === 1) {
              return (
                <strong key={pIdx} className="font-extrabold text-black">
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
      
      {/* Outer Sleek Container */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-whatsapp-teal/10 rounded-full blur-3xl -z-10"></div>
        
        {/* Top Header Card Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800 mb-10 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-whatsapp-teal/20 text-[#25D366] border border-whatsapp-teal/30 rounded-full text-xs font-semibold tracking-wider uppercase select-none animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              WhatsApp Conversational Agency Suite
            </div>
            
            <h2 className="text-2xl md:text-4xl font-sans font-black tracking-tight text-white leading-tight">
              Interactive WhatsApp Simulator
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-2xl">
              We design bespoke conversational micro-applications. Test our state-of-the-art interactive Quick-Reply layout running directly inside the virtual mobile device below.
            </p>
          </div>
        </div>

        {/* Dynamic Sandbox Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left instructions block */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#25D366] shrink-0 bg-[#25D366]/10 p-1 rounded-lg" />
              Prototyping Sandbox
            </h3>
            
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Most platforms use outdated floated button links at the bottom of the device. **Ali AI Agency** replicates true **Meta WhatsApp Business templates**. The buttons live inside the actual conversation bubbles so the flow is sequential, clickable, and intuitive.
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                <span className="font-extrabold text-[#25D366] block">⚡ Looping Cascades</span>
                <span className="text-slate-400">Clicking an option renders the response and instantly generates the *remaining* active quick replies inside the latest message.</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                <span className="font-extrabold text-[#25D366] block">📑 Fully Parsed Typography</span>
                <span className="text-slate-400">Observe standard markdown tags (such as asterisks for extreme bolding) rendered safely in real-time.</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                <span className="font-extrabold text-[#25D366] block">📲 Full Device Mockup</span>
                <span className="text-slate-400">Simulates standard chat backdrops, headers, custom indicators, and dynamic typing latencies.</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4">
              <button
                id="tab-interactive-book-btn"
                onClick={() => scrollToSection('book-call')}
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-slate-950 font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow"
              >
                <Video className="w-4 h-4" />
                Reserve Call with Ali
              </button>
              <span className="text-slate-500 font-mono text-[10px]/snug block">Active Hub:<br/>Lucknow Region</span>
            </div>
          </div>

          {/* Right Smartphone Frame Viewport */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[340px] h-[550px] bg-slate-950 rounded-[35px] p-2.5 shadow-2xl border-4 border-slate-850 flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
              
              {/* Speaker Bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 bg-slate-950 rounded-b-lg z-20 flex items-center justify-center">
                <div className="w-10 h-0.5 bg-slate-800 rounded-full"></div>
              </div>

              {/* Elegant Meta Header */}
              <div className="bg-[#075E54] text-white pt-5 pb-2 px-3 relative flex items-center justify-between shadow-md shrink-0 select-none">
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative w-8 h-8 rounded-full bg-slate-600/50 flex items-center justify-center text-white font-medium text-[11px] border-2 border-[#25D366] overflow-hidden font-mono">
                    AM
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#25D366] rounded-full border border-[#075E54]"></div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-[11px] leading-none">Ali AI Assistant</h4>
                    <span className="text-[9px] text-[#25D366] font-medium leading-none">online</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-200">
                  <Video className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                  <Phone className="w-3 h-3 cursor-pointer hover:text-white" />
                  <MoreVertical className="w-3.5 h-3.5 cursor-pointer" />
                </div>
              </div>

              {/* Chat Viewport Area */}
              <div 
                ref={chatContainerRef} 
                className="flex-1 bg-[#ECE5DD] p-3 overflow-y-auto space-y-3 relative flex flex-col min-h-0" 
                style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(18,140,126,0.06) 0%, rgba(229,221,213,0.3) 100%)' }}
              >
                {/* Date Spacer */}
                <div className="self-center bg-white/80 backdrop-blur-sm shadow-sm border border-slate-200 text-slate-500 text-[9px] px-2 py-0.5 rounded font-semibold tracking-wide uppercase leading-none select-none">
                  Today
                </div>

                {/* Dialog Streams */}
                {messages.map((msg, index) => {
                  const isLatestMessage = index === messages.length - 1;
                  const hasInlineOptions = msg.sender === 'bot' && msg.type === 'options' && msg.options && msg.options.length > 0;

                  return (
                    <div
                      key={msg.id}
                      className={`max-w-[85%] rounded-xl shadow-sm flex flex-col relative text-black text-left overflow-auto break-words min-w-[140px] shrink-0 ${
                        msg.sender === 'user'
                          ? 'bg-[#DCF8C6] self-end rounded-tr-none px-2.5 py-1.5 text-[11px]'
                          : 'bg-white self-start rounded-tl-none text-[11px]'
                      }`}
                    >
                      {/* Message Content Area wrapper */}
                      <div className={hasInlineOptions ? 'pt-2 px-2.5 pb-1 w-full' : 'w-full'}>
                        <div className="leading-relaxed whitespace-pre-wrap w-full">
                          {renderMessageTextWithFormatting(msg.text)}
                        </div>

                        {/* Timestamp label */}
                        <div className="text-right flex items-center justify-end gap-0.5 mt-1 text-[8px] text-slate-400 select-none">
                          <span>{msg.timestamp}</span>
                          {msg.sender === 'user' && (
                            <span className="text-sky-500 font-bold">✓✓</span>
                          )}
                        </div>
                      </div>

                      {/* Attached WhatsApp Quick replies directly inside the Bubble borders */}
                      {hasInlineOptions && (
                        <div className="border-t border-slate-100 mt-2 flex flex-col divide-y divide-slate-100 select-none w-full">
                          {msg.options!.map((opt, optIdx) => {
                            // Only allow choice activation on the absolute latest bot message
                            const isClickable = isLatestMessage && !isTyping;
                            
                            return (
                              <button
                                key={optIdx}
                                id={`bubble-option-${msg.id}-${optIdx}`}
                                disabled={!isClickable}
                                onClick={() => handleSendMessage(opt)}
                                className={`w-full py-2.5 px-3 text-center text-[10px] font-bold tracking-wide flex items-center justify-center transition-colors focus:outline-none ${
                                  isClickable
                                    ? 'text-[#0070e3] hover:bg-slate-50 active:bg-slate-100 cursor-pointer'
                                    : 'text-slate-350 bg-slate-50/40 cursor-not-allowed'
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

                {/* Simulated Networking Latency Loader */}
                {isTyping && (
                  <div className="bg-white text-slate-800 self-start rounded-xl rounded-tl-none px-3 py-2.5 text-xs shadow-sm flex items-center gap-1.5 max-w-[55px] shrink-0 animate-fade-in">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#128C7E] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                )}

                {/* Target scroll down reference anchor node */}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Manual Input Console Footer */}
              <div className="p-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2 shrink-0 select-none">
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded-full focus:outline-none">
                  <Smile className="w-4 h-4" />
                </button>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputText.trim()) {
                      handleSendMessage(inputText);
                    }
                  }}
                  className="flex-1 flex gap-1 items-center min-w-0"
                >
                  <div className="flex-1 bg-white border border-slate-200 rounded-full px-2.5 py-1.5 flex items-center gap-1.5 min-w-0">
                    <input
                      id="phone-chat-input-field"
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Or write response..."
                      className="flex-1 text-[11px] focus:outline-none text-slate-800 bg-transparent min-w-0"
                    />
                    <Paperclip className="w-3 h-3 text-slate-400 shrink-0" />
                  </div>

                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className={`p-1.5 rounded-full flex items-center justify-center shrink-0 focus:outline-none ${
                      inputText.trim()
                        ? 'bg-[#128C7E] text-white cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3 h-3" />
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
