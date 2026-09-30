import 'dotenv/config'
import express from 'express'
import { sql } from './config/db.js'
import adminRoutes from './route.js'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
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

cloudinary.config({
  cloud_name: process.env.Cloud_Name as string,
  api_key: process.env.Cloud_Api_Key as string,
  api_secret: process.env.Cloud_Api_Secret as string,
})

const app = express()

app.use(cors())

app.use(express.json())

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS albums(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        thumbnail VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS songs(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        thumbnail VARCHAR(255),
        audio VARCHAR(255) NOT NULL,
        album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initDB:', error);
    throw error;
  }
}

//* مسیر روت اصلی بخش سرویس ادمین
app.use('/api/v1', adminRoutes)

const port = process.env.PORT || 7000

const startServer = async () => {
  await initDB();
  app.listen(port, () => {
    console.log(`✅ Server started on http://localhost:${port}`)
  })
}

startServer()