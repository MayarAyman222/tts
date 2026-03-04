import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/public", express.static(path.join(process.cwd(), "public")));

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
//add comment