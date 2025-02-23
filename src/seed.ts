import { PrismaClient } from "@prisma/client";
import { createAuthor } from "./db/createAuthor";
import { createMember } from "./db/createMember";
import { createBook } from "./db/createBook";
import { createBorrowing } from "./db/createBorrowing";

const prisma = new PrismaClient();

async function main() {
  await createAuthor();
  await createMember();
  await createBook();
  await createBorrowing();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
