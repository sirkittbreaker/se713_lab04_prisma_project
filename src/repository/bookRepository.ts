import { PrismaClient } from "@prisma/client";
import { Book } from "../models/book";

const prisma = new PrismaClient();

export function getBooks(): Promise<Book[]> {
  return prisma.book.findMany();
}

export function getBookById(id: number): Promise<Book | null> {
  return prisma.book.findUnique({
    where: { id },
  });
}

export function getBooksByTitle(title: string): Promise<Book[]> {
  return prisma.book.findMany({
    where: {
      title: {
        contains: title,
      },
    },
  });
}

export function addBook(book: Book): Promise<Book> {
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

export async function getBooksByDueDate(dueDate: Date): Promise<Book[]> {
  const borrowings = await prisma.borrowing.findMany({
    where: {
      dueDate: {
        gte: new Date(dueDate.setHours(0, 0, 0, 0)),
        lt: new Date(dueDate.setHours(24, 0, 0, 0)),
      },
      returnDate: null,
    },
    select: {
      book: true,
    },
    orderBy: {
      book: {
        id: "asc",
      },
    },
  });
  return borrowings.map((borrowing) => borrowing.book);
}

export async function getBooksNotReturned() {
  const borrowings = await prisma.borrowing.findMany({
    where: {
      returnDate: null,
    },
    select: {
      book: true,
      dueDate: true,
    },
    orderBy: {
      book: {
        id: "asc",
      },
    },
  });
  // return borrowings.map((borrowing) => borrowing.book);
  // return borrowings;
  return borrowings.map((borrowing) => ({
    ...borrowing.book,
    dueDate: borrowing.dueDate,
  }));
}
