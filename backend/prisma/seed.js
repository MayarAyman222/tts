import { PrismaClient } from "@prisma/client";
import { 
  mainCategories,
  icons,
  animalSubIcons,
  clothesSubIcons,
  familySubIcons,
  feelingsSubIcons,
  foodAndDrinkSubIcons,
  placesSubIcons,
  questionsSubIcons,
  relationsSubIcons,
  timesSubIcons,
  toolsSubIcons,
  transportSubIcons,
  verbsSubIcons,
  medicineSubIcons,
  memoriesSubIcons,
  neighboursSubIcons
} from "./data.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Main Categories...");

  

  for (const cat of mainCategories) {
    await prisma.mainCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat
    });
  }

  console.log("Main Categories seeded!");
  console.log("Seeding Icons...");

  for (const icon of icons) {
    const mainCat = await prisma.mainCategory.findUnique({
      where: { name: icon.mainCategory }
    });

    if (!mainCat) {
      console.warn(`MainCategory "${icon.mainCategory}" not found for icon "${icon.title}"`);
      continue;
    }

    await prisma.icon.upsert({
      where: { title: icon.title },
      update: {
        expression: icon.expression,
        imageUrl: icon.imageUrl,
        category: icon.category,
        audioUrl: icon.audioUrl ?? null,
        mainCategoryId: mainCat.id, 
      },
      create: {
        title: icon.title,
        expression: icon.expression,
        imageUrl: icon.imageUrl,
        category: icon.category,
         audioUrl: icon.audioUrl ?? null,
        mainCategoryId: mainCat.id, 
      }
    });
  }

  console.log(`Icons done: ${icons.length} items.`);


  console.log("Seeding SubIcons...");

  const allSubIcons = [
    ...animalSubIcons,
    ...clothesSubIcons,
    ...familySubIcons,
    ...feelingsSubIcons,
    ...foodAndDrinkSubIcons,
    ...placesSubIcons,
    ...questionsSubIcons,
    ...relationsSubIcons,
    ...timesSubIcons,
    ...toolsSubIcons,
    ...transportSubIcons,
    ...verbsSubIcons,
    ...medicineSubIcons,
  ...memoriesSubIcons,
  ...neighboursSubIcons
  ];

  let totalInserted = 0;

  for (const subIcon of allSubIcons) {
    // جِب الـ Icon المرتبط بالـ category
    //const icon = await prisma.icon.findUnique({
    const icon = await prisma.icon.findFirst({

      where: { category: subIcon.category },
    });

    if (!icon) {
      console.warn(`Icon for category "${subIcon.category}" not found, skipping SubIcon "${subIcon.title}"`);
      continue;
    }

    await prisma.subIcon.upsert({
      where: { title: subIcon.title }, // title كـ unique identifier
      update: {
        expression: subIcon.expression,
        imageUrl: subIcon.imageUrl,
        iconId: icon.id,
        audioUrl: subIcon.audioUrl ?? null,
        category: subIcon.category, 
      },
      create: {
        title: subIcon.title,
        expression: subIcon.expression,
        imageUrl: subIcon.imageUrl,
        audioUrl: subIcon.audioUrl ?? null,
        iconId: icon.id,
         category: subIcon.category,
      },
    });

    totalInserted++;
  }

  console.log(`SubIcons done. Total processed: ${totalInserted} / ${allSubIcons.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
