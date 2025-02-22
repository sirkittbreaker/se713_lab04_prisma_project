import { Router, Request, Response } from "express";
import * as service from "../services/bookService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  if (req.query.title) {
    const books = await service.getBooksByTitle(req.query.title as string);
    res.json(books);
  } else {
    const books = await service.getBooks();
    res.json(books);
  }
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
