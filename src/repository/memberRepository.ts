import { PrismaClient } from "@prisma/client";
import { Member } from "../models/member";

const prisma = new PrismaClient();

export function getMembers(): Promise<Member[]> {
  return prisma.member.findMany();
}

export function getMemberById(id: number): Promise<Member | null> {
  return prisma.member.findUnique({
    where: {
      id: id,
    },
  });
}

export function getMemberByFirstName(firstName: string): Promise<Member[]> {
  return prisma.member.findMany({
    where: {
      firstName: firstName,
    },
  });
}

export function addMember(member: Member): Promise<Member> {
  return prisma.member.create({
    data: {
      firstName: member.firstName,
      lastName: member.lastName,
      phoneNumber: member.phoneNumber,
    },
  });
}
