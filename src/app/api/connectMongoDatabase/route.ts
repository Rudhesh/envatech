// api/connectMongoDatabase.ts (or your Next.js API route)
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { uri, database } = await request.json(); // Get URI and database name from the request body
console.log({ uri, database })
    // Ensure that the URI and database name are provided
    if (!uri || !database) {
      return NextResponse.json({
        success: false,
        message: "MongoDB URI and database name are required",
      });
    }

    // Connect to the database using the passed URI and database name
    const { db } = await connectToDatabase(uri, database);

    // Fetch collection names
    const collections = await db.listCollections().toArray();
console.log(collections)
    return NextResponse.json({ success: true, data: collections });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}

// GET method to fetch data from a specified collection
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collectionName = searchParams.get('collectionName');
    const uri = searchParams.get('uri');
    const database = searchParams.get('database');

console.log({collectionName})
    if (!collectionName) {
      return NextResponse.json({ success: false, message: 'Collection name is required' });
    }

    // Assuming the URI and database name are passed in query parameters (you can adjust this)
   
console.log("xx",uri, database)
    if (!uri || !database) {
      return NextResponse.json({
        success: false,
        message: "MongoDB URI and database name are required",
      });
    }

    // Connect to the database
    const { db } = await connectToDatabase(uri, database);

    // Fetch documents from the collection
    const data = await db.collection(collectionName).find({}).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      error: error,
    });
  }
}
