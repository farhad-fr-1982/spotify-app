import TryCatch from "./TryCatch.js";
import { User } from "./model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//* ثبت نام کاربر
export const registerUser = TryCatch(async (req, res) => {
    // دریافت اطلاعات کاربر از بدنه درخواست
    const { name, email, password } = req.body;
    // بررسی وجود کاربر با ایمیل وارد شده در دیتابیس
    let user = await User.findOne({ email });
    // اگر کاربر قبلاً ثبت نام کرده باشد، خطا برمی‌گردانیم
    if (user) {
        res
            .status(400)
            .json({ message: "کاربری با این مشخصات قبلا ثبت نام کرده است" });
        // خروج از تابع برای جلوگیری از ادامه اجرا
        return;
    }
    // رمزنگاری (هش) کردن رمز عبور با 10 دور salt
    const hashPassword = await bcrypt.hash(password, 10);
    // ساخت کاربر جدید در دیتابیس با رمز عبور هش‌شده
    user = await User.create({
        name,
        email,
        password: hashPassword,
    });
    // دریافت کلید مخفی JWT از متغیرهای محیطی
    const JWT_SEC = process.env.JWT_SEC;
    // ساخت توکن با اعتبار 7 روزه
    const token = jwt.sign({ _id: user._id }, JWT_SEC, {
        expiresIn: "7d",
    });
    // ارسال پاسخ موفقیت‌آمیز (201 = ساخته شد) همراه با اطلاعات کاربر و توکن
    res.status(201).json({
        message: "ثبت نام با موفقیت انجام شد",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    });
});
//* ورود یا لاگین کاربر
export const loginUser = TryCatch(async (req, res) => {
    // دریافت اطلاعات ورود از بدنه درخواست
    const { email, password } = req.body;
    // جستجوی کاربر در دیتابیس با ایمیل
    const user = await User.findOne({ email });
    // اگر کاربری با این ایمیل وجود نداشت
    if (!user) {
        res.status(400).json({ message: "کاربری یافت نشد" });
        return;
    }
    // مقایسه رمز عبور وارد شده با رمز هش‌شده در دیتابیس
    const isMatch = await bcrypt.compare(password, user.password);
    // اگر رمز عبور اشتباه بود
    if (!isMatch) {
        res.status(400).json({ message: "اطلاعات ورود صحیح نمی باشد" });
        return;
    }
    // دریافت کلید مخفی JWT از متغیرهای محیطی
    const JWT_SEC = process.env.JWT_SEC;
    // ساخت توکن با اعتبار 7 روزه
    const token = jwt.sign({ _id: user._id }, JWT_SEC, {
        expiresIn: "7d",
    });
    // ارسال پاسخ موفقیت‌آمیز همراه با اطلاعات کاربر و توکن
    res.status(200).json({
        message: "ورود شما با موفقیت انجام شد",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    });
});
//* پروفایل کاربر
export const myProfile = TryCatch(async (req, res) => {
    // کاربر قبلاً توسط میدل‌ور احراز هویت روی req قرار داده شده است
    const user = req.user;
    // ارسال اطلاعات کاربر به عنوان پاسخ
    res.json(user);
});
//* افزودن یا حذف آهنگ از لیست پخش
export const addToPlaylist = TryCatch(async (req, res) => {
    // استخراج شناسه کاربر از شیء درخواست (req)
    const userId = req.user?._id;
    // پیدا کردن کاربر در دیتابیس با استفاده از شناسه استخراج شده
    const user = await User.findById(userId);
    // بررسی اینکه آیا کاربر پیدا شده است یا خیر
    if (!user) {
        // ارسال پاسخ با وضعیت 404 (پیدا نشد) و پیام خطا
        res.status(404).json({
            // پیام خطا مبنی بر عدم وجود کاربر با این شناسه
            message: "کاربری با این شناسه یافت نشد",
        });
        // خروج از تابع برای جلوگیری از ادامه اجرا
        return;
    }
    // شناسه آهنگ از پارامترهای URL (تبدیل به string برای رفع خطای تایپ)
    const songId = req.params.id;
    // بررسی اینکه آیا شناسه آهنگ مورد نظر در لیست پخش کاربر وجود دارد یا خیر
    if (user.playlist.includes(songId)) {
        // پیدا کردن ایندکس (موقعیت) آهنگ مورد نظر در آرایه لیست پخش
        const index = user.playlist.indexOf(songId);
        // حذف آهنگ مورد نظر از آرایه لیست پخش (حذف 1 عنصر از ایندکس مشخص شده)
        user.playlist.splice(index, 1);
        // ذخیره تغییرات کاربر در دیتابیس به صورت غیرهمگام (async)
        await user.save();
        // ارسال پاسخ موفقیت‌آمیز به همراه پیام
        res.json({
            // پیام مبنی بر حذف شدن از لیست پخش
            message: "لیست پخش حذف شد",
        });
        // خروج از تابع
        return;
    }
    // اگر آهنگ در لیست نبود، آن را به انتهای لیست اضافه می‌کنیم
    user.playlist.push(songId);
    // ذخیره تغییرات کاربر در دیتابیس
    await user.save();
    // ارسال پاسخ موفقیت‌آمیز برای افزودن آهنگ
    res.json({
        message: "لیست پخش اضافه شد",
    });
});
//# sourceMappingURL=controoler.js.map