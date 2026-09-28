import express from 'express'
import dotenv from 'dotenv'
import songRoutes from './routes.js'

dotenv.config()

const app = express()
app.use(express.json())

//* مسیر اصلی آهنگها
app.use('/api/v1', songRoutes)

const port = process.env.PORT || 8000

const startServer = async () => {
    app.listen(port, () => {
        console.log(`✅ Server started on http://localhost:${port}`)
    })
}

startServer()