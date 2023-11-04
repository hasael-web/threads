import { Router } from "express";
import LikeController from "../controllers/LikeController";
import authUser from "../middlewares/authUser";

const router = Router();

router.get("/likes", authUser, LikeController.find);
router.delete("/like/:id", authUser, LikeController.delete);
router.post("/like", authUser, LikeController.create);
export default router;
