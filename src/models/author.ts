import { Book } from "./book";

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  affiliation: string;
  books?: Book[];
}
