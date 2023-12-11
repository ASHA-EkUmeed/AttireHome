import User from './models/userModel.js';
import dotenv from 'dotenv';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import users from './data/users.js';
import products from './data/products.js';
import Product from './models/productModel.js';

dotenv.config();

// Connect to the MongoDB database
connectDB();

const importData = async () => {
  try {
        // Delete existing data in the database

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    // success and exit 

    console.log('Data Imported!'.inverse);
    process.exit();
  } catch (error) {
        // errors and exit 

    console.error(`${error}`.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
