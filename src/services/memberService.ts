import { Member } from "../models/member";
import * as repo from "../repository/memberRepository";

export function getMembers() {
  return repo.getMembers();
}

export function getMemberById(id: number) {
  return repo.getMemberById(id);
}

export function getMembersByFirstName(name: string) {
  return repo.getMemberByFirstName(name);
}

export function addMember(member: Member): Promise<Member> {
  return repo.addMember(member);
}
