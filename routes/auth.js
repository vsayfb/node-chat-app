import { Router } from "express";
import AuthController from "../controllers/auth.js";

const router = Router();

const auth = new AuthController();

router.get("/login", auth.loginPage);
router.get("/register", auth.registerPage);
router.post("/login", auth.loginEvent);
router.get("/logout", auth.logoutEvent);

export default router;
