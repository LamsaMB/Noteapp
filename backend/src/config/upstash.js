import {Redis} from '@upstash/redis';
import {Ratelimit} from '@upstash/ratelimit';
import dotenv from "dotenv";
dotenv.config();

const rateLimit = await new Ratelimit({
    redis : Redis.fromEnv(),
    limiter : Ratelimit.slidingWindow(5,"10 s"),
    analytics: true //juste pour pouvoir visualiser depuis upstash

})

export default rateLimit; 