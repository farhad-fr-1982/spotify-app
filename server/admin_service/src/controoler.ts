import type { Request } from "express";
import TryCatch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import { v2 as cloudinary } from 'cloudinary'
import { sql } from "./config/db.js";
import { redisClient } from "./index.js";

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

    const result = await sql`INSERT INTO albums (title, description, thumbnail) VALUES (${title}, ${description}, ${cloud.secure_url}) RETURNING * `;

    if (redisClient.isReady) {
        await redisClient.del("albums");
        console.log("کش آلبوم‌ها پاک شد");
    }

    res.json({
        message: "آلبوم با موفقیت ساخته شد",
        album: result[0],
    });
});


export const addSong = TryCatch(async (req: AuthenticatedRequest, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "شما دسترسی ادمین ندارید",
        });
        return;
    }

    const { title, description, album } = req.body;

    const isAlbum = await sql`SELECT * FROM albums WHERE id = ${album}`;

    if (isAlbum.length === 0) {
        res.status(404).json({
            message: "آلبومی با این شناسه پیدا نشد",
        });
        return;
    }

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
        folder: "songs",
        resource_type: 'video'
    });

    const result = await sql`
    INSERT INTO songs (title, description, audio, album_id) 
    VALUES (${title}, ${description}, ${cloud.secure_url}, ${album})`;

    if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("کش آهنگ ها پاک شد");
    }

    res.json({
        message: "آهنگ با موفقیت ساخته شد",
    });
})

//* تایع آپلود عکس
export const addThumbnail = TryCatch(async (req: AuthenticatedRequest, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "شما دسترسی ادمین ندارید",
        });
        return;
    }

    const song = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`;

    if (song.length === 0) {
        res.status(404).json({
            message: "آهنگی با این شناسه پیدا نشد",
        });
        return;
    }

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

    const cloud = await cloudinary.uploader.upload(fileBuffer);

    const result = await sql`
    UPDATE songs 
    SET thumbnail = ${cloud.secure_url} 
    WHERE id = ${req.params.id} 
    RETURNING * `;

    if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("کش آهنگ ها پاک شد");
    }

    res.json({
        message: "کاور با موفقیت اضافه شد",
        song: result[0],
    });

})

export const deleteAlbum = TryCatch(async (req: AuthenticatedRequest, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "شما دسترسی ادمین ندارید",
        });
        return;
    }

    const { id } = req.params

    const isAlbum = await sql`SELECT * FROM albums WHERE id = ${id}`;

    if (isAlbum.length === 0) {
        res.status(404).json({
            message: "آلبومی با این شناسه پیدا نشد",
        });
        return;
    }

    await sql`DELETE FROM songs WHERE album_id = ${id}`;

    await sql`DELETE FROM albums WHERE id = ${id}`;

    if (redisClient.isReady) {
        await redisClient.del("albums");
        console.log("کش آلبوم‌ها پاک شد");
    }

    if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("کش آهنگ ها پاک شد");
    }

    res.json({
        message: "آلبوم با موفقیت حذف شد",
    });
})

export const deleteSong = TryCatch(async (req: AuthenticatedRequest, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "شما دسترسی ادمین ندارید",
        });
        return;
    }

    const { id } = req.params

    const song = await sql`SELECT * FROM songs WHERE id = ${id}`;

    if (song.length === 0) {
        res.status(404).json({
            message: "آهنگی با این شناسه پیدا نشد",
        });
        return;
    }

    await sql`DELETE FROM songs WHERE id = ${id}`;

    if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("کش آهنگ ها پاک شد");
    }

    res.json({
        message: "آهنگ با موفقیت حذف شد",
    });
})


