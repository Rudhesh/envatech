
// import { query } from "@/utils/dbs";
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//       // Query to fetch data from `envotech.DataPartition`
//       const users = await query({
//         query: 'SELECT * FROM sql7730863.DataPartition', // Same key `query` for the query string
//         values: [],
//       });
  
//       // Convert the result to JSON
//       // const data = JSON.stringify(users);
  
//       // Return the response with the data
//       return NextResponse.json(users, { status: 200 });
//     } catch (error) {
//       console.error('Failed to fetch users:', error);
//       return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
//     }
//   }

import { NextResponse } from 'next/server';

const dummyData = [
  {
    id: 1,
    value: 25,
    time_stamp: "2024-09-08T10:00:00Z",
    min: 15,
    max: "30",
    status: "active",
  },
  {
    id: 2,
    value: 30,
    time_stamp: "2024-09-08T11:00:00Z",
    min: 20,
    max: "40",
    status: "warning",
  },
  {
    id: 3,
    value: 45,
    time_stamp: "2024-09-08T12:00:00Z",
    min: 30,
    max: "60",
    status: "error",
  },
  {
    id: 4,
    value: 20,
    time_stamp: "2024-09-08T13:00:00Z",
    min: 10,
    max: "25",
    status: "inactive",
  },
  {
    id: 5,
    value: 60,
    time_stamp: "2024-09-08T17:00:00Z",
    min: 10,
    max: "25",
    status: "inactive",
  },
];


// GET handler for API route
export async function GET() {
  // Return the treeNodes array as a JSON response
  return NextResponse.json(dummyData);
}
