import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
  } catch {
    process.exit(1);
  }
};

export default connectToMongoDB;
