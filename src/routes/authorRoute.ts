import { Router, Request, Response } from "express";
import * as service from "../services/authorService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const authors = await service.getAuthors();
  res.json(authors);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const author = await service.getAuthorById(id);
  if (author) {
    res.json(author);
  } else {
    res.status(404).send("Author not found");
  }
});

router.post("/", async (req: Request, res: Response) => {
  const author = req.body;
  const newAuthor = await service.addAuthor(author);
  res.json(newAuthor);
});

export default router;
