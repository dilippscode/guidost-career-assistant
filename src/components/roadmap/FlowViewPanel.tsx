
import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoadmapFlow from "@/components/RoadmapFlow";
import { roadmaps } from "@/data/roadmapsData";

interface FlowViewPanelProps {
  selectedRoadmap: string;
  setSelectedRoadmap: (id: string) => void;
}

const FlowViewPanel: React.FC<FlowViewPanelProps> = ({
  selectedRoadmap,
  setSelectedRoadmap,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4 p-4 border-b">
        <BookOpen className="text-guidost-500" size={20} />
        <h2 className="text-xl font-semibold text-gray-800">Interactive Course Roadmaps & Charts</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-4 py-3">
        {roadmaps.slice(0, 6).map((roadmap) => (
          <Button 
            key={roadmap.id} 
            variant={selectedRoadmap === roadmap.id ? "default" : "outline"}
            className={selectedRoadmap === roadmap.id ? "bg-guidost-500" : ""}
            onClick={() => setSelectedRoadmap(roadmap.id)}
          >
            {roadmap.title}
          </Button>
        ))}
      </div>
      
      <RoadmapFlow courseId={selectedRoadmap} />
      
      <div className="mt-4 text-sm text-gray-500 p-4 border-t">
        <p>
          <strong>Note:</strong> Switch between different chart types using the tabs. You can drag nodes, zoom in/out, and click on connections in the roadmap view.
        </p>
      </div>
    </div>
  );
};

export default FlowViewPanel;
