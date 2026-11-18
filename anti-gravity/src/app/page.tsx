"use client";

import React, { useState, useRef } from "react";
import { 
  Sparkles, Smartphone, Globe, Eye, Cpu, GitMerge, Terminal,
  ExternalLink, Layers, ShieldCheck, Zap
} from "lucide-react";
import Hero from "../components/Hero";
import GeminiOmniSpark from "../components/GeminiOmniSpark";
import AndroidIntelligence from "../components/AndroidIntelligence";
import ChromeMCP from "../components/ChromeMCP";
import AndroidXR from "../components/AndroidXR";
import ThemeToggle from "../components/ThemeToggle";

type TabId = "gemini" | "android" | "chrome" | "xr";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("gemini");
  const simulatorRef = useRef<HTMLDivElement>(null);

  const scrollToSimulators = () => {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#030303] text-neutral-100 flex flex-col overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-transparent pointer-events-none" />
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-black text-sm tracking-widest text-white uppercase block">ANTIGRAVITY</span>
            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest -mt-1 block">Intelligence Suite</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-400">
            <a href="#simulators" onClick={(e) => { e.preventDefault(); scrollToSimulators(); }} className="hover:text-white transition-colors">Workspace Simulator</a>
            <a href="https://github.com" target="_blank" className="hover:text-white transition-colors flex items-center gap-1">
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-cyan-400 font-bold flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-cyan-400 animate-pulse" /> WebMCP Connected
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <Hero onExploreClick={scrollToSimulators} />

      {/* Interactive Simulation Dashboard Console */}
      <section 
        id="simulators" 
        ref={simulatorRef} 
        className="w-full max-w-7xl mx-auto py-24 px-4 md:px-8 flex flex-col gap-12 scroll-mt-16"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Interactive Workspace Simulator
          </h2>
          <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
            Select an ecosystem component below to explore its live state simulations, interactive dashboards, and conversational mockups.
          </p>
        </div>

        {/* Tab Selector Hub */}
        <div className="w-full flex justify-center">
          <div className="glass-panel p-1.5 rounded-2xl border border-white/5 flex flex-wrap gap-2 justify-center max-w-full">
            <button
              onClick={() => setActiveTab("gemini")}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "gemini"
                  ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                  : "bg-transparent border border-transparent text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeTab === "gemini" ? "text-cyan-400 animate-pulse" : "text-neutral-400"}`} />
              <span>Gemini Omni Spark</span>
            </button>

            <button
              onClick={() => setActiveTab("android")}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "android"
                  ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-white shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                  : "bg-transparent border border-transparent text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Smartphone className={`w-4 h-4 ${activeTab === "android" ? "text-purple-400 animate-pulse" : "text-neutral-400"}`} />
              <span>Android Intelligence</span>
            </button>

            <button
              onClick={() => setActiveTab("chrome")}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "chrome"
                  ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 text-white shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : "bg-transparent border border-transparent text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Globe className={`w-4 h-4 ${activeTab === "chrome" ? "text-blue-400 animate-pulse" : "text-neutral-400"}`} />
              <span>Chrome WebMCP</span>
            </button>

            <button
              onClick={() => setActiveTab("xr")}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "xr"
                  ? "bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 text-white shadow-[0_0_20px_rgba(236,72,153,0.1)]"
                  : "bg-transparent border border-transparent text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Eye className={`w-4 h-4 ${activeTab === "xr" ? "text-pink-400 animate-pulse" : "text-neutral-400"}`} />
              <span>Android XR Glasses</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Display Card */}
        <div className="w-full glass-panel rounded-3xl border border-white/5 p-6 md:p-8 bg-gradient-to-b from-[#0e0e11] to-[#040405] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative min-h-[400px] flex items-center justify-center">
          {/* Glowing border effects depending on active tab */}
          <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-1000 ${
            activeTab === "gemini"
              ? "border border-cyan-500/20 shadow-[inset_0_0_30px_rgba(6,182,212,0.02)]"
              : activeTab === "android"
              ? "border border-purple-500/20 shadow-[inset_0_0_30px_rgba(168,85,247,0.02)]"
              : activeTab === "chrome"
              ? "border border-blue-500/20 shadow-[inset_0_0_30px_rgba(59,130,246,0.02)]"
              : "border border-pink-500/20 shadow-[inset_0_0_30px_rgba(236,72,153,0.02)]"
          }`} />

          {/* Active Tab View Rendering */}
          <div className="w-full relative z-10">
            {activeTab === "gemini" && <GeminiOmniSpark />}
            {activeTab === "android" && <AndroidIntelligence />}
            {activeTab === "chrome" && <ChromeMCP />}
            {activeTab === "xr" && <AndroidXR />}
          </div>
        </div>

        {/* Interconnected System Diagram Map */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#030303]/40 mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-6">
            <GitMerge className="w-4 h-4 text-cyan-400" />
            System Architecture Integration Map
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch select-none">
            {/* Step 1 */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between group hover:border-cyan-500/20 transition-all duration-300">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Core Reasoning</span>
                <h4 className="text-xs font-bold text-white mt-1">Gemini Omni Engine</h4>
                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                  Processes user intent in real-time across voice, image, and video pipelines, determining workflow actions.
                </p>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono mt-4 block border-t border-white/5 pt-2">➔ Outputs schema tasks</span>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between group hover:border-purple-500/20 transition-all duration-300">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">Client Sandbox</span>
                <h4 className="text-xs font-bold text-white mt-1">Android Intelligence</h4>
                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                  Runs local agent tasks inside OS containers, validating application trust zones and user access credentials.
                </p>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono mt-4 block border-t border-white/5 pt-2">➔ Spawns local tools</span>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between group hover:border-blue-500/20 transition-all duration-300">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Standard Integration</span>
                <h4 className="text-xs font-bold text-white mt-1">Chrome WebMCP</h4>
                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                  Bridges web applications and local client agents through a secure PostMessage sandbox protocol.
                </p>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono mt-4 block border-t border-white/5 pt-2">➔ Executes DOM tasks</span>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between group hover:border-pink-500/20 transition-all duration-300">
              <div>
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">Spatial HUD</span>
                <h4 className="text-xs font-bold text-white mt-1">Android XR Glasses</h4>
                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                  Projects visual maps, translation overlays, and contextual annotations directly into the user's field of view.
                </p>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono mt-4 block border-t border-white/5 pt-2">➔ Displays end-state HUD</span>
            </div>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 mt-auto py-8 text-center text-[10px] text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-400 uppercase tracking-widest">ANTIGRAVITY CONSOLE</span>
            <span>© 2026 Skynet Labs.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="https://github.com" target="_blank" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
