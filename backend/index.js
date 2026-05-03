import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import crypto from "crypto";
import { promisify } from "util";
import fetch from "node-fetch";
import googleTTS from "google-tts-api";
import tesseract from "tesseract.js";
import engOcrData from "@tesseract.js-data/eng";
import araOcrData from "@tesseract.js-data/ara";
import { PNG } from "pngjs";
import {
  resolveIconRecordingUrl,
  resolveSubIconRecordingUrl,
  resolveSubSubRecordingUrl,
} from "./prisma/subSubIconAudio.js";

const prisma = new PrismaClient();
const app = express();
const { createWorker, PSM } = tesseract;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendBuildPath = path.join(__dirname, "../frontend/build");
const frontendIndexPath = path.join(frontendBuildPath, "index.html");
const publicPath = path.join(__dirname, "public");
const uploadsPath = path.join(publicPath, "uploads");
const defaultImagePath = path.join(publicPath, "default.jpg");

fs.mkdirSync(uploadsPath, { recursive: true });

const loadBackendEnv = () => {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    process.env[key] = rawValue
      .trim()
      .replace(/^['"]|['"]$/g, "");
  }
};

loadBackendEnv();
const hasFrontendBuild = () => fs.existsSync(frontendIndexPath);
const isBrowserPageRequest = (req) =>
  req.method === "GET" && String(req.headers.accept || "").includes("text/html");
const sendFrontend = (req, res, next) => {
  if (!hasFrontendBuild()) return next();
  return res.sendFile(frontendIndexPath);
};
const frontendPageRoutes = [
  /^\/$/,
  /^\/main-categories\/?$/,
  /^\/maincategories\/[^/]+\/timeperiods\/?$/,
  /^\/timeperiods\/[^/]+\/icons\/?$/,
  /^\/icons\/[^/]+\/?$/,
  /^\/icons\/[^/]+\/subicons\/[^/]+\/?$/,
  /^\/icons\/[^/]+\/subicons\/[^/]+\/subsubicons\/?$/,
  /^\/icons\/[^/]+\/subicons\/[^/]+\/subsubicons\/[^/]+\/?$/,
  /^\/subicons\/[^/]+\/?$/,
  /^\/emergency\/?$/,
  /^\/training\/?$/,
  /^\/daily-routine\/?$/,
  /^\/express-drawing\/?$/,
  /^\/chat\/?$/,
  /^\/login\/?$/,
  /^\/signup\/?$/,
];

const isImageFilename = (filename) =>
  /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(filename);

const stripOneTimestampPrefix = (filename) =>
  filename.replace(/^\d+-/, "");

const stripTimestampPrefixes = (filename) =>
  filename.replace(/^(?:\d+-)+/, "");

const safeDecodePath = (value) => {
  try {
    return decodeURIComponent(value);
  } catch (err) {
    return value;
  }
};

const getFallbackUploadPath = (filename) => {
  if (!filename || filename !== path.basename(filename) || !fs.existsSync(uploadsPath)) {
    return "";
  }

  const onePrefixStripped = stripOneTimestampPrefix(filename);
  const allPrefixesStripped = stripTimestampPrefixes(filename);

  for (const candidateName of [onePrefixStripped, allPrefixesStripped]) {
    if (!candidateName || candidateName === filename) continue;

    const candidatePath = path.join(uploadsPath, candidateName);
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  const suffix = `-${allPrefixesStripped}`;
  const fallbackMatches = fs
    .readdirSync(uploadsPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(suffix))
    .map((entry) => {
      const candidatePath = path.join(uploadsPath, entry.name);
      return {
        path: candidatePath,
        mtimeMs: fs.statSync(candidatePath).mtimeMs,
      };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  return fallbackMatches[0]?.path || "";
};

// ===== إعداد Multer =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "public/uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

//app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://0.0.0.0:3000",
    "http://192.168.0.103:3000",
    "http://192.168.56.1:3000",
    "https://tts-eight-iota.vercel.app",
    "https://tts-production-77b9.up.railway.app",
  ], // المواقع المسموح لها
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true 
}));
app.use(express.json({ limit: "10mb" }));
app.use('/public', express.static(publicPath));
app.use("/public/uploads", (req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  const requestedFilename = path.basename(safeDecodePath(req.path || ""));
  const fallbackPath = getFallbackUploadPath(requestedFilename);

  if (fallbackPath) {
    return res.sendFile(fallbackPath);
  }

  if (isImageFilename(requestedFilename) && fs.existsSync(defaultImagePath)) {
    return res.sendFile(defaultImagePath);
  }

  return next();
});
app.use(express.static(frontendBuildPath, { index: false }));
app.use((req, res, next) => {
  if (isBrowserPageRequest(req) && frontendPageRoutes.some((route) => route.test(req.path))) {
    return sendFrontend(req, res, next);
  }

  return next();
});

app.get("/health", (req, res) => res.send("Backend is running!"));

const scryptAsync = promisify(crypto.scrypt);
const USER_CONDITIONS = new Set([
  "AUTISM",
  "STROKE",
  "ALZHEIMER",
  "SPEECH_DELAY",
  "OTHER",
]);

