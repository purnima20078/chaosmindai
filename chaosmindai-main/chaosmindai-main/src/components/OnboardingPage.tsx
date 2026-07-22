import { useState } from "react";
import { BrainCircuit, Download, CheckCircle, Smartphone, HardDrive, Cpu, Terminal, ArrowRight, Zap, RefreshCw, ArrowLeft } from "lucide-react";
import { PageType } from "../types";

interface OnboardingPageProps {
  onComplete: () => void;
  onNavigate: (page: PageType) => void;
  userEmail: string;
}

export default function OnboardingPage({ onComplete, onNavigate, userEmail }: OnboardingPageProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [step, setStep] = useState(1);

  const simulateDownload = () => {
    setDownloaded(true);
    // Auto transition step after brief mock interval
    setTimeout(() => {
      setStep(2);
    }, 1500);
  };

  return (
    <div id="onboarding-page" className="min-h-screen bg-app-bg text-app-text flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-coral/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-app-pink/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 space-y-8">
        <div className="flex justify-start">
          <button
            id="onboarding-back-btn"
            onClick={() => onNavigate(PageType.LOGIN)}
            className="group flex items-center gap-2 text-xs font-mono tracking-wider text-app-subtext hover:text-coral transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO SIGN IN
          </button>
        </div>

        {/* Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-coral/10 border border-coral/30 rounded-full text-xs font-mono tracking-widest text-coral uppercase">
            <span className="w-1.5 h-1.5 bg-coral rounded-full animate-ping" />
            Account Created Successfully
          </div>
          <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-app-text tracking-tight scale-up">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-rose-quartz">ChaosMindAI</span>
          </h1>
          <p className="text-sm text-app-subtext max-w-md mx-auto font-sans">
            Your account has been set up under <span className="text-coral font-mono">{userEmail}</span>. Now let's connect your computer to start tracking.
          </p>
        </div>

        {/* Steps Tracker */}
        <div className="grid grid-cols-3 gap-4 border-y border-app-border py-6">
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-coral/25 border border-coral flex items-center justify-center text-xs font-mono text-coral font-bold">
              ✔
            </div>
            <span className="text-xs font-mono text-coral font-semibold tracking-wide">Create Account</span>
          </div>

          <div className="flex flex-col items-center text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-coral/25 border border-coral flex items-center justify-center text-xs font-mono text-coral font-bold">
              ✔
            </div>
            <span className="text-xs font-mono text-coral font-semibold tracking-wide">Connect AI</span>
          </div>

          <div className="flex flex-col items-center text-center space-y-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                step === 2
                  ? "bg-app-pink/30 border-app-pink text-app-text shadow-md"
                  : "bg-app-bg border border-app-border text-app-subtext"
              }`}
            >
              {step === 2 ? "✔" : "3"}
            </div>
            <span className={`text-xs font-mono tracking-wide ${step === 2 ? "text-app-pink font-semibold" : "text-app-subtext"}`}>
              Connect Device
            </span>
          </div>
        </div>

        {/* Container */}
        <div id="onboarding-container" className="bg-app-card border border-app-border p-8 rounded-2xl shadow-2xl space-y-6 transition-all duration-300">
          {step === 1 ? (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-16 h-16 bg-app-bg hover:bg-app-panel rounded-full flex items-center justify-center text-coral border border-app-border transition-all">
                <Download className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-app-text font-sans">Install ChaosMind Device Agent</h3>
                <p className="text-xs text-app-subtext leading-relaxed max-w-sm mx-auto">
                  To see your live computer graphics, processor load, storage speed, and internet network stats, download our tiny agent app.
                </p>
              </div>

              {/* Code Snippet */}
              <div className="text-left font-mono rounded-lg overflow-hidden bg-app-bg border border-app-border">
                <div className="flex items-center justify-between px-4 py-2 bg-app-panel border-b border-app-border text-[10px] text-app-subtext uppercase tracking-widest">
                  <span>Quick Setup (Mac, Windows & Linux)</span>
                  <span className="text-coral">100% Safe</span>
                </div>
                <div className="p-4 overflow-x-auto text-xs text-coral whitespace-nowrap">
                  <code>curl -fsSL https://chaosmind.ai/install.sh | sh -s -- --key {userEmail}</code>
                </div>
              </div>

              <button
                id="btn-download-agent"
                onClick={simulateDownload}
                disabled={downloaded}
                className="w-full py-3.5 bg-gradient-to-r from-coral to-rose-quartz text-app-text-on-accent font-sans font-medium text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-coral/10 cursor-pointer disabled:opacity-75"
              >
                {downloaded ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-app-text-on-accent" /> Connecting with your Computer...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Download Tiny Agent Installer
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-[#10b981] border border-emerald-500/30 animate-pulse">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-app-text font-sans">Your Computer Connected Successfully</h3>
                <p className="text-xs text-app-subtext font-sans max-w-sm mx-auto">
                  Our system recognized your device: <span className="text-coral font-mono font-bold">MY-COMPUTER-01</span>. Live health stats are now coming in continuously!
                </p>
              </div>

              {/* Verified host payload */}
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-left font-mono text-[11px] text-emerald-500 dark:text-emerald-400 space-y-1">
                <p>&gt; Secure connection is active on port 3000</p>
                <p>&gt; System ID: 6F9D1E8F-2A7B-4E3C-89D1-72A8B3C4D5E6</p>
                <p>&gt; Computer health status is fully active and working fine</p>
              </div>

              <button
                id="btn-onboarding-complete"
                onClick={onComplete}
                className="w-full py-3.5 bg-gradient-to-r from-coral to-rose-quartz text-app-text-on-accent font-sans font-medium text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-coral/15 cursor-pointer"
              >
                Go to Live Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-app-subtext font-mono tracking-wider">
          ChaosMind Secure Handshake &bull; Version 1.0.4
        </p>
      </div>
    </div>
  );
}
