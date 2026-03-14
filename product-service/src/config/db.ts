import mongoose from 'mongoose';

const connectDatabase = () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/product-service';

  try {
     mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error: any) {
    console.error('MongoDB connection failed:', error);
    // process.exit(1); // Exit the process on failure
  }
};

export default connectDatabase;
