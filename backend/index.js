import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import fetch from "node-fetch";
import {
  resolveIconRecordingUrl,
  resolveSubIconRecordingUrl,
  resolveSubSubRecordingUrl,
} from "./prisma/subSubIconAudio.js";

const prisma = new PrismaClient();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendBuildPath = path.join(__dirname, "../frontend/build");
const frontendIndexPath = path.join(frontendBuildPath, "index.html");
const publicPath = path.join(__dirname, "public");
const uploadsPath = path.join(publicPath, "uploads");
const defaultImagePath = path.join(publicPath, "default.jpg");

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
  origin: ["http://localhost:3000", "http://localhost:5551", "http://192.168.0.103:3000", "http://168.231.101.20:5552" , "https://tts-eight-iota.vercel.app"], // المواقع المسموح لها
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true 
}));
app.use(express.json());
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

const ELEVENLABS_VOICE_IDS = {
  male: process.env.ELEVENLABS_MALE_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb",
  female: process.env.ELEVENLABS_FEMALE_VOICE_ID || "hpp4J3VqNfWAUOO0d1Us",
};

const resolveElevenLabsVoiceId = (voice) => {
  const requestedVoice = String(voice || "").trim();
  const normalizedVoice = requestedVoice.toLowerCase();

  if (ELEVENLABS_VOICE_IDS[normalizedVoice]) {
    return ELEVENLABS_VOICE_IDS[normalizedVoice];
  }

  if (Object.values(ELEVENLABS_VOICE_IDS).includes(requestedVoice)) {
    return requestedVoice;
  }

  return "";
};

const readElevenLabsError = async (response) => {
  const errorText = await response.text();

  try {
    return JSON.parse(errorText);
  } catch (err) {
    return errorText;
  }
};

app.post("/api/tts/speak", async (req, res) => {
  const text = String(req.body?.text || "").trim();
  const voiceId = resolveElevenLabsVoiceId(req.body?.voice);
  const apiKey = process.env.ELEVENLABS_API_KEY;

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
      const details = await readElevenLabsError(elevenLabsRes);
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

const PORT = 5551;
app.listen(PORT, "0.0.0.0",() => console.log(`Project running on http://localhost:${PORT}`));
