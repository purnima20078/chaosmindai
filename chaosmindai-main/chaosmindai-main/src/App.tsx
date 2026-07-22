import { useState } from "react";
import { PageType, UserProfile, AISettings } from "./types";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import OnboardingPage from "./components/OnboardingPage";
import ConnectDevicePage from "./components/ConnectDevicePage";
import DashboardSuite from "./components/DashboardSuite";
import { Sun, Moon } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.LANDING);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "byok">("free");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "Chief Operator",
    username: "cyber_daemon",
    email: "operator@chaos-node.net",
    plan: "byok",
  });
  const [aiSettings, setAiSettings] = useState<AISettings>({
    provider: "gemini",
    apiKey: "",
  });
  const [deviceConnected, setDeviceConnected] = useState(false);

  // Persistent theme mapping with smooth localStorage sync
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("chaosmind-theme");
    return (saved as "dark" | "light") || "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("chaosmind-theme", next);
      return next;
    });
  };

  const handleNavigateFromLanding = (page: PageType, plan?: "free" | "byok") => {
    if (plan) {
      setSelectedPlan(plan);
    }
    setCurrentPage(page);
  };

  const handleRegister = (profile: UserProfile, ai: AISettings) => {
    setUserProfile({
      ...profile,
      plan: selectedPlan
    });
    setAiSettings(ai);
    // Go directly to login section so user can sign in
    setCurrentPage(PageType.LOGIN);
  };

  const handleLogin = (email: string) => {
    // Save email dynamically
    setUserProfile((prev) => ({
      ...prev,
      email: email,
      username: email.split("@")[0],
      plan: selectedPlan,
    }));
    // Proceed to onboarding as per specified checklist rules
    setCurrentPage(PageType.ONBOARDING);
  };

  const handleOnboardingComplete = () => {
    // Move to agent connection page
    setCurrentPage(PageType.CONNECT_DEVICE);
  };

  const handleDeviceStatusChange = (status: boolean) => {
    setDeviceConnected(status);
  };

  const handleLogout = () => {
    setCurrentPage(PageType.LANDING);
    setDeviceConnected(false);
  };

  return (
    <div className={`min-h-screen bg-app-bg text-app-text transition-colors duration-150 relative ${theme === 'light' ? 'light' : 'dark'}`}>
      {currentPage === PageType.LANDING && (
        <LandingPage onNavigate={handleNavigateFromLanding} />
      )}

      {currentPage === PageType.REGISTER && (
        <AuthPage 
          initialMode="register" 
          onRegister={handleRegister} 
          onLogin={handleLogin}
          onNavigate={setCurrentPage} 
          presetPlan={selectedPlan}
          onChangePresetPlan={setSelectedPlan}
        />
      )}

      {currentPage === PageType.LOGIN && (
        <AuthPage 
          initialMode="login" 
          onRegister={handleRegister} 
          onLogin={handleLogin}
          onNavigate={setCurrentPage} 
          presetPlan={selectedPlan}
          onChangePresetPlan={setSelectedPlan}
        />
      )}

      {currentPage === PageType.ONBOARDING && (
        <OnboardingPage
          onComplete={handleOnboardingComplete}
          onNavigate={setCurrentPage}
          userEmail={userProfile.email}
        />
      )}

      {currentPage === PageType.CONNECT_DEVICE && (
        <ConnectDevicePage
          deviceConnected={deviceConnected}
          onToggleConnection={handleDeviceStatusChange}
          onNavigate={setCurrentPage}
        />
      )}

      {[
        PageType.DASHBOARD,
        PageType.MONITORING,
        PageType.PREDICTIONS,
        PageType.AI_INSIGHTS,
        PageType.SIMULATION,
        PageType.REPORTS,
        PageType.SETTINGS,
      ].includes(currentPage) && (
        <DashboardSuite
          userProfile={userProfile}
          initialAiSettings={aiSettings}
          deviceConnectedState={deviceConnected}
          onLogout={handleLogout}
        />
      )}

      {/* Premium Theme Controller HUD */}
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-app-card/95 hover:bg-app-card/100 border border-app-border px-3 py-2 rounded-full shadow-2xl transition-all duration-300 hover:border-coral/50">
        <div className="flex flex-col items-end pr-1 pl-2 select-none">
          <span className="text-[9px] font-mono tracking-widest text-[#a1a1aa] uppercase leading-none">THEME</span>
          <span className="text-[10px] font-mono font-extrabold text-coral uppercase tracking-wider mt-0.5">
            {theme === "dark" ? "CHARCOAL" : "PLATINUM"}
          </span>
        </div>
        <button
          id="global-theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="p-2 bg-app-bg hover:bg-coral text-coral hover:text-[#2C2B30] rounded-full transition-all cursor-pointer flex items-center justify-center border border-app-border group"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 transition-transform group-hover:rotate-45 text-coral group-hover:text-[#2C2B30]" />
          ) : (
            <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12 text-coral group-hover:text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
