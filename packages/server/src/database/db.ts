import mongoose from 'mongoose';

if (!Bun.env.MONGODB_URI) {
  throw new Error('DATABASE_URL is not defined in environment variables.');
}

async function connectDB(): Promise<typeof mongoose> {
  try {
    const mongooseInstance = await mongoose.connect(Bun.env.MONGODB_URI, {
      dbName: Bun.env.DB_NAME,
      maxPoolSize: 10,
    });

    console.log('Database connected');
    return mongooseInstance;
  } catch (err) {
    console.error('Database failed to connect', err);
    throw err;
  }
}

export async function getClient() {
  const conn = await connectDB();
  return conn.connection.getClient().db(Bun.env.DB_NAME);
}
