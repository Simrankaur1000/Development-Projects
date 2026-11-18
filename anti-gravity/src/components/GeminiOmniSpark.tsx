"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Mic, Image as ImageIcon, Video, Send, 
  Calendar, Mail, CheckCircle2, Clock, Play, Loader2,
  ListTodo, Shield, Check, MessageSquareCode
} from "lucide-react";

interface AgentTask {
  id: string;
  agent: "Calendar" | "Gmail" | "Tasks" | "Security" | "Vision";
  description: string;
  status: "idle" | "running" | "completed";
  duration: number;
}

const PRESET_PROMPTS = [
  {
    text: "Organize my afternoon schedule and draft follow-ups",
    icon: Calendar,
    type: "text",
    tasks: [
      { id: "1", agent: "Calendar", description: "Fetching events for July 4th...", status: "idle", duration: 1200 },
      { id: "2", agent: "Calendar", description: "Resolving 3:00 PM calendar conflict", status: "idle", duration: 1500 },
      { id: "3", agent: "Gmail", description: "Drafting reschedule request to Sarah", status: "idle", duration: 1800 },
      { id: "4", agent: "Tasks", description: "Adding follow-up tasks to project board", status: "idle", duration: 1000 }
    ],
    response: "I've reviewed your afternoon. I detected a conflict at 3:00 PM between your 'Design Sync' and 'Product Review'. I rescheduled the Design Sync to 4:30 PM, drafted an update email to Sarah, and added the action items to your workspace board."
  },
  {
    text: "Analyze the security layout schema image for vulnerabilities",
    icon: ImageIcon,
    type: "image",
    tasks: [
      { id: "1", agent: "Vision", description: "Parsing uploaded layout blueprint...", status: "idle", duration: 1500 },
      { id: "2", agent: "Security", description: "Mapping entry points and sensor positions", status: "idle", duration: 1800 },
      { id: "3", agent: "Security", description: "Identifying coverage gaps in zone B", status: "idle", duration: 1200 },
      { id: "4", agent: "Tasks", description: "Filing ticket: 'Upgrade hardware in Room 3'", status: "idle", duration: 1000 }
    ],
    response: "Security Audit Complete. The analysis of your layout shows a coverage gap in Zone B (East Corridor). Motion sensors are blocked by the new column. I've filed a Jira ticket to relocate the sensor."
  },
  {
    text: "Monitor this video stream and detect package delivery",
    icon: Video,
    type: "video",
    tasks: [
      { id: "1", agent: "Vision", description: "Hooking into real-time camera feed...", status: "idle", duration: 1400 },
      { id: "2", agent: "Vision", description: "Tracking foreground motion events", status: "idle", duration: 1600 },
      { id: "3", agent: "Security", description: "Matching delivery truck logo triggers", status: "idle", duration: 1500 },
      { id: "4", agent: "Gmail", description: "Preparing notification message", status: "idle", duration: 1000 }
    ],
    response: "Omni-monitoring active. I am tracking the live entrance feed. I will send a Slack alert and ping your phone the moment a delivery vehicle or courier enters the driveway."
  }
];

