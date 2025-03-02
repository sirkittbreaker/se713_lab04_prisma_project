import { PrismaClient } from "@prisma/client";
import { Member, PageMember } from "../models/member";

const prisma = new PrismaClient();

export async function getMemberById(id: number) {
  return await prisma.member.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
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

export async function addMember(member: Member): Promise<Member> {
  return await prisma.member.create({
    data: {
      firstName: member.firstName,
      lastName: member.lastName,
      phoneNumber: member.phoneNumber,
    },
  });
}

export async function getAllMembersWithBorrowingBooksPagination(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  const where: any = {
    OR: [
      { firstName: { contains: keyword } },
      { lastName: { contains: keyword } },
    ],
  };
  const members = await prisma.member.findMany({
    where: where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
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
  const count = await prisma.member.count({ where: where });
  return { count, members } as PageMember;
}

// export function getMembers() {
//   return prisma.member.findMany({
//     select: {
//       id: true,
//       firstName: true,
//       lastName: true,
//       phoneNumber: true,
//       _count: {
//         select: {
//           borrowing: true,
//         },
//       },
//       borrowing: {
//         select: {
//           id: true,
//           borrowDate: true,
//           dueDate: true,
//           returnDate: true,
//           book: {
//             select: {
//               id: true,
//               title: true,
//               isbn: true,
//               category: true,
//             },
//           },
//         },
//       },
//     },
//   });
// }

// export function getMemberByFirstName(firstName: string) {
//   return prisma.member.findMany({
//     where: {
//       firstName: firstName,
//     },
//     select: {
//       id: true,
//       firstName: true,
//       lastName: true,
//       phoneNumber: true,
//       _count: {
//         select: {
//           borrowing: true,
//         },
//       },
//       borrowing: {
//         select: {
//           id: true,
//           borrowDate: true,
//           dueDate: true,
//           returnDate: true,
//           book: {
//             select: {
//               id: true,
//               title: true,
//               isbn: true,
//               category: true,
//             },
//           },
//         },
//       },
//     },
//   });
// }
