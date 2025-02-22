import { Router, Request, Response } from "express";
import * as service from "../services/borrowingService";

const router = Router();

router.post("/borrow", async (req: Request, res: Response) => {
  const borrowing = await service.borrowBook(
    req.body.memberId,
    req.body.bookId
  );

  if (borrowing) {
    res.json(borrowing);
  } else {
    res.status(400).send("Book is not available");
  }
});

router.put("/return/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const borrowing = await service.returnBook(id);
  if (borrowing) {
    res.json(borrowing);
  } else {
    res.status(404).send("Borrowing record not found");
  }
});

export default router;
