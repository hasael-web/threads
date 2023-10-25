import { Router } from "express";
import LikeController from "../controllers/LikeController";

const router = Router();

router.get("/likes", LikeController.find);
router.delete("/like/:id", LikeController.delete);
router.post("/like", LikeController.create);

export default router;
