import { PrismaClient } from "@prisma/client";
import { Author, PageAuthor } from "../models/author";

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

export async function getAllAuthorsWithBooksPagination(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  if (pageSize <= 0 || pageNo <= 0) {
    throw new Error("Invalid page number or page size");
  }
  const where = {
    OR: [
      {
        firstName: {
          contains: keyword,
        },
      },
      {
        lastName: {
          contains: keyword,
        },
      },
      {
        affiliation: {
          contains: keyword,
        },
      },
      {
        book: {
          some: {
            OR: [
              {
                title: {
                  contains: keyword,
                },
              },
              {
                category: {
                  contains: keyword,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const authors = await prisma.author.findMany({
    where: where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      affiliation: true,
      book: {
        select: {
          title: true,
          isbn: true,
          category: true,
        },
      },
    },
  });
  const count = await prisma.author.count({ where: where });
  return { count, authors } as PageAuthor;
}

export async function getAuthorWithBooksById(id: number) {
  return await prisma.author.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      affiliation: true,
      book: {
        select: {
          title: true,
          isbn: true,
          category: true,
        },
      },
    },
  });
}
