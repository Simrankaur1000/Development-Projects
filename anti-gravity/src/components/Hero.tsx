"use client";

import React from "react";
import { ArrowRight, Sparkles, Terminal, Activity, Layers, Cpu } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#030303] border-b border-white/5 py-20 px-4 md:px-8">
      {/* Background Grid Pattern with flow animation */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Radial fade to black on edges */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#030303_90%] pointer-events-none" />

      {/* Glowing beams running across */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-beam-1 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-beam-2 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Spark badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-white/10 text-xs text-cyan-400 font-medium mb-8 hover:border-cyan-500/30 transition-all duration-300 animate-float cursor-pointer">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Introducing Android Intelligence & WebMCP</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        {/* Immersive Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6">
          The Workspace of the
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient bg-[length:200%_auto] hover:bg-[100%_center] transition-all duration-1000">
            Antigravity Future
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base md:text-lg text-neutral-400 mb-10 leading-relaxed">
          Experience real-time interactive simulations of next-generation AI platforms. Explore Google Gemini Spark, Android Intelligence, WebMCP-integrated browsers, and Spatial XR glasses overlays.
        </p>

        {/* Interactive Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
          <button
            onClick={onExploreClick}
            className="group relative px-6 py-3 rounded-lg bg-white text-black font-semibold overflow-hidden hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            <span className="relative z-10 flex items-center gap-2">
              Launch Simulator
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <a
            href="#simulators"
            onClick={(e) => {
              e.preventDefault();
              onExploreClick();
            }}
            className="px-6 py-3 rounded-lg glass-panel hover:bg-white/5 text-neutral-300 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
          >
            <Terminal className="w-4 h-4" />
            Interactive Console
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {/* Card 1 */}
          <div className="glass-panel p-5 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Voice Latency</span>
              <Activity className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">85 ms</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <span>● Ultra-low latency</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-5 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">WebMCP Sync</span>
              <Layers className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">99.98%</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <span>● Connected sandbox</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-5 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Active Agents</span>
              <Cpu className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">24 Active</div>
            <div className="text-[10px] text-purple-400 mt-1 flex items-center gap-1 font-medium">
              <span>● Autonomous operations</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-5 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Compute Allocation</span>
              <Sparkles className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">3.8 PFLOPS</div>
            <div className="text-[10px] text-cyan-400 mt-1 flex items-center gap-1 font-medium">
              <span>● Omni engine enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient glowing orb at bottom */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/10 via-cyan-500/15 to-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
