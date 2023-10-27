import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import authUser from "../middlewares/authUser";
import fileUpload from "../middlewares/file-upload";

const router = Router();

router.get("/threads", authUser, ThreadController.find);
router.delete("/thread/:id", authUser, ThreadController.delete);
router.post("/thread", fileUpload.upload("upload"), ThreadController.create);
router.patch("/thread/:id", authUser, ThreadController.update);

export default router;