const ensureAuthTables = async () => {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" SERIAL NOT NULL,
      "firstName" TEXT NOT NULL,
      "lastName" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "salt" TEXT NOT NULL,
      "condition" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    )
  `;

  await prisma.$executeRaw`
    CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")
  `;
};

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));

const normalizeCondition = (condition) =>
  String(condition || "").trim().toUpperCase();

const hashPassword = async (password, salt = crypto.randomBytes(16).toString("hex")) => {
  const derivedKey = await scryptAsync(String(password), salt, 64);
  return {
    salt,
    passwordHash: derivedKey.toString("hex"),
  };
};

const verifyPassword = async (password, salt, storedHash) => {
  if (!salt || !storedHash) return false;

  const { passwordHash } = await hashPassword(password, salt);
  const storedBuffer = Buffer.from(String(storedHash), "hex");
  const candidateBuffer = Buffer.from(passwordHash, "hex");

  if (storedBuffer.length !== candidateBuffer.length) return false;

  return crypto.timingSafeEqual(storedBuffer, candidateBuffer);
};

const serializeUser = (user) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  condition: user.condition,
  createdAt: user.createdAt,
});

const readUserByEmail = async (email) => {
  const rows = await prisma.$queryRaw`
    SELECT "id", "firstName", "lastName", "email", "passwordHash", "salt", "condition", "createdAt"
    FROM "User"
    WHERE "email" = ${normalizeEmail(email)}
    LIMIT 1
  `;

  return rows[0] || null;
};

const isUniqueEmailError = (err) =>
  String(err?.code || err?.meta?.code || "").includes("P2002") ||
  String(err?.message || "").includes("User_email_key");

const signupUser = async (req, res) => {
  const firstName = String(req.body?.firstName || "").trim();
  const lastName = String(req.body?.lastName || "").trim();
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || "");
  const condition = normalizeCondition(req.body?.condition);

  if (!firstName || !lastName || !email || !password || !condition) {
    return res.status(400).json({ message: "Please fill all fields!" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  if (!USER_CONDITIONS.has(condition)) {
    return res.status(400).json({ message: "Please select a valid patient type" });
  }

  try {
    const existingUser = await readUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const { passwordHash, salt } = await hashPassword(password);
    const rows = await prisma.$queryRaw`
      INSERT INTO "User" ("firstName", "lastName", "email", "passwordHash", "salt", "condition")
      VALUES (${firstName}, ${lastName}, ${email}, ${passwordHash}, ${salt}, ${condition})
      RETURNING "id", "firstName", "lastName", "email", "condition", "createdAt"
    `;

    return res.status(201).json({ user: serializeUser(rows[0]) });
  } catch (err) {
    if (isUniqueEmailError(err)) {
      return res.status(409).json({ message: "Email already registered" });
    }

    return res.status(500).json({ message: err.message || "Signup failed" });
  }
};

const loginUser = async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || "");

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter email and password!" });
  }

  try {
    const user = await readUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatches = await verifyPassword(password, user.salt, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.json({ user: serializeUser(user) });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Login failed" });
  }
};

app.post(["/api/auth/signup", "/api/signup", "/signup"], signupUser);
app.post(["/api/auth/login", "/api/login", "/login"], loginUser);

const ELEVENLABS_VOICE_IDS = {
  male: process.env.ELEVENLABS_MALE_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb",
  female: process.env.ELEVENLABS_FEMALE_VOICE_ID || "hpp4J3VqNfWAUOO0d1Us",
};

const ELEVENLABS_VOICE_ALIASES = {
  ai: "female",
  "ai-record": "female",
  "ai-records": "female",
  "ai-male": "male",
  "ai-female": "female",
  ai_male: "male",
  ai_female: "female",
  "records-with-ai": "female",
};

const resolveElevenLabsVoiceId = (voice) => {
  const requestedVoice = String(voice || "").trim();
  const normalizedVoice = requestedVoice.toLowerCase();
  const aliasVoice = ELEVENLABS_VOICE_ALIASES[normalizedVoice] || normalizedVoice;

  if (ELEVENLABS_VOICE_IDS[aliasVoice]) {
    return ELEVENLABS_VOICE_IDS[aliasVoice];
  }

  if (Object.values(ELEVENLABS_VOICE_IDS).includes(requestedVoice)) {
    return requestedVoice;
  }

  return "";
};

const readApiError = async (response) => {
  const errorText = await response.text();

  try {
    return JSON.parse(errorText);
  } catch (err) {
    return errorText;
  }
};

const GOOGLE_TTS_LANGUAGE_ALIASES = {
  ar: "ar",
  "ar-eg": "ar",
  "ar-sa": "ar",
  arabic: "ar",
  male: "ar",
  female: "ar",
  ai: "ar",
  "ai-record": "ar",
  "ai-records": "ar",
  "ai-male": "ar",
  "ai-female": "ar",
  ai_male: "ar",
  ai_female: "ar",
  "records-with-ai": "ar",
  en: "en",
  "en-us": "en",
  english: "en",
  fr: "fr",
  "fr-fr": "fr",
  french: "fr",
  es: "es",
  "es-es": "es",
  spanish: "es",
};

const resolveGoogleTtsLanguage = (...values) => {
  for (const value of values) {
    const normalized = String(value || "").trim().toLowerCase();
    if (!normalized) continue;

    if (GOOGLE_TTS_LANGUAGE_ALIASES[normalized]) {
      return GOOGLE_TTS_LANGUAGE_ALIASES[normalized];
    }

    if (/^[a-z]{2}(-[a-z]{2})?$/.test(normalized)) {
      return normalized.split("-")[0];
    }
  }

  return "ar";
};

const getGoogleTtsAudioBuffer = async (text, lang) => {
  const options = {
    lang,
    slow: false,
    host: process.env.GOOGLE_TTS_HOST || "https://translate.google.com",
    timeout: 10000,
  };

  if (text.length <= 200) {
    const base64 = await googleTTS.getAudioBase64(text, options);
    return Buffer.from(base64, "base64");
  }

  const chunks = await googleTTS.getAllAudioBase64(text, {
    ...options,
    splitPunct: ",.!?\n",
  });

  return Buffer.concat(
    chunks.map((chunk) => Buffer.from(chunk.base64, "base64")),
  );
};

const cleanRecognizedDrawingText = (value) =>
  String(value || "")
    .replace(/^["'`]+|["'`]+$/g, "")
    .replace(/^(recognized text|text|phrase)\s*:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

const OCR_LANGUAGE_DATA = {
  ara: araOcrData,
  eng: engOcrData,
};

const resolveOcrLanguageData = (language) => {
  const normalized = String(language || "").trim().toLowerCase();
  return normalized.startsWith("ar") ? OCR_LANGUAGE_DATA.ara : OCR_LANGUAGE_DATA.eng;
};

const parseImageDataUrl = (imageDataUrl) => {
  const match = String(imageDataUrl || "").match(/^data:image\/([a-z0-9.+-]+);base64,(.+)$/i);

  if (!match) {
    throw new Error("Drawing image must be a base64 image data URL");
  }

  return {
    mimeType: `image/${match[1].toLowerCase()}`,
    buffer: Buffer.from(match[2], "base64"),
  };
};

const isInkPixel = (png, x, y, threshold = 245) => {
  const index = (y * png.width + x) * 4;
  const alpha = png.data[index + 3];
  if (alpha < 20) return false;

  const luminance = (
    png.data[index] * 0.299 +
    png.data[index + 1] * 0.587 +
    png.data[index + 2] * 0.114
  );

  return luminance < threshold;
};

const findInkBounds = (png) => {
  let minX = png.width;
  let minY = png.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < png.height; y += 1) {
    for (let x = 0; x < png.width; x += 1) {
      if (!isInkPixel(png, x, y)) continue;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < minX || maxY < minY) {
    return null;
  }

  return { minX, minY, maxX, maxY };
};

const preprocessPngForOcr = (imageBuffer) => {
  const source = PNG.sync.read(imageBuffer);
  const bounds = findInkBounds(source);

  if (!bounds) {
    return { buffer: imageBuffer, hasInk: false };
  }

  const cropPadding = 24;
  const left = Math.max(0, bounds.minX - cropPadding);
  const top = Math.max(0, bounds.minY - cropPadding);
  const right = Math.min(source.width - 1, bounds.maxX + cropPadding);
  const bottom = Math.min(source.height - 1, bounds.maxY + cropPadding);
  const cropWidth = right - left + 1;
  const cropHeight = bottom - top + 1;
  const scale = Math.max(2, Math.min(4, Math.floor(900 / Math.max(cropWidth, cropHeight))));
  const margin = 48;
  const output = new PNG({
    width: cropWidth * scale + margin * 2,
    height: cropHeight * scale + margin * 2,
  });

  for (let index = 0; index < output.data.length; index += 4) {
    output.data[index] = 255;
    output.data[index + 1] = 255;
    output.data[index + 2] = 255;
    output.data[index + 3] = 255;
  }

  for (let y = 0; y < cropHeight; y += 1) {
    for (let x = 0; x < cropWidth; x += 1) {
      const color = isInkPixel(source, left + x, top + y, 250) ? 0 : 255;

      for (let sy = 0; sy < scale; sy += 1) {
        for (let sx = 0; sx < scale; sx += 1) {
          const targetX = margin + x * scale + sx;
          const targetY = margin + y * scale + sy;
          const targetIndex = (targetY * output.width + targetX) * 4;
          output.data[targetIndex] = color;
          output.data[targetIndex + 1] = color;
          output.data[targetIndex + 2] = color;
          output.data[targetIndex + 3] = 255;
        }
      }
    }
  }

  return { buffer: PNG.sync.write(output), hasInk: true };
};

const ocrWorkers = new Map();
const ocrWorkerLocks = new Map();

const getOcrWorker = (languageData) => {
  if (!ocrWorkers.has(languageData.code)) {
    ocrWorkers.set(
      languageData.code,
      createWorker(languageData.code, 1, {
        langPath: languageData.langPath,
        gzip: languageData.gzip,
        cacheMethod: "none",
      }),
    );
  }

  return ocrWorkers.get(languageData.code);
};

const withOcrWorkerLock = (languageCode, task) => {
  const previousLock = ocrWorkerLocks.get(languageCode) || Promise.resolve();
  const nextLock = previousLock.then(task, task);
  ocrWorkerLocks.set(languageCode, nextLock.catch(() => {}));
  return nextLock;
};

const getOcrPasses = (languageCode) => {
  if (languageCode === "ara") {
    return [
      { mode: PSM.SINGLE_LINE },
      { mode: PSM.SPARSE_TEXT },
    ];
  }

  const latinWhitelist = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?'\"-";
  return [
    { mode: PSM.SINGLE_LINE, whitelist: latinWhitelist },
    { mode: PSM.SINGLE_WORD, whitelist: latinWhitelist },
    { mode: PSM.SINGLE_CHAR, whitelist: latinWhitelist },
    { mode: PSM.SPARSE_TEXT, whitelist: latinWhitelist },
  ];
};

const recognizeSketchText = async (imageBuffer, languageData) =>
  withOcrWorkerLock(languageData.code, async () => {
    const worker = await getOcrWorker(languageData);
    let bestResult = { text: "", confidence: 0 };

    for (const pass of getOcrPasses(languageData.code)) {
      const parameters = {
        tessedit_pageseg_mode: pass.mode,
        preserve_interword_spaces: "1",
      };

      if (pass.whitelist) {
        parameters.tessedit_char_whitelist = pass.whitelist;
      }

      await worker.setParameters(parameters);
      const result = await worker.recognize(imageBuffer);
      const text = cleanRecognizedDrawingText(result?.data?.text);
      const confidence = Number(result?.data?.confidence || 0);

      if (text && confidence >= bestResult.confidence) {
        bestResult = { text, confidence };
      }
    }

    return bestResult;
  });

app.post("/api/tts/speak", async (req, res) => {
  const text = String(req.body?.text || "").trim();
  const voiceId = resolveElevenLabsVoiceId(req.body?.voice);
  const apiKey = String(process.env.ELEVENLABS_API_KEY || "").trim();

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  if (!voiceId) {
    return res.status(400).json({
      message: "Voice must be male, female, or a configured ElevenLabs voice ID",
    });
  }

  if (!apiKey) {
    return res.status(500).json({ message: "ElevenLabs API key is not configured" });
  }

  try {
    const elevenLabsRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      },
    );

    if (!elevenLabsRes.ok) {
      const details = await readApiError(elevenLabsRes);
      const message = elevenLabsRes.status === 401
        ? "ElevenLabs API key is invalid or unauthorized. Update ELEVENLABS_API_KEY in backend/.env, then restart the backend."
        : "ElevenLabs TTS failed";

      return res.status(elevenLabsRes.status).json({
        message,
        details,
      });
    }

    const audioBuffer = Buffer.from(await elevenLabsRes.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    return res.send(audioBuffer);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post("/api/tts/gtts", async (req, res) => {
  const text = String(req.body?.text || "").trim();
  const lang = resolveGoogleTtsLanguage(req.body?.language, req.body?.voice);

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  try {
    const audioBuffer = await getGoogleTtsAudioBuffer(text, lang);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    return res.send(audioBuffer);
  } catch (err) {
    return res.status(502).json({
      message: "Google TTS failed",
      details: err.message,
    });
  }
});

const chatSystemPromptByLang = {
  en:
    "You are an AAC assistant for patients, caregivers, therapists, and teachers. Answer AAC-related questions in a warm, practical, and natural way, similar to a helpful chat assistant. Reply in the same language as the user whenever possible. You can explain AAC basics, core words, modeling, device refusal, behavior as communication, regulation, school support, family coaching, and daily communication needs. If the user asks what to say, give short ready-to-use phrases. If the input is unclear, ask for clarification and give examples of AAC questions. Do not diagnose medical conditions. For emergencies, tell them to seek urgent professional help.",
  ar:
    "أنت مساعد AAC للأشخاص الذين يستخدمون التواصل المعزز والبديل، وللأهل والمعالجين والمعلمين. أجب عن الأسئلة المتعلقة بـ AAC بأسلوب طبيعي وعملي وداعم، مثل مساعد ذكي مفيد. رد بنفس لغة المستخدم كلما أمكن. يمكنك شرح أساسيات AAC والكلمات الأساسية والنمذجة ورفض الجهاز والسلوك باعتباره تواصلا والتنظيم الحسي ودعم المدرسة ودعم الأهل والاحتياجات اليومية. إذا سأل المستخدم ماذا يقول، فأعطه جملا قصيرة جاهزة. إذا كان الكلام غير واضح، فاطلب توضيحا مع أمثلة لأسئلة AAC. لا تقدم تشخيصا طبيا. وفي الطوارئ اطلب المساعدة المهنية العاجلة.",
  fr:
    "You are an AAC assistant for patients, caregivers, therapists, and teachers. Answer AAC-related questions in a warm, practical way. Reply in the same language as the user whenever possible. Explain AAC basics, modeling, core words, device use, behavior as communication, school support, and family coaching. If input is unclear, ask for clarification with examples. Do not diagnose medical conditions.",
  es:
    "You are an AAC assistant for patients, caregivers, therapists, and teachers. Answer AAC-related questions in a warm, practical way. Reply in the same language as the user whenever possible. Explain AAC basics, modeling, core words, device use, behavior as communication, school support, and family coaching. If input is unclear, ask for clarification with examples. Do not diagnose medical conditions.",
};

const chatClarifyRepliesByLang = {
  en: [
    "I did not understand that yet. Try an AAC question like: How do I start AAC? My child refuses the device. What core words should I teach first?",
    "That message looks unclear. You can ask me things like: How can I help an AAC user ask for water? How do I model language on the device?",
    "I need a clearer message to help well. For example: My child is not using the AAC device. How do I teach yes and no? What should I say during meltdowns?",
  ],
  ar: [
    "لم أفهم الرسالة بعد. جرب سؤالا عن AAC مثل: كيف أبدأ AAC؟ ابني يرفض الجهاز. ما الكلمات الأساسية التي أبدأ بها؟",
    "الرسالة غير واضحة الآن. يمكنك أن تسألني مثلا: كيف أساعد مستخدم AAC يطلب ماء؟ كيف أعمل modeling على الجهاز؟",
    "أحتاج رسالة أوضح لكي أساعدك جيدا. مثلا: ابني لا يستخدم جهاز AAC. كيف أعلمه نعم ولا؟ ماذا أقول وقت الانهيار؟",
  ],
  fr: [
    "I did not understand that yet. Try an AAC question like: How do I start AAC? My child refuses the device. What core words should I teach first?",
    "That message looks unclear. You can ask me things like: How can I help an AAC user ask for water? How do I model language on the device?",
    "I need a clearer message to help well. For example: My child is not using the AAC device. How do I teach yes and no? What should I say during meltdowns?",
  ],
  es: [
    "I did not understand that yet. Try an AAC question like: How do I start AAC? My child refuses the device. What core words should I teach first?",
    "That message looks unclear. You can ask me things like: How can I help an AAC user ask for water? How do I model language on the device?",
    "I need a clearer message to help well. For example: My child is not using the AAC device. How do I teach yes and no? What should I say during meltdowns?",
  ],
};

const chatDefaultReplies = {
  en: [
    "AAC works best when it is used in real daily moments. Start with one useful word, model it many times, and accept any attempt to communicate.",
    "Try making the AAC device available all day, not only during practice. Model short messages and keep the pressure low.",
  ],
  ar: [
    "AAC ينجح أكثر عندما نستخدمه في المواقف اليومية الحقيقية. ابدأ بكلمة مفيدة واحدة، واعمل modeling لها كثيرا، واقبل أي محاولة للتواصل.",
    "حاول أن يكون جهاز AAC متاحا طول اليوم، وليس وقت التدريب فقط. استخدم جملا قصيرة وقلل الضغط على الطفل.",
  ],
  fr: [
    "AAC works best in daily routines. Start with one useful word, model it often, and accept any communication attempt.",
  ],
  es: [
    "AAC works best in daily routines. Start with one useful word, model it often, and accept any communication attempt.",
  ],
};

const chatKnowledgeBase = [
  {
    id: "start_aac",
    phrases: {
      en: ["start aac", "how do i start aac", "begin aac", "new to aac"],
      ar: ["ابدأ aac", "كيف ابدأ aac", "بداية aac", "ابدأ التواصل البديل"],
    },
    responses: {
      en: [
        "Start with the device available, charged, and close. Pick 3 to 5 useful words like more, stop, help, want, and finished. Model them during real moments without asking the child to repeat.",
      ],
      ar: [
        "ابدأ بأن يكون الجهاز موجودا ومشحونا وقريبا. اختار 3 إلى 5 كلمات مفيدة مثل: كمان، توقف، ساعدني، عايز، خلص. اعمل modeling أثناء المواقف الحقيقية من غير ما تطلب من الطفل يكرر.",
      ],
    },
  },
  {
    id: "device_refusal",
    phrases: {
      en: ["refuses device", "does not want device", "hates aac", "pushes device away"],
      ar: ["يرفض الجهاز", "مش عايز الجهاز", "يبعد الجهاز", "ابني يرفض الجهاز"],
    },
    responses: {
      en: [
        "Device refusal often means the device feels like work. Use it first for fun and power: jokes, favorite snacks, music, breaks, and saying no. Do not force touching it. You model, then pause.",
      ],
      ar: [
        "رفض الجهاز غالبا معناه أن الجهاز بقى مرتبط بالتدريب والضغط. استخدمه في حاجات ممتعة ومؤثرة: لعب، أكل مفضل، موسيقى، راحة، وكلمة لا. لا تجبره يلمسه. أنت اعمل modeling وبعدين استنى.",
      ],
    },
  },
  {
    id: "core_words",
    phrases: {
      en: ["core words", "first words", "what words should i teach", "teach first"],
      ar: ["الكلمات الأساسية", "ابدأ بأي كلمات", "ما الكلمات الأساسية", "اعلمه ايه الاول"],
    },
    responses: {
      en: [
        "Good first core words are: more, stop, go, help, want, no, yes, open, finished, and look. Teach them inside routines, not as flashcards.",
      ],
      ar: [
        "كلمات أساسية ممتازة للبداية: كمان، توقف، يلا، ساعدني، عايز، لا، نعم، افتح، خلص، بص. علمها داخل الروتين اليومي وليس ككروت تدريب فقط.",
      ],
    },
  },
  {
    id: "modeling",
    phrases: {
      en: ["modeling", "model language", "how do i model", "use the device myself"],
      ar: ["modeling", "اعمل موديلنج", "نمذجة", "ازاي استخدم الجهاز قدامه"],
    },
    responses: {
      en: [
        "Modeling means you use the AAC system while you talk. Say the sentence naturally, touch one or two key words on the device, then continue. The child does not have to copy you.",
      ],
      ar: [
        "الـ modeling يعني أنك تستخدم نظام AAC وأنت بتتكلم. قل الجملة طبيعي، واضغط كلمة أو كلمتين مهمين على الجهاز، ثم كمل. الطفل مش لازم يقلدك في نفس اللحظة.",
      ],
    },
  },
  {
    id: "behavior",
    phrases: {
      en: ["behavior", "meltdown", "screaming", "hitting", "communication behavior"],
      ar: ["سلوك", "انهيار", "صراخ", "يضرب", "السلوك تواصل"],
    },
    responses: {
      en: [
        "Treat behavior as communication first. Think: what is the person trying to get, avoid, ask, or express? Offer short AAC options like stop, break, help, no, hurt, or finished.",
      ],
      ar: [
        "تعامل مع السلوك كرسالة تواصل أولا. اسأل نفسك: هو يحاول يحصل على إيه أو يهرب من إيه أو يطلب إيه؟ قدم اختيارات قصيرة على AAC مثل: توقف، راحة، ساعدني، لا، وجع، خلص.",
      ],
    },
  },
  {
    id: "school",
    phrases: {
      en: ["school", "teacher", "classroom", "iep", "support in school"],
      ar: ["المدرسة", "المعلم", "الفصل", "دعم المدرسة", "المدرس"],
    },
    responses: {
      en: [
        "At school, AAC should be available across the day: greetings, choosing, asking for help, refusing, sharing answers, and social talk. Give staff 3 target words for the week.",
      ],
      ar: [
        "في المدرسة لازم AAC يكون متاحا طوال اليوم: التحية، الاختيار، طلب المساعدة، الرفض، المشاركة في الإجابة، والكلام الاجتماعي. أعط الفريق 3 كلمات مستهدفة للأسبوع.",
      ],
    },
  },
];

const sharedChatStopWords = new Set([
  "the",
  "and",
  "for",
  "that",
  "with",
  "this",
  "have",
  "need",
  "want",
  "please",
  "from",
  "your",
  "what",
  "when",
  "where",
  "how",
  "انا",
  "انت",
  "انتي",
  "هو",
  "هي",
  "هذا",
  "هذه",
  "على",
  "الى",
  "من",
  "في",
  "هل",
  "لو",
  "عايز",
  "اريد",
  "محتاج",
  "que",
  "qui",
  "pour",
  "avec",
  "une",
  "des",
  "los",
  "las",
  "por",
  "para",
  "con",
  "quiero",
  "necesito",
]);

const genericChatIntentIds = new Set(["greeting", "help", "communication", "goodbye"]);

const safeChatLanguage = (language) =>
  ["en", "ar", "fr", "es"].includes(language) ? language : "en";

const sanitizeChatHistory = (history = []) =>
  history
    .filter(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim(),
    )
    .slice(-10)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 1500),
    }));

