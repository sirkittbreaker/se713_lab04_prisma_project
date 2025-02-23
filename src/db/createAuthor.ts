import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAuthor() {
  const authors = [
    {
      firstName: "F. Scott",
      lastName: "Fitzgerald",
      affiliation: "American Literature",
    },
    {
      firstName: "Harper",
      lastName: "Lee",
      affiliation: "American Literature",
    },
    {
      firstName: "George",
      lastName: "Orwell",
      affiliation: "British Literature",
    },
    {
      firstName: "Jane",
      lastName: "Austen",
      affiliation: "British Literature",
    },
    {
      firstName: "J.D.",
      lastName: "Salinger",
      affiliation: "American Literature",
    },
    {
      firstName: "Mark",
      lastName: "Twain",
      affiliation: "American Literature",
    },
    {
      firstName: "Ernest",
      lastName: "Hemingway",
      affiliation: "American Literature",
    },
    {
      firstName: "Charles",
      lastName: "Dickens",
      affiliation: "British Literature",
    },
    {
      firstName: "Leo",
      lastName: "Tolstoy",
      affiliation: "Russian Literature",
    },
    {
      firstName: "Fyodor",
      lastName: "Dostoevsky",
      affiliation: "Russian Literature",
    },
  ];

  for (const author of authors) {
    await prisma.author.create({
      data: author,
    });
  }
}
