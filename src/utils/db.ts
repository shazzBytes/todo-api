import mongoose from "mongoose";

async function connectDB () {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    throw new Error("A critical value is missing from environment: MONGODB_URI")
  }
  mongoose.set("strictQuery", true);

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error: ", err);
  });
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected");
}

export default connectDB;
