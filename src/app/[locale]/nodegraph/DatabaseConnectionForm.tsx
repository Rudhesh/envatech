"use client";
import React, { useState } from "react";

const DatabaseConnectionForm = () => {
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [tableData, setTableData] = useState(""); // Store fetched table data
  const [dataName, setdataName] = useState<any[]>([]); // Store fetched table data

  const handleConnect = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const dbCredentials = {
      host,
      username,
      password,
      database,
    };

    try {
      const response = await fetch("/api/connectDatabase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dbCredentials),
      });
console.log(dbCredentials)

      if (response.ok) {
        const result = await response.json();
        console.log(result.data)
        setdataName(result.data)
        console.log(dataName)
        console.log("Connection successful");
        // Handle success (e.g., redirect to a dashboard)
      } else {
        console.error("Failed to connect to the database");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <form onSubmit={handleConnect}>
      <label>
        Host:
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Database:
        <input
          type="text"
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          required
        />
      </label>

    
      <button type="submit">Connect</button>
    </form>
    <h3>Table Data:</h3>
      <ul>
        {dataName.map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
{/* <h1>{dataName}</h1> */}
    </>
  );
};

export default DatabaseConnectionForm;
