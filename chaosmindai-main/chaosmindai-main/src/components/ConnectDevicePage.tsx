import { useState } from "react";
import { Laptop, AlertTriangle, ShieldCheck, RefreshCw, Power, Radio, Server, Fingerprint, ArrowLeft } from "lucide-react";
import { PageType } from "../types";

interface ConnectDevicePageProps {
  deviceConnected: boolean;
  onToggleConnection: (state: boolean) => void;
  onNavigate: (page: PageType) => void;
}

export default function ConnectDevicePage({ deviceConnected, onToggleConnection, onNavigate }: ConnectDevicePageProps) {
  const [deviceInfo, setDeviceInfo] = useState({
    name: "MY-COMPUTER-01",
    os: "macOS Ventura 13.4.1 (Kernel Darwin 22.5.0)",
    ip: "192.168.1.144",
    location: "Active Node",
    latency: "12ms"
  });

  const [loading, setLoading] = useState(false);

  const triggerToggle = () => {
    setLoading(true);
    setTimeout(() => {
      onToggleConnection(!deviceConnected);
      setLoading(false);
    }, 1200);
  };

  return (
    <div id="connect-device-page" className="min-h-screen bg-app-bg text-app-text flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300 font-sans">
      {/* Decorative Cyber Background */}
      <div className="absolute inset-0 bg-coral/5 opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-coral/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-app-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl w-full relative z-10 space-y-6">
        <div className="flex justify-start font-mono">
          <button
            id="connect-back-btn"
            onClick={() => onNavigate(PageType.ONBOARDING)}
            className="group flex items-center gap-2 text-xs font-mono tracking-wider text-app-subtext hover:text-coral transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO SETUP STEPS
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-sans font-extrabold text-app-text tracking-tight animate-fade-in">Device Connection Controller</h2>
          <p className="text-xs text-app-subtext mt-1 font-mono">
            Link or unlink your device health monitor here simply.
          </p>
        </div>

        {/* Status card */}
        <div className="bg-app-card border border-app-border p-6 rounded-2xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-app-border pb-4 font-mono">
            <span className="text-xs font-mono text-app-subtext uppercase tracking-wider">Live Data Stream</span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${deviceConnected ? "bg-emerald-400 animate-pulse" : "bg-red-400 animate-pulse"}`} />
              <span className={`text-xs font-mono font-bold uppercase ${deviceConnected ? "text-emerald-500" : "text-red-500"}`}>
                {deviceConnected ? "Computer Connected" : "Computer Disconnected"}
              </span>
            </div>
          </div>

          {/* Central device display */}
          <div className="flex items-center gap-4 p-4 bg-app-bg rounded-xl border border-app-border">
            <div className={`p-3 rounded-lg ${deviceConnected ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
              <Laptop className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-app-text font-mono">{deviceInfo.name}</h4>
              <p className="text-xs text-app-subtext font-sans">{deviceInfo.os}</p>
            </div>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-app-panel rounded-lg border border-app-border">
              <span className="text-app-subtext block mb-1">Local Address</span>
              <span className="text-app-text font-semibold">{deviceInfo.ip}</span>
            </div>
            <div className="p-3 bg-app-panel rounded-lg border border-app-border">
              <span className="text-app-subtext block mb-1">Response Speed</span>
              <span className="text-app-text font-semibold">{deviceConnected ? deviceInfo.latency : "-- ms"}</span>
            </div>
            <div className="p-3 bg-app-panel rounded-lg border border-app-border">
              <span className="text-app-subtext block mb-1">Secure License ID</span>
              <span className="text-app-text font-semibold flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5 text-coral" /> SM-6F9D1E
              </span>
            </div>
            <div className="p-3 bg-app-panel rounded-lg border border-app-border">
              <span className="text-app-subtext block mb-1">Last Checked</span>
              <span className="text-app-text font-semibold">{deviceConnected ? "Just now" : "3 min ago"}</span>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            id="toggle-agent-connection"
            disabled={loading}
            onClick={triggerToggle}
            className={`w-full py-3.5 rounded-lg font-mono text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
              deviceConnected
                ? "bg-red-950/40 border border-red-500/30 hover:bg-red-900/40 text-red-100"
                : "bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 text-emerald-100"
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Updating connection details...
              </>
            ) : deviceConnected ? (
              <>
                <Power className="w-4 h-4" /> Disconnect Device Health
              </>
            ) : (
              <>
                <Radio className="w-4 h-4" /> Connect Device Health
              </>
            )}
          </button>
        </div>

        {/* Navigate to Portal */}
        <div className="text-center pt-2">
          <button
            id="btn-goto-portal"
            onClick={() => onNavigate(PageType.DASHBOARD)}
            className="px-6 py-2 bg-app-card hover:bg-app-panel text-coral hover:text-coral/80 font-sans font-semibold text-sm rounded-lg border border-app-border transition-all cursor-pointer shadow-md"
          >
            Go to Main Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
