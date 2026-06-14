/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, X, Check, Eye } from 'lucide-react';

interface WidgetMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function FloatingWhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 to 8 sequence
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewBadge, setHasNewBadge] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside widget
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle auto-greeting on launch/mount or when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerBotGreeting();
    }
  }, [isOpen]);

  // Simulate notification pulse initially
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setHasNewBadge(true);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const triggerBotGreeting = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          id: 'msg-greet',
          sender: 'bot',
          text: "Hi! 👋 Welcome to Ali AI Agency. Are you looking to automate your customer replies and get more leads?",
          timestamp: getCurrentTime()
        }
      ]);
      setIsTyping(false);
      setStep(2); // Waiting for user's initial reaction
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping || step > 7) return;

    const userText = inputText.trim();
    const newMsg: WidgetMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: getCurrentTime()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Advance logic sequences
    if (step === 2) {
      // User replied to auto-greeting. Move to Step 3 & 4 (Typing -> Value Pitch)
      setIsTyping(true);
      setStep(3); // States typing active

      setTimeout(() => {
        setIsTyping(false);
        const pitchMsg: WidgetMessage = {
          id: `bot-pitch-${Date.now()}`,
          sender: 'bot',
          text: "That's exactly what we do! We build 24/7 AI WhatsApp salesmen. To show you a personalized roadmap, could you please tell me your Name and your Business Industry?",
          timestamp: getCurrentTime()
        };
        setMessages(prev => [...prev, pitchMsg]);
        setStep(5); // Waiting for Name & Industry
      }, 1500);

    } else if (step === 5) {
      // User typed their details. Move to Step 6 & 7 (Typing -> Capture Completion notice)
      setIsTyping(true);
      setStep(6);

      // Save offline mock lead to localStorage for the user to see immediately
      try {
        const currentData = localStorage.getItem('ali_agency_bookings') || '[]';
        const parseList = JSON.parse(currentData);
        parseList.push({
          id: `lead-${Date.now()}`,
          clientName: userText.substring(0, 40),
          clientEmail: 'captured-via-floater@widget.demo',
          companyName: 'WhatsApp Sandbox Lead',
          date: 'Immediate Follow-up requested',
          timeSlot: 'ASAP Strategy Segment',
          notes: `Captured details: "${userText}"`,
          bookingType: 'strategic_call',
          status: 'confirmed',
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('ali_agency_bookings', JSON.stringify(parseList));
        
        // Dispatch local event to refresh local bookings table elsewhere
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.error("Local storage sync error: ", err);
      }

      setTimeout(() => {
        setIsTyping(false);
        const captureMsg: WidgetMessage = {
          id: `bot-capture-${Date.now()}`,
          sender: 'bot',
          text: "Awesome! I've saved your details securely in our database. 🎯 Our founder will reach out to you shortly.\n\nSee how easy it was to capture your lead without a boring web form? We can build this exact flow for YOUR target audience!",
          timestamp: getCurrentTime()
        };
        setMessages(prev => [...prev, captureMsg]);
        setStep(8); // Completed. Input disabled
      }, 1500);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInputText('');
    setIsTyping(false);
    setStep(1);
    triggerBotGreeting();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left select-none">
      
      {/* 1. THE FLOATING CONSOLE TOGGLE BUBBLE */}
      {!isOpen ? (
        <button
          id="floater-trigger-bubble"
          onClick={() => {
            setIsOpen(true);
            setHasNewBadge(false);
          }}
          className="relative w-14 h-14 bg-gradient-to-tr from-[#128C7E] to-[#25D366] hover:scale-105 active:scale-95 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ring-4 ring-white/10 cursor-pointer animate-fade-in"
          title="Chat with Ali AI Agent"
        >
          <MessageSquare className="w-6 h-6 shrink-0" />
          
          {/* Notification Alert Indicator Badge */}
          {hasNewBadge && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce border border-white">
              1
            </span>
          )}
        </button>
      ) : (
        /* 2. THE EMBEDDED CHAT WINDOW */
        <div 
          id="floating-whatsapp-console"
          className="w-[325px] sm:w-[350px] h-[480px] bg-[#ECE5DD] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200/50 animate-scale-in"
        >
          {/* WhatsApp Dark Green Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-display font-extrabold text-sm border border-white/20">
                AA
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border border-[#075E54]"></span>
              </div>
              
              <div>
                <h4 className="font-display font-extrabold text-xs tracking-wide">Ali AI Agency Bot</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse"></span>
                  <span className="text-[10px] text-teal-100 font-semibold uppercase tracking-wider">online</span>
                </div>
              </div>
            </div>

            {/* Header controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleReset}
                className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-teal-50 transition-all font-semibold"
                title="Restart chat conversation"
              >
                Reset Flow
              </button>
              <button
                id="floater-close-btn"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-rose-200 p-1 rounded-full transition-colors cursor-pointer"
                title="Close chat window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body - Doodle Textured */}
          <div 
            className="flex-1 p-3 overflow-y-auto space-y-3.5 flex flex-col relative"
            style={{ 
              backgroundImage: 'radial-gradient(ellipse at center, rgba(18,140,126,0.06) 0%, rgba(229,221,213,0.3) 100%)' 
            }}
          >
            {/* Disclaimer disclaimer bubble */}
            <div className="self-center bg-white/80 backdrop-blur-sm shadow-sm border border-slate-200/40 text-[9px] text-slate-500 font-mono py-1 px-2.5 rounded-md text-center max-w-[90%]">
              🎯 Interactive Lead Capturing Simulator
            </div>

            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`max-w-[85%] rounded-xl p-2.5 shadow-sm text-xs relative ${
                    isBot 
                      ? 'bg-white text-slate-850 self-start rounded-tl-none border border-slate-200/30' 
                      : 'bg-[#DCF8C6] text-slate-850 self-end rounded-tr-none'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  
                  {/* Timestamp & ticks segment */}
                  <div className="flex items-center justify-end gap-1 text-[8px] text-slate-400 mt-1">
                    <span>{msg.timestamp}</span>
                    {!isBot && (
                      <span className="text-sky-500">✓✓</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* "typing" bubble */}
            {isTyping && (
              <div className="bg-white text-slate-800 self-start rounded-xl rounded-tl-none p-2.5 text-xs shadow-sm flex items-center gap-1 max-w-[60px] border border-slate-200/40">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Interactive footer actions & text input */}
          <div className="p-2 bg-slate-100 border-t border-slate-250 flex flex-col gap-1.5 shrink-0">
            
            {/* Guide prompts if flow complete */}
            {step === 8 && (
              <div className="bg-[#128C7E]/10 border border-[#128C7E]/20 rounded-lg p-2 text-center space-y-1">
                <span className="text-[10px] font-bold text-[#128C7E] flex items-center justify-center gap-1">
                  ✓ Sequence Completed!
                </span>
                <p className="text-[9px] text-slate-600 leading-normal">
                  The simulator successfully captured details and saved them to your live dashboard panel below. Reset or try other website features.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-1.5 items-center">
              <input
                id="floater-input-console"
                type="text"
                disabled={step > 7}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={step > 7 ? "Conversation completed" : "Type your message..."}
                className="flex-1 bg-white border border-slate-300 rounded-full px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#128C7E] text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
              />
              
              <button
                id="floater-submit-btn"
                type="submit"
                disabled={!inputText.trim() || step > 7}
                className="p-2 bg-[#128C7E] disabled:bg-slate-300 text-white rounded-full flex items-center justify-center shrink-0 hover:bg-[#075E54] active:scale-95 transition-all text-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
