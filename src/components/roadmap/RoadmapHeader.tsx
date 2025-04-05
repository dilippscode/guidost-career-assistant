
import React from "react";
import { LineChart, PieChart, BarChart } from "lucide-react";

const RoadmapHeader: React.FC = () => {
  return (
    <div className="mb-12 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
        Career & Course Roadmaps
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Explore detailed, step-by-step learning paths for various career fields. Each roadmap includes curated resources, skill milestones, and expert guidance.
      </p>
      <div className="flex justify-center gap-2 items-center text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LineChart size={16} className="text-guidost-500" />
          <span>Interactive Roadmaps</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <PieChart size={16} className="text-guidost-500" />
          <span>Skill Distribution</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <BarChart size={16} className="text-guidost-500" />
          <span>Timeline Charts</span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHeader;
