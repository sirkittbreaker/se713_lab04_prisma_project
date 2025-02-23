import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addAuthorId(bookId: number, authorId: number) {
  return prisma.book.update({
    where: { id: bookId },
    data: {
      authorId: authorId,
    },
  });
}

function generateRandomISBN(existingISBNs: Set<string>): string {
  let isbn;
  do {
    isbn =
      "978" +
      Math.floor(Math.random() * 1000000000)
        .toString()
        .padStart(9, "0");
  } while (existingISBNs.has(isbn));
  existingISBNs.add(isbn);
  return isbn;
}

export async function createBook() {
  const books = [
    {
      title: "The Great Gatsby",
      category: "Fiction",
    },
    {
      title: "To Kill a Mockingbird",
      category: "Fiction",
    },
    {
      title: "1984",
      category: "Dystopian",
    },
    {
      title: "Pride and Prejudice",
      category: "Romance",
    },
    {
      title: "The Catcher in the Rye",
      category: "Fiction",
    },
    {
      title: "Moby Dick",
      category: "Adventure",
    },
    {
      title: "War and Peace",
      category: "Historical",
    },
    {
      title: "The Odyssey",
      category: "Epic",
    },
    {
      title: "Crime and Punishment",
      category: "Psychological",
    },
    {
      title: "The Brothers Karamazov",
      category: "Philosophical",
    },
    {
      title: "Brave New World",
      category: "Dystopian",
    },
    {
      title: "The Hobbit",
      category: "Fantasy",
    },
    {
      title: "Fahrenheit 451",
      category: "Dystopian",
    },
    {
      title: "Jane Eyre",
      category: "Romance",
    },
    {
      title: "Wuthering Heights",
      category: "Romance",
    },
    {
      title: "The Divine Comedy",
      category: "Epic",
    },
    {
      title: "The Iliad",
      category: "Epic",
    },
    {
      title: "The Aeneid",
      category: "Epic",
    },
    {
      title: "Les Misérables",
      category: "Historical",
    },
    {
      title: "The Count of Monte Cristo",
      category: "Adventure",
    },
    {
      title: "Don Quixote",
      category: "Adventure",
    },
    {
      title: "The Picture of Dorian Gray",
      category: "Philosophical",
    },
    {
      title: "Dracula",
      category: "Horror",
    },
    {
      title: "Frankenstein",
      category: "Horror",
    },
    {
      title: "The Metamorphosis",
      category: "Philosophical",
    },
    {
      title: "The Stranger",
      category: "Philosophical",
    },
    {
      title: "The Trial",
      category: "Philosophical",
    },
    {
      title: "The Sun Also Rises",
      category: "Fiction",
    },
    {
      title: "A Farewell to Arms",
      category: "Fiction",
    },
    {
      title: "For Whom the Bell Tolls",
      category: "Fiction",
    },
    {
      title: "The Old Man and the Sea",
      category: "Fiction",
    },
    {
      title: "The Grapes of Wrath",
      category: "Fiction",
    },
    {
      title: "East of Eden",
      category: "Fiction",
    },
    {
      title: "Of Mice and Men",
      category: "Fiction",
    },
    {
      title: "The Pearl",
      category: "Fiction",
    },
    {
      title: "The Scarlet Letter",
      category: "Fiction",
    },
    {
      title: "Moby-Dick",
      category: "Adventure",
    },
    {
      title: "The Adventures of Huckleberry Finn",
      category: "Adventure",
    },
    {
      title: "The Adventures of Tom Sawyer",
      category: "Adventure",
    },
    {
      title: "The Call of the Wild",
      category: "Adventure",
    },
    {
      title: "White Fang",
      category: "Adventure",
    },
    {
      title: "The Jungle",
      category: "Fiction",
    },
    {
      title: "The Red Badge of Courage",
      category: "Fiction",
    },
    {
      title: "The Catcher in the Rye",
      category: "Fiction",
    },
    {
      title: "The Great Gatsby",
      category: "Fiction",
    },
    {
      title: "To Kill a Mockingbird",
      category: "Fiction",
    },
    {
      title: "1984",
      category: "Dystopian",
    },
    {
      title: "Pride and Prejudice",
      category: "Romance",
    },
    {
      title: "The Catcher in the Rye",
      category: "Fiction",
    },
  ];

  const authors = await prisma.author.findMany();
  const existingISBNs = new Set<string>();

  for (const book of books) {
    const isbn = generateRandomISBN(existingISBNs);
    const newBook = await prisma.book.create({
      data: {
        ...book,
        isbn,
      },
    });
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    await addAuthorId(newBook.id, randomAuthor.id);
  }
}
