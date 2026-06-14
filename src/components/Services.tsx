/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageSquare, Bot, Database, Zap, Sparkles, CheckCircle, Smartphone, ArrowRight, Share2, ClipboardList } from 'lucide-react';

export default function Services() {
  const CORE_FEATURES = [
    {
      icon: <Bot className="w-6 h-6 text-whatsapp-teal" />,
      title: "Generative AI FAQ Automations",
      desc: "We build systems powered by custom-prompted LLMs that understand user intent, answer complex inquiries, and respond to files/images like an elite human operator."
    },
    {
      icon: <Database className="w-6 h-6 text-whatsapp-teal" />,
      title: "CRM & Database Syncing",
      desc: "Every detail captured by your WhatsApp bot synchronizes instantly onto HubSpot, Salesforce, Google Sheets, or custom SQL databases based on direct triggers."
    },
    {
      icon: <Zap className="w-6 h-6 text-whatsapp-teal" />,
      title: "Automated Broadcast Triggers",
      desc: "Deploy highly qualified notification templates automatically when a user abandons a cart, registers for an event, or places an order, boosting conversion by 45%."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-whatsapp-teal" />,
      title: "Interactive Commerce Catalogs",
      desc: "Enable clients to explore, add products to their shopping list, and execute payments directly inside the WhatsApp chat bubble without redirecting to secondary platforms."
    },
    {
      icon: <Share2 className="w-6 h-6 text-whatsapp-teal" />,
      title: "Multi-Language Capabilities",
      desc: "Our AI systems automatically detect client browser/chat signals to reply in Hindi, English, Urdu, Spanish, or any other regional dialects natively."
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-whatsapp-teal" />,
      title: "Lead Qualification Pipelines",
      desc: "Program the bot to screen prospects based on budget or lead size before giving them access to your premium scheduling links, stopping tire-kickers."
    }
  ];

  const ROADMAP_STEPS = [
    {
      num: "01",
      title: "Bespoke Blueprinting",
      desc: "We analyze your existing workflows to map out optimal customer trigger loops and API endpoints."
    },
    {
      num: "02",
      title: "Meta API Configuration",
      desc: "We configure your official Meta Business Developer setup and secure your dedicated WhatsApp Business API account."
    },
    {
      num: "03",
      title: "Prompt Engineering & Guardrails",
      desc: "Our team drafts strict behavioral rules and context databases, teaching the bot exactly what to say and what to avoid."
    },
    {
      num: "04",
      title: "Full-Stack API Integration",
      desc: "We build webhook bridges linking WhatsApp replies directly to your internal CRMs, calendar managers, or inventory."
    },
    {
      num: "05",
      title: "UAT Auditing & Launch",
      desc: "After severe edge-case stress testing, your bot goes live with professional dashboard analytics in full operation."
    }
  ];

  return (
    <div className="w-full bg-white py-24 px-4 scroll-mt-10" id="features">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Core Services Section */}
        <div className="space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-whatsapp-teal/10 text-whatsapp-teal rounded-full text-xs font-semibold tracking-wide uppercase font-display">
              <MessageSquare className="w-3.5 h-3.5" />
              What We Excel At
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
              AI WhatsApp <span className="text-whatsapp-teal">Automation Services</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed animate-fade-in">
              Email has a 20% open rate. Standard SMS is full of spam. WhatsApp is the absolute king of communication with **98% open rates**. We construct bespoke systems to help you capture that engagement.
            </p>
          </div>

          {/* Grid of services cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_FEATURES.map((feature, idx) => (
              <div 
                key={idx}
                id={`service-card-${idx}`}
                className="p-6 md:p-8 bg-slate-50 border border-slate-200 hover:border-whatsapp-teal/40 hover:shadow-lg transition-all duration-300 rounded-3xl text-left space-y-5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-2.5 shadow-sm group-hover:bg-whatsapp-teal group-hover:text-white transition-colors duration-300 shrink-0">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-slate-900 text-lg group-hover:text-whatsapp-teal transition-colors duration-250">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Deployment Roadmap Timeline */}
        <div className="border-t border-slate-100 pt-20 space-y-16 text-left">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-whatsapp-teal/10 text-whatsapp-teal rounded-full text-xs font-semibold tracking-wide uppercase font-display mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Deployment Pipeline
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-black text-slate-900 tracking-tight leading-tight">
              Our 5-Step Process to <span className="text-whatsapp-teal">Automated Operations</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-2">
              From the initial idea block to full live dashboard analytics, we ensure everything runs smoothly and securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ROADMAP_STEPS.map((step, idx) => (
              <div 
                key={idx}
                id={`step-${step.num}`}
                className="p-6 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl relative space-y-4 flex flex-col justify-between"
              >
                <span className="text-4xl font-display font-black text-whatsapp-teal/15 absolute top-4 right-4 leading-none select-none">
                  {step.num}
                </span>

                <div className="space-y-2">
                  <h4 className="font-display font-bold text-slate-900 text-sm leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-whatsapp-teal font-bold pt-2 border-t border-slate-200">
                  <CheckCircle className="w-3.5 h-3.5 text-whatsapp-teal shrink-0" />
                  <span>Phase Approved</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
