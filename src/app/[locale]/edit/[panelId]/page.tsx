"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditPanel from "../../panel/editPanel";


interface EditPanelPageProps {
  params: { panelId: string };
}
const EditPanelPage = ({ params }: EditPanelPageProps) => {
  //  const router = useRouter();
  //  const { panelId } = router.query;  // Get the panel ID from the URL
  const { panelId } = params;

  const [panelData, setPanelData] = useState<any>(null);

  useEffect(() => {
    if (panelId) {
      const id = Array.isArray(panelId) ? panelId[0] : panelId; // Handle string[] or string
      loadPanelData(id);
    }
  }, [panelId]);


  const loadPanelData = (id: string | number) => {
    const savedPanelsData = localStorage.getItem("savedPanels");
    if (savedPanelsData) {
      const parsedPanels = JSON.parse(savedPanelsData);
      const panelToEdit = parsedPanels[id];
      setPanelData(panelToEdit || null);
    }
  };

  if (!panelData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="py-2">Panel Name: {panelData.name}</h1>
      <EditPanel data={panelData.data.filteredData || []} name={panelData.name} />
      
    </div>
  );
};

export default EditPanelPage;
