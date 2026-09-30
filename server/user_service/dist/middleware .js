import jwt, {} from "jsonwebtoken";
import { User } from "./model.js";
const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({ message: 'لطفا ابتدا وارد سایت شوید' });
            return;
        }
        const JWT_SEC = process.env.JWT_SEC;
        const decodeValue = await jwt.verify(token, JWT_SEC);
        if (!decodeValue || !decodeValue._id) {
            res.status(403).json({ message: 'توکن نامعتبر است' });
            return;
        }
        const userId = decodeValue._id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            res.status(400).json({ message: 'کاربری یافت نشد' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'لطفا ابتدا وارد سایت شوید' });
    }
};
export default isAuth;
//# sourceMappingURL=middleware%20.js.map