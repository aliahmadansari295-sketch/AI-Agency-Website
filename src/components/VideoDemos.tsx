/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Youtube, Plus, Trash2, ArrowRight, Video, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { VideoDemo } from '../types';
import { INITIAL_VIDEO_DEMOS } from '../data/demos';

export default function VideoDemos() {
  const [demos, setDemos] = useState<VideoDemo[]>([]);
  const [activeDemo, setActiveDemo] = useState<VideoDemo | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'E-Commerce' | 'Real Estate' | 'Customer Support' | 'Lead Generation'>('Customer Support');
  const [showAddForm, setShowAddForm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize and load custom user links from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('ali_agency_demos');
    if (stored) {
      try {
        setDemos(JSON.parse(stored));
      } catch (err) {
        setDemos(INITIAL_VIDEO_DEMOS);
      }
    } else {
      setDemos(INITIAL_VIDEO_DEMOS);
    }
  }, []);

  // Save to localStorage helper
  const saveDemos = (updated: VideoDemo[]) => {
    setDemos(updated);
    localStorage.setItem('ali_agency_demos', JSON.stringify(updated));
  };

  // Extract YouTube ID from standard formats
  const extractYoutubeId = (url: string): string => {
    if (!url) return '';
    
    // Check if it's already just the 11-char ID
    if (url.length === 11 && !url.includes('/') && !url.includes('.')) {
      return url;
    }
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const handleAddDemo = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYoutubeId(newUrl);
    
    if (!ytId) {
      alert("Please enter a valid YouTube video URL or Video ID (e.g., https://youtu.be/... or watch?v=...)");
      return;
    }

    const customDemo: VideoDemo = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim() || 'Custom WhatsApp Bot Demo',
      description: newDesc.trim() || 'Custom WhatsApp chatbot automation workflow running live.',
      youtubeUrl: newUrl.trim(),
      youtubeId: ytId,
      duration: '3 mins approx',
      category: newCategory
    };

    const updated = [customDemo, ...demos];
    saveDemos(updated);
    setActiveDemo(customDemo); // Auto play newly added demo!
    
    // Reset form states
    setNewTitle('');
    setNewDesc('');
    setNewUrl('');
    setShowAddForm(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleDeleteDemo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card click
    
    // Safeguard presets: if it's the last one, don't delete to avoid empty state, or allow reset
    const updated = demos.filter(d => d.id !== id);
    saveDemos(updated);
    if (activeDemo?.id === id) {
      setActiveDemo(null);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Restore back to original default agency videos?")) {
      saveDemos(INITIAL_VIDEO_DEMOS);
      setActiveDemo(null);
    }
  };

  return (
    <div className="w-full bg-slate-50 py-20 px-4 scroll-mt-10" id="video-demos">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-whatsapp-teal/10 text-whatsapp-teal rounded-full text-xs font-semibold tracking-wide uppercase font-display">
            <Video className="w-3.5 h-3.5" />
            Live Bot Showcases
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
            Watch Our Bots <span className="text-whatsapp-teal">In Action</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Take a look at how our AI systems perform in typical chat workflows. Watch live captures of conversational screens across different sectors.
          </p>
        </div>

        {/* Dynamic Video Customizer / Admin tool */}
        <div className="mb-10 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                <Youtube className="w-5 h-5 text-rose-600" />
                Ali's Unlisted Video Manager
              </h3>
              <p className="text-slate-500 text-xs">
                Have you created an unlisted YouTube video demonstrating your latest bot? Add it here to showcase it directly to prospective clients!
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              <button
                id="toggle-add-demo-form"
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-whatsapp-teal hover:bg-whatsapp-dark text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                {showAddForm ? 'Close Manager' : 'Add Unlisted Demo'}
              </button>
              
              <button
                id="reset-presets-btn"
                onClick={handleResetDefaults}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                Reset Presets
              </button>
            </div>
          </div>

          {saveSuccess && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-lg text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Great job, Ali! Your custom unlisted YouTube demo has been loaded successfully. It is now featured at the top of your list.</span>
            </div>
          )}

          {/* Collapsible Form */}
          {showAddForm && (
            <form onSubmit={handleAddDemo} className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-5 animate-slide-down">
              <div className="space-y-4">
                <div>
                  <label htmlFor="yt-url" className="block text-xs font-semibold text-slate-700 mb-1.5">YouTube Video URL or ID *</label>
                  <input
                    id="yt-url"
                    type="text"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=your-unlisted-id"
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/50 bg-slate-50"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Supports standard watch links, mobile shorts, and share links.</span>
                </div>

                <div>
                  <label htmlFor="yt-category" className="block text-xs font-semibold text-slate-700 mb-1.5">Industry Category</label>
                  <select
                    id="yt-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/50 bg-slate-50"
                  >
                    <option value="Customer Support">Customer Support Helpdesk</option>
                    <option value="Lead Generation">Lead Generation & Qualifying</option>
                    <option value="E-Commerce">E-Commerce & Checkout</option>
                    <option value="Real Estate">Real Estate Automation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <label htmlFor="yt-title" className="block text-xs font-semibold text-slate-700 mb-1.5">Demo Title *</label>
                  <input
                    id="yt-title"
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., E-Commerce Chatbot for Fashion Brands"
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/50 bg-slate-50"
                  />
                </div>

                <div>
                  <label htmlFor="yt-desc" className="block text-xs font-semibold text-slate-700 mb-1.5">Demo Description</label>
                  <textarea
                    id="yt-desc"
                    rows={2}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Briefly describe the automation trigger, API integrations shown, or dashboard sync..."
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/50 bg-slate-50"
                  />
                </div>

                <button
                  id="submit-demo-btn"
                  type="submit"
                  className="w-full bg-whatsapp-teal hover:bg-whatsapp-dark text-white font-bold text-xs py-3 rounded-lg transition-all shadow hover:shadow-md cursor-pointer"
                >
                  Save and Feature Bot Demo
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Video Theatre Stage (Active Player) */}
        {activeDemo && (
          <div className="mb-14 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-fade-in">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                id="demo-youtube-iframe"
                src={`https://www.youtube.com/embed/${activeDemo.youtubeId}?autoplay=1&rel=0`}
                title={activeDemo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="p-6 md:p-8 bg-slate-900 border-t border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl text-left">
                <span className="inline-block px-2.5 py-0.5 bg-whatsapp-teal/30 text-whatsapp-green text-[10px] rounded-full uppercase tracking-wider font-bold border border-whatsapp-teal/20">
                  {activeDemo.category}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-extrabold tracking-tight">{activeDemo.title}</h3>
                <p className="text-slate-400 text-xs md:text-sm">{activeDemo.description}</p>
              </div>
              
              <button
                id="close-active-theatre"
                onClick={() => setActiveDemo(null)}
                className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all h-fit cursor-pointer self-start md:self-center uppercase tracking-wide"
              >
                Close Theater
              </button>
            </div>
          </div>
        )}

        {/* Video Catalog Demos Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => {
            const isCurrentlyPlaying = activeDemo?.id === demo.id;
            return (
              <div
                key={demo.id}
                onClick={() => {
                  setActiveDemo(demo);
                  // Ensure we scroll to the active demo player if clicked
                  const topElem = document.getElementById('video-demos');
                  if (topElem) {
                    topElem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-350 cursor-pointer flex flex-col justify-between h-full relative ${
                  isCurrentlyPlaying 
                    ? 'border-whatsapp-teal ring-4 ring-whatsapp-teal/10 shadow-lg' 
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Simulated Thumbnail or YouTube Screenshot Background */}
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden shrink-0">
                  <img
                    src={`https://img.youtube.com/vi/${demo.youtubeId}/hqdefault.jpg`}
                    alt={demo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback image if YouTube URL gets restricted or unavailable
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${demo.youtubeId}/480/270`;
                    }}
                  />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] text-white rounded-md font-bold tracking-wide uppercase">
                    {demo.category}
                  </span>

                  {/* Length Badge */}
                  <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 text-[9px] text-slate-300 rounded font-mono font-medium">
                    {demo.duration}
                  </span>

                  {/* Play Video HUD Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-whatsapp-teal/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <Play className="w-5.5 h-5.5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-slate-900 leading-snug text-sm md:text-base group-hover:text-whatsapp-teal transition-colors">
                      {demo.title}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {demo.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-whatsapp-teal font-extrabold text-xs flex items-center gap-1">
                      {isCurrentlyPlaying ? 'Now Watching' : 'Launch Demo'}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    {/* Delete button if user custom video */}
                    {demo.id.toString().startsWith('custom-') && (
                      <button
                        id={`delete-demo-${demo.id}`}
                        onClick={(e) => handleDeleteDemo(demo.id, e)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete custom demo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
