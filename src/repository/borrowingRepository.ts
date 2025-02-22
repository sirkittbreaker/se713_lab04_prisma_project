import { PrismaClient } from "@prisma/client";
import { Borrowing } from "../models/borrowing";

const prisma = new PrismaClient();

export async function borrowBook(
  memberId: number,
  bookId: number
): Promise<Borrowing | null> {
  const isAvailable = await prisma.borrowing.findFirst({
    where: {
      bookId,
      returnDate: null,
    },
  });

  if (!isAvailable) {
    return prisma.borrowing.create({
      data: {
        memberId,
        bookId,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      },
    });
  } else {
    return null;
  }
}

export async function returnBook(id: number): Promise<Borrowing | null> {
  const borrowing = await prisma.borrowing.findUnique({
    where: {
      id: id,
      returnDate: null,
    },
  });

  if (!borrowing) {
    return null;
  }

  return prisma.borrowing.update({
    where: { id },
    data: { returnDate: new Date() },
  });
}
