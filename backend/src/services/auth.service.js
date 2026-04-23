const { prisma } = require('../config/db');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { redisClient } = require('../config/redis');

async function register({ username, email, password }) {
    if (!username || !email || !password) {
        throw new Error("All fields are required");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);


    // Store refresh token in Redis with an expiration time
    await redisClient.set(`refreshToken:${user.id}`, refreshToken, {
        EX: 7 * 24 * 60 * 60 // 7 days
    });

    const newUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }


    return { user: newUser, accessToken, refreshToken };
}


async function login({email,password}){
    if(!email || !password){
        throw new Error("All fields are required");
    }

    const userExisting = await prisma.user.findUnique({
        where:{email}
    });

    if(!userExisting){
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, userExisting.password);

    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(userExisting.id);
    const refreshToken = generateRefreshToken(userExisting.id);

    // Store refresh token in Redis with an expiration time
    await redisClient.set(`refreshToken:${userExisting.id}`, refreshToken, {
        EX: 7 * 24 * 60 * 60 // 7 days
    });

    const user = {
        id: userExisting.id,
        username: userExisting.username,
        email: userExisting.email,
        createdAt: userExisting.createdAt,
        updatedAt: userExisting.updatedAt
    }

    return { user, accessToken, refreshToken };

}


module.exports = {
    register,
    login,
};