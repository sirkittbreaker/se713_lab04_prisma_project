import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMember() {
  const members = [
    {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-456-7890",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "234-567-8901",
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      phoneNumber: "345-678-9012",
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      phoneNumber: "456-789-0123",
    },
    {
      firstName: "Charlie",
      lastName: "Davis",
      phoneNumber: "567-890-1234",
    },
    {
      firstName: "David",
      lastName: "Wilson",
      phoneNumber: "678-901-2345",
    },
    {
      firstName: "Eve",
      lastName: "Moore",
      phoneNumber: "789-012-3456",
    },
    {
      firstName: "Frank",
      lastName: "Taylor",
      phoneNumber: "890-123-4567",
    },
    {
      firstName: "Grace",
      lastName: "Anderson",
      phoneNumber: "901-234-5678",
    },
    {
      firstName: "Hank",
      lastName: "Thomas",
      phoneNumber: "012-345-6789",
    },
    {
      firstName: "Ivy",
      lastName: "Jackson",
      phoneNumber: "123-456-7891",
    },
    {
      firstName: "Jack",
      lastName: "White",
      phoneNumber: "234-567-8902",
    },
    {
      firstName: "Kathy",
      lastName: "Harris",
      phoneNumber: "345-678-9013",
    },
    {
      firstName: "Leo",
      lastName: "Martin",
      phoneNumber: "456-789-0124",
    },
    {
      firstName: "Mona",
      lastName: "Thompson",
      phoneNumber: "567-890-1235",
    },
    {
      firstName: "Nina",
      lastName: "Garcia",
      phoneNumber: "678-901-2346",
    },
    {
      firstName: "Oscar",
      lastName: "Martinez",
      phoneNumber: "789-012-3457",
    },
    {
      firstName: "Paul",
      lastName: "Robinson",
      phoneNumber: "890-123-4568",
    },
    {
      firstName: "Quincy",
      lastName: "Clark",
      phoneNumber: "901-234-5679",
    },
    {
      firstName: "Rita",
      lastName: "Rodriguez",
      phoneNumber: "012-345-6790",
    },
  ];

  for (const member of members) {
    await prisma.member.create({
      data: member,
    });
  }
}
