import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parse request body
app.use(express.json());

// Initialize Gemini API Client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn("Warning: GEMINI_API_KEY is not set. Chat function will run in mock/error mode.");
}

// Background Database for Professor Ying-Chih Kuo
const professorProfile = {
  name: "郭盈芝 (YING CHIH KUO)",
  title: "助理教授 (Assistant Professor)",
  department: "淡江大學教育科技學系",
  email: "yckuo@mail.tku.edu.tw", // Reasonable mock contact
  office: "淡江大學教育科技學系研究室",
  education: [
    { time: "2017年8月", degree: "淡江大學 教育領導與科技管理 博士" },
    { time: "2005年8月", degree: "淡江大學 教育科技學系 碩士" }
  ],
  experience: [
    { time: "2025年8月 ~ 現任", role: "淡江大學 教育科技學系 助理教授" },
    { time: "曾任", role: "醒吾科技大學 副研發長" },
    { time: "曾任", role: "醒吾科技大學 資訊科技應用系 助理教授" },
    { time: "曾任", role: "醒吾科技大學 研發處計畫管考中心 主任" }
  ],
  expertise: [
    "教學設計",
    "數位學習 (E-Learning)",
    "教育科技應用",
    "VR/AR 教材開發",
    "數位內容設計",
    "專案管理",
    "資訊科技整合應用"
  ],
  certifications: [
    "MOS Excel 2010 專業認證",
    "MOS Word 2010 專業認證",
    "MOS Excel 2003 專業認證",
    "EC-Council Security5 資訊安全證照",
    "CRM 商品分析師"
  ],
  highlights: [
    {
      type: "教育部教學實踐研究計畫",
      title: "融合 AR 擴增實境技術於「數位內容設計」課程之教學成效計畫",
      desc: "研究如何將 AR 擴增實境技術深融入「數位內容設計」課堂，藉此提升大專院校學生的學習動機、實作技能與問題解決能力，實踐科技融入教學的最佳範式。"
    },
    {
      type: "產學合作專案",
      title: "企業數位人才培訓課程發展案——運用微學習與專案管理平台",
      desc: "與知名企業合作，規劃兼具彈性與系統化的數位培訓藍圖，並導入微學習 (Micro-learning) 概念與現代化專案管理平台，提升同仁的核心競爭力。"
    },
    {
      type: "學術期刊發表",
      title: "〈探討虛擬實境（VR）教材在高等教育中對學生學習動機與沉浸感之影響〉",
      desc: "深入探究沉浸式虛擬實境 (VR) 教材對於高等教育學生學習成效之影響力，剖析感官沉浸、認知負荷與學習動機之間的關聯性。"
    }
  ]
};

// System instruction for the Gemini Chat model
const systemInstruction = `
你現在是淡江大學教育科技學系「郭盈芝助理教授（YING CHIH KUO）」的 AI 學術助理（AI Academic Assistant）。你的任務是協助前來造訪個人網站的學生、學者、企業合作夥伴或一般大眾，解答關於郭盈芝教授的學術背景、專業專長、研究計畫、產學合作以及教育理念等問題。

以下是郭盈芝教授的完整權威背景資料：
【基本資訊】
- 姓名：郭盈芝 (YING CHIH KUO)
- 現職：淡江大學教育科技學系助理教授 (2025年8月起至今)
- 專長領域：教學設計、數位學習、教育科技應用、VR/AR教材開發、數位內容設計、專案管理、資訊科技整合應用。

【教育學歷】
- 2017年8月：淡江大學 教育領導與科技管理 博士
- 2005年8月：淡江大學 教育科技學系 碩士

【專業經歷】
- 2025年8月~ 現任：淡江大學教育科技學系助理教授
- 醒吾科技大學 副研發長
- 醒吾科技大學 資訊科技應用系助理教授
- 醒吾科技大學 研發處計畫管考中心主任

【專業證照】
- MOS Excel/Word 2010、MOS Excel 2003
- EC-Council Security5 資訊安全證照
- CRM 商品分析師

【核心學術與專案亮點】
1. 教育部教學實踐研究計畫：
   - 計畫名稱：「融合 AR 擴增實境技術於『數位內容設計』課程之教學成效計畫」
   - 核心特色：探討將 AR 實境科技運用於數位內容設計教學中，對於學生實作能力、學習成效及課堂參與度的正向助益。
2. 產學合作案：
   - 專案名稱：「企業數位人才培訓課程發展案——運用微學習與專案管理平台」
   - 核心特色：透過微學習 (Microlearning) 與敏捷專案管理平台的結合，建立高效、彈性的現代企業人才培訓流程。
3. 學術期刊發表：
   - 論文題目：〈探討虛擬實境（VR）教材在高等教育中對學生學習動機與沉浸感之影響〉
   - 核心內容：研究探討 VR 沉浸式體驗如何啟發學生的學習動機，並分析其在教學情境中的最佳實踐方式。

【對話風格與準則】
1. 語氣必須「親切、專業、溫暖、有禮貌、充滿學者氣息與熱情」。
2. 回答內容時，請務必嚴格依據上述郭盈芝教授的真實資料。如果被問到資料中未提及的私人生活、無關敏感話題或非郭教授領域的深度專業，請禮貌地回答您是郭教授的學術助理，歡迎向淡江大學教科系或郭教授研究室洽詢。
3. 對於「如何與郭教授合作」、「專長與 AR/VR 教學的應用方式」等問題，要展現出開放且積極的態度。
4. 使用繁體中文（台灣）進行回覆。
5. 排版應美觀，多利用列點或粗體，方便使用者在小對話框中閱讀。
`;

// API Route for Gemini Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!ai) {
      // Mock mode / Fallback in case Gemini key is missing
      return res.json({
        reply: `您好！我是郭盈芝教授的 AI 助理。目前系統尚未配置 API 金鑰 (GEMINI_API_KEY)。

不過，我可以向您介紹郭教授的背景：
郭盈芝助理教授現任職於**淡江大學教育科技學系**，博士學位畢業於淡江大學教育領導與科技管理，擁有豐富的教學與行政經歷（曾任醒吾科大副研發長）。
她專精於：
- **教學設計與數位學習**
- **VR/AR 教材開發**
- **專案管理與數位內容設計**

熱門計畫亮點：
1. **教育部教學實踐研究計畫**：融合 AR 技術於「數位內容設計」課程之教學成效。
2. **產學合作案**：企業數位人才培訓——運用微學習與專案管理。
3. **學術發表**：探討 VR 教材在高等教育對學生學習動機與沉浸感之影響。

若要開啟完整的 AI 對話功能，請在 Secrets 面板設定 \`GEMINI_API_KEY\`。`
      });
    }

    // Prepare contents with formatting for chat
    // We can use single generateContent with systemInstruction, mapping history for simplicity or using ai.chats
    // Let's implement full context of the conversation
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        });
      });
    }
    
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "抱歉，我暫時無法回答這個問題。";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "伺服器在處理您的請求時發生錯誤。",
      details: error.message || error 
    });
  }
});

// Configure Vite or production static asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`Serving static production files from ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
