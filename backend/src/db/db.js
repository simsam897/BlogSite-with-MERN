import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
