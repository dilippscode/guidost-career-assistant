
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorCard from "@/components/MentorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, Filter } from "lucide-react";

const Mentorship = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Fields");

  const mentors = [
    {
      name: "Dr. James Wilson",
      position: "Senior Software Engineer",
      company: "Google",
      expertise: ["Web Development", "Cloud Architecture", "JavaScript"],
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.9,
      sessionPrice: "$60",
      field: "Technology",
    },
    {
      name: "Emily Chen",
      position: "Data Scientist",
      company: "Microsoft",
      expertise: ["Machine Learning", "Python", "Statistics"],
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.8,
      sessionPrice: "$55",
      field: "Technology",
    },
    {
      name: "Michael Rodriguez",
      position: "UX Design Lead",
      company: "Adobe",
      expertise: ["UX Research", "UI Design", "Prototyping"],
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4.7,
      sessionPrice: "$65",
      field: "Design",
    },
    {
      name: "Sara Johnson",
      position: "Marketing Director",
      company: "Hubspot",
      expertise: ["SEO", "Content Strategy", "Social Media"],
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 4.9,
      sessionPrice: "$70",
      field: "Marketing",
    },
    {
      name: "Dr. Robert Williams",
      position: "Financial Analyst",
      company: "JP Morgan",
      expertise: ["Financial Modeling", "Investment Analysis", "Excel"],
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 4.6,
      sessionPrice: "$75",
      field: "Finance",
    },
    {
      name: "Priya Sharma",
      position: "Product Manager",
      company: "Amazon",
      expertise: ["Product Strategy", "User Research", "Agile"],
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 4.8,
      sessionPrice: "$65",
      field: "Business",
    },
  ];

  const fields = ["All Fields", "Technology", "Design", "Marketing", "Finance", "Business"];

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mentor.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === "All Fields" || mentor.field === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Find Your Mentor
            </h1>
            <p className="text-lg text-gray-600">
              Connect with experienced professionals who can guide you on your career journey with personalized advice and real-world insights.
            </p>
          </div>
          
          <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, position, or skills..."
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
          
          {filteredMentors.length > 0 ? (
            <div className="space-y-6">
              {filteredMentors.map((mentor, index) => (
                <MentorCard
                  key={index}
                  name={mentor.name}
                  position={mentor.position}
                  company={mentor.company}
                  expertise={mentor.expertise}
                  image={mentor.image}
                  rating={mentor.rating}
                  sessionPrice={mentor.sessionPrice}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">No mentors found</h3>
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

export default Mentorship;
