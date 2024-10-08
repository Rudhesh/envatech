"use client";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SearchBar from "@/components/panel/searchBar";
import AbsoluteTimeRange from "@/components/panel/absoluteTimeRange";
import Graph from "@/components/panel/Graph";
import { DataTable } from "@/components/data-table";
import Sidebar from "@/components/panel/Sidebar";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilteredData } from "@/features/data/filterDataSlice";
import AreaChartGraph from "@/components/panel/AreaChartGraph";
import LineChartGraph from "@/components/panel/LineChartGraph";
import BarChartGraph from "@/components/panel/BarChartGraph";
import GraphTypeButtons from "@/components/ui/graphTypeButtons";
import RadarChartGraph from "@/components/panel/RadarChartGraph";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DataPoint {
  id: number;
  value: number;
  time_stamp: string;
  min: number;
  max: string;
  status: string;
}

interface GraphProps {
  data: DataPoint[];
  name?: string;
}

const EditPanel: React.FC<GraphProps> = ({ data, name }) => {
  const router = useRouter();

  const [originalData, setOriginalData] = useState<any[]>([]);
  const [graphType, setGraphType] = useState("AreaChart");
  const [showTable, setShowTable] = useState(true); // New state to toggle the table
  // const [showData, setShowData] = useState(false); // New state to control data visibility
  const [savedPanels, setSavedPanels] = useState<any[]>([]);
  const [selectedPanel, setSelectedPanel] = useState<any | null>(null); // State to store the selected panel

  const filterData = useAppSelector((state) => state.filterData);

  const dispatch = useAppDispatch();

  // const showData = () => {
  //   setOriginalData(data);
  //   dispatch(setFilteredData(data));
  // };

  // useEffect(() => {
  //   setOriginalData(data);
  //   dispatch(setFilteredData(data));
  // }, [data, dispatch]);

  const [panelName, setPanelName] = useState("");
  useEffect(() => {
    const savedPanel = localStorage.getItem("savedPanel");
    if (savedPanel) {
      const parsedPanel = JSON.parse(savedPanel);
      setPanelName(parsedPanel.name);
      setFilteredData(parsedPanel.data);
      setGraphType(parsedPanel.graphType); // Set graphType from saved panel
    }
  }, [data]);

  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleSavePanel = () => {
    const uniqueId = generateUniqueId();
    const newPanel = {
      id: uniqueId,
      name: panelName,
      data: filterData || data,
      graphType, // Save the selected graph type
    };

    const savedPanels = JSON.parse(localStorage.getItem("savedPanels") || "{}");
    savedPanels[uniqueId] = newPanel;
    localStorage.setItem("savedPanels", JSON.stringify(savedPanels));

    router.push("/dashboard");
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleClearSavedPanel = () => {
    localStorage.removeItem("savedPanel");
  };

  // const handleSearch = (query: string) => {
  //   const filtered = originalData.filter(
  //     (item) =>
  //       item.id.toString().includes(query) ||
  //       item.value.toString().includes(query) ||
  //       item.time_stamp.includes(query)
  //   );
  //   dispatch(setFilteredData(filtered));
  // };

  useEffect(() => {
    loadSavedPanels();
  }, []);

  // Load saved panels from localStorage
  const loadSavedPanels = () => {
    const savedPanelsData = localStorage.getItem("savedPanels");
    if (savedPanelsData) {
      const parsedSavedPanels = JSON.parse(savedPanelsData);
      const panelsArray: any[] = Object.values(parsedSavedPanels).map((panel) => ({
        ...(panel as any),
        showGraph: true,
        graphType: (panel as any).graphType || "AreaChart",
      }));
      setSavedPanels(panelsArray);
    }
  };


  const handleSearch = (query: string) => {
    const filteredPanels = savedPanels.filter(
      (panel) =>
        panel.name.toLowerCase().includes(query.toLowerCase()) ||
        panel.id.toString().includes(query)
    );
    if (filteredPanels.length > 0) {
      const firstMatchedPanel = filteredPanels[0]; // Select the first matched panel
      setSelectedPanel(firstMatchedPanel); // Set the selected panel to be displayed
      dispatch(setFilteredData(firstMatchedPanel.data)); // Set the data of the selected panel
      setGraphType(firstMatchedPanel.graphType || "AreaChart"); // Set the graph type
    }
  };


  const handleTimeRange = (startTime: string, endTime: string) => {
    const filtered = originalData.filter(
      (item) =>
        new Date(item.time_stamp) >= new Date(startTime) &&
        new Date(item.time_stamp) <= new Date(endTime)
    );
    dispatch(setFilteredData(filtered));
  };

  
  // const renderGraph = () => {
   
  //   switch (graphType) {
  //     case "LineChart":
  //       return <LineChartGraph data={filterData.filteredData} />;
  //     case "BarChart":
  //       return <BarChartGraph data={filterData.filteredData} />;
  //     case "RadarChart":
  //       return <RadarChartGraph data={filterData.filteredData} />;
  //     case "AreaChart":
  //     default:
  //       return <AreaChartGraph data={filterData.filteredData} />;
  //   }
  // };

  const renderGraph = () => {
    if (!selectedPanel) {
         switch (graphType) {
      case "LineChart":
        return <LineChartGraph data={filterData.filteredData || data} name ={name || "No Name"} />;
      case "BarChart":
        return <BarChartGraph data={filterData.filteredData || data} />;
      case "RadarChart":
        return <RadarChartGraph data={filterData.filteredData || data} />;
      case "AreaChart":
      default:
        return <AreaChartGraph data={filterData.filteredData || data} />;
    }
    }

    switch (selectedPanel.data.graphType) {
      case "LineChart":
        return <LineChartGraph data={selectedPanel.data.filteredData}  name ={selectedPanel.name || "No Name"} />;
      case "BarChart":
        return <BarChartGraph data={selectedPanel.data.filteredData} />;
      case "RadarChart":
        return <RadarChartGraph data={selectedPanel.data.filteredData} />;
      case "AreaChart":
      default:
        return <AreaChartGraph data={selectedPanel.data.filteredData}  name ={selectedPanel.name || "No Name"} />;
    }
  };


  return (
    <div className="dark:text-white flex h-screen border">
      <ResizablePanelGroup direction="horizontal" className="max-w-screen">
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <div className="flex justify-between items-center border p-2 ">
              {name ? (
                <Input
                  type="text"
                  placeholder="Enter New Panel Name"
                  value={name}
                  onChange={(e) => setPanelName(e.target.value)}
                  style={{ width: "200px" }} // Remove borders
                />
              ) : null}
              <Input
                type="text"
                placeholder="Enter Panel Name"
                value={panelName}
                onChange={(e) => setPanelName(e.target.value)}
                style={{ width: "200px" }}
              />

              <div className="flex">
                {/* <div className="mr-4">
                  <Button
                    onClick={showData} // Toggle showData state
                    variant="outline"
                  >
                    Add dummy data
                  </Button>
                  <Button
                    onClick={() => setShowTable((prev) => !prev)} // Toggle the state
                    variant="outline"
                  >
                    {showTable ? "Hide Table" : "Show Table"}
                  </Button>
                </div> */}
                <div className="mr-4">
                  <SearchBar onSearch={handleSearch} />
                </div>
                <AbsoluteTimeRange onApply={handleTimeRange} />
              </div>
            </div>

            <ResizablePanel defaultSize={65}>
              <Card className=" p-2 ">{renderGraph()}</Card>
            </ResizablePanel>
            <ResizableHandle withHandle />

            {showTable && (
              <ResizablePanel defaultSize={35}>
                <Card
                  className="p-4"
                  style={{ height: "100%", overflow: "auto" }}
                >
                  <DataTable columns={columns} data={filterData.filteredData} />
                </Card>
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <div className="">
            <div className="flex justify-between items-center border p-2">
              {/* <Button variant="outline" className="px-4 py-2">
                Share
              </Button> */}
              <h3 className="text-lg font-semibold">Visualization</h3>
              <div>
                <Button
                  onClick={handleClearSavedPanel}
                  variant="outline"
                  className="mx-1"
                >
                  Discard
                </Button>
                <Button
                  onClick={handleSavePanel}
                  variant="outline"
                  className="mx-1"
                >
                  Save
                </Button>
                <Button onClick={handleDashboard}>Back</Button>
              </div>
            </div>
            <GraphTypeButtons
              graphType={graphType}
              setGraphType={setGraphType}
            />
            <Sidebar />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditPanel;
