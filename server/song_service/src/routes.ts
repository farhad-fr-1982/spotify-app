import express from 'express'
import { getAllAlbum, getAllSongs, getAllSongsOfAlbum, getSingleSong } from './controllers.js';

const router = express.Router()

//* مسیر روتهای فرعی سرویس موسیقی
router.get("/album/all", getAllAlbum);
router.get("/song/all", getAllSongs);
router.get("/album/:id", getAllSongsOfAlbum);
router.get("/song/:id", getSingleSong);


export default router