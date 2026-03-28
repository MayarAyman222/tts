import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import fetch from "node-fetch";

const prisma = new PrismaClient();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== إعداد Multer =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "public/uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

//app.use(cors());
app.use(cors({
  origin: ["http://localhost:3000", "http://192.168.0.103:3000", "http://168.231.101.20:5552" , "https://tts-eight-iota.vercel.app"], // المواقع المسموح لها
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true 
}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => res.send("Backend is running!"));

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
// ===== ICON APIs =====
app.get("/icons", async (req, res) => {
  const { category } = req.query;
  try {
    const icons = category
      ? await prisma.icon.findMany({ where: { category: String(category) }, include: { subIcons: true } })
      : await prisma.icon.findMany({ include: { subIcons: true } });
    res.json(icons);
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
  const { title, expression, imageUrl: imageUrlLink, audioUrl: audioUrlLink } = req.body;

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
    if (!audioPath && audioUrlLink) audioPath = await downloadFile(audioUrlLink);

    const subIcon = await prisma.subIcon.create({
      data: {
        title,
        expression,
        imageUrl: imagePath,
        audioUrl: audioPath,
        category: icon.category,
        iconId,
      },
    });

    res.status(201).json(subIcon);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// جلب كل الـ SubIcons أو حسب category
app.get("/subicons", async (req, res) => {
  const { category } = req.query;
  try {
    const subIcons = category
      ? await prisma.subIcon.findMany({ where: { category: String(category) } })
      : await prisma.subIcon.findMany();
    res.json(subIcons);
  } catch (err) {
      console.error("SUBICON ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// جلب SubIcons حسب iconId
app.get("/icons/:iconId/subicons", async (req, res) => {
  const iconId = parseInt(req.params.iconId);
  try {
    const subIcons = await prisma.subIcon.findMany({ where: { iconId } });
    res.json(subIcons);
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
    const icons = await prisma.icon.findMany({ where: { mainCategoryId }, include: { subIcons: true } });
    res.json(icons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/icons/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const icon = await prisma.icon.findUnique({ where: { id }, include: { subIcons: true } });
    if (!icon) return res.status(404).json({ message: "Icon not found" });
    res.json(icon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/icons/:iconId/subicons/:subIconId", async (req, res) => {
  const iconId = parseInt(req.params.iconId);
  const subIconId = parseInt(req.params.subIconId);
  try {
    const subIcon = await prisma.subIcon.findFirst({ where: { id: subIconId, iconId } });
    if (!subIcon) return res.status(404).json({ message: "SubIcon not found" });
    res.json(subIcon);
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
        include: { subIcons: true }
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
        where: { iconId: { in: iconIds } }
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
        subIcons: subIconsByIconId[icon.id] || []
      }));
    }

    res.json(icons);
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

const PORT = 5551;
app.listen(PORT, "0.0.0.0",() => console.log(`Server running on http://localhost:${PORT}`));
