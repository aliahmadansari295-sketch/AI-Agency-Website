/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { AGENCY_FAQS } from '../data/demos';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full bg-slate-50 py-24 px-4 scroll-mt-10" id="faq">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-whatsapp-teal/10 text-whatsapp-teal rounded-full text-xs font-semibold tracking-wide uppercase font-display animate-pulse">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
            Frequently Asked <span className="text-whatsapp-teal">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Everything you need to know about setting up, verifying, and optimizing AI-driven bots for WhatsApp.
          </p>
        </div>

        {/* Interactive Accordion Stream */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {AGENCY_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white border rounded-2xl overflow-hidden transition-all duration-350 select-none text-left shadow-sm"
                style={{
                  borderColor: isOpen ? 'rgb(18, 140, 126)' : 'rgb(226, 232, 240)',
                  boxShadow: isOpen ? '0 10px 15px -3px rgba(18, 140, 126, 0.04)' : ''
                }}
              >
                {/* Accordion Toggle Active trigger header */}
                <button
                  id={`faq-trigger-${idx}`}
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left font-display font-bold text-slate-900 hover:text-whatsapp-teal transition-colors outline-none cursor-pointer text-sm md:text-base gap-4"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-whatsapp-teal shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {/* Collapsible Answer container */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-50 border-dashed animate-fade-in">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Simple CTA Footnote */}
        <div className="p-6 bg-gradient-to-br from-whatsapp-teal/5 to-emerald-500/5 border border-whatsapp-teal/15 rounded-2xl max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 leading-relaxed">
            <Sparkles className="w-4 h-4 text-whatsapp-teal animate-pulse" />
            Have a highly specialized question about integration APIs or custom CRM setups?
          </p>
          <p className="text-[11px] text-slate-500">
            Founder and Specialist, **Ali Ahmad Ansari**, can help address these queries in detail. Scroll up to book a complimentary strategic meeting!
          </p>
        </div>

      </div>
    </div>
  );
}
