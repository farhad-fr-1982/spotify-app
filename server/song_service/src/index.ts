import express from 'express'
import dotenv from 'dotenv'
import songRoutes from './routes.js'
import redis from 'redis'
import cors from 'cors'

dotenv.config()

export const redisClient = redis.createClient({
    password: process.env.Redis_Password as string,
    socket: {
        host: 'redis-10657.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 10657,
    },
});
redisClient.connect()
    .then(() => console.log('✅ Connect To Redis'))
    .catch((error: any) => console.log(error))

const app = express()
app.use(express.json())

app.use(cors())

//* مسیر اصلی آهنگها
app.use('/api/v1', songRoutes)

const port = process.env.PORT || 8000

const startServer = async () => {
    app.listen(port, () => {
        console.log(`✅ Server started on http://localhost:${port}`)
    })
}

startServer()