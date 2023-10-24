import { Router } from "express";
import ThreadController from "../controllers/ThreadController";

const router = Router();

router.get("/threads", ThreadController.find);

router.post("/thread", ThreadController.create);

export default router;
