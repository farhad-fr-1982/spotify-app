import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './route.js'

dotenv.config()

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "spotifyDB",
    });
    console.log('✅ Mongoose DB Connected')
  } catch (error) {
    console.log(error);
  }
};

const app = express()

app.get('/',(req,res)=>{
    res.send('Server is runing')
})

app.use('/api/v1',userRoute)

const port = process.env.PORT || 5000

const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
  })
}

startServer()