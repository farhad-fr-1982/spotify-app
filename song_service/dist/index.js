import express from 'express';
import dotenv from 'dotenv';
import songRoutes from './routes.js';
import redis from 'redis';
dotenv.config();
export const redisClient = redis.createClient({
    password: 'f6fbRbmIqwDjhE5QHxymbyhRuWWMHB6g',
    socket: {
        host: 'redis-10657.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 10657,
        tls: true,
    },
});
const app = express();
app.use(express.json());
//* مسیر اصلی آهنگها
app.use('/api/v1', songRoutes);
const port = process.env.PORT || 8000;
const startServer = async () => {
    app.listen(port, () => {
        console.log(`✅ Server started on http://localhost:${port}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map