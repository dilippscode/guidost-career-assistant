
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChartBar, ChartLine, ChartPie } from "lucide-react";
import FlowChart from "./FlowChart";
import ChartPlaceholder from "./ChartPlaceholder";
import FlowchartHeader from "./FlowchartHeader";
import ThemeSelector from "./ThemeSelector";

interface RoadmapFlowchartProps {
  roadmapId: string;
}

const RoadmapFlowchart: React.FC<RoadmapFlowchartProps> = ({ roadmapId }) => {
  const [viewType, setViewType] = useState("flow");
  const [colorTheme, setColorTheme] = useState("default");

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100">
      <Tabs value={viewType} onValueChange={setViewType} className="w-full">
        <div className="flex justify-between items-center border-b">
          <FlowchartHeader viewType={viewType} />
          {viewType === "flow" && (
            <div className="pr-4">
              <ThemeSelector 
                currentTheme={colorTheme} 
                onThemeChange={setColorTheme} 
              />
            </div>
          )}
        </div>

        <TabsContent value="flow" className="m-0">
          <FlowChart roadmapId={roadmapId} theme={colorTheme} />
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
