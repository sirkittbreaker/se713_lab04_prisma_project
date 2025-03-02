import { Borrowing } from "./borrowing";

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  borrowings?: Borrowing[];
}

export interface PageMember {
  count: number;
  members: Member[];
}
