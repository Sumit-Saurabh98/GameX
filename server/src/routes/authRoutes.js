import {Router} from "express";
import { signup,login, logout, generateRefreshToken } from "../controllers/authControllers.js";
import authenticate from "../middlewares/auth.js";
import { checkBlacklist } from "../middlewares/checkBlacklist.js";


const router = Router();

router.post('/register', signup)
router.post('/login', login)
router.post('/logout', checkBlacklist, authenticate, logout)
router.post('/refresh-token', generateRefreshToken)
export default router;