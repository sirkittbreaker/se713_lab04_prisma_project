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
