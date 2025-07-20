import {Ratelimit} from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"
dotenv.config()


// rate limiter code

const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(40,"40 s")
})



export default rateLimit