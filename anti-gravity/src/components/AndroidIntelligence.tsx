"use client";

import React, { useState, useEffect } from "react";
import { 
  Smartphone, Search, Mail, Calendar, MapPin, BatteryCharging, 
  Wifi, ShieldCheck, Star, Download, Sparkles, MessageSquare, 
  Layers, VolumeX, Volume2, Moon, AppWindow, ArrowRight, ShieldAlert,
  Play
} from "lucide-react";

interface AppMock {
  name: string;
  category: string;
  rating: number;
  downloads: string;
  privacy: "High" | "Medium";
  offline: boolean;
  whyMatched: string;
  iconBg: string;
}

const PLAY_STORE_PRESETS = [
  {
    query: "Budgeting app that reads receipts and doesn't share data",
    explanation: "I found 2 apps that match your strict privacy settings. Both process receipt images entirely on-device using local neural models, avoiding third-party server uploads.",
    apps: [
      {
        name: "OmniLedger Local",
        category: "Finance & Budgeting",
        rating: 4.8,
        downloads: "500K+",
        privacy: "High" as const,
        offline: true,
        whyMatched: "On-device OCR scanner; zero analytics networks.",
        iconBg: "bg-emerald-600"
      },
      {
        name: "PrivaKeep Cash",
        category: "Personal Finance",
        rating: 4.6,
        downloads: "100K+",
        privacy: "High" as const,
        offline: true,
        whyMatched: "Encrypted SQLite database synced only to private iCloud/Drive.",
        iconBg: "bg-blue-600"
      }
    ]
  },
  {
    query: "Interactive coding games for kids that work offline",
    explanation: "Recommended these offline learning tools. They feature visual block-based coding, require zero logins, and operate without internet dependencies.",
    apps: [
      {
        name: "ByteQuest Island",
        category: "Education / Games",
        rating: 4.9,
        downloads: "1M+",
        privacy: "High" as const,
        offline: true,
        whyMatched: "100% offline curriculum, parental control locked.",
        iconBg: "bg-purple-600"
      },
      {
        name: "BlockBots",
        category: "Kids Puzzle Coding",
        rating: 4.7,
        downloads: "250K+",
        privacy: "Medium" as const,
        offline: true,
        whyMatched: "Self-contained logic games, offline mode supported.",
        iconBg: "bg-orange-600"
      }
    ]
  }
];

