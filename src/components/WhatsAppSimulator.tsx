/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCheck, Smartphone, Sparkles, Smile, Phone, Video, MoreVertical, Paperclip, ArrowRight, Code, Copy, Check, Info } from 'lucide-react';
import { ChatMessage } from '../types';

export default function WhatsAppSimulator() {
  const [activeTab, setActiveTab] = useState<'interactive' | 'embed-code'>('interactive');
  const [copied, setCopied] = useState(false);

  // Messages state for Smartphone
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: '👋 Hello! Welcome to Ali AI Agency. I am the automated WhatsApp Assistant designed by Ali Ahmad Ansari.',
      timestamp: '09:00 AM',
      type: 'text'
    },
    {
      id: 'init-2',
      sender: 'bot',
      text: 'Explore how my AI can streamline your sales, capture leads, and provide 24/7 client care right here. What would you like to explore today?',
      timestamp: '09:01 AM',
      type: 'options',
      options: [
        '📊 Browse Service Models',
        '📅 Automate Booking Demo',
        '💰 Estimation & Pricing',
        '💡 How It Boosts Sales'
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom inside the chat container locally
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getBotResponse = (input: string): { response: string, options?: string[] } => {
    const cleanInput = input.toLowerCase().trim();

    if (cleanInput.includes('service') || cleanInput.includes('browse service') || cleanInput.includes('1') || cleanInput.includes('model')) {
      return {
        response: `📋 *Our Core Service Models:*\n\n1️⃣ **Fully Automated Customer Support Bot**: Handlers FAQs, files CRM tickets, answers inquiries 24/7.\n2️⃣ **Lead Qualification & Booking Engine**: Acts as your copywriter. Filters tire-kickers and books calls directly onto Ali Ahmad's calendar.\n3️⃣ **Interactive WhatsApp Commerce**: Features automated catalogs, orders, and payment integrations.`,
        options: ['📅 Automate Booking Demo', '💰 Estimation & Pricing']
      };
    }

    if (cleanInput.includes('booking') || cleanInput.includes('demo') || cleanInput.includes('2') || cleanInput.includes('schedule') || cleanInput.includes('call')) {
      return {
        response: `📅 *Automated Scheduling Demo:*\n\nPerfect! I can initiate a scheduling sequence in milliseconds. \n\n*Step 1:* Filter criteria: What is your monthly ad spend or lead volume?\n*Step 2:* Calendar Sync: Select from real-time available calendar slots.\n\nTo lock in an actual video call with our founder **Ali Ahmad Ansari**, scroll down to our gorgeous **Book a Video Call** section below to instantly reserve your preferred Zoom slot!`,
        options: ['💰 Estimation & Pricing', '💡 How It Boosts Sales']
      };
    }

    if (cleanInput.includes('pricing') || cleanInput.includes('estimation') || cleanInput.includes('3') || cleanInput.includes('cost') || cleanInput.includes('price')) {
      return {
        response: `💰 *Pricing & ROI Strategy:*\n\nEvery automation setup we build at *Ali AI Agency* is bespoke, designed specifically to match your CRM, custom lead flows, and products.\n\n✨ Normal setups start from simple setups to advanced integrations. Running a WhatsApp AI bot costs up to *85% less* than paying full-time 24/7 shift agents, and handles *10x the concurrent chats*!\n\nLet's negotiate! Book a strategic consultation to get a tailored pricing matrix.`,
        options: ['📊 Browse Service Models', '📅 Automate Booking Demo']
      };
    }

    if (cleanInput.includes('sales') || cleanInput.includes('boost') || cleanInput.includes('4') || cleanInput.includes('why')) {
      return {
        response: `🚀 *How AI Automation Rockets Sales:*\n\n1. *Unbeatable Speed*: Replying to a lead within 5 minutes increases conversion rates by upwards of **391%**.\n2. *No Lost Leads*: Operates instantly at 2:00 AM while you sleep.\n3. *Frictionless Discovery*: Let users discover products without leaving the WhatsApp application. Comfort breeds sales!`,
        options: ['📊 Browse Service Models', '💰 Estimation & Pricing']
      };
    }

    // Default response
    return {
      response: `💡 *Received!* I am keeping tabs on your interest. As an expert in Automation & WhatsApp, our founder *Ali Ahmad Ansari* can build absolute precision engines for your unique requirements.\n\nWould you like me to show you visual pricing models or book a direct strategy audit?`,
      options: ['📊 Browse Service Models', '📅 Automate Booking Demo', '💰 Estimation & Pricing']
    };
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const { response, options } = getBotResponse(textToSend);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: options ? 'options' : 'text',
        options: options
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };

  // Standsout HTML code to copy and paste anywhere
  const RAW_HTML_EMBED = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ali AI Agency - WhatsApp Lead Capturing Simulator</title>
  
  <!-- Font and Icons Link -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    /* Reset & Base styling */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    body {
      background-color: #f1f5f9;
      min-height: 100vh;
    }

    /* 1. Floating Trigger Bubble */
    #ali-wa-trigger {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #128C7E 0%, #25D366 100%);
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 25px -5px rgba(18, 140, 126, 0.4);
      cursor: pointer;
      z-index: 10000;
      border: 4px solid #ffffff;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    #ali-wa-trigger:hover {
      transform: scale(1.08);
      box-shadow: 0 12px 30px -5px rgba(37, 211, 102, 0.5);
    }

    #ali-wa-trigger:active {
      transform: scale(0.95);
    }

    /* Notification badge */
    #ali-wa-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background-color: #ef4444;
      color: white;
      font-size: 10px;
      font-weight: 700;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      animation: pulse-badge 2s infinite;
    }

    /* 2. Embedded WhatsApp Window */
    #ali-wa-container {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 360px;
      height: 520px;
      background-color: #ECE5DD;
      border-radius: 20px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.08);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 10000;
      animation: expand-window 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Header */
    .ali-wa-header {
      background-color: #075E54;
      color: #ffffff;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .ali-wa-profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ali-wa-avatar {
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: white;
      font-size: 14px;
      border: 2px solid #25D366;
      position: relative;
    }

    .ali-wa-avatar::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background-color: #25D366;
      border: 2px solid #075E54;
      border-radius: 50%;
    }

    .ali-wa-status {
      display: flex;
      flex-direction: column;
    }

    .ali-wa-name {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.3px;
    }

    .ali-wa-online {
      font-size: 10px;
      color: #25D366;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .ali-wa-online::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #25D366;
      border-radius: 50%;
      animation: pulse-dot 1.5s infinite;
    }

    .ali-wa-header-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ali-wa-control-btn {
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      opacity: 0.85;
      padding: 4px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .ali-wa-control-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
      opacity: 1;
    }

    /* Message Log list container */
    .ali-wa-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
      background-image: radial-gradient(ellipse at center, rgba(18,140,126,0.06) 0%, rgba(229,221,213,0.3) 100%);
    }

    .ali-wa-date-divider {
      align-self: center;
      background-color: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(0, 0, 0, 0.05);
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 10px;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }

    /* Generic Bubble formats */
    .ali-wa-message {
      max-width: 85%;
      padding: 10px 12px;
      border-radius: 12px;
      font-size: 12.5px;
      line-height: 1.5;
      position: relative;
      box-shadow: 0 1px 2px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
    }

    .ali-wa-message p {
      color: #1e293b;
      white-space: pre-line;
    }

    /* Alignment */
    .ali-wa-bot {
      background-color: #ffffff;
      align-self: flex-start;
      border-top-left-radius: 0;
    }

    .ali-wa-user {
      background-color: #DCF8C6;
      align-self: flex-end;
      border-top-right-radius: 0;
    }

    .ali-wa-time {
      font-size: 9px;
      color: #94a3b8;
      align-self: flex-end;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 2x;
    }

    .ali-wa-time i {
      color: #38bdf8;
      margin-left: 2px;
    }

    /* Typing state bubble */
    .ali-wa-typing {
      background-color: #ffffff;
      align-self: flex-start;
      border-top-left-radius: 0;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 4px;
      width: 54px;
    }

    .ali-wa-dot {
      width: 6px;
      height: 6px;
      background-color: #64748b;
      border-radius: 50%;
      animation: dot-bounce 1.4s infinite ease-in-out both;
    }

    .ali-wa-dot:nth-child(2) { animation-delay: 0.2s; }
    .ali-wa-dot:nth-child(3) { animation-delay: 0.4s; }

    /* Footer Controller and input */
    .ali-wa-footer {
      padding: 12px;
      background-color: #f1f5f9;
      border-top: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .ali-wa-form {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ali-wa-input {
      flex: 1;
      padding: 10px 16px;
      border-radius: 24px;
      border: 1px solid #cbd5e1;
      font-size: 13px;
      color: #334155;
      background-color: #ffffff;
      outline: none;
      transition: border 0.2s;
    }

    .ali-wa-input:focus {
      border-color: #128C7E;
    }

    .ali-wa-send-btn {
      width: 40px;
      height: 40px;
      background-color: #128C7E;
      color: #ffffff;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s, background-color 0.2s;
    }

    .ali-wa-send-btn:hover {
      background-color: #075E54;
      transform: scale(1.05);
    }

    .ali-wa-send-btn:disabled {
      background-color: #cbd5e1;
      cursor: not-allowed;
      transform: none;
    }

    /* Warning disclaimer banner if input finished */
    .ali-wa-disclaimer {
      background-color: rgba(18, 140, 126, 0.08);
      border: 1px solid rgba(18, 140, 126, 0.15);
      padding: 8px;
      border-radius: 10px;
      text-align: center;
      font-size: 9.5px;
      color: #075E54;
      line-height: 1.4;
      display: none;
    }

    /* Keyframe Animations */
    @keyframes expand-window {
      from {
        transform: scale(0.9) translateY(40px);
        opacity: 0;
      }
      to {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
    }

    @keyframes pulse-badge {
      0% { transform: scale(1); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }

    @keyframes pulse-dot {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }

    @keyframes dot-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  </style>
</head>
<body>

  <!-- Floating trigger -->
  <div id="ali-wa-trigger" onclick="toggleChatWindow()">
    <i data-lucide="message-square"></i>
    <div id="ali-wa-badge">1</div>
  </div>

  <!-- Chat container -->
  <div id="ali-wa-container">
    
    <!-- Custom Header banner -->
    <div class="ali-wa-header">
      <div class="ali-wa-profile">
        <div class="ali-wa-avatar">AA</div>
        <div class="ali-wa-status">
          <span class="ali-wa-name">Ali AI Agency Bot</span>
          <span class="ali-wa-online">online</span>
        </div>
      </div>
      
      <div class="ali-wa-header-controls">
        <button class="ali-wa-control-btn" onclick="resetChatFlow()" title="Restart Session">
          <i data-lucide="rotate-ccw" style="width: 14px; height: 14px;"></i>
        </button>
        <button class="ali-wa-control-btn" onclick="toggleChatWindow()" title="Close chat">
          <i data-lucide="x" style="width: 16px; height: 16px;"></i>
        </button>
      </div>
    </div>

    <!-- Active Messages Panel -->
    <div class="ali-wa-body" id="ali-wa-body">
      <div class="ali-wa-date-divider">Today</div>
      <!-- Messages injected here dynamically -->
    </div>

    <!-- Footer chat triggers inputs -->
    <div class="ali-wa-footer">
      <div class="ali-wa-disclaimer" id="ali-wa-disclaimer">
        🎉 Sequence completed! See how easily our AI captured your details? We can deploy this on your brand's website or actual WhatsApp Business line!
      </div>
      
      <form class="ali-wa-form" id="ali-wa-form" onsubmit="handleFormSubmit(event)">
        <input 
          type="text" 
          id="ali-wa-input" 
          class="ali-wa-input" 
          placeholder="Type your reply here..." 
          autocomplete="off"
          required
        >
        <button type="submit" class="ali-wa-send-btn" id="ali-wa-send-btn">
          <i data-lucide="send" style="width: 16px; height: 16px;"></i>
        </button>
      </form>
    </div>

  </div>

  <script>
    // State management
    let currentStep = 1; // 1: Greet, 2: User reacts, 3: Typing active, 4: Ask Details, 5: User details, 6: Typing active, 7: Bot Capture completed, 8: Locked
    const chatContainer = document.getElementById('ali-wa-container');
    const triggerBtn = document.getElementById('ali-wa-trigger');
    const badge = document.getElementById('ali-wa-badge');
    const msgBody = document.getElementById('ali-wa-body');
    const textInput = document.getElementById('ali-wa-input');
    const submitBtn = document.getElementById('ali-wa-send-btn');
    const disclaimer = document.getElementById('ali-wa-disclaimer');
    let hasOpenedBefore = false;

    // Toggle drawer window visibility
    function toggleChatWindow() {
      const isVisible = chatContainer.style.display === 'flex';
      if (isVisible) {
        chatContainer.style.display = 'none';
      } else {
        chatContainer.style.display = 'flex';
        badge.style.display = 'none'; // Dismiss helper notification
        
        if (!hasOpenedBefore) {
          triggerFirstGreeting();
          hasOpenedBefore = true;
        }
      }
    }

    function getFormattedTime() {
      const d = new Date();
      let hrs = d.getHours();
      let mins = d.getMinutes();
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      hrs = hrs % 12;
      hrs = hrs ? hrs : 12; 
      mins = mins < 10 ? '0' + mins : mins;
      return hrs + ':' + mins + ' ' + ampm;
    }

    // Append standard generic message bubble
    function appendMessageBubble(sender, text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = \`ali-wa-message \${sender === 'bot' ? 'ali-wa-bot' : 'ali-wa-user'}\`;
      
      const p = document.createElement('p');
      p.innerText = text;
      
      const timeSpan = document.createElement('span');
      timeSpan.className = 'ali-wa-time';
      timeSpan.innerText = getFormattedTime();
      
      // Inject blue double tick mark for user messages to make it look incredibly authentic
      if (sender === 'user') {
        const iCheck = document.createElement('i');
        iCheck.setAttribute('data-lucide', 'check-check');
        iCheck.style.width = '12px';
        iCheck.style.height = '12px';
        iCheck.style.color = '#38bdf8';
        iCheck.style.marginLeft = '4px';
        timeSpan.appendChild(iCheck);
      }

      msgDiv.appendChild(p);
      msgDiv.appendChild(timeSpan);
      msgBody.appendChild(msgDiv);
      
      // Auto-scroll to view bottom
      msgBody.scrollTop = msgBody.scrollHeight;
      
      // Initialise icons if Lucide is loaded
      if (window.lucide) {
        lucide.createIcons();
      }
    }

    // Typing bubble state helper
    let typingBubbleRef = null;
    function showTypingSimulator() {
      if (typingBubbleRef) return;
      
      const typingDiv = document.createElement('div');
      typingDiv.className = 'ali-wa-message ali-wa-typing';
      typingDiv.id = 'ali-wa-typing-bubble';
      
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'ali-wa-dot';
        typingDiv.appendChild(dot);
      }
      
      msgBody.appendChild(typingDiv);
      msgBody.scrollTop = msgBody.scrollHeight;
      typingBubbleRef = typingDiv;
    }

    function removeTypingSimulator() {
      if (typingBubbleRef && typingBubbleRef.parentNode) {
        typingBubbleRef.parentNode.removeChild(typingBubbleRef);
        typingBubbleRef = null;
      }
    }

    // Step-by-step logic scripts
    function triggerFirstGreeting() {
      showTypingSimulator();
      setTimeout(() => {
        removeTypingSimulator();
        appendMessageBubble('bot', "Hi! 👋 Welcome to Ali AI Agency. Are you looking to automate your customer replies and get more leads?");
        currentStep = 2; // Transition to waiting for user reply
      }, 1000);
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      const text = textInput.value.trim();
      if (!text || currentStep > 7) return;

      // 1. Post User reply
      appendMessageBubble('user', text);
      textInput.value = '';

      // 2. Compute sequential bot actions
      if (currentStep === 2) {
        // Advanced details ask trigger (Steps 3 & 4)
        currentStep = 3;
        textInput.disabled = true;
        submitBtn.disabled = true;
        
        setTimeout(() => {
          showTypingSimulator();
        }, 300);

        setTimeout(() => {
          removeTypingSimulator();
          appendMessageBubble('bot', "That's exactly what we do! We build 24/7 AI WhatsApp salesmen. To show you a personalized roadmap, could you please tell me your Name and your Business Industry?");
          textInput.disabled = false;
          submitBtn.disabled = false;
          textInput.focus();
          currentStep = 5; // Ready to capture details
        }, 1800);

      } else if (currentStep === 5) {
        // Complete Lead conversion (Steps 6 & 7)
        currentStep = 6;
        textInput.disabled = true;
        submitBtn.disabled = true;

        setTimeout(() => {
          showTypingSimulator();
        }, 300);

        setTimeout(() => {
          removeTypingSimulator();
          appendMessageBubble('bot', "Awesome! I've saved your details securely in our database. 🎯 Our founder will reach out shortly.\\n\\nSee how easy it was to capture your lead without a boring form? We can build this for YOU!");
          
          // Disable form completely & show final call banner
          disclaimer.style.display = 'block';
          currentStep = 8; // Concluded
        }, 1800);
      }
    }

    function resetChatFlow() {
      msgBody.innerHTML = '<div class="ali-wa-date-divider">Today</div>';
      textInput.disabled = false;
      submitBtn.disabled = false;
      disclaimer.style.display = 'none';
      currentStep = 1;
      typingBubbleRef = null;
      triggerFirstGreeting();
    }

    // Initialize initial icons on render
    lucide.createIcons();
  </script>
</body>
</html>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RAW_HTML_EMBED);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4" id="whatsapp-simulator">
      
      {/* Decorative Grid and Background */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-whatsapp-teal/10 rounded-full blur-3xl -z-10"></div>
        
        {/* Module Header and Tabs Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800 mb-10 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-whatsapp-teal/20 text-whatsapp-green border border-whatsapp-teal/30 rounded-full text-xs font-semibold tracking-wider uppercase font-display select-none">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              WhatsApp Conversational Agency Suite
            </div>
            
            <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight text-white leading-tight">
              Interactive WhatsApp Simulator
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-2xl">
              We design bespoke live tools that you can test physically. Use the tabs below to interact with our complete smartphone mockup, or view and copy the raw lightweight HTML code of our lead capture widget.
            </p>
          </div>

          {/* Tab Button Segment */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 select-none">
            <button
              id="tab-interactive-btn"
              onClick={() => setActiveTab('interactive')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'interactive'
                  ? 'bg-whatsapp-teal text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Smartphone Sandbox
            </button>

            <button
              id="tab-embed-btn"
              onClick={() => setActiveTab('embed-code')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'embed-code'
                  ? 'bg-whatsapp-teal text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Lead Widget Embed Code
            </button>
          </div>
        </div>

        {/* TAB 1 CONTENT: Smartphone Interactive Node */}
        {activeTab === 'interactive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
            
            {/* Left Column Copy (5-cols) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <h3 className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-whatsapp-green shrink-0 bg-whatsapp-teal/20 p-1 rounded-lg" />
                Live Conversational Sandbox
              </h3>
              
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Most web agencies just list word packages. **Ali AI Agency** gives you a full-fidelity sandbox to test. Click on any of the automated options inside the smartphone message feed to instantly invoke:
              </p>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                  <span className="font-extrabold text-whatsapp-green block">📊 Service Models</span>
                  <span className="text-slate-400">Instantly browse our full suite of support helpdesks, interactive commerce catalogs, and qualifying algorithms.</span>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                  <span className="font-extrabold text-whatsapp-green block">💰 Estimation & ROI</span>
                  <span className="text-slate-400">Discover custom pricing frameworks and calculate how much you save on 24/7 staff support.</span>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                  <span className="font-extrabold text-whatsapp-green block">🤖 Interactive Floating Widget</span>
                  <span className="text-slate-400 leading-normal">
                    Notice the **Floating Green WhatsApp Bubble** on the bottom-right of your screen? That is our custom lead capture flow running live! Go ahead and tap it to test client conversion.
                  </span>
                </div>
              </div>

              {/* Booking CTAs */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4">
                <button
                  id="tab-interactive-book-btn"
                  onClick={() => scrollToSection('book-call')}
                  className="bg-whatsapp-green hover:bg-whatsapp-green/90 text-slate-950 font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  Reserve Call with Ali
                </button>
                <span className="text-slate-500 font-mono text-[10px]/snug block">Active Hub:<br/>Lucknow Region</span>
              </div>
            </div>

            {/* Right Column: High-Fi Mockup smartphone (7-cols) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-[340px] h-[550px] bg-slate-950 rounded-[35px] p-2.5 shadow-2xl border-4 border-slate-800 flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
                
                {/* Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 bg-slate-950 rounded-b-lg z-20 flex items-center justify-center">
                  <div className="w-10 h-0.5 bg-slate-850 rounded-full"></div>
                </div>

                {/* WhatsApp Chat Layout Container */}
                <div className="bg-[#075E54] text-white pt-5 pb-2 px-3 relative flex items-center justify-between shadow-md shrink-0">
                  <div className="flex items-center gap-2 mt-1">
                    <div className="relative w-8 h-8 rounded-full bg-slate-600/50 flex items-center justify-center text-white font-display font-medium text-[11px] border-2 border-whatsapp-green overflow-hidden">
                      AA
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-whatsapp-green rounded-full border border-[#075E54]"></div>
                    </div>
                    <div>
                      <h4 className="font-display font-black text-[11px] leading-none">Ali AI Assistant</h4>
                      <span className="text-[9px] text-[#25D366] font-medium leading-none">online</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-200">
                    <Video className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                    <Phone className="w-3 h-3 cursor-pointer hover:text-white" />
                    <MoreVertical className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Messages Body Scroll log */}
                <div ref={chatContainerRef} className="flex-1 bg-[#ECE5DD] p-3 overflow-y-auto space-y-3 relative flex flex-col" style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(18,140,126,0.06) 0%, rgba(229,221,213,0.3) 100%)' }}>
                  <div className="self-center bg-white/80 backdrop-blur-sm shadow-sm border border-slate-350 text-slate-500 text-[9px] px-2 py-0.5 rounded font-medium tracking-wide uppercase leading-none select-none">
                    Today
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[11px] shadow-sm flex flex-col relative text-slate-850 text-left ${
                        msg.sender === 'user'
                          ? 'bg-[#DCF8C6] self-end rounded-tr-none'
                          : 'bg-white self-start rounded-tl-none'
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed">
                        {msg.text.split('\n').map((line, idx) => {
                          let formattedLine = line;
                          const boldRegex = /\*\*(.*?)\*\*/g;
                          const singleBoldRegex = /\*(.*?)\*/g;
                          
                          return (
                            <p key={idx} className="mb-0.5">
                              {line.split(boldRegex).map((phrase, pIdx) => {
                                if (pIdx % 2 === 1) {
                                  return <strong key={pIdx} className="font-extrabold text-slate-950">{phrase}</strong>;
                                }
                                return phrase.split(singleBoldRegex).map((wordPhrase, wIdx) => {
                                  if (wIdx % 2 === 1) {
                                    return <strong key={wIdx} className="font-semibold text-slate-950">{wordPhrase}</strong>;
                                  }
                                  return wordPhrase;
                                });
                              })}
                            </p>
                          );
                        })}
                      </div>

                      {msg.type === 'options' && msg.options && (
                        <div className="mt-2 space-y-1 pt-1.5 border-t border-slate-100/80">
                          {msg.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              id={`tab-opt-${oIdx}`}
                              onClick={() => handleSendMessage(opt)}
                              className="w-full text-left bg-whatsapp-teal/5 hover:bg-whatsapp-teal/15 active:bg-whatsapp-teal/20 text-[#128C7E] font-bold px-2 py-1.5 rounded-lg border border-whatsapp-teal/10 transition-colors flex items-center justify-between text-[10px]"
                            >
                              {opt}
                              <ArrowRight className="w-2.5 h-2.5 text-[#128C7E]" />
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="self-end flex items-center gap-0.5 mt-0.5 text-[8px] text-slate-400">
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'user' && (
                          <span className="text-[#38bdf8] font-bold">✓✓</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="bg-white text-slate-800 self-start rounded-xl rounded-tl-none px-2.5 py-2 text-xs shadow-sm flex items-center gap-1 max-w-[50px]">
                      <span className="w-1.5 h-1.5 bg-slate-450 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-450 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-450 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  )}
                </div>

                {/* Input Console */}
                <div className="p-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-1 shrink-0">
                  <button id="smiles-ico" className="p-1 text-slate-400 hover:text-slate-600 rounded-full shrink-0">
                    <Smile className="w-4 h-4" />
                  </button>
                  
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(inputText);
                    }}
                    className="flex-1 flex gap-1 items-center"
                  >
                    <div className="flex-1 bg-white border border-slate-200 rounded-full px-2.5 py-1.5 flex items-center gap-1">
                      <input
                        id="phone-chat-input-field"
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type standard response..."
                        className="flex-1 text-[11px] focus:outline-none text-slate-800 bg-transparent"
                      />
                      <Paperclip className="w-3 h-3 text-slate-400" />
                    </div>

                    <button
                      id="phone-send-arrow-btn"
                      type="submit"
                      disabled={!inputText.trim()}
                      className={`p-1.5 rounded-full flex items-center justify-center shrink-0 ${
                        inputText.trim()
                          ? 'bg-[#128C7E] text-white'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 2 CONTENT: Standalone HTML embed code exporter */}
        {activeTab === 'embed-code' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left animate-fade-in">
            
            {/* Left Description and flow guides (5-cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-whatsapp-green bg-whatsapp-teal/20 p-1 rounded-lg" />
                Single-File HTML Code
              </h3>
              
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl flex items-start gap-3">
                <Info className="w-4 h-4 text-whatsapp-green shrink-0 mt-0.5" />
                <p className="text-slate-400 text-xs leading-normal">
                  Copy and paste this lightweight single-file embed directly into your standard `.html` templates, Shopify theme files, WordPress widgets, or web portals. It runs native JS and requires **no external dependencies** or hosting servers.
                </p>
              </div>

              <div>
                <h4 className="text-slate-200 text-xs uppercase font-extrabold tracking-wider mb-2">Sequential Action Logic included</h4>
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-whatsapp-teal/20 text-whatsapp-green flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                    <span>**Auto-Greeting**: Instantly prompts user with automated value hooks.</span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-whatsapp-teal/20 text-whatsapp-green flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                    <span>**Typing Mimicry**: Introduces interactive 1.5s visual typing delays.</span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-whatsapp-teal/20 text-whatsapp-green flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                    <span>**Prompt Details**: Proactively asks for Name and Business Category.</span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-whatsapp-teal/20 text-whatsapp-green flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                    <span>**Zero Friction Lead Capture**: Successfully submits details and shows beautiful validation state before deactivating inputs to avoid redundant replies.</span>
                  </li>
                </ul>
              </div>

              {/* Reset booking sync notice */}
              <div className="p-3.5 bg-gradient-to-r from-teal-950 to-slate-950 border border-teal-900 rounded-xl">
                <p className="text-[#25D366] text-[11px] font-mono leading-normal">
                  💡 *Cool Feature*: The floating widget running live at the bottom-right of this agency website is mapped to this exact sequence. Try submitting a test lead in the floater now and watch it sync onto the reserved meetings panel below instantly!
                </p>
              </div>
            </div>

            {/* Right formatted code editor (7-cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between bg-slate-950 border border-slate-850 px-4 py-2.5 rounded-t-xl shrink-0">
                <span className="text-slate-400 text-xs font-mono">whatsapp-embed-widget.html</span>
                
                <button
                  id="tab-copy-code-btn"
                  onClick={copyToClipboard}
                  className="bg-whatsapp-teal hover:bg-whatsapp-dark text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer select-none"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-whatsapp-green animate-scale-in" />
                      <span className="text-whatsapp-green font-extrabold text-xs">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Embed Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code visual scroll box */}
              <div className="bg-slate-950 border-x border-b border-slate-850 p-4 rounded-b-xl max-h-[420px] overflow-y-auto shadow-inner text-left">
                <pre className="text-[10px] font-mono text-slate-300 leading-normal whitespace-pre-wrap select-all">
                  {RAW_HTML_EMBED}
                </pre>
              </div>

              <p className="text-[10px] text-slate-500 font-mono text-center">
                Press Ctrl+A on the block above, or use the "Copy Embed Code" shortcut buttons.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
