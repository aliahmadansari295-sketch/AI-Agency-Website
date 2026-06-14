/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, ExternalLink, Calendar, MessageSquare, Briefcase, Award, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const emailVal = "aliahmadansari803@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900 text-white py-24 px-4 scroll-mt-10 relative overflow-hidden" id="contact">
      
      {/* Visual Ambiance Lights */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-whatsapp-teal/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl -z-10"></div>

      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-whatsapp-teal/20 text-whatsapp-green rounded-full text-xs font-semibold tracking-wide uppercase font-display">
            <Mail className="w-3.5 h-3.5" />
            Connect With Ali
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight leading-none">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-whatsapp-green to-whatsapp-teal">Exceptional</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            Ready to integrate AI into your sales loop? Access the direct communications hub of our founder, **Ali Ahmad Ansari**, below.
          </p>
        </div>

        {/* Layout Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Founder Executive Profile Card (5-cols) */}
          <div className="lg:col-span-5 bg-slate-950/60 backdrop-blur border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col justify-between text-left space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-whatsapp-teal/15 rounded-full blur-2xl"></div>
            
            <div className="space-y-6">
              {/* Leader Avatar & Badge */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-whatsapp-teal to-whatsapp-green flex items-center justify-center text-slate-950 text-2xl font-display font-black shadow-lg relative">
                  AA
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-display font-extrabold text-white">Ali Ahmad Ansari</h3>
                  <span className="inline-block px-2 py-0.5 bg-whatsapp-teal/20 text-whatsapp-green text-[10px] rounded-md font-extrabold border border-whatsapp-teal/20 uppercase tracking-widest leading-none">
                    Founder & CEO
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                As a specialized **Automation Expert & WhatsApp Specialist**, Ali designs high-fidelity transactional loops, conversation graphs, and custom API-backed triggers to eliminate your client-response latency once and for all.
              </p>

              {/* Badges stack */}
              <div className="space-y-3.5 border-t border-slate-800/80 pt-6 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-whatsapp-green bg-whatsapp-green/10 p-0.5 rounded shrink-0" />
                  <span>WhatsApp Business API Specialist</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-whatsapp-green bg-whatsapp-green/10 p-0.5 rounded shrink-0" />
                  <span>Prompt Engineering & Lead Qualifying</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-whatsapp-green bg-whatsapp-green/10 p-0.5 rounded shrink-0" />
                  <span>Meta Official Compliance Assurance</span>
                </div>
              </div>
            </div>

            {/* Business Location Info */}
            <div className="border-t border-slate-800/85 pt-6 flex items-start gap-3 text-xs text-slate-400">
              <MapPin className="w-5 h-5 text-whatsapp-teal shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-500">Corporate Headquarters</span>
                <p className="font-semibold text-slate-200">Bijnor, Lucknow, Uttar Pradesh</p>
                <p className="text-[10px]">India, Pin Code Region</p>
              </div>
            </div>

          </div>

          {/* Column 2: Interactive Location map & Clickable Copy Email Console (7-cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Direct Email Hub Console */}
            <div className="bg-slate-950/40 border border-slate-800 p-6 md:p-8 rounded-3xl text-left space-y-6">
              <h3 className="text-base font-display font-extrabold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-whatsapp-teal" />
                Contact Credentials
              </h3>
              <p className="text-slate-400 text-xs shadow-sm">
                Need customized enterprise volume rates or custom bot schemas? Shoot an email directly to our office team. We guarantee a reply in under 3 hours.
              </p>

              {/* Email Copier Block */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                <div className="space-y-1 overflow-hidden">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Direct Email Handle</span>
                  <p className="font-mono text-xs md:text-sm text-whatsapp-green font-bold truncate select-all">{emailVal}</p>
                </div>
                
                <button
                  id="email-copy-btn"
                  onClick={handleCopy}
                  className="bg-slate-900 border border-slate-800 hover:bg-slate-800 p-2.5 md:px-4 md:py-2.5 rounded-xl transition-all text-xs font-bold flex items-center gap-2 select-none cursor-pointer text-slate-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-whatsapp-green animate-scale-in" />
                      <span className="hidden md:inline text-whatsapp-green">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden md:inline">Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mail to Trigger action */}
              <a
                id="mail-to-anchor"
                href={`mailto:${emailVal}?subject=AI%20WhatsApp%20Automation%20Consultation%20Request&body=Hi%20Ali%2C%0A%0AI%20explored%20your%20agency%20website%20and%20would%20love%20to%20consult%20about%20a%20WhatsApp%20bot%20setup%20for%20my%20business.%0A%0ACompany%20Name%3A%20%0AOur%20Monthly%20Lead%20Inflow%3A%20`}
                className="w-full bg-whatsapp-teal hover:bg-whatsapp-dark text-white font-bold text-xs py-4 rounded-xl transition-all shadow hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                Launch Mail Client
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Geography Visual Canvas mockup */}
            <div className="bg-slate-950/40 border border-slate-850 p-6 rounded-3xl text-left space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Regional Expertise</h4>
                <div className="text-white font-display font-black text-sm mt-1">Lucknow & Uttar Pradesh Regional Hub</div>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  While our AI products deploy internationally across CRMs worldwide, we are proud to operate and lead technology paradigms out of **Lucknow, Uttar Pradesh, India**.
                </p>
              </div>

              {/* Visual Simulated Map Grid of UP */}
              <div className="w-full h-24 bg-slate-900/40 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center mt-3">
                <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:16px_16px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-whatsapp-teal/20 rounded-full blur-2xl"></div>
                
                {/* Center marker */}
                <div className="relative text-center z-10 space-y-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-whatsapp-green inline-block animate-ping"></span>
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Bijnor, Lucknow Node Connected</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
