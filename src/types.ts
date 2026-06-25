/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  date: string;
  timeSlot: string;
  notes: string;
  bookingType: 'strategic_call' | 'whatsapp_setup_audit';
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
}

export interface VideoDemo {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string; // The ID extracted from the URL for iframe rendering
  duration: string;
  thumbnailUrl?: string;
  category: 'E-Commerce' | 'Real Estate' | 'Customer Support' | 'Lead Generation' | 'Live Demo';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  type?: 'text' | 'options' | 'success' | 'media';
  options?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
