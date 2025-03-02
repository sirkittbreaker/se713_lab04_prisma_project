import { Router, Request, Response } from "express";
import * as service from "../services/authorService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const keyword = (req.query.keyword as string) || "";
  try {
    const result = await service.getAllAuthorsPagination(
      keyword,
      pageSize,
      pageNo
    );
    if (result.authors.length === 0) {
      res.status(404).send("No author found");
      return;
    }
    res.setHeader("X-Total-Count", result.count.toString());
    res.json(result.authors);
  } catch (error) {
    console.error("❌ Error fetching authors:", error);
    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid page number or page size");
    } else {
      res.status(500).send("Internal server error");
    }
    return;
  } finally {
    console.log(
      `✅ Request is completed. with pageNo: ${pageNo} and pageSize: ${pageSize} and keyword: ${keyword}`
    );
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const book = await service.getAuthorById(Number(req.params.id));
    if (book) {
      res.json(book);
    } else {
      res.status(404).send("Author not found");
    }
  } catch (error) {
    console.error("❌ Error fetching author by ID:", error);
    res.status(500).send("Internal server error");
  } finally {
    console.log(`✅ Request is completed for book ID: ${req.params.id}`);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const book = await service.addAuthor(req.body);
    res.json(book);
  } catch (error) {
    console.error("Error adding author:", error);
    res.status(500).send("Internal server error");
  } finally {
    console.log("✅ Request is completed for adding a new book");
  }
});

export default router;
