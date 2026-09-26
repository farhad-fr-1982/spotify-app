import type { NextFunction, Request, Response } from "express";
import axios from "axios";
import dotenv, { config } from 'dotenv'

dotenv.config()

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}

//* را ندارد req.user مقدار  Express به‌صورت پیش‌فرض :  interface چرا --> 
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string

        if (!token) {
            res.status(403).json({ message: 'لطفا ابتدا وارد سایت شوید' })
            return
        }

        //*پاسخ رو استخراج کنه data بگیره و فقط بخش axios.get می‌زنه تا با فرستادن توکن در هدر، اطلاعات کاربر لاگین‌شده رو از مسیر  user_service  یه درخواست به 
        const { data } = await axios.get(`${process.env.User_URL}/api/v1/user/me`,{
            headers:{
                token
            }
        })

        req.user = data

        next()
    } catch (error) {
        res.status(403).json({ message: 'لطفا ابتدا وارد سایت شوید' })
    }
};

//* Multer -->  برای آپلود فایل در اکسپرس جی اس استفاده میشه
//* (req.files or req.file) قرار میده middleware که فایل‌های ارسالی از فرم (مثل عکس، ویدیو، فایل صوتی) رو می‌گیره و در دسترس یه

//* datauri --> ک وقتی می‌خوای فایل رو به کلودینری آپلود کنی، به جای اینکه مسیر فایل روی دیسک رو بدی، این رشتهبیس شصت و چهار رو می‌دهد
//*  فایل عکس → پکیج دیتا یو آر آی → رشته‌ای مثل تصویر یا دیتا:
