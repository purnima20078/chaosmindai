import React, { useState, useEffect, useRef } from "react";
import {
  BrainCircuit,
  Activity,
  ShieldAlert,
  Terminal,
  FileText,
  Settings,
  LogOut,
  Cpu,
  Database,
  Globe,
  TrendingUp,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle,
  Video,
  Send,
  Loader,
  Search,
  Bell,
  User,
  X,
  FileDown,
  Sparkles,
  Zap,
  HardDrive,
  Copy,
  ToggleLeft,
  ToggleRight,
  KeySquare,
} from "lucide-react";
import {
  PageType,
  UserProfile,
  AISettings,
  SystemMetrics,
  ActiveSimulation,
  AlertLog,
  ProcessItem,
  ChatMessage,
} from "../types";

interface DashboardSuiteProps {
  userProfile: UserProfile;
  initialAiSettings: AISettings;
  onLogout: () => void;
  deviceConnectedState: boolean;
}

export default function DashboardSuite({
  userProfile,
  initialAiSettings,
  onLogout,
  deviceConnectedState,
}: DashboardSuiteProps) {
  // Navigation tabs of the dashboard suite
  const [activeTab, setActiveTab] = useState<PageType>(PageType.DASHBOARD);

  // States
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [aiSettings, setAiSettings] = useState<AISettings>(initialAiSettings);
  const [deviceConnected, setDeviceConnected] = useState(deviceConnectedState);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);

  // Notifications state
  const [notifs, setNotifs] = useState([
    { id: "1", text: "ChaosMind Node-01 connected successfully", time: "Just now" },
    { id: "2", text: "System Risk Score stabilized at 18%", time: "5 min ago" },
  ]);
  const [showNotifsDropdown, setShowNotifsDropdown] = useState(false);

  // Notification Settings
  const [settingsNotif, setSettingsNotif] = useState({
    emailAlerts: true,
    highRiskAlerts: true,
    simulationAlerts: true,
  });

  // Telemetry metrics
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 72,
    ram: 64,
    disk: 51,
    network: 120,
    riskScore: 18,
    status: "Healthy",
    cpuHistory: Array.from({ length: 20 }, () => 65 + Math.floor(Math.random() * 12)),
    ramHistory: Array.from({ length: 20 }, () => 60 + Math.floor(Math.random() * 6)),
    diskHistory: Array.from({ length: 20 }, () => 51),
    networkHistory: Array.from({ length: 20 }, () => 110 + Math.floor(Math.random() * 20)),
  });

  // Active simulated processes
  const [processes, setProcesses] = useState<ProcessItem[]>([
    { pid: 4810, name: "chrome.exe", cpu: 32.4, ram: 14.2, status: "running" },
    { pid: 9024, name: "code.exe", cpu: 15.1, ram: 22.8, status: "running" },
    { pid: 1412, name: "discord.exe", cpu: 8.4, ram: 6.1, status: "running" },
    { pid: 6511, name: "slack.exe", cpu: 4.2, ram: 8.5, status: "sleeping" },
    { pid: 3012, name: "chaosmind-daemon.exe", cpu: 1.8, ram: 3.2, status: "running" },
  ]);

  // Failure Simulation Modules
  const [simulations, setSimulations] = useState<ActiveSimulation[]>([
    {
      id: "cpu_overload",
      name: "CPU Overload",
      impactCpu: 98,
      impactRam: 68,
      impactRisk: 85,
      status: "idle",
      description: "Generates recursive background computational threads to simulate heavy load stability thresholds.",
    },
    {
      id: "mem_leak",
      name: "Memory Leak",
      impactCpu: 78,
      impactRam: 94,
      impactRisk: 75,
      status: "idle",
      description: "Allocates dangling memory buffers continuously without garbage collections.",
    },
    {
      id: "net_failure",
      name: "Network Failure",
      impactCpu: 70,
      impactRam: 65,
      impactRisk: 90,
      status: "idle",
      description: "Interrupts incoming response socket feeds and simulates catastrophic drop ratios.",
    },
    {
      id: "disk_failure",
      name: "Disk IOPS Saturation",
      impactCpu: 84,
      impactRam: 70,
      impactRisk: 65,
      status: "idle",
      description: "Floods file reading pipelines with random sector lookups on physical volume blocks.",
    },
    {
      id: "app_crash",
      name: "Application Crash",
      impactCpu: 12,
      impactRam: 20,
      impactRisk: 95,
      status: "idle",
      description: "Triggers uncaught interrupt exceptions on vital process nodes.",
    },
  ]);

  // Alert Log entries
  const [alerts, setAlerts] = useState<AlertLog[]>([
    {
      id: "alert-1",
      title: "Memory Spike Recognized",
      severity: "medium",
      timestamp: "10:42 PM",
      message: "RAM allocation rose above 60% with intense disk reading cycles.",
      resolved: false,
    },
    {
      id: "alert-2",
      title: "High Host CPU usage",
      severity: "high",
      timestamp: "10:35 PM",
      message: "Multiple Chrome kernel threads occupied more than 30% computing cycles.",
      resolved: false,
    },
  ]);

  // AI Insights State
  const [aiInsightResult, setAiInsightResult] = useState<{
    analysis: string;
    recommendations: string[];
    isMocked: boolean;
  } | null>(null);
  const [fetchingInsights, setFetchingInsights] = useState(false);

  // AI Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "chat-1",
      role: "assistant",
      content: "ChaosMind AI is online. Tell me any computer problem or slow down question you have. How can I help you today?",
      timestamp: "10:45 PM",
    },
  ]);
  const [sendingChat, setSendingChat] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Simulation Active Tracking info
  const [activeSimId, setActiveSimId] = useState<string | null>(null);

  // Historical Reports Data
  const [reportFilter, setReportFilter] = useState<"Today" | "Week" | "Month" | "Custom">("Today");
  const [reportHistory, setReportHistory] = useState([
    { id: "REP-102", name: "Host Anomaly Log", type: "Telemetry Anomaly", date: "2026-05-29", status: "Resolved", threat: "Medium" },
    { id: "REP-101", name: "Memory Diagnostics Diagnostic", type: "Leak Analysis", date: "2026-05-28", status: "Archived", threat: "Low" },
    { id: "REP-100", name: "Docker Core Crash Simulation", type: "Simulation", date: "2026-05-27", status: "Critical", threat: "High" },
    { id: "REP-099", name: "Network Bandwidth Saturation", type: "Saturation Incident", date: "2026-05-26", status: "Resolved", threat: "Critical" },
  ]);

  // Live Metrics Simulator Tick Loop (Every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => {
        // If simulation is running, metrics will be influenced heavily
        let targetCpu = 65 + Math.floor(Math.random() * 12);
        let targetRam = 60 + Math.floor(Math.random() * 6);
        let targetDisk = 51;
        let targetNetwork = 115 + Math.floor(Math.random() * 14);
        let targetRisk = 18;
        let statusText: "Healthy" | "Analyzing" | "Unstable" | "Critical" = "Healthy";

        if (activeSimId) {
          const activeSim = simulations.find((s) => s.id === activeSimId);
          if (activeSim) {
            targetCpu = activeSim.impactCpu + Math.floor(Math.random() * 3) - 1;
            targetRam = activeSim.impactRam + Math.floor(Math.random() * 3) - 1;
            targetRisk = activeSim.impactRisk;
            if (activeSim.id === "disk_failure") targetDisk = 86;
            if (activeSim.id === "net_failure") targetNetwork = 8; // Drop output upload download
            if (activeSim.id === "app_crash") {
              targetCpu = 5;
              targetRam = 15;
            }
            statusText = targetRisk > 80 ? "Critical" : "Unstable";
          }
        } else {
          // Normal mild variation
          statusText = "Healthy";
        }

        // Keep bounds
        targetCpu = Math.max(1, Math.min(100, targetCpu));
        targetRam = Math.max(1, Math.min(100, targetRam));
        targetDisk = Math.max(1, Math.min(100, targetDisk));

        const nextCpuHistory = [...prev.cpuHistory.slice(1), targetCpu];
        const nextRamHistory = [...prev.ramHistory.slice(1), targetRam];
        const nextDiskHistory = [...prev.diskHistory.slice(1), targetDisk];
        const nextNetworkHistory = [...prev.networkHistory.slice(1), targetNetwork];

        return {
          cpu: targetCpu,
          ram: targetRam,
          disk: targetDisk,
          network: targetNetwork,
          riskScore: targetRisk,
          status: statusText,
          cpuHistory: nextCpuHistory,
          ramHistory: nextRamHistory,
          diskHistory: nextDiskHistory,
          networkHistory: nextNetworkHistory,
        };
      });

      // Fluctuate process stats as well
      setProcesses((prev) =>
        prev.map((proc) => {
          if (proc.status === "sleeping") return proc;
          let randomCpuFactor = (Math.random() - 0.5) * 3;
          let randomRamFactor = (Math.random() - 0.5) * 0.8;
          if (activeSimId === "cpu_overload" && proc.name === "chaosmind-daemon.exe") {
            return {
              ...proc,
              cpu: parseFloat(Math.min(92, proc.cpu + 8).toFixed(1)),
              ram: parseFloat(Math.min(35, proc.ram + 0.5).toFixed(1)),
            };
          }
          if (activeSimId === "mem_leak" && proc.name === "chaosmind-daemon.exe") {
            return {
              ...proc,
              cpu: parseFloat(Math.min(18, proc.cpu + 0.3).toFixed(1)),
              ram: parseFloat(Math.min(88, proc.ram + 6.2).toFixed(1)),
            };
          }
          return {
            ...proc,
            cpu: parseFloat(Math.max(1.1, Math.min(99, proc.cpu + randomCpuFactor)).toFixed(1)),
            ram: parseFloat(Math.max(2.1, Math.min(99, proc.ram + randomRamFactor)).toFixed(1)),
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSimId, simulations]);

  // Auto Scroll Chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Request Failure Recommendation (API call to backend Node endpoint)
  const generateAIRecommendation = async () => {
    setFetchingInsights(true);
    setAiInsightResult(null);

    try {
      const response = await fetch("/api/ai-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metrics: {
            cpu: metrics.cpu,
            ram: metrics.ram,
            disk: metrics.disk,
            network: metrics.network,
            riskScore: metrics.riskScore,
          },
          alerts: alerts,
          activeSimulations: activeSimId ? [activeSimId] : [],
          customApiKey: aiSettings.apiKey,
          provider: aiSettings.provider,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAiInsightResult({
          analysis: data.analysis,
          recommendations: data.recommendations,
          isMocked: !!data.isMocked,
        });

        // Trigger dynamic system warning if metrics are critical
        if (metrics.cpu > 80 && settingsNotif.highRiskAlerts) {
          pushSystemAlert("AI Preemptive Action Required", "high", `Agent verified CPU levels at ${metrics.cpu}%. AI recommends manual process termination.`);
        }
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setAiInsightResult({
        analysis: "#### ⚠️ Connection Pipeline exception occurred\nUnable to reach server AI gateways. Local metrics analysis suggests safe bounds.",
        recommendations: ["Ensure your custom API keys are valid inside dashboard settings", "Check network parameters"],
        isMocked: true,
      });
    } finally {
      setFetchingInsights(false);
    }
  };

  // Push custom local alerts helper
  const pushSystemAlert = (title: string, severity: "low" | "medium" | "high" | "critical", message: string) => {
    const newAlert: AlertLog = {
      id: "alert-" + Date.now(),
      title,
      severity,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      message,
      resolved: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);

    // Push Notification as well
    const newNotif = {
      id: "notif-" + Date.now(),
      text: title,
      time: "Just now",
    };
    setNotifs((prev) => [newNotif, ...prev]);
  };

  // Run or Halt Simulation Module
  const runSimulation = (simId: string) => {
    setSimulations((prev) =>
      prev.map((sim) => {
        if (sim.id === simId) {
          if (sim.status === "running") {
            // Stop
            setActiveSimId(null);
            pushSystemAlert("Simulation Stopped & Restored", "low", `The simulation for ${sim.name} was successfully terminated. Restoring baseline parameters.`);
            return { ...sim, status: "idle" };
          } else {
            // Run
            setActiveSimId(simId);
            if (settingsNotif.simulationAlerts) {
              pushSystemAlert(`Instability Triggered: ${sim.name}`, "critical", `Simulated warning! ${sim.description} Risk index immediately increased to ${sim.impactRisk}%.`);
            }
            return { ...sim, status: "running" };
          }
        }
        return { ...sim, status: "idle" }; // Reset other sims
      })
    );
  };

  const cancelSimulation = () => {
    setActiveSimId(null);
    setSimulations((prev) => prev.map((s) => ({ ...s, status: "idle" })));
    pushSystemAlert("Mitigation Completed", "low", "Emergency cooling injected. All simulated processes normalized.");
  };

  // Handle active chatbot submission
  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setSendingChat(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg],
          currentMetrics: {
            cpu: metrics.cpu,
            ram: metrics.ram,
            disk: metrics.disk,
            network: metrics.network,
            riskScore: metrics.riskScore,
          },
          customApiKey: aiSettings.apiKey,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            role: "assistant",
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: "bot-err-" + Date.now(),
          role: "assistant",
          content: "⚠️ Neural Core connection timeout. Ensure your local server is online.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setSendingChat(false);
    }
  };

  // Update AI Keys dynamically
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const handleTestKeyConnection = () => {
    if (aiSettings.apiKey && (aiSettings.apiKey.length < 10 || aiSettings.apiKey.length > 150)) {
      alert(`Alert: API Key is out of limit! The length is ${aiSettings.apiKey.length} characters. Recommended range is between 10 and 150 characters.`);
      setTestStatus("fail");
      return;
    }
    setTestStatus("verifying");
    setTimeout(() => {
      if (aiSettings.apiKey && aiSettings.apiKey.length > 5) {
        setTestStatus("success");
        if (profile.plan === "free") {
          setProfile((prev) => ({ ...prev, plan: "byok" }));
          pushSystemAlert("Plan Upgraded", "high", "API Handshake Approved! Account upgraded to Smart AI Pro Hub.");
        }
      } else {
        setTestStatus("fail");
      }
    }, 1500);
  };

  // Mock downloading PDF/CSV
  const [downloading, setDownloading] = useState<string | null>(null);
  const triggerDownload = (type: "PDF" | "CSV") => {
    setDownloading(type);
    setTimeout(() => {
      setDownloading(null);
      alert(`ChaosMind Report successfully generated in ${type}. File saved: CHAOSMIND_REPORT_${new Date().toISOString().split("T")[0]}.${type.toLowerCase()}`);
    }, 1800);
  };

  // Generate simple dynamic SVG sparkline paths for live stock market charts
  const renderSparkline = (data: number[], maxVal = 100, strokeColor = "#22d3ee") => {
    if (data.length === 0) return "";
    const width = 450;
    const height = 120;
    const padding = 10;
    const stepX = width / (data.length - 1);

    const points = data.map((val, i) => {
      const x = i * stepX;
      // invert scale
      const y = height - padding - (val / maxVal) * (height - padding * 2);
      return `${x},${y}`;
    });

    const pathD = `M ${points.join(" L ")}`;
    const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`grad-${strokeColor}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Subtle background grid lines */}
        <line x1="0" y1="30" x2={width} y2="30" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.8" />
        <line x1="0" y1="60" x2={width} y2="60" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.8" />
        <line x1="0" y1="90" x2={width} y2="90" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.8" />

        <path d={areaD} fill={`url(#grad-${strokeColor})`} />
        <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Glowing dot on last item */}
        <circle
          cx={width}
          cy={height - padding - (data[data.length - 1] / maxVal) * (height - padding * 2)}
          r="4.5"
          fill={strokeColor}
          className="animate-pulse"
        />
      </svg>
    );
  };

  const filteredProcesses = processes.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050814] text-[#d1d5db] font-sans flex flex-col relative">
      {/* Dynamic risk score container border for visual warnings */}
      <div
        className={`fixed top-0 inset-x-0 h-1 z-50 transition-colors duration-500 ${
          activeSimId ? "bg-gradient-to-r from-red-500 via-pink-500 to-amber-500" : "bg-cyan-500"
        }`}
      />

      {/* TOP DECK BAR */}
      <header className="sticky top-0 z-40 bg-[#060a18]/90 border-b border-cyan-500/10 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        {/* Left segment */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg shadow-lg">
              <BrainCircuit className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping" />
            </div>
            <div>
              <span className="font-condensed text-xl tracking-wide text-white">
                CHAOSMIND <span className="text-cyan-400 font-condensed text-sm ml-0.5">AI</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 ml-2 bg-gray-900 border border-gray-800 rounded text-[9px] text-gray-500 font-mono font-bold tracking-tight uppercase">
                BYOK Observer
              </span>
            </div>
          </div>


        </div>

        {/* Right tools */}
        <div className="flex items-center gap-4">
          {/* Simulation Emergency Stop active alert label */}
          {activeSimId && (
            <button
              onClick={cancelSimulation}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-red-950/50 border border-red-500/30 hover:bg-red-900/60 transition text-red-200 font-mono text-[10px] uppercase rounded-full animate-pulse cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Simulation Overload Active - Terminate
            </button>
          )}

          {/* Network Socket Indicator */}
          <div className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 bg-gray-950 border border-gray-900 rounded-lg text-gray-400">
            <span className={`w-1.5 h-1.5 rounded-full ${deviceConnected ? "bg-emerald-400 animate-ping" : "bg-red-400"}`} />
            <span>{deviceConnected ? "DAEMON_ONLINE" : "DAEMON_OFFLINE"}</span>
          </div>

          {/* Help Hub Notification Alert Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifsDropdown(!showNotifsDropdown)}
              className="p-2 bg-gray-950 hover:bg-[#0b1026] text-gray-400 hover:text-white rounded-lg border border-gray-900 relative transition cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {notifs.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />}
            </button>

            {showNotifsDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-[#090f23] border border-cyan-500/20 rounded-xl shadow-2xl p-4 space-y-3 z-50 animate-fade-in font-mono">
                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Core Feeds</span>
                  <button onClick={() => setNotifs([])} className="text-[10px] text-cyan-400 hover:underline">Clear</button>
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {notifs.length === 0 ? (
                    <p className="text-[10px] text-gray-600 text-center py-4">No new notification nodes queued.</p>
                  ) : (
                    notifs.map((n) => (
                      <div key={n.id} className="p-2 rounded bg-gray-950/60 space-y-0.5 border border-cyan-500/5">
                        <p className="text-[11px] text-gray-200">{n.text}</p>
                        <span className="text-[9px] text-[#6b7280]">{n.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User account widget */}
          <div className="flex items-center gap-2 border-l border-gray-800/80 pl-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white text-xs text-shadow uppercase">
              {profile.username.substring(0, 2)}
            </div>
            <div className="hidden lg:block text-left text-xs font-mono">
              <p className="text-gray-200 font-bold tracking-tight">{profile.fullName}</p>
              <p className="text-[#6b7280] text-[9px]">{profile.username}</p>
            </div>
          </div>
        </div>
      </header>

      {/* BODY CONFIGURATION */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION PANEL */}
        <aside className="w-64 bg-[#040713] border-r border-cyan-500/10 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="p-4 space-y-6">
            <div className="p-3.5 bg-gradient-to-b from-[#0e1633] to-[#040817] border border-cyan-500/10 rounded-xl space-y-1 text-xs">
              <span className="text-[#6b7280] font-mono text-[9px] block uppercase tracking-widest">Operator Console</span>
              <p className="text-white font-bold font-mono">{profile.fullName}</p>
              <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                <Activity className="w-3.5 h-3.5" /> Node Safety Index: <span className="font-bold text-white">{metrics.status} ({100 - metrics.riskScore}%)</span>
              </div>
            </div>

            {/* Menu options */}
            <nav className="space-y-1 font-mono text-xs">
              {[
                { tab: PageType.DASHBOARD, label: "MAIN DASHBOARD", icon: <Activity className="w-4 h-4" /> },
                { tab: PageType.MONITORING, label: "DETAILED MONITORING", icon: <Cpu className="w-4 h-4" /> },
                { tab: PageType.PREDICTIONS, label: "ML PREDICTIONS", icon: <TrendingUp className="w-4 h-4" /> },
                { tab: PageType.AI_INSIGHTS, label: "AI DEEP INSIGHTS", icon: <BrainCircuit className="w-4 h-4 animate-pulse text-purple-400" /> },
                { tab: PageType.SIMULATION, label: "FAILURE SIMULATION", icon: <ShieldAlert className="w-4 h-4" /> },
                { tab: PageType.REPORTS, label: "HISTORIC REPORTS", icon: <FileText className="w-4 h-4" /> },
                { tab: PageType.SETTINGS, label: "SYSTEM SETTINGS", icon: <Settings className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  id={`side-nav-${item.tab}`}
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`w-full py-3 px-4 rounded-lg flex items-center gap-3 transition-colors text-left cursor-pointer ${
                    activeTab === item.tab
                      ? "bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent border-l-2 border-cyan-400 text-cyan-300 font-semibold"
                      : "text-gray-400 hover:text-cyan-300 hover:bg-[#070b1e]/50"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-800">
            <button
              id="side-logout-btn"
              onClick={onLogout}
              className="w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-red-950/20 to-red-900/10 border border-red-500/20 text-red-300 hover:text-red-200 hover:bg-red-900/20 font-mono text-xs tracking-wider transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> TERMINATE SESSION
            </button>
          </div>
        </aside>

        {/* PRIMARY CONTAINER SPACE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Mobile Navigator helper bar */}
          <div className="md:hidden flex flex-wrap gap-2 pb-4 border-b border-gray-800/80">
            {[
              { tab: PageType.DASHBOARD, label: "Dashboard" },
              { tab: PageType.MONITORING, label: "Monitor" },
              { tab: PageType.PREDICTIONS, label: "Predict Match" },
              { tab: PageType.AI_INSIGHTS, label: "AI Assist" },
              { tab: PageType.SIMULATION, label: "Simulate Chaos" },
              { tab: PageType.REPORTS, label: "Reports" },
              { tab: PageType.SETTINGS, label: "Settings" },
            ].map((btn) => (
              <button
                key={btn.tab}
                onClick={() => setActiveTab(btn.tab)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-mono border ${
                  activeTab === btn.tab
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500"
                    : "bg-gray-950 text-gray-500 border-gray-800"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT HANDLERS */}

          {/* PAGE 6: MAIN DASHBOARD */}
          {activeTab === PageType.DASHBOARD && (
            <div id="deck-tab-dashboard" className="space-y-6 animate-fade-in">
              {/* Overview block cards */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Card 1: CPU */}
                <div className="p-4 bg-gray-950/50 backdrop-blur-md rounded-xl border border-cyan-500/10 flex flex-col justify-between space-y-2 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-1.5 bg-cyan-500/10 rounded-bl-lg text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">CPU Usage</span>
                    <span className="text-3xl font-extrabold text-white font-mono">{metrics.cpu}%</span>
                  </div>
                  <div className="w-full bg-cyan-950/30 rounded-full h-1">
                    <div className="bg-cyan-400 h-1 rounded-full transition-all duration-500" style={{ width: `${metrics.cpu}%` }} />
                  </div>
                </div>

                {/* Card 2: RAM */}
                <div className="p-4 bg-gray-950/50 backdrop-blur-md rounded-xl border border-purple-500/10 flex flex-col justify-between space-y-2 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-1.5 bg-purple-500/10 rounded-bl-lg text-purple-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">RAM Usage</span>
                    <span className="text-3xl font-extrabold text-white font-mono">{metrics.ram}%</span>
                  </div>
                  <div className="w-full bg-purple-950/30 rounded-full h-1">
                    <div className="bg-purple-500 h-1 rounded-full transition-all duration-500" style={{ width: `${metrics.ram}%` }} />
                  </div>
                </div>

                {/* Card 3: Storage */}
                <div className="p-4 bg-gray-950/50 backdrop-blur-md rounded-xl border border-blue-500/10 flex flex-col justify-between space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1.5 bg-blue-500/10 rounded-bl-lg text-blue-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Disk Space</span>
                    <span className="text-3xl font-extrabold text-white font-mono">{metrics.disk}%</span>
                  </div>
                  <div className="w-full bg-blue-950/30 rounded-full h-1">
                    <div className="bg-blue-400 h-1 rounded-full transition-all duration-500" style={{ width: `${metrics.disk}%` }} />
                  </div>
                </div>

                {/* Card 4: Network */}
                <div className="p-4 bg-gray-950/50 backdrop-blur-md rounded-xl border border-pink-500/10 flex flex-col justify-between space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1.5 bg-pink-500/10 rounded-bl-lg text-pink-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Network In</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">{metrics.network} Mbps</span>
                  </div>
                  <div className="text-[9px] font-mono text-gray-500 uppercase">Steady pipeline</div>
                </div>

                {/* Card 5: Preemptive Risk Index */}
                <div className="p-4 bg-gray-950/50 backdrop-blur-md rounded-xl border border-red-500/10 flex flex-col justify-between space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1.5 bg-red-500/10 rounded-bl-lg text-red-400">
                    <AlertTriangle className="w-4 h-4 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Risk Score</span>
                    <span className={`text-3xl font-extrabold font-mono ${metrics.cpu > 80 ? "text-red-400" : "text-cyan-400"}`}>
                      {metrics.cpu > 80 ? "85%" : "18%"}
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-gray-500 uppercase">Heuristic Threat Index</div>
                </div>

                {/* Card 6: Operating Health Status */}
                <div className="p-4 bg-gray-950/50 backdrop-blur-md rounded-xl border border-emerald-500/10 flex flex-col justify-between space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1.5 bg-emerald-500/10 rounded-bl-lg text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Health Tier</span>
                    <span className={`text-xl sm:text-2xl font-extrabold font-mono ${metrics.cpu > 80 ? "text-rose-400" : "text-emerald-400"}`}>
                      {metrics.cpu > 80 ? "CRITICAL" : "HEALTHY"}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase">Stable CPU Clock</span>
                </div>
              </div>

              {/* LIVE REAL-TIME STOCK-MARKET-LIKE GRAPHS SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Graph Card 1: CPU Usage */}
                <div className="p-6 bg-[#060a16] border border-cyan-500/15 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold font-mono tracking-tight text-white uppercase">CPU Usage Over Time</h4>
                      <p className="text-[10px] text-gray-500 font-mono">Precision core frequency monitor (Ticks 1s)</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 bg-cyan-950/40 rounded border border-cyan-500/20">
                      CURRENT: {metrics.cpu}%
                    </span>
                  </div>
                  <div className="h-44 bg-black/40 rounded-xl p-2 border border-slate-900/60 overflow-hidden relative">
                    {renderSparkline(metrics.cpuHistory, 100, "#22d3ee")}
                  </div>
                </div>

                {/* Graph Card 2: RAM Allocation */}
                <div className="p-6 bg-[#060a16] border border-purple-500/15 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold font-mono tracking-tight text-white uppercase">RAM Residency Stream</h4>
                      <p className="text-[10px] text-gray-500 font-mono">DRAM cache page tables & indices ratio</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 bg-purple-950/40 rounded border border-purple-500/20">
                      RESERVED: {metrics.ram}%
                    </span>
                  </div>
                  <div className="h-44 bg-black/40 rounded-xl p-2 border border-slate-900/60 overflow-hidden relative">
                    {renderSparkline(metrics.ramHistory, 100, "#a855f7")}
                  </div>
                </div>

                {/* Graph Card 3: Disk Read Space */}
                <div className="p-6 bg-[#060a16] border border-blue-500/15 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold font-mono tracking-tight text-white uppercase">Disk Storage Capacity Area</h4>
                      <p className="text-[10px] text-gray-500 font-mono">Physical partition load saturation ratio</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-400 px-2 py-0.5 bg-blue-950/40 rounded border border-blue-500/20">
                      MAX SPACE: 1 TB
                    </span>
                  </div>
                  <div className="h-44 bg-black/40 rounded-xl p-2 border border-slate-900/60 overflow-hidden relative">
                    {renderSparkline(metrics.diskHistory, 100, "#3b82f6")}
                  </div>
                </div>

                {/* Graph Card 4: Network Stream */}
                <div className="p-6 bg-[#060a16] border border-pink-500/15 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold font-mono tracking-tight text-white uppercase">Network Traffic Stream</h4>
                      <p className="text-[10px] text-gray-500 font-mono">Global network interface outbound traffic speeds</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-pink-400 px-2 py-0.5 bg-pink-950/40 rounded border border-pink-500/20">
                      PEAK: 154 Mbps
                    </span>
                  </div>
                  <div className="h-44 bg-black/40 rounded-xl p-2 border border-slate-900/60 overflow-hidden relative">
                    {renderSparkline(metrics.networkHistory, 150, "#ec4899")}
                  </div>
                </div>
              </div>

              {/* SPLIT TABLE SECTION: MAIN ACTIVE PROCESSES & ALERT LOG PANEL */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Processes Listing (2/3 width) */}
                <div className="lg:col-span-2 p-6 bg-[#060a16] border border-gray-800 rounded-2xl space-y-4 overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-800 pb-3">
                    <div>
                      <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">Active Host Processes</h4>
                      <p className="text-[10px] text-gray-500 font-mono">Live virtual nodes running on host environment</p>
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/20 px-2.5 py-1 rounded">
                      Core Ticks: Active
                    </div>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-800 text-[#6b7280] uppercase text-[10px]">
                          <th className="py-2.5">PROCESS NAME</th>
                          <th className="py-2.5 text-right">PID</th>
                          <th className="py-2.5 text-right text-cyan-400">CPU %</th>
                          <th className="py-2.5 text-right text-purple-400">RAM %</th>
                          <th className="py-2.5 text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-900">
                        {filteredProcesses.map((proc) => (
                          <tr key={proc.pid} className="hover:bg-cyan-500/5 transition">
                            <td className="py-3 text-white font-bold">{proc.name}</td>
                            <td className="py-3 text-right text-gray-500">{proc.pid}</td>
                            <td className="py-3 text-right text-cyan-400 font-bold">{proc.cpu}%</td>
                            <td className="py-3 text-right text-purple-400 font-bold">{proc.ram}%</td>
                            <td className="py-3 text-right">
                              <span
                                className={`px-2 py-0.5 rounded text-[9px] uppercase ${
                                  proc.status === "running"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}
                              >
                                {proc.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Cyber Alert Side Panel (1/3 width) */}
                <div className="p-6 bg-[#060a16] border border-gray-800 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-1 border-b border-gray-800 pb-3">
                    <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">Observer Alert Panel</h4>
                    <p className="text-[10px] text-gray-500 font-mono font-mono mb-1">Preemptive warning markers</p>
                  </div>

                  <div className="space-y-3 overflow-y-auto max-h-72">
                    {alerts.map((a) => (
                      <div
                        key={a.id}
                        className={`p-3 border rounded-xl space-y-1 transition text-xs font-mono relative overflow-hidden group ${
                          a.severity === "critical"
                            ? "bg-red-950/20 border-red-500/30"
                            : a.severity === "high"
                            ? "bg-orange-950/20 border-orange-500/30"
                            : "bg-slate-900/60 border-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-1.5 py-0.2 rounded text-[8px] uppercase font-bold tracking-widest ${
                              a.severity === "critical"
                                ? "bg-red-400 text-black"
                                : a.severity === "high"
                                ? "bg-orange-400 text-black"
                                : "bg-cyan-500/20 text-cyan-400"
                            }`}
                          >
                            {a.severity}
                          </span>
                          <span className="text-[10px] text-gray-500">{a.timestamp}</span>
                        </div>
                        <h5 className="font-bold text-gray-200 leading-tight">{a.title}</h5>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{a.message}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setAlerts([])}
                    className="w-full text-center py-2.5 bg-gray-950 hover:bg-slate-900 border border-gray-800 text-xs font-mono tracking-widest text-[#9ca3af] hover:text-white rounded-lg transition uppercase cursor-pointer"
                  >
                    Clear Resolved Warnings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 7: MONITORING PAGE */}
          {activeTab === PageType.MONITORING && (
            <div id="deck-tab-monitoring" className="space-y-6 animate-fade-in font-mono text-sm text-gray-300">
              <div className="border-b border-cyan-500/20 pb-4">
                <h2 className="text-xl font-bold font-mono uppercase tracking-widest text-white">Detailed Telemetry Diagnostics</h2>
                <p className="text-xs text-gray-500 font-mono">Full hardware breakdown with live analytic nodes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section A: CPU Analytics */}
                <div className="p-6 bg-[#060a16] border border-cyan-500/10 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                    <Cpu className="text-cyan-400 w-5 h-5" />
                    <h3 className="font-bold text-[#fafafa] uppercase">CPU Core Analytics</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Current Load</span>
                      <span className="text-lg font-bold text-cyan-300">{metrics.cpu}%</span>
                    </div>
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Clock Speed</span>
                      <span className="text-lg font-bold text-gray-200">4.12 GHz</span>
                    </div>
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Peak Spike</span>
                      <span className="text-lg font-bold text-red-400">98%</span>
                    </div>
                  </div>
                </div>

                {/* Section B: Memory Analytics */}
                <div className="p-6 bg-[#060a16] border border-purple-500/10 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                    <Database className="text-purple-400 w-5 h-5" />
                    <h3 className="font-bold text-[#fafafa] uppercase">Memory Residency Info</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">In Use</span>
                      <span className="text-lg font-bold text-purple-300">{metrics.ram}%</span>
                    </div>
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Available</span>
                      <span className="text-lg font-bold text-gray-200">5.4 GB</span>
                    </div>
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Swap Space</span>
                      <span className="text-lg font-bold text-blue-300">1.8 GB</span>
                    </div>
                  </div>
                </div>

                {/* Section C: Disk Storage Analytics */}
                <div className="p-6 bg-[#060a16] border border-blue-500/10 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                    <HardDrive className="text-blue-400 w-5 h-5" />
                    <h3 className="font-bold text-[#fafafa] uppercase">Disk Read / Write Speed</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Read Speed</span>
                      <span className="text-lg font-bold text-blue-300">320 MB/s</span>
                    </div>
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Write Speed</span>
                      <span className="text-lg font-bold text-cyan-300">180 MB/s</span>
                    </div>
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Capacity</span>
                      <span className="text-lg font-bold text-gray-200">{metrics.disk}%</span>
                    </div>
                  </div>
                </div>

                {/* Section D: Network Diagnostics */}
                <div className="p-6 bg-[#060a16] border border-pink-500/10 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                    <Globe className="text-pink-400 w-5 h-5" />
                    <h3 className="font-bold text-[#fafafa] uppercase">Bandwidth / Latency Indices</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Upload Speed</span>
                      <span className="text-lg font-bold text-pink-300">42 Mbps</span>
                    </div>
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Download Speed</span>
                      <span className="text-lg font-bold text-cyan-300">120 Mbps</span>
                    </div>
                    <div className="p-3 bg-gray-950/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase">Ping Latency</span>
                      <span className="text-lg font-bold text-emerald-400">12ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 8: PREDICTIONS PAGE */}
          {activeTab === PageType.PREDICTIONS && (
            <div id="deck-tab-predictions" className="space-y-6 animate-fade-in font-mono text-xs">
              <div className="border-b border-cyan-500/20 pb-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-widest pl-1">Machine Learning Failure Forecasts</h2>
                <p className="text-xs text-gray-500">Autonomous degradation algorithms analyzing telemetry nodes.</p>
              </div>

              {/* Top Prognosis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-gray-950/60 border border-slate-900 rounded-xl space-y-2">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Failure Probability (24h)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">{metrics.cpu > 80 ? "82%" : "9.8%"}</span>
                    <span className="text-emerald-400 font-sans">Normal Range</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                    Computed based on system-wide interrupts, paging space exhaustion cycles, and daemon temperature logs.
                  </p>
                </div>

                <div className="p-5 bg-gray-950/60 border border-slate-900 rounded-xl space-y-2">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Risk Level Indicator</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-extrabold uppercase ${metrics.cpu > 80 ? "text-rose-400" : "text-cyan-400"}`}>
                      {metrics.cpu > 80 ? "HIGH OVERLOAD" : "STABLE NOMINAL"}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                    Hardware remains structural. No paging faults or CPU core thermal throttles detected at this moment.
                  </p>
                </div>

                <div className="p-5 bg-gray-950/60 border border-slate-900 rounded-xl space-y-2">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider font-mono">Predicted Stability Cycle</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#fafafa] uppercase">94.8% SLA</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                    Estimated continuous host operation uptime prior to potential daemon socket interruptions or service restarts.
                  </p>
                </div>
              </div>

              {/* Risk Trend & forecast predictions */}
              <div className="p-6 bg-[#060a16] border border-[#22d3ee]/20 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <h4 className="font-bold text-[#fafafa] uppercase text-sm tracking-wide">Preemptive Risk Index Projection</h4>
                  <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded text-[10px]">Model Core: SVM Adaptive</span>
                </div>

                <div className="h-44 bg-black/40 rounded-xl p-2 border border-slate-900 overflow-hidden relative">
                  {/* Forecast chart trend line - mock representing high risk during active simulation */}
                  {renderSparkline(metrics.cpu > 80 ? [85, 87, 84, 88, 89, 85, 91, 94] : [15, 18, 14, 19, 15, 20, 18, 16], 100, "#f43f5e")}
                </div>

                <div className="p-4 bg-gray-950/60 rounded-xl border border-gray-900 space-y-2 font-sans">
                  <h5 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider">Predictive Machine Learning Logs</h5>
                  <ul className="space-y-2 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span><b>CPU Overload forecast:</b> Standard computations indicate minimal risk unless manual intensive docker containers or nested loop simulations are activated.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] mt-1.5 shrink-0" />
                      <span><b>Memory resource exhaustion:</b> Memory leaks remain a theoretical hazard with current page cache behaviors. Closed background instances reduce load.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 9: AI INSIGHTS PAGE */}
          {activeTab === PageType.AI_INSIGHTS && (
            profile.plan === "free" ? (
              <div id="deck-tab-ai-insights-locked" className="p-8 md:p-12 bg-[#060a16] border border-[#f43f5e]/25 rounded-2xl animate-fade-in flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6 shadow-2xl my-4">
                <div className="p-4 bg-gradient-to-tr from-[#f43f5e] to-rose-400 rounded-2xl shadow-xl shadow-[#f43f5e]/15">
                  <ShieldAlert className="w-12 h-12 text-[#fafafa]" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold font-mono text-white tracking-wide uppercase">
                    Neural AI Engine Blocked
                  </h3>
                  <p className="text-xs font-sans text-gray-400 max-w-md leading-relaxed mx-auto">
                    You are currently using the <span className="text-coral font-bold font-mono">Free Sandbox</span> tier. 
                    Interactive telemetry diagnostics and the neural chat partner require upgrading to <span className="text-app-pink font-bold font-mono">Smart AI Pro</span>.
                  </p>
                </div>

                <div className="w-full max-w-sm rounded-xl bg-gray-950/60 p-5 border border-gray-900 space-y-4">
                  <div className="space-y-1.5 text-left font-sans">
                    <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">Unblock AI via custom API Key</label>
                    <div className="relative">
                      <KeySquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        id="unblock-ai-key-input"
                        type="password"
                        placeholder="Paste Gemini, OpenAI, or Groq API Key..."
                        className="w-full bg-[#090f23] border border-gray-850 focus:border-cyan-400/50 rounded-lg py-2 pl-9 pr-4 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:ring-0"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val.length > 5) {
                              setAiSettings({ ...aiSettings, apiKey: val });
                              setProfile((prev) => ({ ...prev, plan: "byok" }));
                              pushSystemAlert("Plan Upgraded", "high", "User plan auto-promoted to Smart AI Pro tier.");
                            }
                          }
                        }}
                      />
                    </div>
                    <span className="text-[9px] text-gray-500 block font-sans">Press <b>Enter</b> to instantly activate Smart AI Pro</span>
                  </div>

                  <div className="text-center font-sans">
                    <span className="text-[10px] text-gray-600 font-sans block">or</span>
                    <button
                      id="btn-upgrade-demo-key"
                      type="button"
                      onClick={() => {
                        setAiSettings({ ...aiSettings, apiKey: "AI_STUDY_SIM_DEMO_KEY" });
                        setProfile((prev) => ({ ...prev, plan: "byok" }));
                        pushSystemAlert("Plan Upgraded", "high", "Activated BYOK Mode with mock AI study credential.");
                      }}
                      className="mt-2 text-xs font-semibold text-app-pink hover:text-coral transition-colors underline cursor-pointer"
                    >
                      Use Demo Key & Activate Instantly
                    </button>
                  </div>
                </div>

                <div className="text-gray-500 text-[10px] flex items-center gap-1 font-mono">
                  <span>ChaosMind Advanced Operations Module</span>
                </div>
              </div>
            ) : (
              <div id="deck-tab-ai-insights" className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in text-xs font-mono">
              {/* Intelligent analysis builder column */}
              <div className="p-6 bg-[#060a16] border border-cyan-500/15 rounded-2xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <div>
                      <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-purple-400" />
                        AI Telemetry Analyzer Node
                      </h3>
                      <p className="text-[10px] text-gray-500 mt-0.5">Traces anomalies via live metrics & heuristics</p>
                    </div>

                    <button
                      id="btn-analyze-insights"
                      disabled={fetchingInsights}
                      onClick={generateAIRecommendation}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg shadow-cyan-500/10 cursor-pointer disabled:opacity-50"
                    >
                      {fetchingInsights ? (
                        <>
                          <Loader className="w-3.5 h-3.5 animate-spin" /> Diagnosing Core...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" /> Initialize AI Diagnostic
                        </>
                      )}
                    </button>
                  </div>

                  {aiInsightResult ? (
                    <div className="space-y-4 bg-gray-950/40 p-4 rounded-xl border border-cyan-500/10">
                      {/* Analysis Textbox */}
                      <div className="space-y-2 border-b border-gray-900 pb-3">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block">Core Neural Synthesis</span>
                        <div className="text-gray-300 font-sans text-xs leading-relaxed space-y-1">
                          {/* Parse simple markdown tags in server analysis */}
                          {aiInsightResult.analysis.split("\n").map((line, idx) => {
                            if (line.startsWith("####")) {
                              return <h4 key={idx} className="font-mono text-xs text-cyan-400 font-bold uppercase mt-2">{line.replace("####", "")}</h4>;
                            }
                            if (line.startsWith("⚠️") || line.startsWith("*")) {
                              return <p key={idx} className="text-amber-300 font-mono text-[11px] font-semibold">{line}</p>;
                            }
                            return <p key={idx}>{line}</p>;
                          })}
                        </div>
                      </div>

                      {/* Action recommendations lists */}
                      <div className="space-y-2">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block">Remediary Playbooks</span>
                        <ul className="space-y-2">
                          {aiInsightResult.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2 font-sans text-xs text-gray-300">
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {aiInsightResult.isMocked && (
                        <p className="text-[9px] text-[#6b7280] italic text-center font-mono pt-1">
                          Generated via offline server heuristics (API key not assigned).
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 border border-dashed border-gray-800 rounded-xl bg-gray-950/30 text-center space-y-3">
                      <BrainCircuit className="w-10 h-10 text-cyan-400/40 mx-auto animate-pulse" />
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-bold">Neural Core Standby</p>
                        <p className="text-[11px] text-gray-600 font-sans max-w-sm mx-auto">
                          Activate the AI analysis tool above. It collects memory, processor load, and network stats to show you simple tips to fix your computer.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-cyan-950/10 border border-cyan-500/10 rounded-lg text-gray-500 text-[10px] uppercase font-sans">
                  ChaosMind AI operates securely with your custom AI Key.
                </div>
              </div>

              {/* Neural interactive Chat Assistant column */}
              <div className="p-6 bg-[#060a16] border border-gray-800 rounded-2xl flex flex-col justify-between h-[510px]">
                <div className="space-y-1.5 border-b border-gray-800 pb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Neural Core Console Partner
                  </h3>
                  <p className="text-[10px] text-gray-500">Ask troubleshooting questions regarding high usage exceptions</p>
                </div>

                {/* Message Screen Area */}
                <div className="flex-1 overflow-y-auto py-3 space-y-3 px-1">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] rounded-xl p-3 ${
                        msg.role === "assistant"
                          ? "bg-gradient-to-r from-slate-900 to-slate-950 text-gray-200 border border-slate-800 self-start text-left"
                          : "bg-[#0b162f] text-cyan-100 border border-cyan-500/10 self-end text-left ml-auto"
                      }`}
                    >
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                        {msg.role === "assistant" ? "Neural Core Assist" : "Operator Agent"} &bull; {msg.timestamp}
                      </span>
                      <p className="text-[11px] text-gray-300 font-sans leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))}
                  {sendingChat && (
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono py-1 animate-pulse">
                      <Loader className="w-3.5 h-3.5 animate-spin text-purple-400" /> Thinking... Synthesizing system memory response
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Submission block form */}
                <form onSubmit={sendChatMessage} className="flex gap-2 pt-3 border-t border-gray-800">
                  <input
                    id="ai-chat-input"
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask core logic: Why is my CPU high? Predict memory leak triggers..."
                    className="flex-1 bg-[#090f23] border border-gray-850 focus:border-cyan-400/40 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 font-sans"
                  />
                  <button
                    id="ai-chat-send-btn"
                    type="submit"
                    disabled={sendingChat || !chatInput.trim()}
                    className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-white font-mono flex items-center justify-center transition cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
            )
          )}

          {/* PAGE 10: FAILURE SIMULATION PAGE */}
          {activeTab === PageType.SIMULATION && (
            <div id="deck-tab-simulation" className="space-y-6 animate-fade-in font-mono text-xs text-[#d1d5db]">
              <div className="border-b border-cyan-500/20 pb-4">
                <h2 className="text-xl font-bold font-mono uppercase tracking-widest text-white">Stressor Test Simulation Suite</h2>
                <p className="text-xs text-gray-500">Inject simulated anomaly vectors to test node resilience playbooks.</p>
              </div>

              {/* Warning Alert Banner */}
              <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1 font-sans flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="font-mono text-xs font-bold text-amber-200 uppercase tracking-widest">Host Injection Safety Warning</p>
                  <p className="text-[11px] text-gray-400">
                    Simulations recursively impact active graph indices, elevating risk heuristics up to 95%. Triggering simulation alerts triggers simulated security rules logs.
                  </p>
                </div>
              </div>

              {/* Interactive Simulation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {simulations.map((sim) => (
                  <div
                    key={sim.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between transition-all relative overflow-hidden ${
                      sim.status === "running"
                        ? "bg-red-950/20 border-red-500/30 shadow-lg shadow-red-500/5 animate-pulse"
                        : "bg-[#060a16] border-slate-900"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                        <span className="font-bold text-gray-200 text-sm tracking-wide">{sim.name} Module</span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            sim.status === "running" ? "bg-red-400 animate-ping" : "bg-gray-600"
                          }`}
                        />
                      </div>
                      <p className="text-[11px] text-gray-400 font-sans leading-relaxed leading-normal">{sim.description}</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-900 mt-4">
                      {/* Projected stats parameters */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                        <div>CPU Spikes: <span className="font-bold text-white">~{sim.impactCpu}%</span></div>
                        <div>RAM Spikes: <span className="font-bold text-white">~{sim.impactRam}%</span></div>
                        <div className="col-span-2">Projected Risk Index: <span className="font-bold text-red-400">+{sim.impactRisk}%</span></div>
                      </div>

                      <button
                        id={`btn-run-simulation-${sim.id}`}
                        onClick={() => runSimulation(sim.id)}
                        className={`w-full py-2.5 rounded-lg text-center font-mono text-xs tracking-wider uppercase transition-all cursor-pointer ${
                          sim.status === "running"
                            ? "bg-red-800 text-white font-bold"
                            : "bg-gray-950 hover:bg-slate-900 border border-gray-800 text-cyan-400 hover:text-cyan-300"
                        }`}
                      >
                        {sim.status === "running" ? "HAUT SIMULATION" : "RUN SIMULATION INJECT"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secondary results area */}
              {activeSimId && (
                <div className="p-6 bg-[#0c0d18] border border-red-500/25 rounded-2xl space-y-4 animate-fade-in font-sans text-xs">
                  <div className="flex items-center gap-2 border-b border-[#2b0f1a] pb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                    <h4 className="font-mono text-xs font-bold uppercase text-red-400">Active Simulation Impact Forecast Matrix</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-black/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase font-mono">System Impact Index</span>
                      <span className="text-xl font-bold text-red-400">CATASTROPHIC STRESS</span>
                    </div>
                    <div className="p-4 bg-black/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase font-mono">Simulated Risk Score</span>
                      <span className="text-xl font-bold text-white">85% HEURISTIC RISK</span>
                    </div>
                    <div className="p-4 bg-black/60 rounded border border-gray-900">
                      <span className="text-[10px] text-gray-500 block mb-1 uppercase font-mono">Recovery Estimate</span>
                      <span className="text-xl font-bold text-emerald-400">~12 SECONDS THERMAL</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 italic font-mono text-center pt-2">
                    Inject cooling vector mitigation index inside AI Diagnostics or click stop to normalize standard operation limits.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* PAGE 11: REPORTS PAGE */}
          {activeTab === PageType.REPORTS && (
            <div id="deck-tab-reports" className="space-y-6 animate-fade-in font-mono text-xs">
              <div className="border-b border-cyan-500/20 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-widest leading-none">Observability Incident Reports</h2>
                  <p className="text-xs text-gray-500 mt-1">Audit log parameters, anomaly sequences, and machine learning history.</p>
                </div>

                {/* Filters today week month */}
                <div className="flex gap-1.5 bg-gray-950 p-1 border border-gray-800 rounded-lg">
                  {["Today", "Week", "Month", "Custom"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setReportFilter(f as any)}
                      className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition ${
                        reportFilter === f
                          ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Split Download controllers and history records lists */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Download controller box */}
                <div className="p-6 bg-[#060a16] border border-[#22d3ee]/10 rounded-2xl space-y-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="font-bold text-white uppercase text-sm border-b border-gray-900 pb-2">Export Data Desks</h4>
                    <p className="text-gray-400 text-[11px] leading-relaxed font-sans">
                      Dispatched logs containing CPU frequency sequences, page file dumps, anomalous network peaks, and SVM warning records. Supports PDF or CSV formats.
                    </p>
                  </div>

                  <div className="space-y-3 pt-6 mt-auto">
                    <button
                      id="btn-download-pdf"
                      disabled={!!downloading}
                      onClick={() => triggerDownload("PDF")}
                      className="w-full py-3 bg-[#081326] hover:bg-[#0c1f3d] border border-cyan-500/20 rounded-lg font-mono text-xs text-cyan-300 flex items-center justify-center gap-2 tracking-wider transition cursor-pointer"
                    >
                      {downloading === "PDF" ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileDown className="w-4 h-4" />
                      )}
                      DOWNLOAD REPORT AS PDF FILE
                    </button>

                    <button
                      id="btn-download-csv"
                      disabled={!!downloading}
                      onClick={() => triggerDownload("CSV")}
                      className="w-full py-3 bg-[#110e21] hover:bg-[#1d1936] border border-purple-500/20 rounded-lg font-mono text-xs text-purple-300 flex items-center justify-center gap-2 tracking-wider transition cursor-pointer"
                    >
                      {downloading === "CSV" ? (
                        <Loader className="w-4 h-4 animate-spin w-4 h-4 text-purple-400" />
                      ) : (
                        <FileDown className="w-4 h-4" />
                      )}
                      DOWNLOAD DATA DESK AS CSV SHEETS
                    </button>
                  </div>
                </div>

                {/* Performance table records view */}
                <div className="lg:col-span-2 p-6 bg-[#060a16] border border-gray-800 rounded-2xl space-y-4">
                  <div className="border-b border-gray-900 pb-2">
                    <h4 className="font-bold text-gray-200 uppercase text-sm">Telemetry History Node Records</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">Filter category: {reportFilter}</p>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-gray-900 text-[#6b7280] text-[9px] uppercase pb-2">
                          <th className="pb-2">INCIDENT ID</th>
                          <th className="pb-2">SUBJECT CLASS</th>
                          <th className="pb-2">TYPE</th>
                          <th className="pb-2">CYCLE DATE</th>
                          <th className="pb-2">THREAT</th>
                          <th className="pb-2 text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-950">
                        {reportHistory.map((rep) => (
                          <tr key={rep.id} className="hover:bg-slate-900/60 transition">
                            <td className="py-3 text-cyan-400 font-bold">{rep.id}</td>
                            <td className="py-3 text-gray-200">{rep.name}</td>
                            <td className="py-3 text-gray-400">{rep.type}</td>
                            <td className="py-3 text-gray-500">{rep.date}</td>
                            <td className="py-3">
                              <span
                                className={`font-bold px-1 rounded text-[9px] uppercase ${
                                  rep.threat === "Critical" || rep.threat === "High"
                                    ? "text-red-400 bg-red-950/20"
                                    : "text-blue-400 bg-blue-950/20"
                                }`}
                              >
                                {rep.threat}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <span className="text-[10px] text-gray-400 uppercase bg-gray-950 px-2 py-0.5 rounded border border-gray-900">
                                {rep.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 12: SETTINGS PAGE */}
          {activeTab === PageType.SETTINGS && (
            <div id="deck-tab-settings" className="space-y-6 animate-fade-in font-mono text-xs">
              <div className="border-b border-cyan-500/20 pb-4">
                <h2 className="text-xl font-bold font-mono text-white uppercase tracking-widest leading-none">System Settings Control Room</h2>
                <p className="text-xs text-gray-500 mt-1">Configure telemetry variables, credentials keys, notification rules, and daemon state.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section A: Human node profile profile */}
                <div className="p-6 bg-[#060a16] border border-gray-800 rounded-2xl space-y-4">
                  <div className="border-b border-gray-900 pb-2">
                    <h3 className="font-bold text-gray-200 uppercase text-sm">Human Profile Settings</h3>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-500 uppercase">Operator Full Name</label>
                      <input
                        id="set-fullname"
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        className="w-full bg-[#090f23] border border-gray-850 hover:border-cyan-500/20 focus:border-cyan-400/50 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-500 uppercase">Operator Email Node</label>
                      <input
                        id="set-email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full bg-[#090f23] border border-gray-850 hover:border-cyan-500/20 focus:border-cyan-400/50 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-500 uppercase">Active Account Level</label>
                      <div className="p-3 bg-[#090f23] border border-[#1e293b] rounded-lg flex items-center justify-between">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          profile.plan === "free" ? "text-coral bg-coral/10 border border-coral/15" : "text-app-pink bg-[#a855f7]/10 border border-[#a855f7]/15"
                        }`}>
                          {profile.plan === "free" ? "Free Sandbox Tier" : "Smart AI Pro Hub (BYOK)"}
                        </span>
                        {profile.plan === "free" && (
                          <button
                            type="button"
                            onClick={() => {
                              setProfile((prev) => ({ ...prev, plan: "byok" }));
                              pushSystemAlert("Plan Upgraded", "high", "Account tier upgraded, neural helper activated.");
                            }}
                            className="text-[10px] font-sans text-app-pink hover:text-coral transition-colors font-semibold hover:underline cursor-pointer"
                          >
                            Upgrade to AI Pro →
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-500 uppercase">Interactive Access PIN / Password</label>
                      <input
                        id="set-password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-[#090f23] border border-gray-850 hover:border-cyan-500/20 focus:border-cyan-400/50 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => pushSystemAlert("Profile settings modified", "low", "System records corresponding with human operator updated successfully.")}
                    className="px-4 py-2 bg-[#091024] hover:bg-[#0f1b3e] border border-cyan-500/25 text-cyan-300 font-mono text-xs rounded-lg transition-all uppercase cursor-pointer"
                  >
                    Commit Profile updates
                  </button>
                </div>

                {/* Section B: AI SETTINGS BYOK provider selection */}
                <div className="p-6 bg-[#060a16] border border-[#a855f7]/15 rounded-2xl space-y-4">
                  <div className="border-b border-gray-900 pb-2">
                    <h3 className="font-bold text-gray-200 uppercase text-sm">AI Credentials Hub (BYOK)</h3>
                  </div>

                  <div className="space-y-3 font-sans">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-gray-500 uppercase">Neural AI Provider Selection</label>
                      <select
                        id="set-ai-provider"
                        value={aiSettings.provider}
                        onChange={(e) => setAiSettings({ ...aiSettings, provider: e.target.value as any })}
                        className="w-full bg-[#090f23] border border-gray-850 focus:border-cyan-400/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-none font-mono"
                      >
                        <option value="gemini">Gemini AI Suite (Native Coder)</option>
                        <option value="openai">OpenAI GPT Series</option>
                        <option value="groq">Groq Core Hardware</option>
                        <option value="openrouter">OpenRouter Hub Client</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-mono text-gray-500 uppercase">Provider API Handshake Key</label>
                        {aiSettings.apiKey && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(aiSettings.apiKey);
                              setCopiedKey(true);
                              setTimeout(() => setCopiedKey(false), 1500);
                            }}
                            className="text-[9px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" /> {copiedKey ? "Copied" : "Copy"}
                          </button>
                        )}
                      </div>
                      <input
                        id="set-ai-apikey"
                        type="password"
                        value={aiSettings.apiKey}
                        onChange={(e) => setAiSettings({ ...aiSettings, apiKey: e.target.value })}
                        placeholder="Paste custom private API credential token..."
                        className="w-full bg-[#090f23] border border-gray-850 hover:border-purple-500/20 focus:border-purple-400/50 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      id="update-api-key-btn"
                      onClick={() => {
                        if (aiSettings.apiKey && (aiSettings.apiKey.length < 10 || aiSettings.apiKey.length > 150)) {
                          alert(`Alert: API Key is out of limit! The length is ${aiSettings.apiKey.length} characters. A valid API key must be between 10 and 150 characters.`);
                          return;
                        }
                        pushSystemAlert("AI Provider set", "low", `Primary AI provider set to ${aiSettings.provider.toUpperCase()} credentials saved.`);
                        if (aiSettings.apiKey && aiSettings.apiKey.length > 5) {
                          if (profile.plan === "free") {
                            setProfile((prev) => ({ ...prev, plan: "byok" }));
                            pushSystemAlert("Plan Upgraded", "high", "AI credentials authorized! Account promoted to Smart AI Pro Hub.");
                            alert("Your API key has been successfully validated and saved. AI Features are now enabled!");
                          } else {
                            alert("Your API key has been saved successfully in ChaosMind AI settings.");
                          }
                        } else {
                          alert("Your settings have been saved.");
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-tr from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs rounded-lg shadow-lg shadow-purple-500/10 transition-all uppercase cursor-pointer"
                    >
                      Update AI Key
                    </button>

                    <button
                      id="test-api-key-btn"
                      onClick={handleTestKeyConnection}
                      className="px-4 py-2 bg-gray-950 hover:bg-slate-900 border border-gray-800 text-[#fafafa] hover:text-white rounded-lg transition-all uppercase cursor-pointer"
                    >
                      {testStatus === "verifying" ? "Verifying..." : "Test Connection"}
                    </button>
                  </div>

                  {/* Connection Verification result indicators */}
                  {testStatus && (
                    <div className="p-3 bg-black/60 rounded border border-gray-900 text-xs flex items-center gap-2 animate-fade-in font-mono">
                      <span className={`w-2 h-2 rounded-full ${testStatus === "success" ? "bg-emerald-400" : testStatus === "fail" ? "bg-red-400" : "bg-purple-400 animate-pulse"}`} />
                      <span>
                        {testStatus === "verifying" && "Dialing credential node servers..."}
                        {testStatus === "success" && "API Handshake Approved! Dynamic predictive models active."}
                        {testStatus === "fail" && "Handshake Failed. Incorrect format API token inputted."}
                      </span>
                    </div>
                  )}
                </div>

                {/* Section C: Device Settings state */}
                <div className="p-6 bg-[#060a16] border border-gray-800 rounded-2xl space-y-4">
                  <div className="border-b border-gray-900 pb-2">
                    <h3 className="font-bold text-gray-200 uppercase text-sm">Connected host device daemon</h3>
                  </div>

                  <div className="space-y-3 font-sans text-xs">
                    <div className="flex justify-between items-center bg-gray-950 p-3 rounded border border-gray-900">
                      <div>
                        <p className="font-mono text-xs font-bold text-white uppercase">CYBER-STATION-PRO-X</p>
                        <p className="text-[10px] text-gray-500">Daemon UUID: 6F9D1E8F-2A7B-4E3C-89D1</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${deviceConnected ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                          {deviceConnected ? "CONNECTED" : "DISCONNECTED"}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-[#9ca3af] font-mono">Simulated Socket streaming interface</span>
                      <button
                        onClick={() => {
                          setDeviceConnected(!deviceConnected);
                          pushSystemAlert(
                            deviceConnected ? "Daemon disconnected" : "Daemon socket re-established",
                            deviceConnected ? "high" : "low",
                            `Cyber monitor socket status transitioned to ${!deviceConnected ? "CONNECTED" : "OFFLINE"}`
                          );
                        }}
                        className={`px-3 py-1 bg-gray-950 font-mono tracking-widest hover:border-cyan-500/20 text-xs rounded border border-gray-850 cursor-pointer ${
                          deviceConnected ? "text-red-400" : "text-emerald-400"
                        }`}
                      >
                        {deviceConnected ? "[ SEVER LINK ]" : "[ SYNC LINK ]"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section D: Notifications toggles and controls */}
                <div className="p-6 bg-[#060a16] border border-gray-800 rounded-2xl space-y-4">
                  <div className="border-b border-gray-900 pb-2">
                    <h3 className="font-bold text-gray-200 uppercase text-sm">Heuristic Notification Settings</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Switch 1: email alert */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white uppercase">Email Alerts Broadcast</p>
                        <p className="text-[10px] text-gray-500 font-sans">Dispatch emergency diagnostic logs to registered operator email.</p>
                      </div>
                      <button
                        onClick={() => setSettingsNotif({ ...settingsNotif, emailAlerts: !settingsNotif.emailAlerts })}
                        className="text-cyan-400 cursor-pointer"
                      >
                        {settingsNotif.emailAlerts ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                      </button>
                    </div>

                    {/* Switch 2: active resource spike warning */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white uppercase font-mono">High Risk Anomaly Alerts</p>
                        <p className="text-[10px] text-gray-500 font-sans">Trigger visual warning banners if Computed Risk score transcends above 60% thresholds.</p>
                      </div>
                      <button
                        onClick={() => setSettingsNotif({ ...settingsNotif, highRiskAlerts: !settingsNotif.highRiskAlerts })}
                        className="text-cyan-400 cursor-pointer"
                      >
                        {settingsNotif.highRiskAlerts ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                      </button>
                    </div>

                    {/* Switch 3: simulation logs */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white uppercase">Simulation Logs Warning Ticks</p>
                        <p className="text-[10px] text-gray-500 font-sans">Generate alert logs inside the lower console dashboard during stressor injections.</p>
                      </div>
                      <button
                        onClick={() => setSettingsNotif({ ...settingsNotif, simulationAlerts: !settingsNotif.simulationAlerts })}
                        className="text-cyan-400 cursor-pointer"
                      >
                        {settingsNotif.simulationAlerts ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
