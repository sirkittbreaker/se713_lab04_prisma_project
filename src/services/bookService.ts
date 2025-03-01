import { Book } from "../models/book";
import * as repo from "../repository/bookRepository";

export async function getBooks() {
  return repo.getBooks();
}

export async function getBookById(id: number) {
  return repo.getBookById(id);
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
  return repo.getBooksNotReturnedPagination(pageSize, pageNo);
}

export async function getBooksWithAuthorsPagination(
  keyword: string,
  dueDate: Date | null,
  pageSize: number,
  pageNo: number
) {
  const pageBooks = await repo.getBooksWithAuthorsPagination(
    keyword,
    dueDate,
    pageSize,
    pageNo
  );
  return pageBooks;
}
