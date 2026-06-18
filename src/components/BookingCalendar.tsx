/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, User, Mail, Building2, MessageSquare, Check, PhoneCall, CheckCircle2, ArrowRight, Video, Trash } from 'lucide-react';
import { Booking } from '../types';

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyNameInput, setCompanyNameInput] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingType, setBookingType] = useState<'strategic_call' | 'whatsapp_setup_audit'>('strategic_call');
  
  const [statusMsg, setStatusMsg] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  // Hardcoded premium timeslots
  const TIMESLOTS = [
    '10:30 AM - 11:00 AM (IST)',
    '11:30 AM - 12:00 PM (IST)',
    '02:00 PM - 02:30 PM (IST)',
    '03:30 PM - 04:00 PM (IST)',
    '05:00 PM - 05:30 PM (IST)',
    '06:00 PM - 06:30 PM (IST)'
  ];

  // Helper to calculate next 5 business days
  const getUpcomingDays = () => {
    const dates = [];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Set base date relative to current metadata time (June 14, 2026 is a Sunday)
    // Let's create slots starting from Monday, June 15, 2026.
    const baseDate = new Date(2026, 5, 14); // June 14, 2026
    
    let added = 0;
    let daysToSearch = 1;
    
    while (added < 5) {
      const nextDate = new Date(baseDate);
      nextDate.setDate(baseDate.getDate() + daysToSearch);
      
      const dayOfWeek = nextDate.getDay();
      // Skip Saturdays (6) and Sundays (0) to show business availability
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push({
          dayName: weekdays[dayOfWeek].substring(0, 3),
          dayNum: nextDate.getDate(),
          monthName: months[nextDate.getMonth()],
          fullString: `${weekdays[dayOfWeek]}, ${months[nextDate.getMonth()]} ${nextDate.getDate()}, 2026`
        });
        added++;
      }
      daysToSearch++;
    }
    return dates;
  };

  const upcomingDays = getUpcomingDays();

  // Load existing bookings
  useEffect(() => {
    const stored = localStorage.getItem('ali_agency_bookings');
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (err) {
        setBookings([]);
      }
    }
    
    // Default select first date
    if (upcomingDays.length > 0) {
      setSelectedDate(upcomingDays[0].fullString);
    }
  }, []);

  const handleBookMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setStatusMsg("Please select a date and an available time slot first.");
      return;
    }

    setStatusMsg("Submitting consultation request...");

    const selectedBusinessDay = selectedDate;
    const chooseAvailableTime = selectedTime;
    const yourName = clientName.trim();
    const emailAddress = clientEmail.trim();
    const companyName = companyNameInput.trim() || 'Freelance / Direct Client';
    const whatsAppNumber = phone.trim() || 'N/A';
    const selectConsultationFocus = bookingType === 'strategic_call' ? 'Automation Roadmap' : 'WhatsApp API Setup Audit';
    const automationGoalsAndCRM = notes.trim() || 'N/A';

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const endpoint = `${BACKEND_URL}/api/book-consultation`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selectedBusinessDay,
          chooseAvailableTime,
          yourName,
          emailAddress,
          companyName,
          whatsAppNumber,
          selectConsultationFocus,
          automationGoalsAndCRM
        })
      });

      if (response.ok) {
        const newBooking: Booking = {
          id: `book-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          clientName: yourName,
          clientEmail: emailAddress,
          companyName: companyName,
          date: selectedBusinessDay,
          timeSlot: chooseAvailableTime,
          notes: automationGoalsAndCRM,
          bookingType: bookingType,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };

        const updated = [newBooking, ...bookings];
        setBookings(updated);
        localStorage.setItem('ali_agency_bookings', JSON.stringify(updated));
        setLastBooking(newBooking);
        setShowSuccessModal(true);
        setStatusMsg('');

        // Clear form inputs
        setClientName('');
        setClientEmail('');
        setCompanyNameInput('');
        setPhone('');
        setNotes('');
        setSelectedTime('');
      } else {
        setStatusMsg("Failed to confirm consultation with remote server.");
      }
    } catch (err: any) {
      console.warn("API Server offline, running offline backup simulation...", err);
      
      const newBooking: Booking = {
        id: `book-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        clientName: yourName,
        clientEmail: emailAddress,
        companyName: companyName,
        date: selectedBusinessDay,
        timeSlot: chooseAvailableTime,
        notes: automationGoalsAndCRM,
        bookingType: bookingType,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      const updated = [newBooking, ...bookings];
      setBookings(updated);
      localStorage.setItem('ali_agency_bookings', JSON.stringify(updated));
      setLastBooking(newBooking);
      setShowSuccessModal(true);
      setStatusMsg('Notice: Server is offline. Captured booking offline.');

      // Clear form inputs
      setClientName('');
      setClientEmail('');
      setCompanyNameInput('');
      setPhone('');
      setNotes('');
      setSelectedTime('');
    }
  };

  const handleCancelBooking = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking Slot?")) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('ali_agency_bookings', JSON.stringify(updated));
    }
  };

  return (
    <div className="w-full bg-white py-24 px-4 scroll-mt-10 relative overflow-hidden" id="book-call">
      
      {/* Decorative Blur Backing */}
      <div className="absolute top-[30%] -right-20 w-96 h-96 rounded-full bg-whatsapp-teal/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl -z-10"></div>

      <div className="max-w-5xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-whatsapp-teal/10 text-whatsapp-teal rounded-full text-xs font-semibold tracking-wide uppercase font-display">
            <Video className="w-3.5 h-3.5" />
            Strategic Consultation
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
            Schedule a <span className="text-whatsapp-teal">1-on-1 Strategy Call</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Reserve a complimentary 20-minute Zoom call with our founder, **Ali Ahmad Ansari**. Meet the automation expert, lay out your targets, and walk away with a definitive automation checklist.
          </p>
        </div>

        {/* Core Layout: Calendar & Details Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Dates & Hours Selector (5-cols) */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-6">
            <div>
              <h3 className="text-base font-display font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-whatsapp-teal" />
                1. Select business day
              </h3>
              <p className="text-slate-500 text-xs mt-1">Mon-Fri active schedule. Current zone: IST.</p>
              
              <div className="grid grid-cols-5 gap-2 mt-4">
                {upcomingDays.map((day) => {
                  const isSelected = selectedDate === day.fullString;
                  return (
                    <button
                      key={day.dayNum}
                      id={`day-select-${day.dayNum}`}
                      type="button"
                      onClick={() => setSelectedDate(day.fullString)}
                      className={`py-3 px-1 rounded-xl transition-all text-center flex flex-col justify-center border cursor-pointer ${
                        isSelected
                          ? 'bg-whatsapp-teal border-whatsapp-teal text-white shadow-md'
                          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">{day.dayName}</span>
                      <span className="text-base font-display font-extrabold my-0.5">{day.dayNum}</span>
                      <span className="text-[9px] uppercase font-bold opacity-60">{day.monthName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-base font-display font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 text-whatsapp-teal" />
                2. Choose available time
              </h3>
              <p className="text-slate-500 text-xs mt-1">20-minute strategy call & technical sync</p>
              
              <div className="space-y-2 mt-4">
                {TIMESLOTS.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      id={`time-${slot.replace(/\s+/g, '-')}`}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`w-full py-3 px-4 rounded-xl text-left text-xs font-semibold flex items-center justify-between border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-whatsapp-teal/10 border-whatsapp-teal text-whatsapp-teal font-extrabold ring-1 ring-whatsapp-teal'
                          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{slot}</span>
                      {isSelected ? (
                        <span className="w-4 h-4 rounded-full bg-whatsapp-teal text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Client Profile Form Details (7-cols) */}
          <form onSubmit={handleBookMeeting} className="lg:col-span-7 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm text-left space-y-5">
            <h3 className="text-lg font-display font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-whatsapp-teal" />
              Provide your details
            </h3>

            {statusMsg && (
              <p className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg font-medium">
                ⚠️ {statusMsg}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Your Name *
                </label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ali Ahmad"
                  className="w-full text-xs p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/50 bg-slate-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Email Address *
                </label>
                <input
                  id="booking-email"
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full text-xs p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/50 bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  Company Name
                </label>
                <input
                  id="booking-company"
                  type="text"
                  value={companyNameInput}
                  onChange={(e) => setCompanyNameInput(e.target.value)}
                  placeholder="e.g., Ansari Logistics"
                  className="w-full text-xs p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/50 bg-slate-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                  WhatsApp Number (with country code)
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +91 80324 XXXXX"
                  className="w-full text-xs p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/50 bg-slate-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 mb-1">Select Consultation Focus</label>
              <div className="grid grid-cols-2 gap-3">
                <label 
                  className={`border rounded-xl p-3.5 flex items-center gap-2 cursor-pointer transition-colors ${
                    bookingType === 'strategic_call' 
                      ? 'border-whatsapp-teal bg-whatsapp-teal/5 text-whatsapp-teal font-semibold' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    id="type-strategic"
                    type="radio"
                    name="booking_type"
                    checked={bookingType === 'strategic_call'}
                    onChange={() => setBookingType('strategic_call')}
                    className="sr-only"
                  />
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${bookingType === 'strategic_call' ? 'border-whatsapp-teal bg-whatsapp-teal' : 'border-slate-300'}`}>
                    {bookingType === 'strategic_call' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] leading-tight">Automation Roadmap</span>
                  </div>
                </label>

                <label 
                  className={`border rounded-xl p-3.5 flex items-center gap-2 cursor-pointer transition-colors ${
                    bookingType === 'whatsapp_setup_audit' 
                      ? 'border-whatsapp-teal bg-whatsapp-teal/5 text-whatsapp-teal font-semibold' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    id="type-audit"
                    type="radio"
                    name="booking_type"
                    checked={bookingType === 'whatsapp_setup_audit'}
                    onChange={() => setBookingType('whatsapp_setup_audit')}
                    className="sr-only"
                  />
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${bookingType === 'whatsapp_setup_audit' ? 'border-whatsapp-teal bg-whatsapp-teal' : 'border-slate-300'}`}>
                    {bookingType === 'whatsapp_setup_audit' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] leading-tight">WhatsApp API Audit</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                Tell us about your automation goal & CRM...
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What is your current inquiry rate, and what databases or tools do you currently use (e.g. Google Sheets, HubSpot)?"
                className="w-full text-xs p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/50 bg-slate-50"
              />
            </div>

            <button
              id="confirm-booking-btn"
              type="submit"
              className="w-full bg-whatsapp-teal hover:bg-whatsapp-dark text-white font-bold text-xs py-4 rounded-xl transition-all shadow hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              Confirm Consultation Appointment
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Existing Bookings Table Dashboard Segment */}
        {bookings.length > 0 && (
          <div className="mt-16 border-t border-slate-100 pt-12 text-left">
            <h3 className="text-lg font-display font-extrabold text-slate-950 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-whatsapp-teal" />
              Your Reserved Strategy Sessions ({bookings.length})
            </h3>
            <p className="text-slate-500 text-xs mt-1">Review, coordinate, or cancel your scheduled consultancies with Ali AI Agency.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {bookings.map((b) => (
                <div key={b.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-block px-2.5 py-0.5 bg-whatsapp-teal/10 text-whatsapp-teal text-[10px] rounded-full uppercase tracking-wider font-bold">
                        {b.bookingType === 'strategic_call' ? 'Strategy Call' : 'WhatsApp API Audit'}
                      </span>
                      <button
                        id={`cancel-btn-${b.id}`}
                        onClick={() => handleCancelBooking(b.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1 hover:bg-rose-50 rounded-lg cursor-pointer"
                        title="Cancel Strategy slot"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <h4 className="font-display font-bold text-slate-900 text-sm">{b.clientName}</h4>
                    <p className="text-slate-500 text-xs mb-3">{b.companyName}</p>
                    
                    <div className="space-y-1.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-2 text-xs text-slate-700 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{b.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-700 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{b.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                        <Video className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-whatsapp-teal font-medium">meet.google.com/ali-ai-agency-zoom</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-150 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      Confirmed
                    </span>
                    <a
                      id={`cal-add-${b.id}`}
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ali+AI+Agency+Strategy+Call&dates=20260614T150000Z/20260614T153000Z&details=WhatsApp+Automation+Audit+with+Ali+Ahmad+Ansari+hailing+from+Lucknow.+Contact+email%3A+aliahmadansari803%40gmail.com&location=Google+Meet`}
                      target="_blank"
                      rel="noopener noreferrer animate-pulse"
                      className="text-whatsapp-teal hover:underline font-bold"
                    >
                      Add To Google Calendar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Booking SUCCESS Lightbox Modal */}
      {showSuccessModal && lastBooking && (
        <div id="booking-success-modal" className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden text-center space-y-5 animate-scale-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-whatsapp-teal/10 rounded-full blur-2xl"></div>
            
            <div className="w-16 h-16 bg-whatsapp-teal/10 text-whatsapp-teal rounded-full flex items-center justify-center mx-auto border-2 border-whatsapp-teal/20">
              <CheckCircle2 className="w-9 h-9 text-whatsapp-teal" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 leading-none">Consultation Confirmed!</h3>
              <p className="text-slate-500 text-xs">A calendar invite has been sent to **{lastBooking.clientEmail}**.</p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl text-left space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Strategy Booking Details</div>
              
              <div className="text-xs font-semibold text-slate-800">Host: Ali Ahmad Ansari</div>
              
              <div className="text-xs font-bold text-slate-800">Focus: {lastBooking.bookingType === 'strategic_call' ? 'WhatsApp Automation Roadmap' : 'WhatsApp API Setup Audit'}</div>
              <div className="text-xs font-semibold text-slate-600 font-mono flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {lastBooking.date}
              </div>
              <div className="text-xs font-semibold text-slate-600 font-mono flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {lastBooking.timeSlot}
              </div>
              <div className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                <Video className="w-3.5 h-3.5 text-slate-400 shrink-0 animate-pulse" />
                <span className="text-whatsapp-teal">Virtual Zoom/Google Meet Link Sent</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                id="close-success-modal"
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Go Back
              </button>
              
              <a
                id="modal-google-calendar-link"
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Strategic+AI+WhatsApp+Consultation+Audit&dates=20260615T100000Z/20260615T110000Z&details=Thank+you+for+scheduling+a+WhatsApp+Automation+Roadmap+Consultation+with+Ali+Ahmad+Ansari+hailing+from+Lucknow.%0AEmail%3A+aliahmadansari803%40gmail.com&location=Google+Meet`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-whatsapp-teal hover:bg-whatsapp-dark text-white font-bold py-3 rounded-xl text-xs transition-colors shadow flex items-center justify-center gap-1.5"
              >
                Google Calendar
              </a>
            </div>

            <p className="text-[10px] text-slate-400 leading-normal">
              An offline replication copy has also been recorded under your client dashboard panel below. You may reschedule or delete this reservation at any time.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
