"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Globe, ArrowLeft, ArrowRight, RotateCw, Lock, Sparkles, 
  Play, Loader2, Check, FileText, Terminal, Layers, Info, 
  MessageSquare, Newspaper, GitFork, Star, ShieldAlert
} from "lucide-react";

const Github = (props: React.ComponentPropsWithoutRef<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface MockTab {
  id: "github" | "reddit" | "hn";
  title: string;
  url: string;
  icon: React.ComponentType<any>;
}

const TABS: MockTab[] = [
  { id: "github", title: "google/webmcp - GitHub", url: "https://github.com/google/webmcp", icon: Github },
  { id: "reddit", title: "r/programming: WebMCP Launch", url: "https://reddit.com/r/programming/webmcp", icon: MessageSquare },
  { id: "hn", title: "Hacker News: WebMCP Standard", url: "https://news.ycombinator.com/item?id=49201", icon: Newspaper }
];

export default function ChromeMCP() {
  const [activeTab, setActiveTab] = useState<"github" | "reddit" | "hn">("github");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaries, setSummaries] = useState<Record<string, string[]>>({
    github: [
      "Official WebMCP repository for browser-based client agents.",
      "Contains the Javascript API, schema definitions, and sandboxed iframe bridges.",
      "Latest commit: 'refactor (core): optimize message transport serialization' (2h ago).",
      "Repository has 4.2k stars, 128 forks, and is licensed under Apache-2.0."
    ],
    reddit: [
      "Community discussion surrounding WebMCP safety guidelines.",
      "Top comment (254 upvotes) praises the iframe standard for permission delegation.",
      "Some developers express concerns about iframe escape loops and visual overlay spoofing.",
      "Overall sentiment is positive (74% positive/neutral, 26% cautious)."
    ],
    hn: [
      "Hacker News thread with 312 points, 142 comments.",
      "Discussion centers on comparison with traditional MCP (Model Context Protocol).",
      "Key insight: WebMCP brings client-side tool discovery directly to standard browser environments without server-side config.",
      "Mentions of integration with V8 sandboxes and Chrome Extension extensions."
    ]
  });

  const [activeSummary, setActiveSummary] = useState<string[] | null>(null);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [isRunningTool, setIsRunningTool] = useState(false);
  const [currentToolOutput, setCurrentToolOutput] = useState<string | null>(null);
  const [activeToolName, setActiveToolName] = useState<string | null>(null);

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [agentLogs]);

  // Reset page-specific summaries when tab changes
  useEffect(() => {
    setActiveSummary(null);
    setCurrentToolOutput(null);
    setActiveToolName(null);
  }, [activeTab]);

  const addAgentLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setAgentLogs(prev => [...prev, `[WebMCP Sidekick] ${msg}`]);
  };

  const handleSummarize = () => {
    if (isSummarizing) return;
    setIsSummarizing(true);
    addAgentLog(`Injecting DOM scraper in tab context: ${TABS.find(t => t.id === activeTab)?.url}`);
    
    setTimeout(() => {
      addAgentLog(`Parsing DOM hierarchy & stripping scripts...`);
    }, 1000);

    setTimeout(() => {
      setActiveSummary(summaries[activeTab]);
      setIsSummarizing(false);
      addAgentLog(`Summary generated successfully.`);
    }, 2200);
  };

  const handleRunTool = (toolName: string, actionDesc: string) => {
    if (isRunningTool) return;
    setIsRunningTool(true);
    setActiveToolName(toolName);
    setCurrentToolOutput(null);
    addAgentLog(`Executing WebMCP page tool: '${toolName}'`);
    
    setTimeout(() => {
      addAgentLog(`Requested permission grant for '${toolName}' in viewport sandbox.`);
    }, 800);

    setTimeout(() => {
      addAgentLog(`Permission GRANTED by browser host.`);
    }, 1400);

    setTimeout(() => {
      let output = "";
      if (toolName === "github.cloneRepo") {
        output = "Repository successfully downloaded to local agent workspace structure. Size: 2.8 MB. Loaded 41 files.";
      } else if (toolName === "reddit.scrapeComments") {
        output = "Parsed 142 comment threads. Exported to JSON. Found 12 recurring concerns: 'visual overlays', 'cross-origin leaks'.";
      } else if (toolName === "hn.extractLinks") {
        output = "Extracted 14 external outbound hyperlinks. Verified 12 secure redirects, 2 flagged as tracker warnings.";
      }
      
      setCurrentToolOutput(output);
      setIsRunningTool(false);
      addAgentLog(`Tool '${toolName}' finished execution.`);
    }, 2800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
      
      {/* Simulation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">WebMCP Chrome Simulator</h3>
            <p className="text-xs text-neutral-400">Standard for Browser-Based Agent Protocol</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-neutral-400">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Active WebMCP Session ID: webmcp-session-78x9</span>
        </div>
      </div>

      {/* Browser Viewport + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Mock Browser Viewport (Left - 8 cols) */}
        <div className="lg:col-span-8 flex flex-col rounded-xl border border-white/10 bg-[#0e0e11] overflow-hidden shadow-2xl min-h-[460px]">
          {/* Browser Window Controls / Tab Bar */}
          <div className="bg-[#16161a] px-3 pt-2 pb-1.5 flex items-center gap-2 border-b border-white/5 select-none">
            {/* Mac-style Window circles */}
            <div className="flex gap-1.5 mr-4">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Simulated Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-grow">
              {TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-[10px] font-semibold tracking-wide transition-all border-t border-x cursor-pointer ${
                      isSelected
                        ? "bg-[#0e0e11] border-white/10 text-white"
                        : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <TabIcon className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate max-w-[100px]">{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Browser URL Bar and Controls */}
          <div className="bg-[#111114] px-3 py-2 flex items-center gap-3 border-b border-white/5 select-none">
            <div className="flex items-center gap-2.5 text-neutral-400">
              <ArrowLeft className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <RotateCw className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
            </div>
            
            {/* URL Input Box */}
            <div className="flex-1 bg-black/40 border border-white/5 rounded-lg py-1 px-3 flex items-center justify-between text-[11px] text-neutral-300">
              <div className="flex items-center gap-1.5 truncate">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400/90 font-medium">Secure</span>
                <span className="text-neutral-500 font-mono">|</span>
                <span className="font-mono text-neutral-300">{TABS.find(t => t.id === activeTab)?.url}</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Browser Render Pane */}
          <div className="flex-grow p-5 bg-[#0a0a0c] relative select-none">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

            {/* TAB CONTENT: GITHUB */}
            {activeTab === "github" && (
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-neutral-400 font-bold">Public</span>
                    <h4 className="text-sm font-bold text-white font-mono">google / webmcp</h4>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center border border-white/10 rounded-lg text-[10px] text-neutral-400 bg-white/5 overflow-hidden">
                      <div className="flex items-center gap-1 px-2.5 py-1 border-r border-white/10 hover:bg-white/5 cursor-pointer">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span>Star</span>
                      </div>
                      <span className="px-2.5 py-1 bg-black/20 font-bold">4.2k</span>
                    </div>
                    <div className="flex items-center border border-white/10 rounded-lg text-[10px] text-neutral-400 bg-white/5 overflow-hidden">
                      <div className="flex items-center gap-1 px-2.5 py-1 border-r border-white/10 hover:bg-white/5 cursor-pointer">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>Fork</span>
                      </div>
                      <span className="px-2.5 py-1 bg-black/20 font-bold">128</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-neutral-300 space-y-3">
                  <h5 className="font-bold text-white text-[13px]">📄 README.md</h5>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    WebMCP standardizes tool calls, visual inspection interfaces, and local device interactions in sandbox frames. This repository includes standard reference bindings for Next-Gen V8 instances.
                  </p>
                  
                  <div className="border border-white/5 rounded-lg p-2.5 bg-black/80">
                    <span className="text-[10px] text-neutral-500">// Exposed DOM Tool Bindings</span>
                    <pre className="text-[10px] text-cyan-400 mt-1">
{`window.webmcp = {
  tools: {
    cloneRepo: async (url) => { ... },
    runBuildTask: async (cmd) => { ... }
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: REDDIT */}
            {activeTab === "reddit" && (
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-[9px] font-bold text-rose-400 uppercase bg-rose-950/20 px-1.5 py-0.5 rounded-full">r/programming</span>
                  <h4 className="text-sm font-bold text-white">Google launches WebMCP standard for Web Agent integrations</h4>
                  <span className="text-[9px] text-neutral-500 font-medium ml-auto">Posted 8h ago by u/dev_core</span>
                </div>

                <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                  <div className="p-3 bg-neutral-900/60 border border-white/5 rounded-xl text-[11px] leading-relaxed">
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mb-1 font-semibold">
                      <span>u/compile_error</span>
                      <span>•</span>
                      <span>254 pts</span>
                    </div>
                    <p className="text-neutral-300">
                      So this basically lets LLM run tasks natively inside an iframe context, requesting permissions from the parent shell. That's a huge step forward for security vs running agents with raw shell access.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-900/60 border border-white/5 rounded-xl text-[11px] leading-relaxed ml-4">
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mb-1 font-semibold">
                      <span>u/secure_coder</span>
                      <span>•</span>
                      <span>128 pts</span>
                    </div>
                    <p className="text-neutral-300">
                      Agree. But what happens if an agent clicks malicious clickjacking frames? The sandboxed browser still needs overlay inspection rules.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: HN */}
            {activeTab === "hn" && (
              <div className="relative z-10 space-y-3 font-serif">
                <div className="flex items-center gap-1 bg-[#ff6600]/10 border border-[#ff6600]/20 p-2 rounded-lg text-xs font-sans text-neutral-200">
                  <span className="font-bold text-[#ff6600] px-1 bg-white rounded-sm text-[10px] mr-1">Y</span>
                  <span>WebMCP: Standardizing client-side tool discovery for browser agents</span>
                  <span className="text-[10px] text-neutral-400 ml-auto">312 points | by sky_net | 142 comments</span>
                </div>

                <div className="space-y-2.5 font-sans text-[11px] leading-relaxed">
                  <div className="border-l-2 border-white/10 pl-2">
                    <p className="text-neutral-400">
                      If I understand this protocol correctly, you don't need any complex WebSocket plugins anymore. The browser handles the socket sync layer, exposing a secure postMessage listener.
                    </p>
                    <span className="text-[9px] text-[#ff6600] cursor-pointer hover:underline font-semibold block mt-1">reply</span>
                  </div>

                  <div className="border-l-2 border-white/10 pl-2">
                    <p className="text-neutral-400">
                      This fits perfectly with local-first agents running models like Gemini Nano in the browser. You get an autonomous loops running securely at zero server compute cost.
                    </p>
                    <span className="text-[9px] text-[#ff6600] cursor-pointer hover:underline font-semibold block mt-1">reply</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WebMCP Sidekick Sidebar Agent (Right - 4 cols) */}
        <div className="lg:col-span-4 flex flex-col rounded-xl border border-cyan-500/20 bg-[#0e0e11] overflow-hidden shadow-2xl">
          {/* Sidebar Header */}
          <div className="bg-cyan-950/20 px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">WebMCP Sidekick</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-400/20 font-semibold">Active Session</span>
          </div>

          {/* Action Hub / Summary Controls */}
          <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            
            {/* Summarize button */}
            <button
              onClick={handleSummarize}
              disabled={isSummarizing || isRunningTool}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:bg-neutral-800 disabled:text-neutral-600 text-black text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25"
            >
              {isSummarizing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Scraping Viewport...</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>Summarize Page</span>
                </>
              )}
            </button>

            {/* Summarized Content Render */}
            {activeSummary ? (
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/5 flex flex-col gap-2.5">
                <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <Info className="w-3 h-3 text-cyan-400" /> WebMCP Summarizer Engine
                </span>
                
                <ul className="space-y-2 list-none pl-0">
                  {activeSummary.map((item, idx) => (
                    <li key={idx} className="text-[10px] text-neutral-300 leading-normal flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              !isSummarizing && (
                <div className="p-6 rounded-xl border border-dashed border-white/10 text-center text-neutral-500 flex flex-col items-center justify-center">
                  <FileText className="w-7 h-7 mb-2 text-neutral-600 opacity-60" />
                  <p className="text-[10px] font-medium leading-relaxed">No viewport summary active. Click Summarize Page to parse page details.</p>
                </div>
              )
            )}

            {/* Exposed WebMCP Sandbox Tools */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Exposed Page-Level Tools</span>
              
              <div className="grid grid-cols-1 gap-2">
                {activeTab === "github" && (
                  <button
                    onClick={() => handleRunTool("github.cloneRepo", "Clones git repository")}
                    disabled={isSummarizing || isRunningTool}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 text-left transition-all hover:bg-white/8 cursor-pointer text-xs flex items-center justify-between group disabled:opacity-50"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-white font-mono block">github.cloneRepo()</span>
                      <span className="text-[9px] text-neutral-400 block mt-0.5">Downloads repo directory</span>
                    </div>
                    <Play className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}

                {activeTab === "reddit" && (
                  <button
                    onClick={() => handleRunTool("reddit.scrapeComments", "Parses thread posts")}
                    disabled={isSummarizing || isRunningTool}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 text-left transition-all hover:bg-white/8 cursor-pointer text-xs flex items-center justify-between group disabled:opacity-50"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-white font-mono block">reddit.scrapeComments()</span>
                      <span className="text-[9px] text-neutral-400 block mt-0.5">Aggregates sentiment & feedback</span>
                    </div>
                    <Play className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}

                {activeTab === "hn" && (
                  <button
                    onClick={() => handleRunTool("hn.extractLinks", "Harvests outbound URLs")}
                    disabled={isSummarizing || isRunningTool}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 text-left transition-all hover:bg-white/8 cursor-pointer text-xs flex items-center justify-between group disabled:opacity-50"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-white font-mono block">hn.extractLinks()</span>
                      <span className="text-[9px] text-neutral-400 block mt-0.5">Scrapes article destinations</span>
                    </div>
                    <Play className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>
            </div>

            {/* Simulated Tool output */}
            {currentToolOutput && (
              <div className="p-3 bg-emerald-950/10 border border-emerald-500/20 rounded-xl flex flex-col gap-1 text-[10px]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Tool Output Success</span>
                </div>
                <p className="text-neutral-300 leading-normal font-mono">{currentToolOutput}</p>
              </div>
            )}
          </div>

          {/* WebMCP Log Console inside Sidebar */}
          <div className="p-3 bg-black border-t border-white/5 h-[140px] flex flex-col font-mono text-[9px]">
            <span className="text-neutral-500 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-cyan-500" /> Console Logs
            </span>
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar text-neutral-400">
              {agentLogs.length === 0 ? (
                <span className="text-neutral-600 italic">Agent Idle. Ready for commands...</span>
              ) : (
                agentLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-neutral-600">&gt;</span> {log}
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
