import { Book } from "../models/book";
import * as repo from "../repository/bookRepository";

export async function getBooks(): Promise<Book[]> {
  return repo.getBooks();
}

export async function getBookById(id: number): Promise<Book | null> {
  return repo.getBookById(id);
}

export async function getBooksByTitle(title: string): Promise<Book[]> {
  return repo.getBooksByTitle(title);
}

export async function addBook(book: Book): Promise<Book> {
  return repo.addBook(book);
}

export async function getBooksByDueDate(dueDate: Date): Promise<Book[]> {
  return repo.getBooksByDueDate(dueDate);
}

export async function getBooksNotReturned() {
  return repo.getBooksNotReturned();
}
