import { Book } from "../models/book";
import * as repo from "../repository/bookRepository";

export async function getBooks() {
  return repo.getBooks();
}

export async function getBookById(id: number) {
  return repo.getBookWithAuthorsBorrowingMemberById(id);
}

// export async function getBooksByTitle(title: string) {
//   return repo.getBooksByTitle(title);
// }

export async function addBook(book: Book) {
  return repo.addBook(book);
}

// export async function getBooksByDueDate(dueDate: Date) {
//   return repo.getBooksByDueDate(dueDate);
// }

export async function getBooksNotReturnedPagination(
  pageSize: number,
  pageNo: number
) {
  return repo.getBooksWithAuthorsBorrowingMemberNotReturnedPagination(
    pageSize,
    pageNo
  );
}

export async function getAllBooksWithPagination(
  keyword: string,
  dueDate: Date | null,
  pageSize: number,
  pageNo: number
) {
  const pageBooks = await repo.getBooksWithAuthorsBorrowingMemberPagination(
    keyword,
    dueDate,
    pageSize,
    pageNo
  );
  return pageBooks;
}
