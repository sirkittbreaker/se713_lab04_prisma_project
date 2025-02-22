import { PrismaClient } from "@prisma/client";
import { Author } from "../models/author";

const prisma = new PrismaClient();

export function getAuthors(): Promise<Author[]> {
  return prisma.author.findMany();
}

export function getAuthorById(id: number): Promise<Author | null> {
  return prisma.author.findUnique({
    where: {
      id: id,
    },
  });
}

export function addAuthor(author: Author): Promise<Author> {
  return prisma.author.create({
    data: {
      firstName: author.firstName,
      lastName: author.lastName,
      affiliation: author.affiliation,
    },
  });
}
