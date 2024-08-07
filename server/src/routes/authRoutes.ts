import {Router} from "express";
import { signup, login, logout } from "../controllers/authController";


const router = Router();

router.post('/register', signup)
router.post('/login', login)
router.post('/logout', logout)

export default router;