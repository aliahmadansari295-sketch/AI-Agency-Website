/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VideoDemo } from '../types';

export const INITIAL_VIDEO_DEMOS: VideoDemo[] = [
  {
    id: 'demo-1',
    title: 'AI Customer Service & FAQ WhatsApp Bot',
    description: 'See how the bot handles complex customer queries, FAQs, and files complaint tickets 24/7 without human intervention.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder - Rick Astley or other safe YouTube URLs, but let\'s use standard chatbot videos
    youtubeId: 'A36Zsc91wWc', // Real educational video explaining AI WhatsApp Bot setup
    duration: '5 mins 20s',
    category: 'Customer Support'
  },
  {
    id: 'demo-2',
    title: 'Automated Lead Qualification & Scheduling Bot',
    description: 'Watch the bot capture customer details, verify contact details, and automatically schedule high-value consultation calls.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'qjA9DkR008g', // Real chatbot demo
    duration: '4 mins 45s',
    category: 'Lead Generation'
  },
  {
    id: 'demo-3',
    title: 'E-Commerce Interactive Catalog & Checkout Bot',
    description: 'A full shopping experience inside WhatsApp! Users can browse catalogs, add items to bags, and pay securely via payment links.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'V9m6o67C19c', // Real sandbox demo of WhatsApp commerce flows
    duration: '6 mins 12s',
    category: 'E-Commerce'
  }
];

export const AGENCY_FAQS = [
  {
    question: "What is AI WhatsApp Automation, and how does it help my business?",
    answer: "AI WhatsApp Automation uses the official WhatsApp Business API combined with advanced Large Language Models (LLMs) to converse with your customers like a real human agent. It operates 24/7, answering customer questions instantly, qualifying leads, taking orders, and scheduling meetings, which frees up your staff to focus on high-value tasks."
  },
  {
    question: "Do we need the official WhatsApp Business API?",
    answer: "Yes, we integrate with official WhatsApp Business API providers (like Meta, Wati, Twilio, or Gupshup) to ensure your account complies fully with Meta's developer policies. This includes getting your green tick verification and preventing spam flags."
  },
  {
    question: "Can the WhatsApp Bot integrate with our CRM or database?",
    answer: "Absolutely! Ali AI Agency specializes in deep API integrations. We seamlessly connect your WhatsApp automated chatbot with HubSpot, Salesforce, Google Sheets, custom databases, calendar systems (like Calendly), and transactional/billing systems to sync customer info in real time."
  },
  {
    question: "How long does it take to deploy a custom WhatsApp bot?",
    answer: "Depending on utility and database complexity, our standard AI automation takes between 10 to 21 business days. This covers drafting conversational flows, engineering guardrails, fine-tuning responses, integrating CRM APIs, and rigorous stress testing before going live."
  },
  {
    question: "What makes WhatsApp Automation better than email or traditional chatbots?",
    answer: "WhatsApp boasts an outstanding 98% open rate and a 45-60% click-through rate, making it roughly 5x more effective than email or SMS. Additionally, modern AI bots are conversational and context-aware, completely resolving the frustration of old 'press 1 for help' button bots."
  }
];
