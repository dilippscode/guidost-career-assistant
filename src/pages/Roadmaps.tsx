
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { roadmaps, fields } from "@/data/roadmapsData";
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import SearchFilterBar from "@/components/roadmap/SearchFilterBar";
import RoadmapGrid from "@/components/roadmap/RoadmapGrid";
import FlowViewPanel from "@/components/roadmap/FlowViewPanel";

const Roadmaps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Fields");
  const [selectedRoadmap, setSelectedRoadmap] = useState("web-development");

  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         roadmap.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "All Fields" || roadmap.field === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <RoadmapHeader />
          
          <Tabs defaultValue="grid" className="mb-8">
            <SearchFilterBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filter={filter}
              setFilter={setFilter}
              fields={fields}
            />
            
            <TabsContent value="grid">
              <RoadmapGrid 
                roadmaps={filteredRoadmaps} 
                onRoadmapSelect={setSelectedRoadmap} 
              />
            </TabsContent>
            
            <TabsContent value="flow">
              <FlowViewPanel 
                selectedRoadmap={selectedRoadmap}
                setSelectedRoadmap={setSelectedRoadmap}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Roadmaps;
