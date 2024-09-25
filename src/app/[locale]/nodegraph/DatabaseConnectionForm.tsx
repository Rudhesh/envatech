"use client";
import React, { useState } from "react";
import EditPanel from "../panel/editPanel";

const DatabaseConnectionForm = () => {
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [dataName, setdataName] = useState<any[]>([]); // Store fetched table data

  const handleConnect = async (e: { preventDefault: () => void }) => {
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
      console.log(dbCredentials);

      if (response.ok) {
        const result = await response.json();
        console.log(result.data);
        setdataName(result.data);
        console.log(dataName);
        console.log("Connection successful");
        // Handle success (e.g., redirect to a dashboard)
      } else {
        console.error("Failed to connect to the database");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // If dataName has items, dynamically get the first row's keys
  const datapartition = dataName.length > 0 ? Object.keys(dataName[0])[0] : "";
  const firstRowValue = dataName.length > 0 ? dataName[0][datapartition] : "";
  
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    if (!datapartition) {
      setError('Please enter a table name');
      return;
    }

    try {
      const response = await fetch(`/api/connectDatabase?tableData=${firstRowValue}`);
      const result = await response.json();
console.log("fet",result.data, `/api/connectDatabase?tableData=${firstRowValue}`)
      if (result.success) {
        setData(result.data); // Set the returned rows
        setError(''); // Clear any previous error
      } else {
        setError(result.message);
        setData([]); // Clear data if there's an error
      }
    } catch (err) {
      setError('Failed to fetch data');
      setData([]);
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
      {firstRowValue && <div>Data Partition: {firstRowValue}</div>}

      <button onClick={fetchData}>Fetch Data</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Table Data:</h3>
      <ul>
        {data.map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
      <EditPanel data={data} />
    </>
  );
};

export default DatabaseConnectionForm;
