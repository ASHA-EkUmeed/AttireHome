// Connects to a MongoDB database using Mongoose
import mongoose from 'mongoose';

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to the MongoDB database using the provided URI
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Log a success message if the connection is established
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log an error message and exit the process if connection fails
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Export the connectDB function for use in other modules
export default connectDB;

