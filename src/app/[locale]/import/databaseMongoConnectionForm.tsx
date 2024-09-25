"use client";
import React, { useState } from "react";
import EditPanel from "../panel/editPanel";

const DatabaseMongoConnectionForm = () => {
  const [database, setDatabase] = useState("");
  const [dataName, setDataName] = useState<any[]>([]); // Store fetched collection data
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const handleConnect = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const dbCredentials = { database };

    try {
      const response = await fetch("/api/connectMongoDatabase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dbCredentials),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.data);
        setDataName(result.data);
      } else {
        console.error("Failed to connect to the database");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // If dataName has items, dynamically get the first collection's name
  const firstCollection = dataName.length > 0 ? dataName[0].name : "";
  const fetchData = async () => {
    if (!firstCollection) {
      setError("Please enter a collection name");
      return;
    }

    try {
      const response = await fetch(`/api/connectMongoDatabase?collectionName=${firstCollection}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data); // Set the returned documents
        setError(""); // Clear any previous error
      } else {
        setError(result.message);
        setData([]); // Clear data if there's an error
      }
    } catch (err) {
      setError("Failed to fetch data");
      setData([]);
    }
  };

  return (
    <>
      <form onSubmit={handleConnect}>
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

      <h3>Collection Data:</h3>
      <ul>
        {dataName.map((collection, index) => (
          <li key={index}>{JSON.stringify(collection)}</li>
        ))}
      </ul>

      {firstCollection && <div>Collection: {firstCollection}</div>}

      <button onClick={fetchData}>Fetch Data</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Collection Documents:</h3>
      <ul>
        {data.map((doc, index) => (
          <li key={index}>{JSON.stringify(doc)}</li>
        ))}
      </ul>

      <EditPanel data={data} />
    </>
  );
};

export default DatabaseMongoConnectionForm;