const normalizeChatText = (text = "") =>
  text
    .toLowerCase()
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u0610-\u061a\u064b-\u065f\u06d6-\u06ed]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenizeChatText = (text = "") =>
  normalizeChatText(text)
    .split(" ")
    .filter((token) => token.length > 1 && !sharedChatStopWords.has(token));

const scoreChatPhrase = (phrase, normalizedMessage, messageTokens) => {
  const normalizedPhrase = normalizeChatText(phrase);
  if (!normalizedPhrase) return 0;

  let score = 0;
  if (normalizedMessage === normalizedPhrase) {
    score += 10;
  } else if (normalizedMessage.includes(normalizedPhrase)) {
    score += 6;
  }

  const phraseTokens = tokenizeChatText(normalizedPhrase);
  if (!phraseTokens.length) return score;

  let overlap = 0;
  for (const token of phraseTokens) {
    if (messageTokens.has(token)) {
      overlap += 1;
    }
  }

  if (overlap > 0) {
    score += overlap * 2;
    score += overlap === phraseTokens.length ? 3 : overlap / phraseTokens.length;
  }

  return score;
};

const selectChatReplyVariant = (responses, message) => {
  if (!responses?.length) return "";

  const normalizedMessage = normalizeChatText(message);
  const hash = [...normalizedMessage].reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  return responses[hash % responses.length];
};

