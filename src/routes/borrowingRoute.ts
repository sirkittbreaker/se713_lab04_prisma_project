import { Router, Request, Response } from "express";
import * as service from "../services/borrowingService";

const router = Router();

router.post("/borrow", async (req: Request, res: Response) => {
  try {
    const borrowing = await service.borrowBook(
      req.body.memberId,
      req.body.bookId
    );

    if (borrowing) {
      res.json(borrowing);
    } else {
      res.status(400).send("Book is not available");
    }
  } catch (error) {
    console.error("❌ Error borrowing book:", error);
    res.status(500).send("Internal server error");
  } finally {
    console.log(
      `✅ Request is completed for borrowing book with memberId: ${req.body.memberId} and bookId: ${req.body.bookId}`
    );
  }
});

router.put("/return/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const borrowing = await service.returnBook(id);
    if (borrowing) {
      res.json(borrowing);
    } else {
      res.status(404).send("Borrowing record not found");
    }
  } catch (error) {
    console.error("❌ Error returning book:", error);
    res.status(500).send("Internal server error");
  } finally {
    console.log(
      `✅ Request is completed for returning book with borrowing ID: ${id}`
    );
  }
});

export default router;
