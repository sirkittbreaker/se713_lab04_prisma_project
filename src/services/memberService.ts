import { Member } from "../models/member";
import * as repo from "../repository/memberRepository";

export function getMembers(): Promise<Member[]> {
  return repo.getMembers();
}

export function getMemberById(id: number): Promise<Member | null> {
  return repo.getMemberById(id);
}

export function addMember(member: Member): Promise<Member> {
  return repo.addMember(member);
}
