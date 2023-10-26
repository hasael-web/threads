import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import authUser from "../middlewares/authUser";

const router = Router();

router.get("/threads", authUser, ThreadController.find);
router.delete("/thread/:id", authUser, ThreadController.delete);
router.post("/thread", authUser, ThreadController.create);
router.patch("/thread/:id", authUser, ThreadController.update);

export default router;
