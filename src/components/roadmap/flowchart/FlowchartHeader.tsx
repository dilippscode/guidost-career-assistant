
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutList, ChartBar, ChartPie, ChartLine } from "lucide-react";

interface FlowchartHeaderProps {
  viewType: string;
}

const FlowchartHeader: React.FC<FlowchartHeaderProps> = ({ viewType }) => {
  return (
    <div className="p-3">
      <h3 className="text-lg font-medium mb-2">Roadmap Visualization</h3>
      <TabsList>
        <TabsTrigger value="flow" className="flex items-center gap-1">
          <LayoutList size={16} />
          Flow
        </TabsTrigger>
        <TabsTrigger value="chart" className="flex items-center gap-1">
          <ChartBar size={16} />
          Chart
        </TabsTrigger>
        <TabsTrigger value="distribution" className="flex items-center gap-1">
          <ChartPie size={16} />
          Distribution
        </TabsTrigger>
        <TabsTrigger value="timeline" className="flex items-center gap-1">
          <ChartLine size={16} />
          Timeline
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default FlowchartHeader;
