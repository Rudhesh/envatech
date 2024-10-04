"use client";
import React, { useEffect, useState } from "react";
import EditPanel from "../panel/editPanel";
import { useAppDispatch } from "@/redux/hooks";
import { setFilteredData } from "@/features/data/filterDataSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

const DatabaseConnectionForm = () => {
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [dataName, setDataName] = useState<any[]>([]); // Store fetched table data
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const handleConnect = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const dbCredentials = {
      host,
      username,
      password,
      database,
    };
console.log({dbCredentials})
    try {
      const response = await fetch("/api/connectDatabase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dbCredentials),
      });

      if (response.ok) {
        const result = await response.json();
        setDataName(result.data);
        console.log(dataName)
        console.log("Connection successful");
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
console.log({firstRowValue})
  const fetchData = async () => {
    if (!datapartition) {
      setError("Please enter a table name");
      return;
    }

    try {
      const response = await fetch(
        `/api/connectDatabase?tableData=${firstRowValue}`
      );
      const result = await response.json();

      if (result.success) {
        setData(result.data); // Set the returned rows
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
            <CardTitle className="text-2xl font-semibold ">
           Connect to SQL Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConnect} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="host">Host</Label>
                  <Input
                    type="text"
                    id="host"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    placeholder="Enter host address"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="database">Database</Label>
                  <Input
                    type="text"
                    id="database"
                    value={database}
                    onChange={(e) => setDatabase(e.target.value)}
                    placeholder="Enter database name"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4 w-full">
                Connect to Database
              </Button>
            </form>
          </CardContent>
        </Card>
        {dataName.length > 0 && (
          <>
            <h3 className="text-lg font-medium mt-8 mb-4">
              Table Data Preview
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
            <Button className="mt-4" onClick={fetchData}>
              Fetch Full Data
            </Button>
          </>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {data.length > 0 && (
          <>
            <h3 className="text-lg font-medium mt-8 mb-4">Full Data</h3>
            <div className="overflow-x-auto">
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
      </div>
    </div>
  );
};

export default DatabaseConnectionForm;
