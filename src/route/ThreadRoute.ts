import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import authUser from "../middlewares/authUser";
import fileUpload from "../middlewares/file-upload";

const router = Router();

router.get("/threads", ThreadController.find);
router.get("/thread/:id", authUser, ThreadController.detail);
router.delete("/thread/:id", authUser, ThreadController.delete);
router.post(
  "/thread",
  authUser,
  fileUpload.upload("upload"),
  ThreadController.create
);
router.patch("/thread/:id", authUser, ThreadController.update);

export default router;
