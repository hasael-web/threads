import { Router } from "express";
import ThreadController from "../controllers/ThreadController";

const router = Router();

router.get("/threads", ThreadController.find);
router.delete("/thread/:id", ThreadController.delete);
router.post("/thread", ThreadController.create);
router.patch("/thread/:id", ThreadController.update);

export default router;
