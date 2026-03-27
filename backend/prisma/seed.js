/*import { PrismaClient } from "@prisma/client";
import {
  mainCategories,
  timePeriods,
  emergencyNumbers,
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
const DEFAULT_RLA_TIME_PERIOD = "Morning";

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

  console.log("Seeding Time Periods...");
  for (const period of timePeriods) {
    const mainCat = await prisma.mainCategory.findUnique({
      where: { name: period.mainCategory }
    });
    if (!mainCat) {
      console.warn(`MainCategory "${period.mainCategory}" not found for time period "${period.name}"`);
      continue;
    }
    await prisma.timePeriod.upsert({
      where: {
        name_mainCategoryId: { name: period.name, mainCategoryId: mainCat.id }
      },
      update: { order: period.order ?? null },
      create: {
        name: period.name,
        order: period.order ?? null,
        mainCategoryId: mainCat.id
      }
    });
  }
  console.log("Time Periods seeded!");

  console.log("Seeding Emergency Numbers...");
  for (const entry of emergencyNumbers) {
    await prisma.emergencyNumber.upsert({
      where: { number: entry.number },
      update: { label: entry.label ?? null },
      create: {
        number: entry.number,
        label: entry.label ?? null
      }
    });
  }
  console.log(`Emergency Numbers done: ${emergencyNumbers.length} items.`);

  console.log("Seeding Icons...");

  for (const icon of icons) {
    const mainCat = await prisma.mainCategory.findUnique({
      where: { name: icon.mainCategory }
    });

    if (!mainCat) {
      console.warn(`MainCategory "${icon.mainCategory}" not found for icon "${icon.title}"`);
      continue;
    }

    const timePeriodName =
      icon.timePeriod ??
      (mainCat.name === "Real Life Activities" ? DEFAULT_RLA_TIME_PERIOD : null);

    const timePeriod = timePeriodName
      ? await prisma.timePeriod.findFirst({
          where: { name: timePeriodName, mainCategoryId: mainCat.id }
        })
      : null;

    if (timePeriodName && !timePeriod) {
      console.warn(`TimePeriod "${timePeriodName}" not found for icon "${icon.title}"`);
    }

    await prisma.icon.upsert({
      where: { title: icon.title },
      update: {
        expression: icon.expression,
        imageUrl: icon.imageUrl,
        category: icon.category,
        audioUrl: icon.audioUrl ?? null,
        mainCategoryId: mainCat.id,
        timePeriodId: timePeriod?.id ?? null
      },
      create: {
        title: icon.title,
        expression: icon.expression,
        imageUrl: icon.imageUrl,
        category: icon.category,
        audioUrl: icon.audioUrl ?? null,
        mainCategoryId: mainCat.id,
        timePeriodId: timePeriod?.id ?? null
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
    const icon = await prisma.icon.findFirst({
      where: { category: subIcon.category }
    });

    if (!icon) {
      console.warn(`Icon for category "${subIcon.category}" not found, skipping SubIcon "${subIcon.title}"`);
      continue;
    }

    await prisma.subIcon.upsert({
      where: { title: subIcon.title },
      update: {
        expression: subIcon.expression,
        imageUrl: subIcon.imageUrl,
        iconId: icon.id,
        audioUrl: subIcon.audioUrl ?? null,
        category: subIcon.category
      },
      create: {
        title: subIcon.title,
        expression: subIcon.expression,
        imageUrl: subIcon.imageUrl,
        audioUrl: subIcon.audioUrl ?? null,
        iconId: icon.id,
        category: subIcon.category
      }
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
*/
import { PrismaClient } from "@prisma/client";
import {
  mainCategories,
  timePeriods,
  emergencyNumbers,
  icons,
  animalSubIcons,
  clothesSubIcons,
  familySubIcons,
  feelingsSubIcons,
  foodAndDrinkSubIcons,
  drinkingSubIcons,
  sleepingSubIcons,
  getDressedSubIcons,
  placesSubIcons,
  homeSubIcons,
  questionsSubIcons,
  relationsSubIcons,
  timesSubIcons,
  toolsSubIcons,
  transportSubIcons,
  verbsSubIcons,
  medicineSubIcons,
  doctorSubIcons,
  afraidSubIcons,
  callSubIcons,
  talkSubIcons,
  listenSubIcons,
  breakfastSubIcons,
  lunchSubIcons,
  dinnerSubIcons,
  snackSubIcons,
  tvSubIcons,
  playSubIcons,
  musicSubIcons,
  memoriesSubIcons,
  neighboursSubIcons,
} from "./data.js";

