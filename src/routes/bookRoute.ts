import { Router, Request, Response } from "express";
import * as service from "../services/bookService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  let books;
  if (req.query.title && req.query.dueDate) {
    const dateStr: string = req.query.dueDate as string;
    const dueDate: Date = new Date(dateStr);
    const booksByTitle = await service.getBooksByTitle(
      req.query.title as string
    );
    const booksByDueDate = await service.getBooksByDueDate(dueDate);
    books = booksByTitle.filter((book) =>
      booksByDueDate.some((b) => b.id === book.id)
    );
  } else if (req.query.title) {
    books = await service.getBooksByTitle(req.query.title as string);
  } else if (req.query.dueDate) {
    const dateStr: string = req.query.dueDate as string;
    const dueDate: Date = new Date(dateStr);
    books = await service.getBooksByDueDate(dueDate);
  } else {
    books = await service.getBooks();
  }

  res.json(books);
});

router.get("/not-returned", async (req: Request, res: Response) => {
  const books = await service.getBooksNotReturned();
  res.json(books);
});

router.get("/:id", async (req: Request, res: Response) => {
  const book = await service.getBookById(Number(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

router.post("/", async (req: Request, res: Response) => {
  const book = await service.addBook(req.body);
  res.json(book);
});

export default router;
