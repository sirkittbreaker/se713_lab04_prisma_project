import { Author } from "../models/author";
import * as repo from "../repository/authorRepository";

export function getAuthors(): Promise<Author[]> {
  return repo.getAuthors();
}

export function getAuthorById(id: number): Promise<Author | null> {
  return repo.getAuthorById(id);
}

export function addAuthor(author: Author): Promise<Author> {
  return repo.addAuthor(author);
}
