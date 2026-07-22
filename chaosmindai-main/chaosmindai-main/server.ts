import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to initialize GoogleGenAI safely
function getGeminiClient(customApiKey?: string) {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // If no key is set, we throw a descriptive message or handle gracefully
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      }
    }
  });
}

// REST route for failure intelligence insights
app.post("/api/ai-insights", async (req, res) => {
  try {
    const { metrics, activeSimulations, alerts, customApiKey, provider } = req.body;

    // Default system details if not provided
    const cpu = metrics?.cpu ?? 72;
    const memory = metrics?.ram ?? 64;
    const disk = metrics?.disk ?? 51;
    const network = metrics?.network ?? 120;
    const activeSim = activeSimulations && activeSimulations.length > 0 ? activeSimulations.join(", ") : "None";
    const riskScore = metrics?.riskScore ?? 18;

    const keyToUse = customApiKey || process.env.GEMINI_API_KEY;
    const aiClient = getGeminiClient(keyToUse);

    if (!aiClient) {
      // Return beautiful mock responses with a flag if no API key is set, so the app still functions perfectly for testing!
      return res.json({
        success: true,
        isMocked: true,
        analysis: "#### ⚠️ Local Server AI Key Missing\nEnter your API key in **Settings > AI Settings** or configure `GEMINI_API_KEY` on the server to activate real live smart suggestions.\n\n*Below is an offline simulated report:* \n\nOur system shows current CPU load at **" + cpu + "%** with high load. Memory occupies **" + memory + "%** of your system. This might slow down your computer slightly.",
        recommendations: [
          "Check Settings to enter your AI API Key to get real-time helpful advice.",
          "Close background tasks if Cpu continues spiking above 80%.",
          "Inspect active memory footprint of chrome.exe and terminate redundant threads."
        ]
      });
    }

    const prompt = `You are ChaosMind AI - a friendly, easy-to-understand system dashboard helper.
Analyze these system metrics and provide explanation/tips using simple, user-friendly language (like normal Indian English, with simple, direct wording without high-level technical jargon):
- CPU Usage: ${cpu}%
- RAM Usage: ${memory}%
- Disk Storage: ${disk}%
- Network Activity: ${network} Mbps
- Computed Risk Score: ${riskScore}%
- Active Alerts: ${JSON.stringify(alerts || [])}
- Active Failure Simulations: ${activeSim}

Provide your analysis in two sections:
1. "analysis": A simple, clear markdown explanation of the computer's health, what is heating or using too much memory, and how to improve it.
2. "recommendations": An array of 3-4 simple, actionable tips to make the computer run faster or fix warnings.

Your output must be in JSON format matching this schema:
{
  "analysis": "string in markdown format",
  "recommendations": ["string", "string", ...]
}`;

    const modelName = "gemini-3.5-flash";
    const response = await aiClient.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const textResult = response.text || "{}";
    try {
      const parsed = JSON.parse(textResult.trim());
      res.json({ success: true, isMocked: false, ...parsed });
    } catch (parseError) {
      res.json({
        success: true,
        isMocked: false,
        analysis: textResult,
        recommendations: ["Ensure your custom API provider has accurate configurations", "Monitor terminal output for syntax format issues"],
      });
    }
  } catch (error: any) {
    console.error("AI Insights Endpoint Error:", error);
    res.status(500).json({ success: false, error: error?.message || "Internal server error" });
  }
});

// AI Chat Route
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { messages, currentMetrics, customApiKey } = req.body;

    const keyToUse = customApiKey || process.env.GEMINI_API_KEY;
    const aiClient = getGeminiClient(keyToUse);

    if (!aiClient) {
      const lastMessage = messages[messages.length - 1]?.content || "";
      return res.json({
        success: true,
        isMocked: true,
        reply: `### ⚠️ AI Assistant Offline\nConfigure your API Key in **Settings** or declare **GEMINI_API_KEY** on the server to start chatting with the helper.\n\n*Offline Echo:* I received your message of *"${lastMessage}"*. Right now, based on your stats (CPU: ${currentMetrics?.cpu}%, Memory: ${currentMetrics?.ram}%), your computer is running safely inside normal limits.`
      });
    }

    // Construct dialogue path or use chat SDK
    const systemInstruction = `You are ChaosMind AI, a friendly, helpful system dashboard assistant.
Your goal is to explain computer performance, memory, and any slowdown issues in simple, easy-to-understand words. Avoid overly technical or scary jargon. Use a warm, professional, and humble tone, similar to Indian English user-friendly phrasing (e.g., "Kindly check your active tasks", "We recommend closing extra browsers to cool down the heating").
Current System Metrics:
- CPU: ${currentMetrics?.cpu}%
- Memory: ${currentMetrics?.ram}%
- Disk: ${currentMetrics?.disk}%
- Network: ${currentMetrics?.network} Mbps
- Computed Risk state: ${currentMetrics?.riskScore}%`;

    const chatMessages = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatMessages,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    res.json({
      success: true,
      isMocked: false,
      reply: response.text || "No response received from model core."
    });
  } catch (error: any) {
    console.error("AI Chat Endpoint Error:", error);
    res.status(500).json({ success: false, error: error?.message || "Internal core server error" });
  }
});

// Start integration with Vite or production dist serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ChaosMind AI Core] Running on http://localhost:${PORT}`);
  });
}

bootstrap();
