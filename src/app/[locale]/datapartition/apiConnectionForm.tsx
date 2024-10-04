"use client"; // Ensures the component is client-side
import React, { useEffect, useState } from "react";
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

const ApiConnectionForm = () => {
  const [apiUrl, setApiUrl] = useState(""); // User inputs API URL
  const [data, setData] = useState<any[]>([]); // Store API data
  const [error, setError] = useState<string>(""); // Store any errors
  const [loading, setLoading] = useState(false); // Handle loading state

  const handleConnect = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result); // Store fetched data
      console.log({data})
    } catch (error: any) {
      setError(error.message || "Error fetching data");
      setData([]); // Clear data if there's an error
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };
  console.log({data})
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div>
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Connect to External API</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConnect} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="apiUrl" className="block text-sm font-medium">
                  API URL:
                </label>
                <Input
                  type="text"
                  id="apiUrl"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  required
                  placeholder="Enter the API URL"
                />
              </div>
              <Button type="submit" className="w-full">
                Connect
              </Button>
            </form>
          </CardContent>
        </Card>

        {loading && <p className="mt-4 text-center">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Data table */}
        {data.length > 0 && (
          <>
            <h3 className="text-lg font-medium mt-8 mb-4">API Data</h3>
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
      </div>
    </div>
  );
};

export default ApiConnectionForm;
