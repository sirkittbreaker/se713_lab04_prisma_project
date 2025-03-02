import { Router, Request, Response } from "express";
import * as service from "../services/memberService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const keyword = (req.query.keyword as string) || "";
  try {
    const result = await service.getAllMembersWithPagination(
      keyword,
      pageSize,
      pageNo
    );
    if (result.members.length === 0) {
      res.status(404).send("No member found");
      return;
    }
    res.setHeader("X-Total-Count", result.count.toString());
    res.json(result.members);
  } catch (error) {
    console.error("❌ Error fetching members:", error);
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
    const member = await service.getMemberById(Number(req.params.id));
    if (member) {
      res.json(member);
    } else {
      res.status(404).send("Member not found");
    }
  } catch (error) {
    console.error("❌ Error fetching member by ID:", error);
    res.status(500).send("Internal server error");
  } finally {
    console.log(`✅ Request is completed for member ID: ${req.params.id}`);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const member = await service.addMember(req.body);
    res.json(member);
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).send("Internal server error");
  } finally {
    console.log("✅ Request is completed for adding a new member");
  }
});

export default router;
