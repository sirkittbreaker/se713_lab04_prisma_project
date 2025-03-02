import { Member } from "../models/member";
import * as repo from "../repository/memberRepository";

export function getMemberById(id: number) {
  return repo.getMemberById(id);
}

export function addMember(member: Member): Promise<Member> {
  return repo.addMember(member);
}

export async function getAllMembersWithPagination(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  return repo.getAllMembersWithBorrowingBooksPagination(
    keyword,
    pageSize,
    pageNo
  );
}

// export function getMembers() {
//   return repo.getMembers();
// }

// export function getMembersByFirstName(name: string) {
//   return repo.getMemberByFirstName(name);
// }
