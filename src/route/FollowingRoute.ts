import { Router } from "express";
import FollowingController from "../controllers/FollowingController";
import authUser from "../middlewares/authUser";

const router = Router();

router.get("/following", authUser, FollowingController.find);
router.post("/follow", authUser, FollowingController.create);
router.delete("/unfollow/:id", authUser, FollowingController.delete);

export default router;
