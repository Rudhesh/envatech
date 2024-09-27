"use client";
import React, { useEffect, useState } from "react";
import EditPanel from "../panel/editPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAppDispatch } from "@/redux/hooks";
import { setFilteredData } from "@/features/data/filterDataSlice";

const DatabaseMongoConnectionForm = () => {
  const [database, setDatabase] = useState(""); // Set default DB from env
  const [uri, setUri] = useState(""); // Set default URI from env
  const [dataName, setDataName] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [originalData, setOriginalData] = useState<any[]>([]);

  const handleConnect = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const dbCredentials = { uri, database };
    console.log({ dbCredentials });
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
        `/api/connectMongoDatabase?collectionName=${firstCollection}&uri=${encodeURIComponent(
          uri
        )}&database=${encodeURIComponent(database)}`
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

  const dispatch = useAppDispatch();
  useEffect(() => {
    setOriginalData(data);
    dispatch(setFilteredData(data));
  }, [data, dispatch]);
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div>
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
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

       
{dataName.length > 0 && (
          <>
            <h3 className="text-lg font-medium mt-8 mb-4">
            Collections:
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(dataName[0]).map((key, idx) => (
                      <TableHead key={idx}>{key}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataName.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((value, idx2) => (
                        <TableCell key={idx2}>
                          {" "}
                          {JSON.stringify(value)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* <Button className="mt-4" onClick={fetchData}>
              Fetch Full Data
            </Button> */}
          </>
        )}


        {firstCollection && (
          <div className="mb-4">
            <h4 className="text-lg font-medium">
              Collection:{" "}
              <span className="font-semibold">{firstCollection}</span>
            </h4>
            <Button onClick={fetchData} className="mt-4">
              Fetch Data
            </Button>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Data table */}
        {data.length > 0 && (
          <>
            <h3 className="text-lg font-medium mt-8 mb-4">Full Data</h3>
            <div className="overflow-x-auto" style={{ width: "70vw" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(data[0]).map((key, idx) => (
                      <TableHead key={idx}>{key}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((value, idx2) => (
                        <TableCell key={idx2}>
                          {" "}
                          {JSON.stringify(value)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {/* {data.length > 0 && <EditPanel data={data} />} */}
      </div>
    </div>
  );
};

export default DatabaseMongoConnectionForm;
