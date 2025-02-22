export interface Borrowing {
  id: number;
  memberId: number;
  bookId: number;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date | null;
}
