const { PrismaClient } = require('@prisma/client');
const config = require('./config');

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };