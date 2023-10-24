import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/users", UserController.find);
router.post("/user", UserController.create);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

export default router;
