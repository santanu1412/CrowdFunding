const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * It uses the MONGODB_URI environment variable for secure connection strings.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    // Exit the process with failure if the database connection fails
    process.exit(1); 
  }
};

module.exports = connectDB;