const getChatKnowledgeMatch = (message, language) => {
  const lang = safeChatLanguage(language);
  const normalizedMessage = normalizeChatText(message);
  const messageTokens = new Set(tokenizeChatText(message));
  const rankedIntents = [];

  for (const intent of chatKnowledgeBase) {
    const phrases = [
      ...(intent.phrases?.[lang] || []),
      ...(lang === "en" ? [] : intent.phrases?.en || []),
      ...Object.entries(intent.phrases || {})
        .filter(([key]) => key !== lang && key !== "en")
        .flatMap(([, values]) => values),
    ];

    const rankedScores = phrases
      .map((phrase) => scoreChatPhrase(phrase, normalizedMessage, messageTokens))
      .filter(Boolean)
      .sort((a, b) => b - a)
      .slice(0, 3);

    let totalScore = rankedScores.reduce(
      (sum, current, index) => sum + current / (index + 1),
      0,
    );

    if (genericChatIntentIds.has(intent.id)) {
      totalScore -= 2.5;
    }

    rankedIntents.push({
      intent,
      score: totalScore,
    });
  }

  rankedIntents.sort((left, right) => right.score - left.score);
  const match = rankedIntents[0];

  if (!match || match.score < 4) {
    return null;
  }

  return match;
};

const matchLocalChatReply = (message, language) => {
  const lang = safeChatLanguage(language);
  const match = getChatKnowledgeMatch(message, lang);

  if (match?.intent) {
    const responses =
      match.intent.responses?.[lang] ||
      match.intent.responses?.en ||
      chatDefaultReplies[lang];

    return {
      reply: selectChatReplyVariant(responses, message),
      intentId: match.intent.id,
      score: match.score,
    };
  }

  return {
    reply: selectChatReplyVariant(
      chatDefaultReplies[lang] || chatDefaultReplies.en,
      message,
    ),
    intentId: "default",
    score: 0,
  };
};

