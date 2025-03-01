import { Router, Request, Response } from "express";
import * as service from "../services/bookService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const keyword = (req.query.keyword as string) || "";
  const dateStr: string = req.query.dueDate as string;
  let dueDate: Date | null = null;

  if (dateStr) {
    dueDate = new Date(dateStr);
    if (isNaN(dueDate.getTime())) {
      res.status(400).send("Invalid dueDate");
      return;
    }
  }
  try {
    const result = await service.getBooksWithAuthorsPagination(
      keyword,
      dueDate,
      pageSize,
      pageNo
    );
    if (result.books.length === 0) {
      res.status(404).send("No book found");
      return;
    }
    res.setHeader("X-Total-Count", result.count.toString());
    res.json(result.books);
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid page number or page size");
    } else {
      res.status(500).send("Internal server error");
    }
    return;
  } finally {
    console.log(
      `✅ Request is completed. with pageNo: ${pageNo} and pageSize: ${pageSize} and keyword: ${keyword} and dueDate: ${dueDate}`
    );
  }
});

router.get("/not-returned", async (req: Request, res: Response) => {
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  try {
    const result = await service.getBooksNotReturnedPagination(
      pageSize,
      pageNo
    );
    if (result.books.length === 0) {
      res.status(404).send("No book found");
      return;
    }
    res.setHeader("X-Total-Count", result.count.toString());
    res.json(result.books);
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid page number or page size");
    } else {
      res.status(500).send("Internal server error");
    }
    return;
  } finally {
    console.log(
      `✅ Request is completed. with pageNo: ${pageNo} and pageSize: ${pageSize}`
    );
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const book = await service.getBookById(Number(req.params.id));
    if (book) {
      res.json(book);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error("❌ Error fetching book by ID:", error);
    res.status(500).send("Internal server error");
  } finally {
    console.log(`✅ Request is completed for book ID: ${req.params.id}`);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const book = await service.addBook(req.body);
    res.json(book);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Internal server error");
  } finally {
    console.log("✅ Request is completed for adding a new book");
  }
});

export default router;
