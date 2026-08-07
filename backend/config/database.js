import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDatabase = async () => {
  if (!connectionString) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongooseInstance) => {
        console.log('Connected to MongoDB with Mongoose');
        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDatabase;