const isLikelyUnclearChatInput = (message) => {
  const normalized = normalizeChatText(message);
  if (!normalized) return true;

  const compact = normalized.replace(/\s+/g, "");
  const tokens = normalized.split(" ").filter(Boolean);
  const hasArabicLetters = /[\u0600-\u06ff]/u.test(message);
  const hasWhitespace = /\s/u.test(message);

  if (hasArabicLetters) {
    return !hasWhitespace && /(.)\1{5,}/u.test(compact);
  }

  if (compact.length >= 6 && !hasWhitespace && tokens.length === 1) {
    const uniqueRatio = new Set(compact).size / compact.length;
    if (/(.)\1{4,}/.test(compact) || uniqueRatio < 0.25) {
      return true;
    }
  }

  if (!hasWhitespace && tokens.length === 1) {
    const [token] = tokens;
    if (token.length >= 6 && new Set(token).size <= 2) {
      return true;
    }

    if (/^[a-z]+$/i.test(token) && token.length >= 7 && !/[aeiou]/i.test(token)) {
      return true;
    }
  }

  return false;
};

const getChatClarifyReply = (language, message) =>
  selectChatReplyVariant(
    chatClarifyRepliesByLang[safeChatLanguage(language)] || chatClarifyRepliesByLang.en,
    message,
  );

