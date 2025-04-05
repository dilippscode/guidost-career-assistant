
import React from "react";
import RoadmapCard from "@/components/RoadmapCard";
import { Roadmap } from "@/data/roadmapsData";

interface RoadmapGridProps {
  roadmaps: Roadmap[];
  onRoadmapSelect: (id: string) => void;
}

const RoadmapGrid: React.FC<RoadmapGridProps> = ({ roadmaps, onRoadmapSelect }) => {
  if (roadmaps.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">No roadmaps found</h3>
        <p className="text-gray-600">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {roadmaps.map((roadmap) => (
        <RoadmapCard
          key={roadmap.id}
          id={roadmap.id}
          title={roadmap.title}
          description={roadmap.description}
          image={roadmap.image}
          path={roadmap.path}
          difficulty={roadmap.difficulty}
          duration={roadmap.duration}
          onClick={() => onRoadmapSelect(roadmap.id)}
        />
      ))}
    </div>
  );
};

export default RoadmapGrid;
