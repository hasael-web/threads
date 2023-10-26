import { Router } from "express";
import UserController from "../controllers/UserController";
import authUser from "../middlewares/authUser";

const router = Router();

router.get("/users", authUser, UserController.find);
router.post("/user", UserController.register);
router.patch("/user/:id", authUser, UserController.update);
router.delete("/user/:id", authUser, UserController.delete);
router.post("/logout", authUser, UserController.logout);
router.post("/login", UserController.login);

export default router;