const getChatbotConfig = () => {
  const providerName = String(process.env.CHATBOT_PROVIDER || "local").trim().toLowerCase();

  if (providerName !== "groq") {
    return { providerName: "local" };
  }

  return {
    providerName,
    apiUrl:
      String(process.env.GROQ_API_URL || "").trim() ||
      "https://api.groq.com/openai/v1/chat/completions",
    apiKey: String(process.env.GROQ_API_KEY || "").trim(),
    model:
      String(process.env.GROQ_MODEL || "").trim() ||
      "llama-3.3-70b-versatile",
  };
};

const callConfiguredChatProvider = async ({ message, language, history }) => {
  const config = getChatbotConfig();
  if (config.providerName !== "groq") {
    return null;
  }

  if (!config.apiKey || !config.model) {
    throw new Error("Groq chatbot config is missing");
  }

  const response = await fetch(config.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        {
          role: "system",
          content: chatSystemPromptByLang[safeChatLanguage(language)],
        },
        ...history,
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 500,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error?.message || payload?.message || "Chat API failed");
  }

  const reply =
    payload?.choices?.[0]?.message?.content?.trim() ||
    payload?.output_text?.trim() ||
    payload?.reply?.trim();

  if (!reply) {
    throw new Error("Chat API returned an empty reply");
  }

  return reply;
};

const chatWithBot = async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();
    const language = safeChatLanguage(req.body?.language);
    const history = sanitizeChatHistory(req.body?.history);
    const chatbotConfig = getChatbotConfig();
    const usingExternalProvider = chatbotConfig.providerName !== "local";

    if (!message) {
      return res.status(400).json({
        ok: false,
        message: "Message is required",
      });
    }

    const unclearInput = isLikelyUnclearChatInput(message);

    try {
      const providerReply = await callConfiguredChatProvider({
        message,
        language,
        history,
      });

      if (providerReply) {
        return res.json({
          ok: true,
          reply: providerReply,
          provider: chatbotConfig.providerName,
        });
      }
    } catch (providerError) {
      console.error("Configured chatbot provider failed:", providerError.message);

      if (usingExternalProvider) {
        return res.status(502).json({
          ok: false,
          message:
            language === "ar"
              ? "تعذر الوصول إلى Groq الآن. تأكد من الـ API key والاتصال ثم حاول مرة أخرى."
              : "Groq is unavailable right now. Check the API key and connection, then try again.",
          provider: chatbotConfig.providerName,
        });
      }
    }

    if (usingExternalProvider) {
      return res.status(502).json({
        ok: false,
        message:
          language === "ar"
            ? "لم يصل رد من Groq. تأكد من الإعدادات ثم حاول مرة أخرى."
            : "No reply was received from Groq. Check the configuration and try again.",
        provider: chatbotConfig.providerName,
      });
    }

    const localMatch = matchLocalChatReply(message, language);
    if (localMatch.intentId !== "default") {
      return res.json({
        ok: true,
        reply: localMatch.reply,
        provider: "local-dataset",
        intentId: localMatch.intentId,
      });
    }

    if (unclearInput) {
      return res.json({
        ok: true,
        reply: getChatClarifyReply(language, message),
        provider: "local-clarify",
        intentId: "clarify",
      });
    }

    return res.json({
      ok: true,
      reply: localMatch.reply,
      provider: "local-dataset",
      intentId: localMatch.intentId,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return res.status(500).json({
      ok: false,
      message: error.message || "Failed to generate chatbot reply",
    });
  }
};

app.post("/api/chat", chatWithBot);
app.post("/chat", chatWithBot);

app.post("/api/drawing/recognize", async (req, res) => {
  const imageDataUrl = String(req.body?.imageDataUrl || "").trim();
  const language = String(req.body?.language || "ar-EG").trim();

  if (!imageDataUrl.startsWith("data:image/")) {
    return res.status(400).json({ message: "Drawing image is required" });
  }

  try {
    const { mimeType, buffer } = parseImageDataUrl(imageDataUrl);

    if (mimeType !== "image/png") {
      return res.status(400).json({
        message: "Drawing OCR expects a PNG canvas image",
      });
    }

    const preparedImage = preprocessPngForOcr(buffer);
    if (!preparedImage.hasInk) {
      return res.json({ text: "", confidence: 0, engine: "tesseract" });
    }

    const languageData = resolveOcrLanguageData(language);
    const result = await recognizeSketchText(preparedImage.buffer, languageData);

    return res.json({
      text: result.text,
      confidence: result.confidence,
      engine: "tesseract",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Drawing recognition failed",
      details: err.message,
    });
  }
});

// ===== دالة لتحميل الملفات من رابط =====
async function downloadFile(url, folder = "public/uploads") {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to download " + url);
const buffer = Buffer.from(await res.arrayBuffer());
  const filename = Date.now() + "-" + path.basename(url);
  const filePath = path.join(__dirname, folder, filename);
  fs.writeFileSync(filePath, buffer);
    return `/public/uploads/${filename}`;

}

const subIconInclude = {
  subSubIcons: true,
};

const iconInclude = {
  subIcons: {
    include: subIconInclude,
  },
};

const serializeSubSubIcon = (subSubIcon, parentSubIcon = null) => ({
  ...subSubIcon,
  recordingUrl: resolveSubSubRecordingUrl({
    category: subSubIcon?.category ?? parentSubIcon?.category,
    parentTitle: parentSubIcon?.title,
    audioUrl: subSubIcon?.audioUrl ?? null,
    parentAudioUrl: parentSubIcon?.audioUrl ?? null,
  }),
});

