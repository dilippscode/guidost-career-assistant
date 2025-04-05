
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChartBar, ChartLine, ChartPie } from "lucide-react";
import FlowChart from "./FlowChart";
import ChartPlaceholder from "./ChartPlaceholder";
import FlowchartHeader from "./FlowchartHeader";

interface RoadmapFlowchartProps {
  roadmapId: string;
}

const RoadmapFlowchart: React.FC<RoadmapFlowchartProps> = ({ roadmapId }) => {
  const [viewType, setViewType] = useState("flow");

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100">
      <Tabs value={viewType} onValueChange={setViewType} className="w-full">
        <FlowchartHeader viewType={viewType} />

        <TabsContent value="flow" className="m-0">
          <FlowChart roadmapId={roadmapId} />
        </TabsContent>

        <TabsContent value="chart">
          <ChartPlaceholder 
            icon={ChartBar} 
            title="Progress Chart" 
            description="Visualize your progress through the roadmap stages" 
          />
        </TabsContent>

        <TabsContent value="distribution">
          <ChartPlaceholder 
            icon={ChartPie} 
            title="Skill Distribution" 
            description="See how skills are distributed across different categories" 
          />
        </TabsContent>

        <TabsContent value="timeline">
          <ChartPlaceholder 
            icon={ChartLine} 
            title="Learning Timeline" 
            description="View estimated completion times for each stage" 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoadmapFlowchart;
