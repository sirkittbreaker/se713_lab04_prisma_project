import { PrismaClient } from "@prisma/client";
import { Member } from "../models/member";

const prisma = new PrismaClient();

export function getMembers() {
  return prisma.member.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      _count: {
        select: {
          borrowing: true,
        },
      },
      borrowing: {
        select: {
          id: true,
          borrowDate: true,
          dueDate: true,
          returnDate: true,
          book: {
            select: {
              id: true,
              title: true,
              isbn: true,
              category: true,
            },
          },
        },
      },
    },
  });
}

export function getMemberById(id: number) {
  return prisma.member.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      _count: {
        select: {
          borrowing: true,
        },
      },
      borrowing: {
        select: {
          id: true,
          borrowDate: true,
          dueDate: true,
          returnDate: true,
          book: {
            select: {
              id: true,
              title: true,
              isbn: true,
              category: true,
            },
          },
        },
      },
    },
  });
}

export function getMemberByFirstName(firstName: string) {
  return prisma.member.findMany({
    where: {
      firstName: firstName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      _count: {
        select: {
          borrowing: true,
        },
      },
      borrowing: {
        select: {
          id: true,
          borrowDate: true,
          dueDate: true,
          returnDate: true,
          book: {
            select: {
              id: true,
              title: true,
              isbn: true,
              category: true,
            },
          },
        },
      },
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
