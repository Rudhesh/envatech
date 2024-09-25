import { connectToDatabase } from '@/lib/mongodb';
// import { NextResponse } from 'next/server';

// // POST method to set connection details and fetch collection names
// export async function POST(request: Request) {
//   try {
//     const { database } = await request.json();
//     const { db } = await connectToDatabase();
// console.log({database})
//     // Fetch collection names
//     const collections = await db.listCollections().toArray();
// console.log(collections)
//     return NextResponse.json({ success: true, data: collections });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error });
//   }
// }

// // GET method to fetch data from a specified collection
// export async function GET(request: Request) {
//   try {
//     // Extract collection name from query parameters
//     const { searchParams } = new URL(request.url);
//     const collectionName = searchParams.get('collectionName');
// console.log({collectionName})
//     if (!collectionName) {
//       return NextResponse.json({ success: false, message: 'Collection name is required' });
//     }

//     // Connect to the database
//     const { db } = await connectToDatabase();

//     // Fetch documents from the collection
//     const data = await db.collection(collectionName).find({}).toArray();
// console.log({data})
//     return NextResponse.json({ success: true, data });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: 'Database connection failed', error: error });
//   }
// }


import datapoints from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { disconnect } from "mongoose";
import { NextResponse } from "next/server";

// export const POST = async (request: any) => {
//   const { realname, role, email, password } = await request.json();

//   await connect();

//   const existingUser = await datapoints.findOne({ email });

//   if (existingUser) {
//     return new NextResponse("Email is already in use", { status: 400 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 5);
//   const newUser = new datapoints({
//     realname,
//     role,
//     email,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     return new NextResponse("user is registered", { status: 200 });
//   } catch (err: any) {
//     return new NextResponse(err, {
//       status: 500,
//     });
//   }
// };

export async function POST(request: Request) {
  try {
    const { database } = await request.json();
    const { db } = await connectToDatabase();
console.log({database})
    // Fetch collection names
    const collections = await db.listCollections().toArray();
console.log(collections)
    return NextResponse.json({ success: true, data: collections });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connect();
    const users = await datapoints.find();
    return NextResponse.json({ message: "Success", users }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await disconnect();
  }
};

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await datapoints.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}