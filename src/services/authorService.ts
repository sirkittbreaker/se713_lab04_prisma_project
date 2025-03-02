import { Author } from "../models/author";
import * as repo from "../repository/authorRepository";

// export function getAuthors(): Promise<Author[]> {
//   return repo.getAuthors();
// }

// export function getAuthorById(id: number): Promise<Author | null> {
//   return repo.getAuthorById(id);
// }

export function addAuthor(author: Author): Promise<Author> {
  return repo.addAuthor(author);
}

export async function getAllAuthorsPagination(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  return await repo.getAllAuthorsWithBooksPagination(keyword, pageSize, pageNo);
}

export async function getAuthorById(id: number) {
  return await repo.getAuthorWithBooksById(id);
}
