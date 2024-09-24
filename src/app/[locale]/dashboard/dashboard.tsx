"use client";
import React, { useEffect, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "../panel/columns";
import EditPanel from "../panel/editPanel";
import RadarChartGraph from "@/components/panel/RadarChartGraph";
import LineChartGraph from "@/components/panel/LineChartGraph";
import AreaChartGraph from "@/components/panel/AreaChartGraph";
import BarChartGraph from "@/components/panel/BarChartGraph";
import { useRouter } from "next/navigation";

interface Panel {
  id: string | number;
  name: string;
  data: any;
  showGraph?: boolean;
  graphType?: string;
}

const Dashboards = () => {
  const [savedPanels, setSavedPanels] = useState<Panel[]>([]);
  const [layout, setLayout] = useState<Layout[]>([]);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadSavedPanels();
    loadSavedLayout(); // Load layout on page load
  }, []);

  // Load saved panels from localStorage
  const loadSavedPanels = () => {
    const savedPanelsData = localStorage.getItem("savedPanels");
    if (savedPanelsData) {
      const parsedSavedPanels = JSON.parse(savedPanelsData);
      const panelsArray: Panel[] = Object.values(parsedSavedPanels).map((panel) => ({
        ...(panel as Panel),
        showGraph: true,
        graphType: (panel as Panel).graphType || "AreaChart",
      }));
      setSavedPanels(panelsArray);
    }
  };

  // Load saved layout from localStorage
  const loadSavedLayout = () => {
    const savedLayoutData = localStorage.getItem("layout");
    if (savedLayoutData) {
      setLayout(JSON.parse(savedLayoutData));
    } else {
      const defaultLayout = savedPanels.map((panel, index) => ({
        i: panel.id.toString(),
        x: (index * 4) % 12,
        y: Math.floor(index / 3) * 3,
        w: 4,  // Use the saved width (default 400px width)
        h: 3,  
        minW: 4, // Minimum width
        minH: 3, // Minimum height
      }));
      setLayout(defaultLayout);
    }
  };

  // Save layout to localStorage whenever it changes
  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem("layout", JSON.stringify(newLayout));
  };

  const openInPanel = (panelId: string | number) => {
    router.push(`/edit/${panelId}`);
  };

  const toggleDisplay = (panelId: string | number) => {
    setSavedPanels((prevPanels) =>
      prevPanels.map((panel) =>
        panel.id === panelId ? { ...panel, showGraph: !panel.showGraph } : panel
      )
    );
  };

  const deletePanel = (panelId: string | number) => {
    const savedPanelsData = localStorage.getItem("savedPanels");
    if (savedPanelsData) {
      const panels = JSON.parse(savedPanelsData);
      delete panels[panelId];
      localStorage.setItem("savedPanels", JSON.stringify(panels));
      loadSavedPanels();
    }
  };

  const renderGraph = (panel: Panel) => {
    switch (panel.graphType) {
      case "LineChart":
        return <LineChartGraph data={panel.data.filteredData || []} />;
      case "BarChart":
        return <BarChartGraph data={panel.data.filteredData || []} />;
      case "RadarChart":
        return <RadarChartGraph data={panel.data.filteredData || []} />;
      case "AreaChart":
      default:
        return <AreaChartGraph data={panel.data.filteredData || []} />;
    }
  };

  return (
    <>
      {selectedPanel ? (
        <EditPanel data={selectedPanel.data.filteredData || []} name={selectedPanel.name} />
      ) : (
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={500}  // Approx. row height
          width={5000}  // Adjust the width of the grid container for a responsive layout
          onLayoutChange={onLayoutChange} // Update layout on change
          draggableHandle=".card-header"
        >
          {savedPanels.map((panel) => (
            <Card key={panel.id} className="shadow-lg rounded bg-gray-100 dark:bg-slate-800  border">
              <CardHeader className="card-header cursor-move p-3 rounded border">
                <div className="flex justify-between">
                  <CardTitle>{panel.name}</CardTitle>
                  <div className="flex">
                    <Button variant="outline" onClick={() => toggleDisplay(panel.id)}>
                      {panel.showGraph ? "Table" : "Graph"}
                    </Button>
                    <Button variant="destructive" onClick={() => deletePanel(panel.id)}>
                      Delete
                    </Button>
                    <Button onClick={() => openInPanel(panel.id)}>Edit</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                {panel.showGraph ? (
                  renderGraph(panel)
                ) : (
                  <div className="overflow-y-auto h-96 ...">
                    <DataTable columns={columns} data={panel.data.filteredData || []} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </GridLayout>
      )}
    </>
  );
};

export default Dashboards;
