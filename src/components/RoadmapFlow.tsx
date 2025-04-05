
import React from "react";
import RoadmapFlowchart from "./RoadmapFlowchart";

interface RoadmapFlowProps {
  courseId: string;
}

const RoadmapFlow: React.FC<RoadmapFlowProps> = ({ courseId }) => {
  return (
    <div className="py-4">
      <RoadmapFlowchart roadmapId={courseId} />
    </div>
  );
};

export default RoadmapFlow;
