
import React from "react";
import RoadmapFlowchartComponent from "@/components/roadmap/flowchart/RoadmapFlowchart";

interface RoadmapFlowchartProps {
  roadmapId: string;
}

const RoadmapFlowchart: React.FC<RoadmapFlowchartProps> = ({ roadmapId }) => {
  return <RoadmapFlowchartComponent roadmapId={roadmapId} />;
};

export default RoadmapFlowchart;
