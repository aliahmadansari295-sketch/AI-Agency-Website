/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bot, MessageSquare, ArrowRight, Video, Sparkles, Smartphone, CheckCircle } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-slate-900 text-white pt-28 pb-20 md:pb-32 px-4 overflow-hidden" id="hero">
      
      {/* Decorative Grid and Ambient Lights */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] -z-10"></div>
      <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] rounded-full bg-whatsapp-teal/15 blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Grid: Key Pitch Copy (7-cols) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-whatsapp-teal/20 text-whatsapp-green border border-whatsapp-teal/30 rounded-full text-xs font-semibold tracking-wider uppercase font-display animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Founder: Ali Ahmad Ansari • Automation Expert
          </div>

          {/* Main Massive Headings */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight leading-none text-white">
              We Automate Your Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-whatsapp-green to-whatsapp-teal">Via WhatsApp AI</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-sans max-w-2xl">
              **Ali AI Agency** designs, builds, and maintains custom conversational AI bots for WhatsApp Business. Sync leads with your CRM, automate sales pipelines, and reply to client FAQs instantly and 24/7.
            </p>
          </div>

          {/* Call to Actions Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              id="hero-book-cta-btn"
              onClick={() => scrollToSection('book-call')}
              className="bg-whatsapp-green hover:bg-whatsapp-green/90 text-slate-950 font-bold px-6 py-4 rounded-xl transition-all shadow hover:shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
            >
              <Video className="w-4 h-4 text-slate-950" />
              Book Video Call
            </button>
            
            <button
              id="hero-watch-cta-btn"
              onClick={() => scrollToSection('video-demos')}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-whatsapp-green" />
              Watch Live Bot Demos
            </button>
            
            <button
              id="hero-try-simulator-btn"
              onClick={() => scrollToSection('whatsapp-simulator')}
              className="bg-whatsapp-teal/10 hover:bg-whatsapp-teal/20 text-whatsapp-green border border-whatsapp-teal/30 font-semibold px-5 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              Try Live Simulator
            </button>
          </div>

          {/* Features checkmarks stack */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-slate-800 pt-8 text-xs md:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-whatsapp-green shrink-0" />
              <span>Full Meta API Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-whatsapp-green shrink-0" />
              <span>CRM & Sheets Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-whatsapp-green shrink-0" />
              <span>98% Message Open Rates</span>
            </div>
          </div>
        </div>

        {/* Right Grid: Large High-Tech Isometric Graphic (5-cols) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-[340px] aspect-square rounded-3xl bg-gradient-to-br from-whatsapp-teal/20 to-emerald-500/5 border border-slate-800 p-8 shadow-2xl flex flex-col justify-between overflow-hidden group">
            
            <div className="absolute inset-0 bg-radial-gradient from-whatsapp-teal/30 via-transparent to-transparent opacity-50"></div>
            
            {/* Top Interactive Row */}
            <div className="flex justify-between items-start z-10">
              <span className="bg-slate-900 border border-slate-800 px-3 py-1 text-[10px] uppercase font-bold text-slate-300 rounded-lg tracking-wide shrink-0">
                AI Agent Status: Active
              </span>
              <Bot className="w-9 h-9 text-whatsapp-green bg-whatsapp-teal/10 p-1.5 rounded-xl border border-whatsapp-teal/20 shrink-0" />
            </div>

            {/* Simulated Live Statistics display inside hero banner */}
            <div className="space-y-4 z-10 text-left mt-6">
              <div className="text-[10px] uppercase font-bold tracking-wider text-whatsapp-green">WhatsApp Agency Hub</div>
              <h2 className="text-2xl font-display font-black leading-tight text-white">98% customer engagement rates achieved</h2>
              <p className="text-slate-400 text-xs">
                Email and SMS campaigns struggle with 15% open rates. Our automated WhatsApp funnels put your product right into your clients' pockets instantly.
              </p>
            </div>

            {/* Bottom floating details */}
            <div className="border-t border-slate-800 pt-4 flex justify-between items-center z-10 text-xs">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 block uppercase font-bold">Lucknow Hub</span>
                <span className="font-semibold text-slate-300 font-display">Bijnor, Uttar Pradesh</span>
              </div>
              <button 
                id="hero-details-scroll"
                onClick={() => scrollToSection('features')}
                className="text-whatsapp-green hover:underline flex items-center gap-1 font-semibold text-xs cursor-pointer"
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
