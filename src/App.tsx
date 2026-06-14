/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Smartphone, Bot, MessageSquare, Video, Mail, Menu, X, ArrowUpCircle, Sparkles } from 'lucide-react';

// Modular Components
import Hero from './components/Hero';
import Services from './components/Services';
import VideoDemos from './components/VideoDemos';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import BookingCalendar from './components/BookingCalendar';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import FloatingWhatsAppWidget from './components/FloatingWhatsAppWidget';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor screen scroll to update header backdrop & scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 font-sans flex flex-col antialiased selection:bg-whatsapp-teal selection:text-white" id="main-applet-root">
      
      {/* 1. STICKY DYNAMIC NAVIGATION HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-whatsapp-teal to-whatsapp-green flex items-center justify-center p-2 text-slate-950 font-display font-black text-lg shadow-lg group-hover:scale-105 transition-transform">
              W
            </div>
            <div className="text-left leading-none">
              <span className="text-base md:text-lg font-display font-black tracking-tight text-white block">
                Ali <span className="text-whatsapp-green">AI Agency</span>
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mt-0.5">
                WhatsApp Automation
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Inline text menu items) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <button id="nav-features-link" type="button" onClick={() => scrollToSection('features')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              Services
            </button>
            <button id="nav-demos-link" type="button" onClick={() => scrollToSection('video-demos')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              Live Demos
            </button>
            <button id="nav-sandbox-link" type="button" onClick={() => scrollToSection('whatsapp-simulator')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              Simulator
            </button>
            <button id="nav-faq-link" type="button" onClick={() => scrollToSection('faq')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              FAQs
            </button>
            <button id="nav-contact-link" type="button" onClick={() => scrollToSection('contact')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              Founder Profile
            </button>
          </nav>

          {/* Action Call Button & Burger Toggle wrapper */}
          <div className="flex items-center gap-3">
            <button
              id="header-booking-cta"
              onClick={() => scrollToSection('book-call')}
              className="hidden sm:inline-flex bg-whatsapp-green hover:bg-whatsapp-green/90 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 uppercase tracking-wider cursor-pointer font-display"
            >
              <Video className="w-3.5 h-3.5" />
              Book Video Call
            </button>

            {/* Mobile Burger trigger buttons */}
            <button
              id="mobile-menu-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden bg-slate-800 p-2 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Open Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* 2. COLLAPSIBLE MOBILE MENU DRAWER PANEL */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-overlay" className="fixed inset-0 z-30 bg-slate-950/95 backdrop-blur-lg flex flex-col justify-center animate-fade-in md:hidden">
          <div className="absolute top-6 right-6">
            <button
              id="mobile-close-nav"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-800 rounded-full text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex flex-col gap-6 items-center text-lg font-display font-extrabold text-slate-300 uppercase tracking-widest">
            <button id="mob-services" onClick={() => scrollToSection('features')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              Services Models
            </button>
            <button id="mob-demos" onClick={() => scrollToSection('video-demos')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              Live Demos
            </button>
            <button id="mob-sim" onClick={() => scrollToSection('whatsapp-simulator')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              WhatsApp Simulator
            </button>
            <button id="mob-faq" onClick={() => scrollToSection('faq')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              FAQ Database
            </button>
            <button id="mob-contact" onClick={() => scrollToSection('contact')} className="hover:text-whatsapp-green transition-colors cursor-pointer">
              Connect With Ali
            </button>

            <button
              id="mob-action"
              onClick={() => scrollToSection('book-call')}
              className="mt-6 bg-whatsapp-green hover:bg-whatsapp-green/90 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl uppercase tracking-widest cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              Book Video Call Now
            </button>
          </nav>
        </div>
      )}

      {/* 3. CORE PAGE WRAPPER SECTIONS */}
      <main className="flex-1">
        <Hero />
        <Services />
        <VideoDemos />
        <WhatsAppSimulator />
        <BookingCalendar />
        <FAQ />
        <ContactSection />
      </main>

      {/* 4. PROFESSIONAL AGENCY FOOTER SECTION */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4 border-t border-slate-900 text-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-whatsapp-teal to-whatsapp-green flex items-center justify-center text-slate-950 font-display font-extrabold text-sm">
                W
              </div>
              <h4 className="text-white font-display font-black tracking-tight text-lg">Ali AI Agency</h4>
            </div>
            
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Helping businesses implement next-generation conversational automation pipelines. We connect the custom LLM intelligence to the official WhatsApp Business REST API suite, bringing ROI immediately.
            </p>
            
            <div className="text-[10px] text-slate-600 font-mono">
              Lead Platform: WhatsApp Business API • Node.js Engine
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 font-semibold text-xs">
            <h5 className="text-slate-200 text-xs font-display font-extrabold uppercase tracking-widest">Agency Navs</h5>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">Automation Models</button></li>
              <li><button onClick={() => scrollToSection('video-demos')} className="hover:text-white transition-colors cursor-pointer">Live Video Showcases</button></li>
              <li><button onClick={() => scrollToSection('whatsapp-simulator')} className="hover:text-white transition-colors cursor-pointer">Interactive Smartphone Simulator</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">Q&A Knowledge Base</button></li>
            </ul>
          </div>

          {/* Col 3: Legal & Support credentials */}
          <div className="space-y-3 font-semibold text-xs">
            <h5 className="text-slate-200 text-xs font-display font-extrabold uppercase tracking-widest">Connect Directly</h5>
            <ul className="space-y-2">
              <li className="text-slate-300">Ali Ahmad Ansari</li>
              <li className="text-slate-500 text-[11px]">Bijnor, Lucknow, Uttar Pradesh</li>
              <li><a href="mailto:aliahmadansari803@gmail.com" className="text-whatsapp-teal hover:underline break-words">aliahmadansari803@gmail.com</a></li>
            </ul>
          </div>

        </div>

        {/* Closing copyright footnote */}
        <div className="max-w-6xl mx-auto pt-10 mt-10 border-t border-slate-900/50 flex flex-col sm:flex-row justify-between items-center text-slate-600 text-xs gap-4">
          <p>© 2026 Ali AI Agency. All rights reserved. Meta/WhatsApp are registered trademarks of Meta Platforms, Inc.</p>
          <div className="flex items-center gap-2 text-slate-500 font-display">
            <Sparkles className="w-3.5 h-3.5 text-whatsapp-green animate-pulse" />
            <span>Lucknow-Driven Engineering Excellence</span>
          </div>
        </div>
      </footer>

      {/* 5. BACK TO TOP QUICK BUTTON TRIGGER */}
      {showScrollTop && (
        <button
          id="scroll-to-top-hud"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-40 bg-slate-900 hover:bg-slate-800 text-whatsapp-green p-2.5 rounded-full border border-slate-800 hover:border-whatsapp-teal transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUpCircle className="w-5.5 h-5.5 animate-bounce" />
        </button>
      )}

      {/* 6. GLOBAL LIVE WHATSAPP SIMULATED FLOTATION CORE */}
      <FloatingWhatsAppWidget />

    </div>
  );
}
