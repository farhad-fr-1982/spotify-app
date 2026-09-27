import express from 'express'
import uploadFile, { isAuth } from './middleware .js'
import { addAlbum } from './controoler.js'

const router = express.Router()

//* مسیر روتهای فرعی سرویس ادمین
router.post('/album/new',isAuth,uploadFile,addAlbum)

export default router