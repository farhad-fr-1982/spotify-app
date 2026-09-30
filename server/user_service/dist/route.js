import express from "express";
import { loginUser, myProfile, registerUser } from "./controoler.js";
import isAuth from "./middleware .js";
const router = express.Router();
//*روت فرعی برای ثبت نام کاربر
router.post('/user/register', registerUser);
//*روت فرعی برای لاگین کاربر
router.post('/user/login', loginUser);
//*روت فرعی برای پنل کاربر
router.get('/user/me', isAuth, myProfile);
export default router;
//# sourceMappingURL=route.js.map