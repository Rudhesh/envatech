import ServerlessMysql from "serverless-mysql";

const db = ServerlessMysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

export async function query({ query, values = [] }) {
  try {
    // Run the query
    const results = await db.query(query, values);
    // Close the connection
    await db.end();
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error(error.message);
  }
}
