import { Borrowing } from "../models/borrowing";
import * as repo from "../repository/borrowingRepository";

export function borrowBook(
  memberId: number,
  bookId: number
): Promise<Borrowing | null> {
  return repo.borrowBook(memberId, bookId);
}

export function returnBook(id: number): Promise<Borrowing | null> {
  return repo.returnBook(id);
}
