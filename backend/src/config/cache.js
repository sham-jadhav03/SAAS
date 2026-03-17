import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();


const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on("error", (err)=> {
    console.error(err);
})

export default redisClient;