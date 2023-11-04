import { Router } from "express";
import RepliceController from "../controllers/RepliceController";
import authUser from "../middlewares/authUser";
import fileUpload from "../middlewares/file-upload";

const router = Router();

router.get("/replices", authUser, RepliceController.find);
router.post(
  "/thread/replice/:idThread",
  fileUpload.upload("upload"),
  authUser,
  RepliceController.create,
);
router.patch("/replice/:id", authUser, RepliceController.update);
router.delete("/replice/:id", authUser, RepliceController.delete);
router.get("/thread/replice/:idThread", authUser, RepliceController.detail);

export default router;