export default function AndroidIntelligence() {
  const [screen, setScreen] = useState<"home" | "play">("home");
  const [haloState, setHaloState] = useState<"idle" | "listening" | "processing" | "success">("idle");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AppMock[]>([]);
  const [searchExplanation, setSearchExplanation] = useState("");
  
  // Widget customization states
  const [scheduleWidgetAdjusted, setScheduleWidgetAdjusted] = useState(false);
  const [showInboxSummary, setShowInboxSummary] = useState(true);
  const [smartFocusMode, setSmartFocusMode] = useState(false);

  // Trigger search simulation
  const handlePlaySearch = (queryText: string) => {
    if (isSearching) return;
    setSearchQuery(queryText);
    setIsSearching(true);
    setHaloState("listening");

    setTimeout(() => {
      setHaloState("processing");
    }, 1200);

    setTimeout(() => {
      // Find matches in presets
      const matchedPreset = PLAY_STORE_PRESETS.find(p => 
        p.query.toLowerCase().includes(queryText.toLowerCase().substring(0, 10))
      ) || {
        explanation: `Custom search results for "${queryText}". I have verified on-device capabilities and privacy permissions.`,
        apps: [
          {
            name: "CustomApp Secure",
            category: "Utility Tool",
            rating: 4.5,
            downloads: "10K+",
            privacy: "High" as const,
            offline: true,
            whyMatched: "Complies with specified security parameters.",
            iconBg: "bg-rose-600"
          }
        ]
      };

      setSearchResults(matchedPreset.apps);
      setSearchExplanation(matchedPreset.explanation);
      setIsSearching(false);
      setHaloState("success");

      setTimeout(() => {
        setHaloState("idle");
      }, 2000);
    }, 3200);
  };

  const submitCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    handlePlaySearch(searchQuery);
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      
      {/* Smartphone Frame Simulation (Left - 6 cols) */}
      <div className="md:col-span-6 flex justify-center">
        <div className="relative w-[320px] h-[640px] rounded-[48px] border-[10px] border-neutral-900 bg-neutral-950 shadow-[0_0_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(255,255,255,0.03)] overflow-hidden flex flex-col group/phone">
          
          {/* Side Buttons (Physical) */}
          <div className="absolute right-[-12px] top-28 w-[3px] h-10 bg-neutral-800 rounded-l" />
          <div className="absolute right-[-12px] top-44 w-[3px] h-16 bg-neutral-800 rounded-l" />
          
          {/* TOP NOTCH AREA with the Android Halo */}
          <div className="relative w-full bg-neutral-950 pt-2 flex flex-col items-center z-30">
            {/* Status bar */}
            <div className="w-full px-6 flex justify-between items-center text-[10px] text-neutral-400 font-medium select-none">
              <span>11:45 AM</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3" />
                <BatteryCharging className="w-3 h-3 text-emerald-400" />
                <span>84%</span>
              </div>
            </div>

            {/* Android Halo Ring */}
            <div className="relative mt-2.5 mb-2 w-48 h-5 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden">
              {/* Pulsing light overlay based on Halo state */}
              {haloState === "idle" && (
                <div className="absolute inset-0 bg-neutral-900 border border-white/5 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-700" />
                </div>
              )}
              {haloState === "listening" && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-halo-rotate opacity-90 rounded-full blur-[1px]">
                  <div className="absolute inset-[2px] bg-neutral-950 rounded-full flex items-center justify-center">
                    <span className="text-[7px] text-cyan-400 font-bold uppercase tracking-wider animate-pulse">Android Halo: Listening</span>
                  </div>
                </div>
              )}
              {haloState === "processing" && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-halo-rotate rounded-full">
                  <div className="absolute inset-[2px] bg-neutral-950 rounded-full flex items-center justify-center">
                    <span className="text-[7px] text-pink-400 font-bold uppercase tracking-wider">Analyzing Trust Metrics...</span>
                  </div>
                </div>
              )}
              {haloState === "success" && (
                <div className="absolute inset-0 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                  <span className="text-[7px] text-white font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" /> Privacy Verified
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* SCREEN BODY VIEWPORTS (Home Screen vs Play Store) */}
          <div className="flex-1 relative flex flex-col p-4 bg-gradient-to-b from-neutral-900/60 to-neutral-950">
            {screen === "home" ? (
              /* SCREEN 1: HOME SCREEN (AI WIDGETS) */
              <div className="flex-grow flex flex-col gap-4 overflow-y-auto pr-0.5 scrollbar-none select-none">
                {/* Search Bar Widget */}
                <div 
                  onClick={() => setScreen("play")}
                  className="bg-neutral-800/80 border border-white/5 rounded-2xl px-3.5 py-2.5 flex items-center justify-between text-neutral-400 cursor-pointer hover:bg-neutral-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-xs">Search Google Play securely...</span>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>

                {/* Date/Weather Widget */}
                <div className="p-3 bg-neutral-800/40 border border-white/5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Saturday, July 4</span>
                      <p className="text-xl font-bold text-white tracking-tight">Sunny, 78°F</p>
                    </div>
                    <span className="text-2xl">☀️</span>
                  </div>
                  <p className="text-[9px] text-cyan-400 mt-2 font-medium">✨ Android intelligence sync completed 2m ago</p>
                </div>

                {/* Widget 1: Smart Traffic & Route Schedule */}
                <div className="p-3.5 bg-neutral-800/50 border border-white/5 rounded-2xl flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Smart Travel Router</span>
                    </div>
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-white">Drive to Design Sync Meeting</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Depart in 10 mins. Traffic is heavy via I-94.</p>
                  </div>

                  {!scheduleWidgetAdjusted ? (
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button 
                        onClick={() => {
                          setScheduleWidgetAdjusted(true);
                          setHaloState("listening");
                          setTimeout(() => { setHaloState("success"); setTimeout(() => setHaloState("idle"), 1500); }, 1200);
                        }}
                        className="py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-[10px] text-white font-semibold rounded-lg text-center cursor-pointer transition-colors"
                      >
                        Find Alt Route
                      </button>
                      <button 
                        onClick={() => {
                          setScheduleWidgetAdjusted(true);
                          addSmartResponse("Gmail Agent: Drafted decline to organizer.");
                        }}
                        className="py-1.5 px-2 bg-neutral-700 hover:bg-neutral-600 text-[10px] text-neutral-300 font-semibold rounded-lg text-center cursor-pointer transition-colors"
                      >
                        Decline Sync
                      </button>
                    </div>
                  ) : (
                    <div className="p-2 bg-blue-950/20 border border-blue-500/20 rounded-lg">
                      <p className="text-[9px] text-cyan-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Re-routed via Parkway (+2 mins, clears gridlock)
                      </p>
                    </div>
                  )}
                </div>

                {/* Widget 2: Custom Smart Inbox Summaries */}
                {showInboxSummary && (
                  <div className="p-3.5 bg-neutral-800/50 border border-white/5 rounded-2xl flex flex-col gap-2 relative">
                    <button 
                      onClick={() => setShowInboxSummary(false)} 
                      className="absolute top-2 right-2 text-neutral-500 hover:text-white text-xs cursor-pointer"
                    >
                      ×
                    </button>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Smart Inbox Summaries</span>
                    </div>
                    <div className="space-y-2 mt-1">
                      <div className="border-l-2 border-purple-500 pl-2">
                        <p className="text-[10px] font-semibold text-white truncate">Client Feedback: Project Alpha</p>
                        <p className="text-[9px] text-neutral-400 line-clamp-1">Wants to increase team seat budget. Needs new proposal by Monday.</p>
                      </div>
                      <div className="border-l-2 border-neutral-600 pl-2">
                        <p className="text-[10px] font-semibold text-neutral-300 truncate">Workspace Security: API Keys</p>
                        <p className="text-[9px] text-neutral-500 line-clamp-1">New access key spawned. Verified Skynet source.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Widget 3: Device Automation Control */}
                <div className="p-3.5 bg-neutral-800/50 border border-white/5 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Contextual Automation</span>
                    <Layers className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-black/30 rounded-xl mt-1 border border-white/5">
                    <div className="flex items-center gap-2">
                      {smartFocusMode ? <Moon className="w-3.5 h-3.5 text-purple-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                      <div>
                        <p className="text-[10px] font-semibold text-white">Smart Focus Shield</p>
                        <p className="text-[8px] text-neutral-400">{smartFocusMode ? "DND Active: Coding mode" : "Alert sound: Normal"}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSmartFocusMode(!smartFocusMode)}
                      className={`w-8 h-4 rounded-full p-0.5 transition-all duration-300 cursor-pointer ${smartFocusMode ? 'bg-cyan-500' : 'bg-neutral-700'}`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-all ${smartFocusMode ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* SCREEN 2: CONVERSATIONAL GOOGLE PLAY STORE */
              <div className="flex-grow flex flex-col gap-3 overflow-y-auto pr-0.5 scrollbar-none">
                
                {/* Play Store Header */}
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <button 
                    onClick={() => {
                      setScreen("home");
                      setSearchResults([]);
                      setSearchExplanation("");
                      setSearchQuery("");
                    }} 
                    className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer font-bold"
                  >
                    ← Back Home
                  </button>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest ml-auto">Google Play AI Search</span>
                </div>

                {/* AI Search input */}
                <form onSubmit={submitCustomSearch} className="flex gap-1.5">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search apps by privacy/features..."
                    disabled={isSearching}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 text-[10px] text-white focus:outline-none focus:border-cyan-500/50"
                  />
                  <button 
                    type="submit" 
                    disabled={isSearching}
                    className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black flex items-center justify-center cursor-pointer"
                  >
                    <Search className="w-3 h-3" />
                  </button>
                </form>

                {/* AI Search Preset suggestion tags */}
                {searchResults.length === 0 && !isSearching && (
                  <div className="flex flex-col gap-2 my-2">
                    <span className="text-[8px] font-bold text-neutral-500 uppercase">Try Conversational Searches</span>
                    {PLAY_STORE_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePlaySearch(p.query)}
                        className="text-left p-2 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/20 hover:bg-white/10 text-[9px] text-neutral-300 font-medium transition-all cursor-pointer"
                      >
                        "{p.query}"
                      </button>
                    ))}
                  </div>
                )}

                {/* AI Explanation Area */}
                {isSearching ? (
                  <div className="py-8 flex flex-col items-center gap-2 justify-center text-center">
                    <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
                    <p className="text-[10px] text-neutral-400">Verifying security manifests...</p>
                  </div>
                ) : (
                  <>
                    {searchExplanation && (
                      <div className="p-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-[9px] text-cyan-200 leading-normal flex items-start gap-1.5">
                        <Sparkles className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <p>{searchExplanation}</p>
                      </div>
                    )}

                    {/* App Listing Results */}
                    {searchResults.length > 0 && (
                      <div className="flex flex-col gap-2 mt-1">
                        <span className="text-[8px] font-bold text-neutral-500 uppercase">Verified Secure Matches</span>
                        {searchResults.map((app, idx) => (
                          <div key={idx} className="p-2.5 bg-neutral-800/40 border border-white/5 rounded-xl flex flex-col gap-2 hover:border-white/10 transition-colors">
                            <div className="flex gap-2">
                              <div className={`w-8 h-8 rounded-lg ${app.iconBg} flex items-center justify-center text-white text-xs font-bold font-mono`}>
                                {app.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-[10px] font-bold text-white truncate">{app.name}</h5>
                                <p className="text-[8px] text-neutral-500">{app.category}</p>
                              </div>
                              <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[8px] text-white font-bold flex items-center gap-0.5 cursor-pointer">
                                <Download className="w-2 h-2" /> Inst.
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-2 border-t border-white/5 pt-1.5 text-[8px] text-neutral-400">
                              <div className="flex items-center gap-0.5">
                                <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-white">{app.rating}</span>
                              </div>
                              <span>•</span>
                              <span>{app.downloads} downloads</span>
                              {app.offline && (
                                <>
                                  <span>•</span>
                                  <span className="text-emerald-400 font-semibold bg-emerald-950/20 px-1 rounded">Offline verified</span>
                                </>
                              )}
                            </div>
                            <p className="text-[8.5px] text-cyan-300 italic leading-snug bg-cyan-950/10 p-1.5 rounded border border-cyan-500/5">
                              🤖 {app.whyMatched}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

              </div>
            )}
          </div>
          
          {/* BOTTOM HOME NAV BAR */}
          <div className="w-full h-11 bg-neutral-950 border-t border-white/5 flex items-center justify-center select-none z-20">
            <button 
              onClick={() => {
                setScreen("home");
                setSearchResults([]);
                setSearchExplanation("");
                setSearchQuery("");
              }}
              className="w-16 h-1 bg-white/30 hover:bg-white/60 rounded-full transition-colors cursor-pointer" 
            />
          </div>
        </div>
      </div>

      {/* Description Panel (Right - 6 cols) */}
      <div className="md:col-span-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Android Intelligence Simulator</h3>
            <p className="text-xs text-neutral-400 font-medium">Contextual Operating Systems</p>
          </div>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed">
          Interact with a premium mobile sandbox simulating AI-first OS designs. The pulsing <span className="text-cyan-400 font-semibold">Android Halo</span> serves as an ambient trust boundary, analyzing app manifests and data policies.
        </p>

        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-400">
              <span className="text-[10px] font-bold">1</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Ambient Trust Boundary</p>
              <p className="text-[11px] text-neutral-400">Halo switches visual states (cyan, purple, emerald) to signal search validation, background sandbox scanning, and permission enforcement.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-purple-400">
              <span className="text-[10px] font-bold">2</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">AI-Driven Context Widgets</p>
              <p className="text-[11px] text-neutral-400">Simulate route updates, email digests, and DND settings that react to surrounding calendar meetings and travel conditions in real-time.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-pink-400">
              <span className="text-[10px] font-bold">3</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Conversational App Store Search</p>
              <p className="text-[11px] text-neutral-400">Run queries inside the Google Play Store mockup. An autonomous agent reads APK privacy flags, sorting search returns dynamically.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 bg-[#030303]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-neutral-400 font-semibold">Mock Device State: Online</span>
          </div>
          <button 
            onClick={() => {
              setScreen(screen === "home" ? "play" : "home");
              setSearchResults([]);
              setSearchExplanation("");
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            Toggle Phone View <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
    </div>
  );
}

// Global smart log proxy placeholder
function addSmartResponse(msg: string) {
  console.log(`[Smart OS Engine] ${msg}`);
}
