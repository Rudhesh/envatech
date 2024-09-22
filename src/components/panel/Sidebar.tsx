// components/Sidebar.tsx

import React from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  return (
   <><aside className=" dark:text-white p-4">
   <h2 className="text-xl font-semibold mb-4">Panel Options</h2>
   <div className="space-y-4">
     {/* Dummy expandable options */}
     <Button className="w-full ">Panel Options</Button>
     <Button className="w-full ">Graph Styles</Button>
     <Button className="w-full ">Axis</Button>
     <Button className="w-full ">Tooltip</Button>
     <Button className="w-full ">Thresholds</Button>
   </div>
 </aside> <Slider
   defaultValue={[50]}
   max={100}
   step={1}
   className={cn("w-[60%]")}
  
 /></>
    
   
  );
};

export default Sidebar;
