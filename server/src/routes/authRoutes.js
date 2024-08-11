import {Router} from "express";
import { signup,login, logout, generateRefreshToken, changeUserRole } from "../controllers/authControllers.js";
import authenticate from "../middlewares/auth.js";
import { checkBlacklist } from "../middlewares/checkBlacklist.js";


const router = Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', checkBlacklist, authenticate, logout)
router.post('/refresh-token', checkBlacklist, authenticate, generateRefreshToken)
router.post('/change-user-role', checkBlacklist, authenticate, changeUserRole)
export default router;