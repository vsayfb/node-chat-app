import { Router } from "express";
import UserController from "../controllers/user.js";

const router = Router();

const user = new UserController();

router.post("/newUser", user.save);

export default router;
