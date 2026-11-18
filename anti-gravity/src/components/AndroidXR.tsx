"use client";

import React, { useState, useEffect } from "react";
import { 
  Eye, Languages, Compass, MapPin, Sparkles, Navigation, 
  Settings, Power, HelpCircle, Layers, CheckCircle2, ShieldAlert,
  Loader2
} from "lucide-react";

interface TranslationPreset {
  source: string;
  translation: string;
  originalText: string;
  context: string;
}

const TRANSLATION_PRESETS: Record<string, TranslationPreset> = {
  es: {
    source: "Spanish",
    originalText: "PRECAUCIÓN: ÁREA DE PRUEBA DE AGENTES INTELIGENTES",
    translation: "CAUTION: INTELLIGENT AGENT TESTING ZONE",
    context: "Wall sign at laboratory entrance"
  },
  ja: {
    source: "Japanese",
    originalText: "自動エージェント稼働中。立ち入り禁止。",
    translation: "AUTOMATED AGENTS IN OPERATION. DO NOT ENTER.",
    context: "Warning banner above the servers"
  },
  de: {
    source: "German",
    originalText: "GEFAHR: HOCHSPANNUNG UND QUANTENSYNCHRONISATION",
    translation: "DANGER: HIGH VOLTAGE AND QUANTUM SYNCHRONIZATION",
    context: "Security sticker near power core"
  }
};

interface DestinationPreset {
  name: string;
  distance: string;
  eta: string;
  direction: "left" | "right" | "straight";
  steps: string[];
}

const DESTINATION_PRESETS: Record<string, DestinationPreset> = {
  lab: {
    name: "Room 402: Quantum Lab",
    distance: "18 meters",
    eta: "14 seconds",
    direction: "straight",
    steps: ["Follow corridor straight", "Turn left at double glass doors", "Scan badge at secure kiosk"]
  },
  coffee: {
    name: "Level 4 Espresso Bar",
    distance: "42 meters",
    eta: "35 seconds",
    direction: "right",
    steps: ["Turn right immediately", "Proceed down the spiral staircase", "Spot lounge on the left"]
  },
  exit: {
    name: "Main Ground Exit",
    distance: "110 meters",
    eta: "1.5 minutes",
    direction: "left",
    steps: ["Turn left past elevators", "Take main escalators down", "Pass main lobby turnstiles"]
  }
};

