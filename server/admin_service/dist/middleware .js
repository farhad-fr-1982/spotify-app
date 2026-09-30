import axios from "axios";
import dotenv, { config } from 'dotenv';
import multer from "multer";
dotenv.config();
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({ message: 'لطفا ابتدا وارد سایت شوید' });
            return;
        }
        //*پاسخ رو استخراج کنه data بگیره و فقط بخش axios.get می‌زنه تا با فرستادن توکن در هدر، اطلاعات کاربر لاگین‌شده رو از مسیر  user_service  یه درخواست به 
        const { data } = await axios.get(`${process.env.User_URL}/api/v1/user/me`, {
            headers: {
                token
            }
        });
        req.user = data;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'لطفا ابتدا وارد سایت شوید' });
    }
};
//* Multer تنظیمات
const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single('file');
export default uploadFile;
//# sourceMappingURL=middleware%20.js.map