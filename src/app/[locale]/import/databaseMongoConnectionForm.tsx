"use client";
import React, { useState } from "react";
import EditPanel from "../panel/editPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const DatabaseMongoConnectionForm = () => {
  const [database, setDatabase] = useState(""); // Set default DB from env
  const [uri, setUri] = useState( ""); // Set default URI from env
  const [dataName, setDataName] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const handleConnect = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const dbCredentials = { uri,database };
console.log({dbCredentials})
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
        console.log("Connected to:", result.data);
        setDataName(result.data);
      } else {
        console.error("Failed to connect to the database");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const firstCollection = database;

  const fetchData = async () => {
    if (!firstCollection) {
      setError("Please enter a collection name");
      return;
    }

    try {
      const response = await fetch(
        `/api/connectMongoDatabase?collectionName=${firstCollection}&uri=${encodeURIComponent(uri)}&database=${encodeURIComponent(database)}`
      );
      const result = await response.json();
      console.log({ result });
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
    <div className="container mx-auto p-4">
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle>Connect to MongoDB Database</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="uri" className="block text-sm font-medium">
                MongoDB URI:
              </label>
              <Input
                type="text"
                id="uri"
                value={uri}
                onChange={(e) => setUri(e.target.value)}
                required
                placeholder="Enter MongoDB URI"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="database" className="block text-sm font-medium">
                Database:
              </label>
              <Input
                type="text"
                id="database"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                required
                placeholder="Enter your database name"
              />
            </div>
            <Button type="submit" className="w-full">
              Connect
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Show collections if available */}
      {dataName.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Collections:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {dataName.map((collection, index) => (
              <li key={index} className="text-sm">
                {JSON.stringify(collection)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {firstCollection && (
        <div className="mb-4">
          <h4 className="text-lg font-medium">
            Collection: <span className="font-semibold">{firstCollection}</span>
          </h4>
          <Button onClick={fetchData} className="mt-4">
            Fetch Data
          </Button>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Data table */}
      {data.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Collection Documents</h3>
          <TableContainer>
            <Table className="min-w-full divide-y dark:text-white border shadow-md">
              <TableHead>
                <TableRow>
                  {/* Dynamically render table headers */}
                  {Object.keys(data[0]).map((key, index) => (
                    <TableCell key={index} className="px-6 py-3 dark:text-white border">
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Dynamically render table rows */}
                {data.map((doc, index) => (
                  <TableRow key={index} className="dark:text-white border">
                    {Object.values(doc).map((value, subIndex) => (
                      <TableCell key={subIndex} className="px-6 py-4 text-sm dark:text-white border">
                        {JSON.stringify(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {data.length > 0 && <EditPanel data={data} />}
    </div>
  );
};

export default DatabaseMongoConnectionForm;