export default function AndroidXR() {
  const [lang, setLang] = useState<"es" | "ja" | "de">("es");
  const [dest, setDest] = useState<"lab" | "coffee" | "exit">("lab");
  
  // HUD toggles
  const [poweredOn, setPoweredOn] = useState(true);
  const [showTranslate, setShowTranslate] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [showMesh, setShowMesh] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const handleCalibrate = () => {
    if (isCalibrating) return;
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
    }, 2000);
  };

  const activeTrans = TRANSLATION_PRESETS[lang];
  const activeDest = DESTINATION_PRESETS[dest];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* HUD Control Sidebar (Left - 4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Android XR Glasses HUD</h3>
            <p className="text-xs text-neutral-400">Spatial Translation & Navigation</p>
          </div>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed">
          Simulate an augmented reality display overlaid on a high-tech office hallway. Control spatial mesh layers, active language processing, and route paths.
        </p>

        {/* HUD Switch Controls */}
        <div className="glass-panel p-4.5 rounded-xl border border-white/5 space-y-4 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Glasses HUD Overlays</span>
          
          <div className="space-y-3.5">
            {/* Power Switch */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-white font-medium flex items-center gap-1.5">
                <Power className={`w-3.5 h-3.5 ${poweredOn ? 'text-emerald-400' : 'text-neutral-500'}`} />
                Glasses Power
              </span>
              <button
                onClick={() => setPoweredOn(!poweredOn)}
                className={`w-9 h-5 rounded-full p-0.5 transition-all duration-300 cursor-pointer ${poweredOn ? 'bg-emerald-500' : 'bg-neutral-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${poweredOn ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Translation Overlay Switch */}
            <div className="flex items-center justify-between opacity-90">
              <span className="text-xs text-neutral-300 font-medium flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-cyan-400" />
                Live Translation
              </span>
              <button
                disabled={!poweredOn}
                onClick={() => setShowTranslate(!showTranslate)}
                className={`w-9 h-5 rounded-full p-0.5 transition-all duration-300 disabled:opacity-30 cursor-pointer ${showTranslate && poweredOn ? 'bg-cyan-500' : 'bg-neutral-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${showTranslate && poweredOn ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Navigation Overlay Switch */}
            <div className="flex items-center justify-between opacity-90">
              <span className="text-xs text-neutral-300 font-medium flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-400" />
                Spatial Navigation
              </span>
              <button
                disabled={!poweredOn}
                onClick={() => setShowNav(!showNav)}
                className={`w-9 h-5 rounded-full p-0.5 transition-all duration-300 disabled:opacity-30 cursor-pointer ${showNav && poweredOn ? 'bg-blue-500' : 'bg-neutral-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${showNav && poweredOn ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Spatial Mesh Overlay Switch */}
            <div className="flex items-center justify-between opacity-90">
              <span className="text-xs text-neutral-300 font-medium flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Depth Mapping Mesh
              </span>
              <button
                disabled={!poweredOn}
                onClick={() => setShowMesh(!showMesh)}
                className={`w-9 h-5 rounded-full p-0.5 transition-all duration-300 disabled:opacity-30 cursor-pointer ${showMesh && poweredOn ? 'bg-purple-500' : 'bg-neutral-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${showMesh && poweredOn ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Translation Language Selector */}
        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Target Language Source</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              disabled={!poweredOn}
              onClick={() => setLang("es")}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                lang === "es" && poweredOn
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              Spanish
            </button>
            <button
              disabled={!poweredOn}
              onClick={() => setLang("ja")}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                lang === "ja" && poweredOn
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              Japanese
            </button>
            <button
              disabled={!poweredOn}
              onClick={() => setLang("de")}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                lang === "de" && poweredOn
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              German
            </button>
          </div>
        </div>

        {/* Navigation Target Selector */}
        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Select Destination Kiosk</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              disabled={!poweredOn}
              onClick={() => setDest("lab")}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                dest === "lab" && poweredOn
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              Lab 402
            </button>
            <button
              disabled={!poweredOn}
              onClick={() => setDest("coffee")}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                dest === "coffee" && poweredOn
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              Coffee Bar
            </button>
            <button
              disabled={!poweredOn}
              onClick={() => setDest("exit")}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                dest === "exit" && poweredOn
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              Main Exit
            </button>
          </div>
        </div>
      </div>

      {/* Spatial HUD Viewport (Right - 8 cols) */}
      <div className="lg:col-span-8 flex flex-col">
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl border border-white/10 overflow-hidden bg-black flex items-center justify-center">
          
          {/* Glass glare effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20" />
          
          {/* Simulated Real World Hallway Background (using pure CSS gradients/shapes) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090b11] via-[#050608] to-[#010203] z-0 overflow-hidden">
            {/* Perspective walls */}
            <svg className="w-full h-full opacity-60" viewBox="0 0 800 450">
              {/* Left Wall lines */}
              <line x1="0" y1="0" x2="350" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              <line x1="0" y1="450" x2="350" y2="250" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              <line x1="0" y1="225" x2="350" y2="225" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              
              {/* Right Wall lines */}
              <line x1="800" y1="0" x2="450" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              <line x1="800" y1="450" x2="450" y2="250" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />

              {/* Corridor floor joint */}
              <line x1="350" y1="200" x2="450" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="350" y1="250" x2="450" y2="250" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="350" y1="200" x2="350" y2="250" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="450" y1="200" x2="450" y2="250" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              
              {/* Laboratory entrance outline on the left wall */}
              <polygon points="120,70 190,110 190,335 120,360" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <line x1="155" y1="90" x2="155" y2="347" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              {/* Server cabinet outlines on the right wall */}
              <polygon points="680,70 610,110 610,335 680,360" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            </svg>
          </div>

          {/* HUD GLASSES OFF STATE */}
          {!poweredOn && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-4">
              <Power className="w-8 h-8 text-neutral-600 mb-3" />
              <h5 className="text-sm font-bold text-neutral-400">Android XR Glasses: Powered Off</h5>
              <p className="text-xs text-neutral-600 mt-1 max-w-[280px]">Turn on glasses using the sidebar switch to boot visual mapping.</p>
            </div>
          )}

          {/* HUD GLASSES ON CONTENT */}
          {poweredOn && (
            <div className="absolute inset-0 z-10 p-5 flex flex-col justify-between pointer-events-none select-none font-mono text-[10px] text-cyan-400">
              
              {/* Spatial Depth Mesh (Optionally Overlayed) */}
              {showMesh && (
                <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0 pointer-events-none animate-grid-flow">
                  {/* Glowing depth rings */}
                  <div className="absolute top-[48%] left-[45%] w-24 h-16 border-2 border-dashed border-purple-500/20 rounded-full animate-pulse-ring" />
                  <div className="absolute top-[40%] left-[30%] w-48 h-32 border border-dashed border-purple-500/10 rounded-full animate-pulse-ring" />
                </div>
              )}

              {/* Glasses HUD Reticle overlay */}
              <div className="absolute inset-0 border-[2px] border-cyan-500/15 rounded-xl pointer-events-none flex items-center justify-center">
                {/* Crosshairs */}
                <div className="w-6 h-[1px] bg-cyan-400/40 absolute" />
                <div className="h-6 w-[1px] bg-cyan-400/40 absolute" />
                
                {/* Framing corners */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-500/40" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-500/40" />
              </div>

              {/* Top Row: System Status HUD */}
              <div className="relative z-10 w-full flex justify-between items-start">
                <div className="flex flex-col gap-1 bg-black/60 px-3 py-2 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-white">SYSTEM: ANTIGRAVITY_XR_V2</span>
                  </div>
                  <span className="text-[8px] text-neutral-400 uppercase">FOV: 110° | CALIBRATION: OK</span>
                </div>

                <div className="flex flex-col items-end gap-1 bg-black/60 px-3 py-2 rounded-lg border border-white/5">
                  <span className="text-white font-bold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    HEADING: NW 312°
                  </span>
                  <span className="text-[8px] text-neutral-400">LATENCY: 4.8ms</span>
                </div>
              </div>

              {/* Middle Row: Immersive Spatial Overlays */}
              <div className="relative w-full flex-grow flex items-center justify-between z-10 py-6">
                
                {/* 1. Signboard Real-Time Translator Overlay */}
                {showTranslate && (
                  <div className="absolute left-[8%] top-[25%] max-w-[200px] bg-black/85 border border-cyan-500/40 rounded-xl p-3 shadow-lg shadow-cyan-500/5 animate-float select-none">
                    <div className="flex items-center gap-1 mb-1.5 text-cyan-400">
                      <Languages className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span className="text-[8px] font-bold uppercase tracking-wider">Live OCR Translate</span>
                    </div>
                    
                    <span className="text-[8px] text-neutral-500 block truncate">{activeTrans.context}</span>
                    <p className="text-[9px] font-semibold text-neutral-400 mt-1 line-clamp-2 leading-snug border-b border-white/5 pb-1">
                      "{activeTrans.originalText}"
                    </p>
                    <p className="text-[10px] font-bold text-white mt-1 leading-snug">
                      {activeTrans.translation}
                    </p>
                  </div>
                )}

                {/* 2. Spatial Navigation Dotted Path overlay & Target Node */}
                {showNav && (
                  <>
                    {/* Floating Target Kiosk Flag */}
                    <div className="absolute right-[12%] top-[15%] bg-black/85 border border-blue-500/40 rounded-xl p-3 shadow-lg shadow-blue-500/5 animate-float select-none">
                      <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Waypoint target</span>
                      </div>
                      <h6 className="text-[10px] font-bold text-white">{activeDest.name}</h6>
                      <div className="flex items-center gap-2 mt-1.5 text-[8px] text-neutral-400">
                        <span>Dist: <strong className="text-white">{activeDest.distance}</strong></span>
                        <span>•</span>
                        <span>ETA: <strong className="text-white">{activeDest.eta}</strong></span>
                      </div>
                    </div>

                    {/* Dotted Floor Path simulation (Perspective SVG Overlay) */}
                    <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 800 450">
                      {dest === "lab" && (
                        <path 
                          d="M 400 400 Q 300 300 155 240" 
                          fill="none" 
                          stroke="rgba(59, 130, 246, 0.8)" 
                          strokeWidth="3" 
                          strokeDasharray="6 6"
                          className="animate-pulse" 
                        />
                      )}
                      {dest === "coffee" && (
                        <path 
                          d="M 400 400 Q 500 320 620 280" 
                          fill="none" 
                          stroke="rgba(59, 130, 246, 0.8)" 
                          strokeWidth="3" 
                          strokeDasharray="6 6"
                          className="animate-pulse" 
                        />
                      )}
                      {dest === "exit" && (
                        <path 
                          d="M 400 400 Q 380 320 180 320" 
                          fill="none" 
                          stroke="rgba(59, 130, 246, 0.8)" 
                          strokeWidth="3" 
                          strokeDasharray="6 6"
                          className="animate-pulse" 
                        />
                      )}
                    </svg>
                  </>
                )}
              </div>

              {/* Bottom Row: Steps HUD and calibrator */}
              <div className="relative z-10 w-full flex justify-between items-end">
                {showNav ? (
                  <div className="bg-black/85 border border-white/5 rounded-xl p-3 max-w-[320px] shadow-md">
                    <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Route instructions</span>
                    <ol className="space-y-1 list-decimal pl-3 text-neutral-300 text-[9px] leading-snug">
                      {activeDest.steps.map((step, idx) => (
                        <li key={idx}>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <div className="w-10" />
                )}

                <button
                  onClick={handleCalibrate}
                  disabled={isCalibrating}
                  className="bg-black/75 hover:bg-black border border-white/10 rounded-xl px-4 py-2 text-cyan-400 font-bold hover:text-white transition-all pointer-events-auto flex items-center gap-1.5 cursor-pointer"
                >
                  {isCalibrating ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Calibrating IMU...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Recalibrate Sensor</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
