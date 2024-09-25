// lib/mongodb.ts
import { MongoClient } from 'mongodb';

// Remove the default assignment of uri and dbName
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase(uri: any, dbName: string) {
  // If cached client and db exist, return cached connection
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Ensure that the URI is provided
  if (!uri) {
    throw new Error('MongoDB URI is required');
  }

  // Create a new MongoClient and connect
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("");

  // Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
