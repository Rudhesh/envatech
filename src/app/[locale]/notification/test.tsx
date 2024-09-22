"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AreaChartGraph from "@/components/panel/AreaChartGraph"; // or your graph component
import Sidebar from "@/components/panel/Sidebar"; // Sidebar to hold panel options
import GraphTypeButtons from "@/components/ui/graphTypeButtons"; // Toggle for Graph Types
import { DataTable } from "@/components/data-table"; // Table component
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"; // Resizable Layout components
import { columns } from "../panel/columns";

const EditPanel = () => {
  const [panelName, setPanelName] = useState("CPU Usage");
  const [graphType, setGraphType] = useState("AreaChart");
  const [data, setData] = useState([]); // Dummy data for chart

  useEffect(() => {
    // Mock data fetching for the graph
    const mockData:any = [
      { id: 1, value: 10, time_stamp: "10:00" },
      { id: 2, value: 12, time_stamp: "10:10" },
      { id: 3, value: 8, time_stamp: "10:20" },
      { id: 4, value: 15, time_stamp: "10:30" },
    ];
    setData(mockData);
  }, []);

  // Dummy save panel functionality
  const handleSavePanel = () => {
    console.log("Panel Saved!");
  };

  // Function to render the graph
  const renderGraph = () => {
    switch (graphType) {
      case "AreaChart":
        return <AreaChartGraph data={data} />;
      default:
        return <AreaChartGraph data={data} />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Panel Options</h2>
        <div className="space-y-4">
          {/* Dummy expandable options */}
          <Button className="w-full bg-gray-700">Panel Options</Button>
          <Button className="w-full bg-gray-700">Graph Styles</Button>
          <Button className="w-full bg-gray-700">Axis</Button>
          <Button className="w-full bg-gray-700">Tooltip</Button>
          <Button className="w-full bg-gray-700">Thresholds</Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          <Input
            type="text"
            placeholder="Enter Panel Name"
            value={panelName}
            onChange={(e) => setPanelName(e.target.value)}
            className="w-1/2"
          />
          <div className="space-x-2">
            <Button variant="outline">Discard</Button>
            <Button variant="outline" onClick={handleSavePanel}>Save</Button>
            <Button >Apply</Button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-4">
          {renderGraph()}
        </div>

        {/* Data Table */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Data Preview</h3>
          <DataTable columns={columns} data={data} />
        </div>

        {/* Graph Type Switcher */}
        <div className="mt-4">
          <GraphTypeButtons graphType={graphType} setGraphType={setGraphType} />
        </div>

        {/* Query Section */}
        <div className="mt-8 bg-gray-200 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Query</h3>
          <p>Query settings will go here (e.g., time range, data source selection).</p>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
