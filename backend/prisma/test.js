import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("Connection OK:", result);
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
