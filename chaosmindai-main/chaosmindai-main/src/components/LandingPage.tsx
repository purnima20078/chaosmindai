import { motion } from "motion/react";
import { Cpu, ShieldAlert, BrainCircuit, Activity, ChevronRight, Play, Terminal, Database, ArrowRight, Zap, Sun, Moon } from "lucide-react";
import { PageType } from "../types";

interface LandingPageProps {
  onNavigate: (page: PageType, plan?: "free" | "byok") => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  // Animated diagram blocks
  const nodes = [
    { name: "Your Computer Agent", icon: <Terminal className="w-5 h-5 text-coral" />, pos: "left" },
    { name: "Safe Connection", icon: <Database className="w-5 h-5 text-app-pink" />, pos: "middle" },
    { name: "Smart AI Assistant", icon: <BrainCircuit className="w-5 h-5 text-coral" />, pos: "right" }
  ];

  return (
    <div id="landing-page" className="min-h-screen bg-app-bg text-app-text overflow-x-hidden selection:bg-coral/30 selection:text-coral transition-colors duration-300">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-app-pink/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-app-bg/80 border-b border-app-border px-6 py-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-gradient-to-tr from-coral to-rose-quartz rounded-lg shadow-lg shadow-coral/20">
              <BrainCircuit className="w-6 h-6 text-app-text-on-accent" />
              <div className="absolute inset-0 bg-white/20 blur-sm rounded-lg opacity-50" />
            </div>
            <span className="font-condensed text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-coral via-rose-quartz to-coral">
              CHAOSMIND <span className="text-app-text font-condensed text-base ml-0.5">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#features" className="hover:text-app-accent transition-colors text-app-subtext">Features</a>
            <a href="#architecture" className="hover:text-app-accent transition-colors text-app-subtext">How it Works</a>
            <a href="#pricing" className="hover:text-app-pink transition-colors text-app-subtext">Pricing Plans</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="nav-login-btn"
              onClick={() => onNavigate(PageType.LOGIN)}
              className="text-sm font-medium hover:text-app-accent text-app-accent transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              id="nav-get-started-btn"
              onClick={() => onNavigate(PageType.REGISTER)}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-coral to-rose-quartz text-app-text-on-accent rounded-lg shadow-lg shadow-coral/10 hover:opacity-90 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Register Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Layered Wavy Papercut Texture Behind */}
      <section className="relative pt-24 pb-20 px-6 w-full text-center overflow-hidden border-b border-app-border/40">
        {/* SVG Wavy Papercut Texture layers mimicking the uploaded image cardboard/liquid texture */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-95 dark:opacity-40 transition-opacity duration-300">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--theme-bg)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--theme-panel)" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="wave-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--theme-panel)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--theme-card)" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="accent-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--theme-accent-primary)" stopOpacity="0.08" />
                <stop offset="50%" stopColor="var(--theme-accent-secondary)" stopOpacity="0.04" />
                <stop offset="100%" stopColor="var(--theme-accent-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Base Fill */}
            <rect width="1440" height="900" fill="var(--theme-bg)" />

            {/* Accent colored atmospheric texture overlays */}
            <rect width="1440" height="900" fill="url(#accent-glow-grad)" />

            {/* Top-Left Sweeping Wave Contour Ripple Layers */}
            <path 
              d="M-100,-100 Q400,200 800,50 T1540,150 L1540,-150 L-100,-150 Z" 
              fill="url(#wave-grad-1)" 
              className="drop-shadow-wave" 
            />
            <path 
              d="M-100,-100 Q400,200 800,50 T1540,150" 
              stroke="var(--theme-border)" 
              strokeWidth="1.5" 
              strokeOpacity="0.35" 
              fill="none" 
            />

            <path 
              d="M-100,-100 Q350,300 750,150 T1540,300 L1540,-150 L-100,-150 Z" 
              fill="url(#wave-grad-2)" 
              className="drop-shadow-wave-deep" 
            />
            <path 
              d="M-100,-100 Q350,300 750,150 T1540,300" 
              stroke="var(--theme-border)" 
              strokeWidth="2" 
              strokeOpacity="0.4" 
              fill="none" 
            />

            <path 
              d="M-100,-100 Q300,400 700,250 T1540,450 L1540,-150 L-100,-150 Z" 
              fill="var(--theme-bg)" 
              className="drop-shadow-wave" 
            />
            <path 
              d="M-100,-100 Q300,400 700,250 T1540,450" 
              stroke="var(--theme-border)" 
              strokeWidth="1.5" 
              strokeOpacity="0.25" 
              fill="none" 
            />

            {/* Bottom-Right Sweeping Wave Contour Ripple Layers */}
            <path 
              d="M1540,1000 Q1040,700 640,850 T-100,750 L-100,1050 L1540,1050 Z" 
              fill="url(#wave-grad-1)" 
              className="drop-shadow-wave" 
            />
            <path 
              d="M1540,1000 Q1040,700 640,850 T-100,750" 
              stroke="var(--theme-border)" 
              strokeWidth="1.5" 
              strokeOpacity="0.35" 
              fill="none" 
            />

            <path 
              d="M1540,1000 Q1000,600 600,750 T-100,600 L-100,1050 L1540,1050 Z" 
              fill="url(#wave-grad-2)" 
              className="drop-shadow-wave-deep" 
            />
            <path 
              d="M1540,1000 Q1000,600 600,750 T-100,600" 
              stroke="var(--theme-border)" 
              strokeWidth="2" 
              strokeOpacity="0.4" 
              fill="none" 
            />

            <path 
              d="M1540,1000 Q950,500 550,650 T-100,450 L-100,1050 L1540,1050 Z" 
              fill="var(--theme-bg)" 
              className="drop-shadow-wave" 
            />
            <path 
              d="M1540,1000 Q950,500 550,650 T-100,450" 
              stroke="var(--theme-border)" 
              strokeWidth="1.5" 
              strokeOpacity="0.25" 
              fill="none" 
            />
          </svg>
        </div>

        {/* Hero Interactive Area Container wrapper above absolute texturing background */}
        <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-coral/10 border border-coral/30 rounded-full text-xs font-mono tracking-widest text-app-accent uppercase">
              <span className="w-2 h-2 bg-coral rounded-full animate-ping" />
              Easy Computer Health Monitor
            </div>

            <h1 className="text-5xl sm:text-7xl font-sans tracking-tight leading-none text-app-text font-black select-none max-w-3xl mx-auto">
              Predict System Slowdowns <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral via-rose-quartz to-coral font-black">
                Before They Happen
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-app-subtext max-w-2xl mx-auto font-sans leading-relaxed">
              Simple AI-powered tool to track your computer health, predict slowdowns, and keep everything running smooth.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                id="hero-get-started"
                onClick={() => onNavigate(PageType.REGISTER)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-coral to-rose-quartz text-app-text-on-accent font-medium rounded-lg shadow-xl shadow-coral/15 flex items-center justify-center gap-3 transition-all hover:scale-[1.03] cursor-pointer"
              >
                Start For Free <ChevronRight className="w-5 h-5" />
              </button>
              <button
                id="hero-watch-demo"
                onClick={() => onNavigate(PageType.LOGIN)}
                className="w-full sm:w-auto px-8 py-4 bg-app-card hover:bg-app-panel border border-app-border rounded-lg text-app-text font-medium flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-sm"
              >
                <Play className="w-4 h-4 fill-current text-coral" /> See Demo Inside
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Architecture Preview */}
      <section id="architecture" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono text-coral tracking-wider uppercase mb-2">Live Connection Flow</h2>
          <h3 className="text-3xl font-sans font-bold text-app-text">How ChaosMind Connects With Your Device</h3>
        </div>

        <div className="relative p-8 rounded-2xl bg-app-card border border-app-border backdrop-blur-xl transition hover:border-coral/20">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-coral to-transparent opacity-50" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            {nodes.map((node, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-app-panel rounded-xl border border-app-border">
                <div className="p-4 bg-app-bg rounded-full border border-app-border mb-4 animate-pulse">
                  {node.icon}
                </div>
                <h4 className="font-mono text-sm text-app-accent uppercase tracking-widest">{node.name}</h4>
                <p className="text-xs text-app-subtext mt-2">
                  {i === 0 && "Lightweight agent app installed on your device to read core health stats."}
                  {i === 1 && "Sends updates completely securely to our servers without blocking your work."}
                  {i === 2 && "Generous AI scans your system health and warns of any heating or lag instantly."}
                </p>
              </div>
            ))}
          </div>

          {/* Animated Connecting Vector (Mock Lines) */}
          <div className="hidden lg:block absolute left-1/4 right-1/4 top-1/2 h-[2px] bg-gradient-to-r from-coral via-rose-quartz to-coral opacity-25 -translate-y-1/2 z-0">
            <div className="w-10 h-full bg-coral blur-sm rounded animate-infinite" style={{ animation: "pulse 2s infinite" }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-mono text-coral tracking-wider uppercase">Pro-grade Computer Guard</h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-bold text-app-text tracking-tight">
            Stop Slowdowns and Heating Long Before They Occur
          </h3>
          <p className="text-app-subtext text-sm font-sans">
            AI monitoring trained specifically to find hardware leaks, full disks, and network errors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-xl bg-app-card border border-app-border hover:border-coral/25 transition-all duration-350 hover:shadow-2xl flex flex-col justify-between">
            <div>
              <div className="p-3 bg-coral/10 rounded-lg text-coral w-fit mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-app-text leading-tight mb-3">Live Health Tracker</h4>
              <p className="text-app-subtext text-sm leading-relaxed mb-6">
                Easily look inside your device to check processor loads, RAM usage, storage space, and internet packet speeds.
              </p>
            </div>
            <ul className="space-y-2 mt-auto border-t border-app-border pt-4">
              {["CPU Processor Load", "Storage Read-Write Speeds", "RAM Memory Consumption", "Internet Network Upload/Download"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-app-subtext font-mono">
                  <Zap className="w-3 h-3 text-coral" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-xl bg-app-card border border-app-border hover:border-app-pink/25 transition-all duration-350 hover:shadow-2xl flex flex-col justify-between">
            <div>
              <div className="p-3 bg-app-pink/10 rounded-lg text-app-pink w-fit mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-app-text leading-tight mb-3">Early Warning Alarms</h4>
              <p className="text-app-subtext text-sm leading-relaxed mb-6">
                Instantly track memory leaks, disk storage bottlenecks, and high latency network spikes before they cause apps to crash.
              </p>
            </div>
            <ul className="space-y-2 mt-auto border-t border-app-border pt-4">
              {["High Processor Temperature Alarms", "Dangling RAM Memory Leak Tracker", "Disk Saturated and Jammed Alarms", "Spontaneous Network Delay Spike Tester"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-app-subtext font-mono">
                  <Zap className="w-3 h-3 text-app-pink" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-xl bg-app-card border border-app-border hover:border-coral/25 transition-all duration-350 hover:shadow-2xl flex flex-col justify-between">
            <div>
              <div className="p-3 bg-coral/10 rounded-lg text-coral w-fit mb-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-app-text leading-tight mb-3">AI Solution Helper</h4>
              <p className="text-app-subtext text-sm leading-relaxed mb-6">
                Get beautiful, step-by-step guides on how to reduce lag and speed up your computer, or chat with our helpful AI system assistant anytime.
              </p>
            </div>
            <ul className="space-y-2 mt-auto border-t border-app-border pt-4">
              {["Smart AI Guides and Advice", "Chit-chat with Computer Expert AI", "Step-by-step Recovery Steps", "Daily Health Bulletins and Summary"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-app-subtext font-mono">
                  <Zap className="w-3 h-3 text-coral" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 border-y border-app-border bg-app-panel/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono text-coral tracking-wider uppercase">Simple Pricing</h2>
            <h3 className="text-3xl font-sans font-bold text-app-text">Affordable Plans for Everyone</h3>
            <p className="text-app-subtext text-sm">
              Use our live dashboards for free. Simply put your own AI key if you want fully unlimited AI smart guides!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free tier */}
            <div className="p-8 rounded-2xl bg-app-card border border-app-border hover:border-coral/20 transition relative flex flex-col">
              <div className="mb-6">
                <h4 className="font-mono text-sm text-coral uppercase tracking-widest mb-1">Free Sandbox</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-app-text">$0</span>
                  <span className="text-app-subtext text-sm">/ free forever</span>
                </div>
              </div>
              <p className="text-app-subtext text-sm mb-6">
                Perfect is you just want to track basic computer stats, watch the live dials, and save reports offline.
              </p>
              <ul className="space-y-3 mb-8 text-sm">
                {["1 Active Connected Computer", "Beautiful Live Health Dashboards", "Calculate Health and Risk Scores", "Download Health Reports Offline"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-app-text">
                    <ChevronRight className="w-4 h-4 text-coral" /> {feat}
                  </li>
                ))}
              </ul>
              <button
                id="pricing-free-tier"
                onClick={() => onNavigate(PageType.REGISTER, "free")}
                className="mt-auto w-full py-3 bg-app-bg hover:opacity-90 text-coral font-medium rounded-lg border border-coral/20 transition-all cursor-pointer"
              >
                Start Using Now
              </button>
            </div>
 
            {/* Premium with BYOK */}
            <div className="p-8 rounded-2xl bg-app-card border border-app-pink/50 hover:border-coral/20 transition relative flex flex-col shadow-2xl">
              <div className="absolute top-4 right-4 px-3 py-0.5 bg-app-pink/20 border border-app-pink/40 rounded-full text-[10px] font-mono tracking-wider text-app-pink uppercase">
                BYOK Enabled
              </div>
              <div className="mb-6">
                <h4 className="font-mono text-sm text-app-pink uppercase tracking-widest mb-1">Smart AI Pro</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-app-text">BYOK</span>
                  <span className="text-app-subtext text-sm">/ Bring Your Own Key</span>
                </div>
              </div>
              <p className="text-app-subtext text-sm mb-6">
                Enjoy fully unlimited smart AI guides and talk 1-on-1 with the AI Assistant without any restrictions.
              </p>
              <ul className="space-y-3 mb-8 text-sm">
                {["Unlimited AI Smart Assistance", "Talk 1-on-1 with Computer Expert AI", "Practice Simulated Crashes and Recoveries", "Export Unlimited Health Summaries"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-app-text">
                    <ChevronRight className="w-4 h-4 text-app-pink" /> {feat}
                  </li>
                ))}
              </ul>
              <button
                id="pricing-byok-tier"
                onClick={() => onNavigate(PageType.REGISTER, "byok")}
                className="mt-auto w-full py-3 bg-gradient-to-r from-coral to-rose-quartz text-app-text-on-accent font-medium rounded-lg shadow-lg shadow-coral/10 transition-all hover:scale-[1.01] cursor-pointer"
              >
                Set Up With API Key
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-app-border bg-app-panel py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-tr from-coral to-rose-quartz rounded-md">
              <BrainCircuit className="w-4 h-4 text-app-text-on-accent" />
            </div>
            <span className="font-condensed text-lg tracking-wide text-app-subtext">
              CHAOSMIND <span className="text-coral font-condensed text-xs ml-0.5">AI</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-medium text-app-subtext">
            <a href="#features" className="hover:text-coral transition-colors">About Us</a>
            <a href="#architecture" className="hover:text-coral transition-colors">Contact</a>
            <a href="#features" className="hover:text-coral transition-colors">Help Guides</a>
            <a href="#pricing" className="hover:text-coral transition-colors">Privacy Policy</a>
          </div>

          <p className="text-xs text-app-subtext font-mono">
            &copy; {new Date().getFullYear()} ChaosMindAI Labs. Created cleanly for simple health awareness.
          </p>
        </div>
      </footer>
    </div>
  );
}
