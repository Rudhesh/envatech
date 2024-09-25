
// import { query } from "@/utils/dbs";
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//       // Query to fetch data from `envotech.DataPartition`
//       const users = await query({
//         query: 'SELECT * FROM envotech.DataPartition', // Same key `query` for the query string
//         values: [],
//       });
  
//       // Convert the result to JSON
//       const data = JSON.stringify(users);
  
//       // Return the response with the data
//       return NextResponse.json(data, { status: 200 });
//     } catch (error) {
//       console.error('Failed to fetch users:', error);
//       return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
//     }
//   }
import Datapoint from "@/models/DataPoint";

import connect from "@/utils/db";
import { disconnect } from "mongoose";
import { NextResponse } from "next/server";


export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connect();
    const data = await Datapoint.find();
    console.log({data})
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await disconnect();
  }
};

