/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VideoDemo } from '../types';

export const INITIAL_VIDEO_DEMOS: VideoDemo[] = [
  {
    id: 'demo-1',
    title: 'How to Turn WhatsApp into an Auto-Lead Machine',
    description: 'See how Ali AI Agency constructs high-performance interactive conversational flows that automatically qualify incoming leads, capture client contact details, and schedule strategy sessions on autopilot 24/7.',
    youtubeUrl: 'https://www.youtube.com/shorts/mY2dG6HY_FM',
    youtubeId: 'mY2dG6HY_FM',
    duration: '1 min',
    category: 'Lead Generation'
  },
  {
    id: 'demo-2',
    title: 'Live Demo',
    description: 'Watch a direct live screen recording demonstrating how our custom-crafted WhatsApp automated agents answer real client inquiries, extract custom goals, and handle client care interactively.',
    youtubeUrl: 'https://www.youtube.com/watch?v=6gwogqLkP4A',
    youtubeId: '6gwogqLkP4A',
    duration: '2 mins',
    category: 'Live Demo'
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
