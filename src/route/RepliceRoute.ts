import { Router } from "express";
import RepliceController from "../controllers/RepliceController";
import authUser from "../middlewares/authUser";

const router = Router();

router.get("/replices", authUser, RepliceController.find);
router.post("/thread/replice/:idThread", authUser, RepliceController.create);
router.patch("/replice/:id", authUser, RepliceController.update);
router.delete("/replice/:id", authUser, RepliceController.delete);

export default router;
