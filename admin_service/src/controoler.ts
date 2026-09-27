import type { Request } from "express";
import TryCatch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import { v2 as cloudinary } from 'cloudinary'
import { sql } from "./config/db.js";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
        role: string;
    };
}

export const addAlbum = TryCatch(async (req: AuthenticatedRequest, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "شما دسترسی ادمین ندارید",
        });
        return;
    }

    const { title, description } = req.body;

    const file = req.file;

    if (!file) {
        res.status(400).json({
            message: "فایلی برای آپلود ارسال نشده است",
        });
        return;
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer) {
        res.status(500).json({
            message: "Failed to generate file buffer",
        });
        return;
    }

    const cloud = await cloudinary.uploader.upload(fileBuffer, {
        folder: "albums",
    });

    const result = await sql`
    INSERT INTO albums (title, description, thumbnail) 
    VALUES (${title}, ${description}, ${cloud.secure_url}) 
    RETURNING * `;

    res.json({
        message: "آلبوم با موفقیت ساخته شد",
        album: result[0],
    });
});