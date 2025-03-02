import { PrismaClient } from "@prisma/client";
import { Book, PageBook } from "../models/book";

const prisma = new PrismaClient();

export async function getBooks() {
  return await prisma.book.findMany();
}

export async function getBookWithAuthorsBorrowingMemberById(id: number) {
  return await prisma.book.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      isbn: true,
      category: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
          affiliation: true,
        },
      },
      borrowing: {
        select: {
          id: true,
          borrowDate: true,
          dueDate: true,
          returnDate: true,
          member: {
            select: {
              firstName: true,
              lastName: true,
              phoneNumber: true,
            },
          },
        },
      },
    },
  });
}

export async function addBook(book: Book) {
  const data: any = {
    title: book.title,
    isbn: book.isbn,
    category: book.category,
  };

  if (book.authorId) {
    data.author = { connect: { id: book.authorId } };
  }

  return prisma.book.create({
    data,
  });
}

export async function getBooksWithAuthorsBorrowingMemberNotReturnedPagination(
  pageSize: number,
  pageNo: number
) {
  if (pageSize <= 0 || pageNo <= 0) {
    throw new Error("Invalid page number or page size");
  }
  const where: any = {
    borrowing: {
      some: {
        returnDate: null,
      },
    },
  };
  const books = await prisma.book.findMany({
    where: where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    select: {
      id: true,
      title: true,
      isbn: true,
      category: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
          affiliation: true,
        },
      },
      borrowing: {
        where: {
          returnDate: null,
        },
        select: {
          id: true,
          borrowDate: true,
          dueDate: true,
          returnDate: true,
          member: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  const count = await prisma.book.count({ where: where });
  return { count, books } as PageBook;
}

export async function getBooksWithAuthorsBorrowingMemberPagination(
  keyword: string,
  dueDate: Date | null,
  pageSize: number,
  pageNo: number
) {
  if (pageSize <= 0 || pageNo <= 0) {
    throw new Error("Invalid page number or page size");
  }
  const where: any = {
    OR: [
      { title: { contains: keyword, mode: "insensitive" } },
      { category: { contains: keyword, mode: "insensitive" } },
      {
        author: {
          OR: [
            { firstName: { contains: keyword, mode: "insensitive" } },
            { lastName: { contains: keyword, mode: "insensitive" } },
          ],
        },
      },
      {
        borrowing: {
          some: {
            member: {
              OR: [
                { firstName: { contains: keyword, mode: "insensitive" } },
                { lastName: { contains: keyword, mode: "insensitive" } },
              ],
            },
          },
        },
      },
    ],
  };

  if (dueDate) {
    if (!where.AND) {
      where.AND = [];
    }
    where.AND.push({
      borrowing: {
        some: {
          returnDate: null,
          dueDate: {
            gte: new Date(dueDate.setHours(0, 0, 0, 0)),
            lt: new Date(dueDate.setHours(24, 0, 0, 0)),
          },
        },
      },
    });
  }

  const books = await prisma.book.findMany({
    where: where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    select: {
      id: true,
      title: true,
      isbn: true,
      category: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
          affiliation: true,
        },
      },
      borrowing: {
        select: {
          id: true,
          borrowDate: true,
          dueDate: true,
          returnDate: true,
          member: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  const count = await prisma.book.count({ where: where });
  return { count, books } as PageBook;
}

// export async function getBooksByTitle(title: string) {
//   return prisma.book.findMany({
//     where: {
//       title: {
//         contains: title,
//       },
//     },
//   });
// }

// export async function getBooksByDueDate(dueDate: Date) {
//   const borrowings = await prisma.borrowing.findMany({
//     where: {
//       dueDate: {
//         gte: new Date(dueDate.setHours(0, 0, 0, 0)),
//         lt: new Date(dueDate.setHours(24, 0, 0, 0)),
//       },
//       returnDate: null,
//     },
//     select: {
//       book: true,
//     },
//     orderBy: {
//       book: {
//         id: "asc",
//       },
//     },
//   });
//   return borrowings.map((borrowing) => borrowing.book);
// }
