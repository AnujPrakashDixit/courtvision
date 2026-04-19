const config = require('./src/config/config');
const app = require('./src/app');
const { connectRedis } = require('./src/config/redis');
const { connectDB } = require('./src/config/db');


// Connect to Redis before starting the server
const startServer = async () => {   
    await connectRedis();
    await connectDB();
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
}

startServer();
