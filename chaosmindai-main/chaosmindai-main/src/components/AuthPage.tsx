import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BrainCircuit, Mail, Eye, EyeOff, Shield, ShieldCheck, 
  Terminal, ArrowLeft, User, UserCheck, KeySquare, HelpCircle,
  Database, Activity, Cpu, Server, Network, Layers, Monitor, ChevronRight
} from "lucide-react";
import { PageType, AISettings, UserProfile } from "../types";
import DeveloperIllustration from "./DeveloperIllustration";

interface AuthPageProps {
  initialMode: "login" | "register";
  onLogin: (email: string) => void;
  onRegister: (profile: UserProfile, aiSettings: AISettings) => void;
  onNavigate: (page: PageType) => void;
  presetPlan?: "free" | "byok";
  onChangePresetPlan?: (plan: "free" | "byok") => void;
}

export default function AuthPage({ 
  initialMode, 
  onLogin, 
  onRegister, 
  onNavigate,
  presetPlan = "free",
  onChangePresetPlan
}: AuthPageProps) {
  const [isLogin, setIsLogin] = useState<boolean>(initialMode === "login");
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep internal state updated when the prop changes
  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  // LOGIN STATE
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [loginInfo, setLoginInfo] = useState("");

  // REGISTER STATE
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [provider, setProvider] = useState<"gemini" | "openai" | "groq" | "openrouter">("gemini");
  const [apiKey, setApiKey] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegKey, setShowRegKey] = useState(false);
  const [regError, setRegError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginInfo("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please submit correct credentials.");
      return;
    }

    onLogin(loginEmail);
  };

  const handleDemoBypass = () => {
    onLogin("tester@chaosmind.io");
  };

  const handleForgotPass = () => {
    setLoginInfo("Password reset link sent to your registered email address.");
  };

  // OTP STATE
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userEnteredOtp, setUserEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    if (!fullName || !username || !regEmail || !regPassword || !confirmPassword) {
      setRegError("Please fill out all mandatory register fields.");
      return;
    }
    if (regPassword !== confirmPassword) {
      setRegError("Passwords do not match.");
      return;
    }

    if (presetPlan === "byok" && apiKey && (apiKey.length < 10 || apiKey.length > 150)) {
      alert(`API Key is out of standard limits! Provided key length is ${apiKey.length}. Valid range is between 10 and 150 characters.`);
      setRegError("API Key is out of standard limit (10 - 150 characters).");
      return;
    }

    // Generate random 6-digit OTP code to verify email address
    const codec = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(codec);
    setIsVerifyingOtp(true);
    setOtpError("");
    setUserEnteredOtp("");
    
    // Alert user simulating secure OTP email
    alert(`[CHAOSMIND OTP PROTOCOL] A verification code has been generated and simulated to ${regEmail}.\n\nYOUR SECURITY KEY: ${codec}`);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (userEnteredOtp !== generatedOtp) {
      setOtpError("Security validation mismatched. Please check and try again.");
      return;
    }

    // OTP Approved, register profile
    onRegister(
      { fullName, username, email: regEmail },
      { provider, apiKey }
    );
  };

  return (
    <div 
      id={isLogin ? "login-page" : "register-page"}
      className="min-h-screen bg-app-bg text-app-text flex items-stretch overflow-hidden relative transition-colors duration-500 font-sans"
    >
      {/* Cyber ambient background lighting */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-coral/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-app-pink/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container: fixed flex-row where panels slide smoothly past each other using hardware-accelerated translations! */}
      <div className="w-full flex flex-col md:flex-row relative min-h-screen overflow-hidden">
        
        {/* Central split separator line - always static in the center to segment the sliding panels beautifully */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-app-border z-20 pointer-events-none" />

        {/* ================= BACKGROUND / DECORATIVE SHOWCASE COLUMN ================= */}
        <motion.div
          animate={{ x: isDesktop ? (isLogin ? "0%" : "100%") : "0%" }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 18,
            mass: 0.95
          }}
          className="hidden md:flex w-full md:w-1/2 flex-col justify-between p-12 bg-app-panel relative overflow-hidden"
        >
          {/* Decorative backdrop grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          {/* Flying glowing particle node streams */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-[180px] h-[180px] rounded-full bg-coral/10 blur-[80px] top-1/4 left-1/3 animate-pulse" />
            <div className="absolute w-[200px] h-[200px] rounded-full bg-app-pink/10 blur-[90px] bottom-1/4 right-1/3 animate-bounce duration-[10000ms]" />
          </div>

          {/* Top Bar inside showcase */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-coral to-rose-quartz rounded-lg shadow-lg shadow-coral/10">
              <BrainCircuit className="w-5 h-5 text-app-text-on-accent animate-pulse" />
            </div>
            <span className="font-condensed text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-coral via-rose-quartz to-coral">
              CHAOSMIND <span className="text-app-text font-condensed text-sm ml-0.5">AI</span>
            </span>
          </div>

          {/* Middle Visualization area: contains the amazing responsive developer/operator illustration */}
          <div className="relative z-10 my-auto py-4 flex flex-col items-center">
            {/* The cartoon developer with realistic wheels rolling chair sliding back-and-forth based on state */}
            <DeveloperIllustration isLight={false} isLogin={isLogin} isFacingLeft={!isLogin} />

            <div className="w-full max-w-sm mt-4">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login-showcase-text"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-coral/10 border border-coral/30 rounded-full text-[10px] font-mono tracking-widest text-coral uppercase mx-auto md:mx-0">
                      <Activity className="w-3 h-3 text-coral animate-pulse" /> AUTOMATIC COMPUTER PROTECTION ACTIVE
                    </span>
                    <h3 className="text-2xl font-sans font-extrabold tracking-tight leading-tight text-center md:text-left">
                      Access Smart Failure <span className="text-coral">Prediction Deck</span>
                    </h3>
                    <p className="text-xs text-app-subtext leading-relaxed text-center md:text-left">
                      See live health tracker, check computer heating, and fix slowdowns with our helpful AI assistant.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register-showcase-text"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-app-pink/10 border border-app-pink/30 rounded-full text-[10px] font-mono tracking-widest text-app-pink uppercase mx-auto md:mx-0">
                      <Layers className="w-3 h-3 text-app-pink animate-spin" style={{ animationDuration: '4s' }} /> SMART AI PLATFORM READY
                    </span>
                    <h3 className="text-2xl font-sans font-extrabold tracking-tight leading-tight text-center md:text-left">
                      Bring Your Own Key, Get <span className="text-app-pink">Unlimited AI Help</span>
                    </h3>
                    <p className="text-xs text-app-subtext leading-relaxed text-center md:text-left">
                      Unlock unlimited smart guides and live troubleshooting advice by adding your own friendly AI API key easily.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Bar inside showcase */}
          <div className="relative z-10 border-t border-app-border/30 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-[10px] font-mono tracking-wide text-app-subtext flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-coral" /> STATUS: SYSTEM SECURE AND ACTIVE
            </span>
            <span className="text-[10px] font-mono tracking-wide text-app-subtext">
              BUILD: v1.0.4-STABLE
            </span>
          </div>

        </motion.div>

        {/* ================= ACTIVE INTERACTIVE FORM PANEL COLUMN ================= */}
        <motion.div
          animate={{ x: isDesktop ? (isLogin ? "0%" : "-100%") : "0%" }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 18,
            mass: 0.95
          }}
          className="flex w-full md:w-1/2 flex-col justify-between p-6 sm:p-12 relative overflow-y-auto"
        >
          
          {/* Header row containing Back to Landing button */}
          <div className="flex justify-between items-center mb-6">
            <button
              id={isLogin ? "login-back-btn" : "reg-back-btn"}
              onClick={() => onNavigate(PageType.LANDING)}
              className="group flex items-center gap-2 text-xs font-mono tracking-wider text-app-subtext hover:text-coral transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              BACK TO LANDING
            </button>

            {/* Mobile-only theme text identifier */}
            <span className="md:hidden text-xs font-condensed text-coral tracking-wider uppercase flex items-center gap-1">
              <BrainCircuit className="w-3.5 h-3.5 animate-pulse" /> CHAOSMIND AI
            </span>
          </div>

          {/* Inner content wrapper with a quick fade-in transit */}
          <div className="my-auto max-w-md w-full mx-auto space-y-6 relative z-10 py-4">
            
            {/* Form Switching Header */}
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl font-sans font-extrabold tracking-tight text-app-text">
                {isLogin ? "Sign In to Your Dashboard" : "Create Your Account"}
              </h2>
              <p className="text-sm text-app-subtext">
                {isLogin ? (
                  <>
                    Or{" "}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="font-semibold text-coral hover:underline transition-colors cursor-pointer inline-flex items-center gap-0.5"
                    >
                      create a new account <ChevronRight className="w-3.5 h-3.5 inline" />
                    </button>
                  </>
                ) : (
                  <>
                    Or{" "}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="font-semibold text-coral hover:underline transition-colors cursor-pointer inline-flex items-center gap-0.5"
                    >
                      sign in to your account <ChevronRight className="w-3.5 h-3.5 inline" />
                    </button>
                  </>
                )}
              </p>
            </div>

            {/* ERROR AND INFORMATION banners with animators */}
            <AnimatePresence mode="wait">
              {isLogin && loginError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-red-200 text-xs font-mono overflow-hidden"
                >
                  {loginError}
                </motion.div>
              )}

              {isLogin && loginInfo && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-app-badge border border-coral/30 rounded-lg text-coral text-xs font-mono overflow-hidden"
                >
                  {loginInfo}
                </motion.div>
              )}

              {!isLogin && regError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-950/40 border border-red-500/30 rounded-lg text-red-200 text-sm font-mono flex items-center gap-2 overflow-hidden"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  {regError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Sliding Content Area for Forms */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  /* ================= LOGIN FORM COMPONENT ================= */
                  <motion.form
                    key="login-form-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleLoginSubmit}
                    className="bg-app-card border border-app-border p-5 sm:p-8 rounded-2xl space-y-5 shadow-2xl transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono text-app-subtext uppercase tracking-wider">Your Username or Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtext" />
                          <input
                            id="login-email"
                            type="email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="operator@chaosmind.net"
                            className="w-full bg-app-bg border border-app-input-border text-app-text focus:border-coral/50 rounded-lg py-2.5 pl-10 pr-4 text-sm placeholder-app-subtext/40 focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-mono text-app-subtext uppercase tracking-wider">Your Password</label>
                          <button
                            type="button"
                            onClick={handleForgotPass}
                            className="text-xs text-coral hover:underline font-mono transition-colors cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtext" />
                          <input
                            id="login-password"
                            type={showLoginPass ? "text" : "password"}
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-app-bg border border-app-input-border text-app-text focus:border-coral/50 rounded-lg py-2.5 pl-10 pr-10 text-sm placeholder-app-subtext/40 focus:outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowLoginPass(!showLoginPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-app-subtext hover:text-coral"
                          >
                            {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center font-mono">
                      <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-app-subtext">
                        <input
                          id="login-remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                          className="rounded border-coral/20 bg-app-bg text-coral focus:ring-0 focus:ring-offset-0"
                        />
                        Remember My Account
                      </label>
                    </div>

                    <button
                      id="login-submit-btn"
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-coral to-rose-quartz text-app-text-on-accent font-medium rounded-lg shadow-lg shadow-coral/10 hover:opacity-90 transition-all text-sm tracking-widest uppercase cursor-pointer"
                    >
                      Sign In Securely
                    </button>

                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-app-border"></div>
                      <span className="flex-shrink mx-4 text-[10px] text-app-subtext uppercase font-mono tracking-widest">Or test immediately</span>
                      <div className="flex-grow border-t border-app-border"></div>
                    </div>

                    <button
                      id="login-demo-bypass-btn"
                      type="button"
                      onClick={handleDemoBypass}
                      className="w-full py-2.5 bg-app-bg hover:bg-app-card hover:border-coral/40 border border-app-border text-coral hover:text-coral/80 font-mono text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-coral" /> Test Instantly (Quick Demo)
                    </button>
                  </motion.form>
                ) : isVerifyingOtp ? (
                  /* ================= OTP VERIFICATION FORM ================= */
                  <motion.form
                    key="otp-verification-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleOtpSubmit}
                    className="bg-app-card border border-coral/30 p-5 sm:p-8 rounded-2xl space-y-6 shadow-2xl transition-all duration-300 font-mono text-xs"
                  >
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 mx-auto bg-coral/10 border border-coral rounded-full flex items-center justify-center animate-pulse">
                        <KeySquare className="w-5 h-5 text-coral" />
                      </div>
                      <h3 className="text-base font-bold font-mono text-white tracking-wide uppercase">
                        Email OTP Verification
                      </h3>
                      <p className="text-[11px] text-app-subtext leading-relaxed">
                        A secure OTP validation code has been sent to your simulated address <span className="text-white font-semibold">{regEmail}</span>. Enter code below to verify your account.
                      </p>
                    </div>

                    {otpError && (
                      <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-red-200 text-[11px] font-mono text-center">
                        {otpError}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="block text-center text-[10px] font-mono text-app-subtext uppercase tracking-wider">
                        6-Digit Security Token
                      </label>
                      <input
                        id="otp-input-field"
                        type="text"
                        maxLength={6}
                        required
                        value={userEnteredOtp}
                        onChange={(e) => {
                          setUserEnteredOtp(e.target.value.replace(/\D/g, ""));
                          setOtpError("");
                        }}
                        placeholder="••••••"
                        className="w-full text-center tracking-[0.5em] font-mono font-extrabold text-lg bg-app-bg border border-app-input-border text-coral focus:border-coral rounded-lg py-2.5 focus:outline-none transition-all placeholder-app-subtext/30"
                      />
                    </div>

                    <div className="space-y-3">
                      <button
                        id="otp-verify-btn"
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-coral to-rose-quartz text-app-text-on-accent font-sans font-medium rounded-lg shadow-xl shadow-coral/15 hover:opacity-[0.98] transition-all text-xs tracking-wider uppercase cursor-pointer"
                      >
                        Verify & Complete Register
                      </button>

                      <div className="flex gap-2 justify-between text-[10px] font-mono pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            const newCodec = Math.floor(100000 + Math.random() * 900000).toString();
                            setGeneratedOtp(newCodec);
                            alert(`[CHAOSMIND OTP PROTOCOL] New Simulated Key: ${newCodec}`);
                          }}
                          className="text-app-pink hover:underline cursor-pointer"
                        >
                          Resend Code
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsVerifyingOtp(false)}
                          className="text-app-subtext hover:text-white transition-colors cursor-pointer"
                        >
                          Back to Form
                        </button>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  /* ================= REGISTER FORM COMPONENT ================= */
                  <motion.form
                    key="register-form-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleRegisterSubmit}
                    className="bg-app-card border border-app-border p-5 sm:p-8 rounded-2xl space-y-5 shadow-2xl transition-all duration-300"
                  >
                    {/* PLAN SELECTOR HUD */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-app-subtext uppercase tracking-wider">Selected Plan *</label>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-app-bg border border-app-border rounded-xl">
                        <button
                          id="register-select-free"
                          type="button"
                          onClick={() => onChangePresetPlan?.("free")}
                          className={`py-2 px-3 text-xs font-mono font-bold tracking-wider rounded-lg transition-all flex flex-col items-center justify-center cursor-pointer ${
                            presetPlan === "free"
                              ? "bg-coral text-app-text-on-accent shadow-md shadow-coral/10"
                              : "text-[#6b7280] hover:text-app-text"
                          }`}
                        >
                          <span>FREE SANDBOX</span>
                          <span className="text-[9px] opacity-75 font-normal">$0 / Free Forever</span>
                        </button>
                        <button
                          id="register-select-byok"
                          type="button"
                          onClick={() => onChangePresetPlan?.("byok")}
                          className={`py-2 px-3 text-xs font-mono font-bold tracking-wider rounded-lg transition-all flex flex-col items-center justify-center cursor-pointer ${
                            presetPlan === "byok"
                              ? "bg-app-pink text-white shadow-md shadow-purple-500/10"
                              : "text-[#6b7280] hover:text-app-text"
                          }`}
                        >
                          <span>SMART AI PRO</span>
                          <span className="text-[9px] opacity-75 font-normal">BYOK MODE</span>
                        </button>
                      </div>
                    </div>

                    {/* PROFILE SETTINGS */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-mono tracking-widest text-app-subtext uppercase border-b border-app-border pb-1.5">
                        Step 1: Your Profile Details
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-mono text-app-subtext uppercase">Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtext" />
                            <input
                              id="reg-fullname"
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full bg-app-bg border border-app-input-border text-app-text focus:border-coral/50 rounded-lg py-2.5 pl-10 pr-4 text-sm placeholder-app-subtext/40 focus:outline-none transition-all font-sans"
                            />
                          </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-mono text-app-subtext uppercase">Username *</label>
                          <div className="relative">
                            <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtext" />
                            <input
                              id="reg-username"
                              type="text"
                              required
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="johndoe_node"
                              className="w-full bg-app-bg border border-app-input-border text-app-text focus:border-coral/50 rounded-lg py-2.5 pl-10 pr-4 text-sm placeholder-app-subtext/40 focus:outline-none transition-all font-sans"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono text-app-subtext uppercase">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtext" />
                          <input
                            id="reg-email"
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="name@chaosmind.com"
                            className="w-full bg-app-bg border border-app-input-border text-app-text focus:border-coral/50 rounded-lg py-2.5 pl-10 pr-4 text-sm placeholder-app-subtext/40 focus:outline-none transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Passwords */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Password */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-mono text-app-subtext uppercase">Password *</label>
                          <div className="relative">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtext" />
                            <input
                              id="reg-password"
                              type={showRegPass ? "text" : "password"}
                              required
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full bg-app-bg border border-app-input-border text-app-text focus:border-coral/50 rounded-lg py-2.5 pl-10 pr-10 text-sm placeholder-app-subtext/40 focus:outline-none transition-all font-sans"
                            />
                            <button
                              type="button"
                              onClick={() => setShowRegPass(!showRegPass)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-app-subtext hover:text-coral transition-colors"
                            >
                              {showRegPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-mono text-app-subtext uppercase">Confirm *</label>
                          <div className="relative">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtext" />
                            <input
                              id="reg-confirmpassword"
                              type={showRegPass ? "text" : "password"}
                              required
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full bg-app-bg border border-app-input-border text-app-text focus:border-coral/50 rounded-lg py-2.5 pl-10 pr-10 text-sm placeholder-app-subtext/40 focus:outline-none transition-all font-sans"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OPTIONAL AI SETTINGS */}
                    {presetPlan === "free" ? (
                      <div className="p-4 bg-coral/5 border border-coral/15 rounded-xl space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-coral flex items-center gap-1.5 animate-pulse">
                          ⚠️ AI features disabled on Free Sandbox
                        </span>
                        <p className="text-[11px] font-sans text-app-subtext leading-relaxed">
                          The Free Sandbox plan allows viewing metrics and reports offline, but does not allow accessing AI diagnostics, telemetry analyzer tools, or chat assistants.
                        </p>
                        <p className="text-[11px] font-sans text-app-subtext mt-1">
                          Want unlimited smart guides? Select <span className="text-app-pink font-semibold hover:underline cursor-pointer" onClick={() => onChangePresetPlan?.("byok")}>Smart AI Pro (BYOK)</span> above.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center border-b border-app-border pb-1.5">
                          <h3 className="text-xs font-mono tracking-widest text-app-subtext uppercase flex items-center gap-1">
                            Step 2: Connect AI Provider Key <span className="text-[9px] text-app-pink font-light tracking-wide">(Optional)</span>
                          </h3>
                          <div className="group relative">
                            <HelpCircle className="w-3.5 h-3.5 text-app-subtext cursor-help" />
                            <div className="pointer-events-none absolute right-0 bottom-full mb-2 w-52 p-2 bg-app-panel text-[10px] text-app-subtext rounded-md border border-app-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                              Used to get deep AI advice and chat with the helper. If left blank, default model handles basic suggestions for you.
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {/* Provider Selection */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-mono text-app-subtext uppercase">Provider</label>
                            <select
                              id="reg-ai-provider"
                              value={provider}
                              onChange={(e) => setProvider(e.target.value as any)}
                              className="w-full bg-app-bg border border-app-input-border text-app-text rounded-lg py-2.5 px-3 text-sm font-sans focus:outline-none focus:border-coral/50 transition-colors"
                            >
                              <option value="gemini" className="text-black bg-white dark:text-white dark:bg-app-card">Gemini AI (Recommended)</option>
                              <option value="openai" className="text-black bg-white dark:text-white dark:bg-app-card">OpenAI GPT</option>
                              <option value="groq" className="text-black bg-white dark:text-white dark:bg-app-card">Groq AI</option>
                              <option value="openrouter" className="text-black bg-white dark:text-white dark:bg-app-card">OpenRouter AI</option>
                            </select>
                          </div>

                          {/* API Key */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-mono text-app-subtext uppercase">Provider API Key</label>
                            <div className="relative">
                              <KeySquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtext" />
                              <input
                                id="reg-ai-apikey"
                                type={showRegKey ? "text" : "password"}
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="BYOK Key (Optional)"
                                className="w-full bg-app-bg border border-app-input-border text-app-text focus:border-coral/50 rounded-lg py-2.5 pl-10 pr-10 text-sm placeholder-app-subtext/40 focus:outline-none transition-all font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setShowRegKey(!showRegKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-app-subtext hover:text-coral transition-colors"
                              >
                                {showRegKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      id="reg-submit-btn"
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-coral to-rose-quartz text-app-text-on-accent font-sans font-medium rounded-lg shadow-xl shadow-coral/15 hover:opacity-95 transition-all text-sm tracking-wider uppercase cursor-pointer"
                    >
                      Create Account
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Footer inside Form panel */}
          <div className="text-center text-[10px] text-app-subtext font-mono tracking-wide mt-6">
            ChaosMind AI Secure Protocol &bull; Connected Smoothly
          </div>

        </motion.div>

      </div>
    </div>
  );
}
