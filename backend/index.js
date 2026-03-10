/*import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use("/public", express.static(path.join(process.cwd(), "public")));
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
// ===== ICON APIs =====

// GET all icons, optionally filter by category
app.get("/icons", async (req, res) => {
  const { category } = req.query;
  try {
    const icons = category
      ? await prisma.icon.findMany({
          where: { category: String(category) }, // تحويل category لـ string
          include: { subIcons: true },
        })
      : await prisma.icon.findMany({ include: { subIcons: true } });

    res.json(icons);
  } catch (err) {
    res.status(500).json({ message: err.message }); // بدون type assertion
  }
});

// CREATE a new Icon
app.post("/icons", async (req, res) => {
  const { title, expression, imageUrl, category } = req.body;

  try {
    const icon = await prisma.icon.create({
      data: { title, expression, imageUrl, category },
    });
    res.status(201).json(icon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== SUBICON APIs =====

// CREATE a new SubIcon under an Icon
app.post("/icons/:iconId/subicons", async (req, res) => {
  const iconId = parseInt(req.params.iconId);
  const { title, expression, imageUrl,audioUrl } = req.body;

  try {
    const icon = await prisma.icon.findUnique({ where: { id: iconId } });
    if (!icon) {
      return res.status(404).json({ message: "Icon not found" });
    }

    const subIcon = await prisma.subIcon.create({
      data: {
        title,
        expression,
        imageUrl,
         audioUrl,
        category: icon.category, 
        iconId,
      },
    });

    res.status(201).json(subIcon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all SubIcons (optional: by category)
app.get("/subicons", async (req, res) => {
  const { category } = req.query;
  try {
    const subIcons = category
      ? await prisma.subIcon.findMany({ where: { category: String(category) } })
      : await prisma.subIcon.findMany();

    res.json(subIcons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET SubIcons by iconId
app.get("/icons/:iconId/subicons", async (req, res) => {
  const iconId = parseInt(req.params.iconId);
  try {
    const subIcons = await prisma.subIcon.findMany({ where: { iconId } });
    res.json(subIcons);
  } catch (err) {
        res.status(500).json({ message: err.message });

  }
});
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
    const icons = await prisma.icon.findMany({
      where: { mainCategoryId },
      include: { subIcons: true }, 
    });
    res.json(icons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET icon by id
app.get("/icons/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const icon = await prisma.icon.findUnique({
      where: { id },
      include: { subIcons: true }, // لو عايزة subIcons تظهر معاه
    });
    if (!icon) return res.status(404).json({ message: "Icon not found" });
    res.json(icon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
                     //get 1 subicon by id//

app.get("/icons/:iconId/subicons/:subIconId", async (req, res) => {
  const iconId = parseInt(req.params.iconId);
  const subIconId = parseInt(req.params.subIconId);

  try {
    const subIcon = await prisma.subIcon.findFirst({
      where: {
        id: subIconId,
        iconId: iconId,
      },
    });

    if (!subIcon) {
      return res.status(404).json({ message: "SubIcon not found" });
    }

    res.json(subIcon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


const PORT = 5551;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//add comment*/
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
  origin: ["http://localhost:3000", "http://192.168.0.104:3000", "http://168.231.101.20:5552" ], // المواقع المسموح لها
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

const PORT = 5551;
app.listen(PORT, "0.0.0.0",() => console.log(`Server running on http://localhost:${PORT}`));