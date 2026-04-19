const config = require("./config");
const { createClient } = require("redis");

const redisClient = createClient({
    url: config.redisUrl,
});

redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

async function connectRedis() {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("Failed to connect to Redis", err);
        process.exit(1);
    }
}

module.exports = {
    redisClient,
    connectRedis,
};