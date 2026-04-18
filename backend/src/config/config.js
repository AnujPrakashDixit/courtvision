require("dotenv").config();

if(!process.env.DATABASE_URL || !process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET || !process.env.JWT_ACCESS_EXPIRY || !process.env.JWT_REFRESH_EXPIRY || !process.env.PORT|| !process.env.REDIS_URL || !process.env.NODE_ENV) {
    throw new Error("Missing required environment variables. Please check your .env file.");
}

const config = {
    port: process.env.PORT || 8000,
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    node_env: process.env.NODE_ENV || "development",
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY || "15m",
    jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || "7d",
};

module.exports = config;
