import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  let dbconnection;

  try {
    // Create the database connection
    dbconnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Execute the query
    const [results] = await dbconnection.execute(query, values);

    // Return the query results
    return results;
  } catch (error) {
    // Log the error for debugging
    console.error("Database query error:", error.message);

    // Return or throw the error as needed
    throw new Error(error.message);
  } finally {
    // Ensure the database connection is closed
    if (dbconnection) {
      await dbconnection.end();
    }
  }
}