const prisma = new PrismaClient();
const DEFAULT_RLA_TIME_PERIOD = "Morning";

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

  console.log("Seeding Time Periods...");
  for (const period of timePeriods) {
    const mainCat = await prisma.mainCategory.findUnique({
      where: { name: period.mainCategory }
    });
    if (!mainCat) {
      console.warn(`MainCategory "${period.mainCategory}" not found for time period "${period.name}"`);
      continue;
    }
    await prisma.timePeriod.upsert({
      where: {
        name_mainCategoryId: { name: period.name, mainCategoryId: mainCat.id }
      },
      update: { order: period.order ?? null },
      create: {
        name: period.name,
        order: period.order ?? null,
        mainCategoryId: mainCat.id
      }
    });
  }
  console.log("Time Periods seeded!");

  console.log("Seeding Emergency Numbers...");
  for (const entry of emergencyNumbers) {
    await prisma.emergencyNumber.upsert({
      where: { number: entry.number },
      update: { label: entry.label ?? null },
      create: {
        number: entry.number,
        label: entry.label ?? null
      }
    });
  }
  console.log(`Emergency Numbers done: ${emergencyNumbers.length} items.`);

  console.log("Seeding Icons...");

  for (const icon of icons) {
    const mainCat = await prisma.mainCategory.findUnique({
      where: { name: icon.mainCategory }
    });

    if (!mainCat) {
      console.warn(`MainCategory "${icon.mainCategory}" not found for icon "${icon.title}"`);
      continue;
    }

    const timePeriodName =
      icon.timePeriod ??
      (mainCat.name === "Real Life Activities" ? DEFAULT_RLA_TIME_PERIOD : null);

    const timePeriod = timePeriodName
      ? await prisma.timePeriod.findFirst({
          where: { name: timePeriodName, mainCategoryId: mainCat.id }
        })
      : null;

    if (timePeriodName && !timePeriod) {
      console.warn(`TimePeriod "${timePeriodName}" not found for icon "${icon.title}"`);
    }

    await prisma.icon.upsert({
      where: { title: icon.title },
      update: {
        expression: icon.expression,
        imageUrl: icon.imageUrl,
        category: icon.category,
        audioUrl: icon.audioUrl ?? null,
        mainCategoryId: mainCat.id,
        timePeriodId: timePeriod?.id ?? null
      },
      create: {
        title: icon.title,
        expression: icon.expression,
        imageUrl: icon.imageUrl,
        category: icon.category,
        audioUrl: icon.audioUrl ?? null,
        mainCategoryId: mainCat.id,
        timePeriodId: timePeriod?.id ?? null
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
    ...drinkingSubIcons,
    ...sleepingSubIcons,
    ...getDressedSubIcons,
    ...placesSubIcons,
    ...homeSubIcons,
    ...questionsSubIcons,
    ...relationsSubIcons,
    ...timesSubIcons,
    ...toolsSubIcons,
    ...transportSubIcons,
    ...verbsSubIcons,
    ...medicineSubIcons,
    ...doctorSubIcons,
    ...afraidSubIcons,
    ...callSubIcons,
    ...talkSubIcons,
    ...listenSubIcons,
    ...breakfastSubIcons,
    ...lunchSubIcons,
    ...dinnerSubIcons,
    ...snackSubIcons,
    ...tvSubIcons,
    ...playSubIcons,
    ...musicSubIcons,
    ...memoriesSubIcons,
    ...neighboursSubIcons,
  ];

  let totalInserted = 0;

  for (const subIcon of allSubIcons) {
    const icon = await prisma.icon.findFirst({
      where: { category: subIcon.category }
    });

    if (!icon) {
      console.warn(`Icon for category "${subIcon.category}" not found, skipping SubIcon "${subIcon.title}"`);
      continue;
    }

    await prisma.subIcon.upsert({
      where: { title: subIcon.title },
      update: {
        expression: subIcon.expression,
        imageUrl: subIcon.imageUrl,
        iconId: icon.id,
        audioUrl: subIcon.audioUrl ?? null,
        category: subIcon.category
      },
      create: {
        title: subIcon.title,
        expression: subIcon.expression,
        imageUrl: subIcon.imageUrl,
        audioUrl: subIcon.audioUrl ?? null,
        iconId: icon.id,
        category: subIcon.category
      }
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