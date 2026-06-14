/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, ArrowRight, Video } from 'lucide-react';
import { VideoDemo } from '../types';
import { INITIAL_VIDEO_DEMOS } from '../data/demos';

export default function VideoDemos() {
  const [demos] = useState<VideoDemo[]>(INITIAL_VIDEO_DEMOS);
  const [activeDemo, setActiveDemo] = useState<VideoDemo | null>(null);

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
