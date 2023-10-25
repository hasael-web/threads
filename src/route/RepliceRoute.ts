import { Router } from "express";
import RepliceController from "../controllers/RepliceController";

const router = Router();

router.get("/replices", RepliceController.find);
router.post("/replice", RepliceController.create);
router.patch("/replice/:id", RepliceController.update);
router.delete("/replice/:id", RepliceController.delete);

export default router;