const serializeSubIcon = (subIcon) => {
  const subSubIcons = Array.isArray(subIcon?.subSubIcons)
    ? subIcon.subSubIcons.map((subSubIcon) => serializeSubSubIcon(subSubIcon, subIcon))
    : [];

  return {
    ...subIcon,
    recordingUrl: resolveSubIconRecordingUrl({
      category: subIcon?.category,
      title: subIcon?.title,
      audioUrl: subIcon?.audioUrl ?? null,
      childRecordingUrls: subSubIcons.map((subSubIcon) => (
        subSubIcon?.recordingUrl || subSubIcon?.audioUrl
      )),
    }),
    subSubIcons,
  };
};

const serializeIcon = (icon) => {
  const subIcons = Array.isArray(icon?.subIcons)
    ? icon.subIcons.map(serializeSubIcon)
    : [];

  return {
    ...icon,
    recordingUrl: resolveIconRecordingUrl({
      category: icon?.category,
      audioUrl: icon?.audioUrl ?? null,
      childRecordingUrls: subIcons.map((subIcon) => (
        subIcon?.recordingUrl || subIcon?.audioUrl
      )),
    }),
    subIcons,
  };
};

// ===== ICON APIs =====
app.get("/icons", async (req, res) => {
  const { category } = req.query;
  try {
    const icons = category
      ? await prisma.icon.findMany({ where: { category: String(category) }, include: iconInclude })
      : await prisma.icon.findMany({ include: iconInclude });
    res.json(icons.map(serializeIcon));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/icons", async (req, res) => {
  const { title, expression, imageUrl, category } = req.body;
  try {
    const icon = await prisma.icon.create({ data: { title, expression, imageUrl, category } });
    res.status(201).json(icon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== SUBICON APIs =====
app.post("/icons/:iconId/subicons", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "audio", maxCount: 1 }
]), async (req, res) => {
  const iconId = parseInt(req.params.iconId);
  const {
    title,
    expression,
    imageUrl: imageUrlLink,
    audioUrl: audioUrlLink,
    recordingUrl: recordingUrlLink,
  } = req.body;

  try {
    const icon = await prisma.icon.findUnique({ where: { id: iconId } });
    if (!icon) return res.status(404).json({ message: "Icon not found" });

    // ===== التعامل مع الملفات المحلية (Multer) =====
    const imageFile = req.files?.image ? req.files.image[0] : null;
    const audioFile = req.files?.audio ? req.files.audio[0] : null;

    let imagePath = imageFile ? `/public/uploads/${imageFile.filename}` : "";
    let audioPath = audioFile ? `/public/uploads/${audioFile.filename}` : "";

    // ===== التعامل مع روابط من النت =====
    if (!imagePath && imageUrlLink) imagePath = await downloadFile(imageUrlLink);
    if (!audioPath && (audioUrlLink || recordingUrlLink)) {
      audioPath = await downloadFile(audioUrlLink || recordingUrlLink);
    }

    const subIcon = await prisma.subIcon.create({
      data: {
        title,
        expression,
        imageUrl: imagePath,
        audioUrl: audioPath,
        category: icon.category,
        iconId,
      },
      include: subIconInclude,
    });

    res.status(201).json(serializeSubIcon(subIcon));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// جلب كل الـ SubIcons أو حسب category
app.get("/subicons", async (req, res) => {
  const { category } = req.query;
  try {
    const subIcons = category
      ? await prisma.subIcon.findMany({ where: { category: String(category) }, include: subIconInclude })
      : await prisma.subIcon.findMany({ include: subIconInclude });
    res.json(subIcons.map(serializeSubIcon));
  } catch (err) {
      console.error("SUBICON ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// جلب SubIcons حسب iconId
app.get("/icons/:iconId/subicons", async (req, res) => {
  const iconId = parseInt(req.params.iconId);
  try {
    const subIcons = await prisma.subIcon.findMany({
      where: { iconId },
      include: subIconInclude,
    });
    res.json(subIcons.map(serializeSubIcon));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// باقي APIs كما هي
app.get("/maincategories", async (req, res) => {
  try {
    const mainCategories = await prisma.mainCategory.findMany();
    res.json(mainCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/maincategories/:id/icons", async (req, res) => {
  const mainCategoryId = parseInt(req.params.id);
  try {
    const icons = await prisma.icon.findMany({ where: { mainCategoryId }, include: iconInclude });
    res.json(icons.map(serializeIcon));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/icons/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const icon = await prisma.icon.findUnique({ where: { id }, include: iconInclude });
    if (!icon) return res.status(404).json({ message: "Icon not found" });
    res.json(serializeIcon(icon));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/icons/:iconId/subicons/:subIconId", async (req, res) => {
  const iconId = parseInt(req.params.iconId);
  const subIconId = parseInt(req.params.subIconId);
  try {
    const subIcon = await prisma.subIcon.findFirst({
      where: { id: subIconId, iconId },
      include: {
        ...subIconInclude,
        icon: true,
      },
    });
    if (!subIcon) return res.status(404).json({ message: "SubIcon not found" });
    res.json({
      ...serializeSubIcon(subIcon),
      icon: subIcon.icon ? serializeIcon({ ...subIcon.icon, subIcons: [] }) : null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/subicons/:subIconId/subsubicons", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "audio", maxCount: 1 }
]), async (req, res) => {
  const subIconId = parseInt(req.params.subIconId);
  const {
    title,
    expression,
    imageUrl: imageUrlLink,
    audioUrl: audioUrlLink,
    recordingUrl: recordingUrlLink,
  } = req.body;

  try {
    const parentSubIcon = await prisma.subIcon.findUnique({ where: { id: subIconId } });
    if (!parentSubIcon) {
      return res.status(404).json({ message: "Parent SubIcon not found" });
    }

    const imageFile = req.files?.image ? req.files.image[0] : null;
    const audioFile = req.files?.audio ? req.files.audio[0] : null;

    let imagePath = imageFile ? `/public/uploads/${imageFile.filename}` : "";
    let audioPath = audioFile ? `/public/uploads/${audioFile.filename}` : "";

    if (!imagePath && imageUrlLink) imagePath = await downloadFile(imageUrlLink);
    if (!audioPath && (audioUrlLink || recordingUrlLink)) {
      audioPath = await downloadFile(audioUrlLink || recordingUrlLink);
    }

    const subSubIcon = await prisma.subSubIcon.create({
      data: {
        title,
        expression,
        imageUrl: imagePath,
        audioUrl: audioPath,
        category: parentSubIcon.category,
        subIconId,
      },
    });

    res.status(201).json(serializeSubSubIcon(subSubIcon, parentSubIcon));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/subicons/:subIconId/subsubicons", async (req, res) => {
  const subIconId = parseInt(req.params.subIconId);
  try {
    const subSubIcons = await prisma.subSubIcon.findMany({
      where: { subIconId },
      orderBy: { id: "asc" },
    });
    const parentSubIcon = await prisma.subIcon.findUnique({ where: { id: subIconId } });
    res.json(subSubIcons.map((subSubIcon) => serializeSubSubIcon(subSubIcon, parentSubIcon)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/icons/:iconId/subicons/:subIconId/subsubicons/:subSubIconId", async (req, res) => {
  const iconId = parseInt(req.params.iconId);
  const subIconId = parseInt(req.params.subIconId);
  const subSubIconId = parseInt(req.params.subSubIconId);

  try {
    const subSubIcon = await prisma.subSubIcon.findFirst({
      where: {
        id: subSubIconId,
        subIconId,
        subIcon: {
          iconId,
        },
      },
      include: {
        subIcon: {
          include: {
            icon: true,
          },
        },
      },
    });

    if (!subSubIcon) {
      return res.status(404).json({ message: "SubSubIcon not found" });
    }

    res.json({
      ...serializeSubSubIcon(subSubIcon, subSubIcon.subIcon),
      subIcon: subSubIcon.subIcon
        ? {
            ...serializeSubIcon({ ...subSubIcon.subIcon, subSubIcons: [] }),
            icon: subSubIcon.subIcon.icon
              ? serializeIcon({ ...subSubIcon.subIcon.icon, subIcons: [] })
              : null,
          }
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/maincategories/:id/timeperiods", async (req, res) => {
  const mainCategoryId = parseInt(req.params.id);
  if (Number.isNaN(mainCategoryId)) {
    return res.status(400).json({ message: "Invalid main category id" });
  }

  try {
    const periods =
      typeof prisma.timePeriod?.findMany === "function"
        ? await prisma.timePeriod.findMany({
            where: { mainCategoryId },
            orderBy: [{ order: "asc" }, { id: "asc" }]
          })
        : await prisma.$queryRaw`
            SELECT "id", "name", "order", "mainCategoryId"
            FROM "TimePeriod"
            WHERE "mainCategoryId" = ${mainCategoryId}
            ORDER BY "order" ASC NULLS LAST, "id" ASC
          `;

    res.json(periods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/timeperiods/:id/icons", async (req, res) => {
  const timePeriodId = parseInt(req.params.id);
  if (Number.isNaN(timePeriodId)) {
    return res.status(400).json({ message: "Invalid time period id" });
  }

  try {
    let icons;

    try {
      icons = await prisma.icon.findMany({
        where: { timePeriodId },
        include: iconInclude
      });
    } catch (err) {
      if (!String(err?.message || "").includes("Unknown argument `timePeriodId`")) {
        throw err;
      }

      const rawIcons = await prisma.$queryRaw`
        SELECT "id", "title", "expression", "imageUrl", "category", "audioUrl", "mainCategoryId", "timePeriodId"
        FROM "Icon"
        WHERE "timePeriodId" = ${timePeriodId}
        ORDER BY "id" ASC
      `;

      if (!rawIcons.length) {
        return res.json([]);
      }

      const iconIds = rawIcons.map((icon) => icon.id);
      const subIcons = await prisma.subIcon.findMany({
        where: { iconId: { in: iconIds } },
        include: subIconInclude,
      });

      const subIconsByIconId = subIcons.reduce((acc, subIcon) => {
        if (!acc[subIcon.iconId]) {
          acc[subIcon.iconId] = [];
        }
        acc[subIcon.iconId].push(subIcon);
        return acc;
      }, {});

      icons = rawIcons.map((icon) => ({
        ...icon,
        recordingUrl: icon.audioUrl ?? null,
        subIcons: (subIconsByIconId[icon.id] || []).map(serializeSubIcon)
      }));
    }

    res.json(icons.map(serializeIcon));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/emergency-numbers", async (req, res) => {
  try {
    const rows =
      typeof prisma.emergencyNumber?.findMany === "function"
        ? await prisma.emergencyNumber.findMany({ orderBy: { id: "asc" } })
        : await prisma.$queryRaw`
            SELECT "id", "number", "label"
            FROM "EmergencyNumber"
            ORDER BY "id" ASC
          `;

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/emergency-numbers", async (req, res) => {
  const { number, label, label_en, label_ar, label_fr, label_es } = req.body;
  const normalizedNumber = String(number || "").trim();
  const normalizedLabel =
    String(label || "").trim() ||
    String(label_en || "").trim() ||
    String(label_ar || "").trim() ||
    String(label_fr || "").trim() ||
    String(label_es || "").trim() ||
    null;

  if (!normalizedNumber) {
    return res.status(400).json({ message: "Number is required" });
  }

  try {
    const row =
      typeof prisma.emergencyNumber?.upsert === "function"
        ? await prisma.emergencyNumber.upsert({
            where: { number: normalizedNumber },
            update: { label: normalizedLabel },
            create: { number: normalizedNumber, label: normalizedLabel }
          })
        : (
            await prisma.$queryRaw`
              INSERT INTO "EmergencyNumber" ("number", "label")
              VALUES (${normalizedNumber}, ${normalizedLabel})
              ON CONFLICT ("number")
              DO UPDATE SET "label" = EXCLUDED."label"
              RETURNING "id", "number", "label"
            `
          )[0];

    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/speech/attempts", async (req, res) => {
  const { word } = req.query;
  try {
    const where = word ? { word: String(word) } : {};
    const attempts = await prisma.speechAttempt.findMany({
      where,
      orderBy: { createdAt: "asc" }
    });
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/speech/attempts", async (req, res) => {
  const { word, transcript, score } = req.body;
  try {
    const row = await prisma.speechAttempt.create({
      data: {
        word: String(word || ""),
        transcript: String(transcript || ""),
        score: Number(score) || 0
      }
    });
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get(/.*/, (req, res, next) => {
  if (isBrowserPageRequest(req)) {
    return sendFrontend(req, res, next);
  }

  return next();
});

const PORT = process.env.PORT || 5551;
const startServer = async () => {
  try {
    await ensureAuthTables();
  } catch (err) {
    console.error("Auth table setup failed:", err.message);
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`Project running on port ${PORT}`));
};

startServer();
