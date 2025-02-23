import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export async function createBorrowing() {
  const members = await prisma.member.findMany();
  const books = await prisma.book.findMany();

  // Shuffle members and books
  const shuffledMembers = shuffleArray(members);
  const shuffledBooks = shuffleArray(books);

  // Create borrowings
  for (
    let i = 0;
    i < 10 && i < Math.min(shuffledMembers.length, shuffledBooks.length);
    i++
  ) {
    const member = shuffledMembers[i];
    const book = shuffledBooks[i];

    // Generate a random borrow date within the last 30 days
    const borrowDate = getRandomDate(
      new Date(new Date().setDate(new Date().getDate() - 30)),
      new Date()
    );

    // Set due date to borrow date + 14 days
    const dueDate = new Date(borrowDate);
    dueDate.setDate(borrowDate.getDate() + 14);

    // Initialize returnDate as null
    let returnDate = null;

    // If dueDate is in the past, set returnDate to a random date between borrowDate and today
    if (dueDate < new Date()) {
      returnDate = getRandomDate(borrowDate, new Date());
    }

    await prisma.borrowing.create({
      data: {
        memberId: member.id,
        bookId: book.id,
        borrowDate: borrowDate,
        dueDate: dueDate,
        returnDate: returnDate,
      },
    });
  }
}