export default function GeminiOmniSpark() {
  const [inputType, setInputType] = useState<"text" | "voice" | "image" | "video">("text");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTasks, setActiveTasks] = useState<AgentTask[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [response, setResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [soundBars, setSoundBars] = useState<number[]>([10, 20, 15, 30, 25, 40, 15, 20, 35, 10]);
  
  const consoleEndRef = useRef<HTMLDivElement>(null);
  
  // Voice amplitude simulator
  useEffect(() => {
    if (inputType !== "voice") return;
    const interval = setInterval(() => {
      setSoundBars(prev => prev.map(() => Math.floor(Math.random() * 45) + 5));
    }, 100);
    return () => clearInterval(interval);
  }, [inputType]);

  // Log auto-scroll
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Response typewriter effect
  useEffect(() => {
    if (!response) {
      setDisplayedResponse("");
      return;
    }
    let idx = 0;
    setDisplayedResponse("");
    const interval = setInterval(() => {
      setDisplayedResponse(prev => prev + response.charAt(idx));
      idx++;
      if (idx >= response.length) {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [response]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  };

  const handleRunPreset = (preset: typeof PRESET_PROMPTS[0]) => {
    if (isGenerating) return;
    setInputType(preset.type as any);
    setPrompt(preset.text);
    triggerSimulation(preset.tasks as AgentTask[], preset.response);
  };

  const triggerSimulation = (tasks: AgentTask[], finalResponse: string) => {
    setIsGenerating(true);
    setResponse("");
    setLogs([]);
    addLog(`Initializing Gemini Omni-Spark engine...`);
    
    // Copy tasks and set to idle
    const currentTasks: AgentTask[] = tasks.map(t => ({ ...t, status: "idle" }));
    setActiveTasks(currentTasks);

    let currentTaskIndex = 0;

    const runNextTask = () => {
      if (currentTaskIndex >= currentTasks.length) {
        // Complete everything
        setIsGenerating(false);
        setResponse(finalResponse);
        addLog("Omni-Spark Agent Operations successfully completed.");
        return;
      }

      // Update state to running
      currentTasks[currentTaskIndex].status = "running";
      setActiveTasks([...currentTasks]);
      addLog(`[Agent: ${currentTasks[currentTaskIndex].agent}] ${currentTasks[currentTaskIndex].description}`);

      setTimeout(() => {
        currentTasks[currentTaskIndex].status = "completed";
        setActiveTasks([...currentTasks]);
        addLog(`[Agent: ${currentTasks[currentTaskIndex].agent}] Task completed.`);
        
        currentTaskIndex++;
        runNextTask();
      }, currentTasks[currentTaskIndex].duration);
    };

    setTimeout(() => {
      addLog(`Omni-channel established. Type: ${inputType.toUpperCase()}. Parsing prompt...`);
      runNextTask();
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    
    // Create random/custom tasks based on current prompt
    const customTasks: AgentTask[] = [
      { id: "1", agent: "Calendar", description: "Scanning schedules...", status: "idle", duration: 1000 },
      { id: "2", agent: "Gmail", description: "Analyzing communication history...", status: "idle", duration: 1200 },
      { id: "3", agent: "Tasks", description: "Mapping actionable steps...", status: "idle", duration: 800 }
    ];
    const customResponse = `Gemini Spark Omni has processed your request: "${prompt}". I've run diagnostics across your workspace and optimized the agent flow to execute your commands.`;
    triggerSimulation(customTasks, customResponse);
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Simulation Controls (Left - 7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Gemini Omni Spark</h3>
                <p className="text-xs text-neutral-400">Multimodal Agent Engine</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-cyan-400 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                {isGenerating ? "Executing agents" : "Engine Ready"}
              </span>
            </div>
          </div>

          {/* Multimodal Input Toggles */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <button
              onClick={() => setInputType("text")}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs font-semibold gap-2 transition-all duration-300 cursor-pointer ${
                inputType === "text"
                  ? "bg-white/10 border-white/20 text-white shadow-md"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white hover:bg-white/8"
              }`}
            >
              <MessageSquareCode className="w-4 h-4 text-cyan-400" />
              <span>Text Prompt</span>
            </button>
            <button
              onClick={() => setInputType("voice")}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs font-semibold gap-2 transition-all duration-300 cursor-pointer ${
                inputType === "voice"
                  ? "bg-white/10 border-white/20 text-white shadow-md"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white hover:bg-white/8"
              }`}
            >
              <Mic className="w-4 h-4 text-purple-400" />
              <span>Voice Omni</span>
            </button>
            <button
              onClick={() => setInputType("image")}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs font-semibold gap-2 transition-all duration-300 cursor-pointer ${
                inputType === "image"
                  ? "bg-white/10 border-white/20 text-white shadow-md"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white hover:bg-white/8"
              }`}
            >
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span>Image Audit</span>
            </button>
            <button
              onClick={() => setInputType("video")}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs font-semibold gap-2 transition-all duration-300 cursor-pointer ${
                inputType === "video"
                  ? "bg-white/10 border-white/20 text-white shadow-md"
                  : "bg-white/5 border-transparent text-neutral-400 hover:text-white hover:bg-white/8"
              }`}
            >
              <Video className="w-4 h-4 text-pink-400" />
              <span>Live Feed</span>
            </button>
          </div>

          {/* Multimodal Viewport simulation */}
          <div className="mb-6 rounded-xl border border-white/5 overflow-hidden bg-black/40 min-h-[140px] flex flex-col justify-center items-center p-4">
            {inputType === "text" && (
              <div className="w-full text-center py-4">
                <p className="text-sm text-neutral-400 italic">Omni-Spark waiting for prompt. Select a preset below or type custom query.</p>
              </div>
            )}

            {inputType === "voice" && (
              <div className="flex flex-col items-center gap-4 py-3">
                <div className="flex items-end gap-1.5 h-12">
                  {soundBars.map((val, idx) => (
                    <div 
                      key={idx} 
                      style={{ height: `${val}px` }} 
                      className="w-1 bg-gradient-to-t from-purple-600 to-cyan-400 rounded-full transition-all duration-100"
                    />
                  ))}
                </div>
                <span className="text-xs text-purple-300 animate-pulse font-medium">Listening for voice prompts... Speak now</span>
              </div>
            )}

            {inputType === "image" && (
              <div className="w-full flex items-center justify-center gap-6 py-2">
                <div className="relative w-28 h-20 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  <div className="w-6 h-6 border-2 border-dashed border-cyan-500/40 rounded flex items-center justify-center">
                    <span className="text-[8px] text-cyan-400 font-bold">SCH</span>
                  </div>
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white font-semibold">security_schema_v2.png</p>
                  <p className="text-[10px] text-neutral-400">Resolution: 2048 x 1536 px</p>
                  <p className="text-[10px] text-cyan-400 mt-1">Image Loaded. Ready for vulnerability audit.</p>
                </div>
              </div>
            )}

            {inputType === "video" && (
              <div className="w-full relative h-28 bg-neutral-950 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                
                {/* Simulated lens feed */}
                <div className="w-full h-full flex flex-col justify-between p-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded text-[8px] font-bold text-red-500">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                      <span>REC FEED_04A</span>
                    </div>
                    <span className="text-[8px] font-mono text-neutral-400">CAM_DOCK_WEST</span>
                  </div>
                  
                  {/* Floating target tracking box */}
                  <div className="self-center w-16 h-12 border border-cyan-500/60 rounded relative">
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-400" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-400" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-400" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-400" />
                    <span className="absolute top-1 left-1 text-[6px] font-bold text-cyan-400 bg-cyan-950/80 px-1 py-0.2 rounded">SCANNING</span>
                  </div>

                  <span className="text-[8px] font-mono text-neutral-500 self-end">ISO 800 | 4K 60FPS</span>
                </div>
                
                {/* Horizontal scanline */}
                <div className="absolute left-0 w-full h-[2px] bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-scanline pointer-events-none" />
              </div>
            )}
          </div>

          {/* Form Prompter */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Prompt Gemini Spark with workspace commands..."
              disabled={isGenerating}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:bg-neutral-800 disabled:text-neutral-600 text-black font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/20"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>

        {/* Preset Prompt Selectors */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider px-1">Interactive Preset Simulations</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESET_PROMPTS.map((preset, idx) => {
              const Icon = preset.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleRunPreset(preset)}
                  disabled={isGenerating}
                  className="glass-panel text-left p-3.5 rounded-xl border border-white/5 hover:border-white/15 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between h-[100px] group cursor-pointer disabled:opacity-50"
                >
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-neutral-300 font-medium line-clamp-2 leading-snug">{preset.text}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Agent Operations Console (Right - 5 cols) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Operations Tracker */}
        <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col min-h-[280px]">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-purple-400" />
            Workspace Agent Tasks
          </h4>
          
          <div className="flex-1 flex flex-col gap-3 justify-center">
            {activeTasks.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                <Clock className="w-8 h-8 mx-auto mb-2 text-neutral-600 opacity-60" />
                <p className="text-xs font-medium">Waiting for command validation...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {activeTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                      task.status === "completed" 
                        ? "bg-emerald-950/10 border-emerald-500/20" 
                        : task.status === "running"
                        ? "bg-cyan-950/10 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.05)]"
                        : "bg-white/5 border-transparent opacity-60"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {task.status === "completed" ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                      ) : task.status === "running" ? (
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 animate-spin">
                          <Loader2 className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                          <span className="text-[10px] text-neutral-400 font-bold">{task.id}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                          Agent: {task.agent}
                        </span>
                        {task.status === "running" && (
                          <span className="text-[9px] text-cyan-400 animate-pulse font-medium">In Progress</span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-300 truncate mt-0.5">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Real-time Logs Terminal */}
        <div className="glass-panel rounded-2xl p-4 border border-white/5 flex flex-col h-[200px] bg-black/60 font-mono text-[10px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
            <span className="text-neutral-500 font-semibold uppercase tracking-wider">Omni-Agent Terminal Log</span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar scroll-smooth">
            {logs.length === 0 ? (
              <span className="text-neutral-600 block">Console offline. Establish prompt session to stream traces.</span>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="text-neutral-300 flex items-start gap-1">
                  <span className="text-cyan-500/60 flex-shrink-0">&gt;</span>
                  <span className="break-all">{log}</span>
                </div>
              ))
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>
      </div>

      {/* Structured Response Overlay (Full Width - 12 cols) */}
      {displayedResponse && (
        <div className="lg:col-span-12 glass-panel rounded-2xl p-5 border border-cyan-500/20 relative overflow-hidden bg-gradient-to-r from-cyan-950/10 via-[#030303] to-purple-950/10 animate-fade-in">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-400 to-purple-500" />
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Gemini Spark Synthesis</span>
              <p className="text-sm text-white font-medium mt-1 leading-relaxed">{displayedResponse}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
