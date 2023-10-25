import { Router } from "express";
import FollowingController from "../controllers/FollowingController";

const router = Router();

router.get("/following", FollowingController.find);
router.post("/follow", FollowingController.create);
router.delete("/unfollow/:id", FollowingController.delete);

export default router;
