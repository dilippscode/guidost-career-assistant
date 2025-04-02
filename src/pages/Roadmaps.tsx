
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoadmapCard from "@/components/RoadmapCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, ChevronDown } from "lucide-react";

const Roadmaps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Fields");

  const roadmaps = [
    {
      title: "Web Development",
      description: "Learn frontend and backend technologies to become a full-stack web developer.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      path: "/roadmaps/web-development",
      difficulty: "Beginner" as const,
      duration: "16 weeks",
      field: "Technology",
    },
    {
      title: "Data Science",
      description: "Master data analysis, machine learning, and statistical methods to extract insights from data.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      path: "/roadmaps/data-science",
      difficulty: "Intermediate" as const,
      duration: "20 weeks",
      field: "Technology",
    },
    {
      title: "UX/UI Design",
      description: "Learn to design user-friendly interfaces and create exceptional user experiences.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      path: "/roadmaps/ux-ui-design",
      difficulty: "Beginner" as const,
      duration: "14 weeks",
      field: "Design",
    },
    {
      title: "Digital Marketing",
      description: "Master social media, SEO, content marketing, and analytics to drive online growth.",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f7e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      path: "/roadmaps/digital-marketing",
      difficulty: "Beginner" as const,
      duration: "12 weeks",
      field: "Marketing",
    },
    {
      title: "Mobile App Development",
      description: "Learn to build native and cross-platform mobile applications for iOS and Android.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      path: "/roadmaps/mobile-development",
      difficulty: "Intermediate" as const,
      duration: "18 weeks",
      field: "Technology",
    },
    {
      title: "Cloud Computing",
      description: "Master cloud platforms, infrastructure, and deployment strategies for modern applications.",
      image: "https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      path: "/roadmaps/cloud-computing",
      difficulty: "Advanced" as const,
      duration: "22 weeks",
      field: "Technology",
    },
    {
      title: "Financial Analysis",
      description: "Learn financial modeling, valuation, and analysis techniques for business decision-making.",
      image: "https://images.unsplash.com/photo-1579170053380-58828edb5e16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      path: "/roadmaps/financial-analysis",
      difficulty: "Intermediate" as const,
      duration: "16 weeks",
      field: "Finance",
    },
    {
      title: "Graphic Design",
      description: "Master visual communication through typography, imagery, color, and layout principles.",
      image: "https://images.unsplash.com/photo-1619616713221-a511d7037672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      path: "/roadmaps/graphic-design",
      difficulty: "Beginner" as const,
      duration: "14 weeks",
      field: "Design",
    },
    {
      title: "Product Management",
      description: "Learn to lead product development from ideation to launch and ongoing improvement.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      path: "/roadmaps/product-management",
      difficulty: "Intermediate" as const,
      duration: "18 weeks",
      field: "Business",
    },
  ];

  const fields = ["All Fields", "Technology", "Design", "Marketing", "Finance", "Business"];

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
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Career & Course Roadmaps
            </h1>
            <p className="text-lg text-gray-600">
              Explore detailed, step-by-step learning paths for various career fields. Each roadmap includes curated resources, skill milestones, and expert guidance.
            </p>
          </div>
          
          <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search roadmaps..."
                className="pl-10 py-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-300 flex gap-2 items-center">
                    {filter} <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {fields.map((field) => (
                    <DropdownMenuItem key={field} onClick={() => setFilter(field)}>
                      {field}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {filteredRoadmaps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRoadmaps.map((roadmap, index) => (
                <RoadmapCard
                  key={index}
                  title={roadmap.title}
                  description={roadmap.description}
                  image={roadmap.image}
                  path={roadmap.path}
                  difficulty={roadmap.difficulty}
                  duration={roadmap.duration}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">No roadmaps found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Roadmaps;
