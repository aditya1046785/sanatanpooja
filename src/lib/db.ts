import mongoose from "mongoose";

// Global cache maintain karte hain taaki serverless hot-reloads par multiple connections na bane
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  // Runtime check: Check sirf tab hoga jab actual API call aayegi, build time par nahi!
  if (!MONGODB_URI) {
    throw new Error("Kripya Environment Variables me MONGODB_URI define karein.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}