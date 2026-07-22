export enum PageType {
  LANDING = "landing",
  REGISTER = "register",
  LOGIN = "login",
  ONBOARDING = "ononboarding",
  CONNECT_DEVICE = "connect_device",
  DASHBOARD = "dashboard",
  MONITORING = "monitoring",
  PREDICTIONS = "predictions",
  AI_INSIGHTS = "ai_insights",
  SIMULATION = "simulation",
  REPORTS = "reports",
  SETTINGS = "settings",
}

export interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  avatarUrl?: string;
  plan?: "free" | "byok";
}

export interface AISettings {
  provider: "gemini" | "openai" | "groq" | "openrouter";
  apiKey: string;
}

export interface SystemMetrics {
  cpu: number;
  ram: number;
  disk: number;
  network: number; // in Mbps
  riskScore: number; // 0-100%
  status: "Healthy" | "Analyzing" | "Unstable" | "Critical";
  cpuHistory: number[];
  ramHistory: number[];
  diskHistory: number[];
  networkHistory: number[];
}

export interface ActiveSimulation {
  id: string;
  name: string;
  impactCpu: number;
  impactRam: number;
  impactRisk: number;
  status: "idle" | "running" | "stabilized";
  description: string;
}

export interface AlertLog {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  message: string;
  resolved: boolean;
}

export interface ProcessItem {
  pid: number;
  name: string;
  cpu: number;
  ram: number;
  status: "running" | "sleeping" | "idle" | "suspended";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
