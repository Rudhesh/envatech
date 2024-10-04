import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: '',
  user: '',
  password: '',
  database: '',
};

// Connect to MySQL database
async function connectToDatabase(credentials: {
  host: string;
  user: string;
  password: string;
  database: string;
}) {
  try {
    const connection = await mysql.createConnection(credentials);
    console.log('Connected to database');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Failed to connect to the database');
  }
}

// Export a named export for each HTTP method
export async function POST(request: Request) {
  try {
    const { host, username, password, database } = await request.json();
    console.log(host, username, password, database )
    // Update dbConfig with user credentials
    dbConfig.host = host;
    dbConfig.user = username;
    dbConfig.password = password;
    dbConfig.database = database;

    // Connect to the database
    const connection = await connectToDatabase(dbConfig);

    // Example query (fetch tables as an example)
    const [rows] = await connection.query('SHOW TABLES');
    // await connection.end(); // Close the connection

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}



// GET method to fetch data from a specified table
export async function GET(request: Request) {
  try {
    // Extract table name from query parameters (since GET requests don't have a body)
    const { searchParams } = new URL(request.url);
    const tableData = searchParams.get('tableData');
    
    if (!tableData) {
      return NextResponse.json({ success: false, message: 'Table name is required' });
    }

    // Connect to the database using existing dbConfig
    const connection = await connectToDatabase(dbConfig);

    // Construct and execute query dynamically
    const [rows] = await connection.query(`SELECT * FROM ??`, [tableData]);
    console.log(rows)
    await connection.end();

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Database connection failed', error: error });
  }
}