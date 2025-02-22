import { Router, Request, Response } from "express";
import * as service from "../services/memberService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const members = await service.getMembers();
  res.json(members);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const member = await service.getMemberById(id);
  if (member) {
    res.json(member);
  } else {
    res.status(404).send("Member not found");
  }
});

router.post("/", async (req: Request, res: Response) => {
  const member = req.body;
  const newMember = await service.addMember(member);
  res.json(newMember);
});

export default router;
