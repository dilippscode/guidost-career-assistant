
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerBot from "@/components/CareerBot";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CareerCompass = () => {
  const recommendations = [
    {
      title: "Web Development",
      description: "Create and maintain websites and web applications using languages like HTML, CSS, and JavaScript.",
      match: 92,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-guidost-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      title: "Data Science",
      description: "Analyze and interpret complex data to help organizations make better decisions.",
      match: 85,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-guidost-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "UX/UI Design",
      description: "Design user interfaces and experiences for websites, mobile apps, and other digital products.",
      match: 78,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-guidost-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
  ];

  const skillsToImprove = [
    { name: "Problem Solving", level: 75 },
    { name: "Coding", level: 60 },
    { name: "Data Analysis", level: 45 },
    { name: "Communication", level: 85 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Career Compass
            </h1>
            <p className="text-lg text-gray-600">
              Get personalized career guidance based on your skills, interests, and academic performance.
              Chat with our AI assistant to explore career paths that match your profile.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Career Recommendations</h2>
                <div className="space-y-6">
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="p-5 floating-card">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">{rec.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{rec.title}</h3>
                            <div className="flex items-center">
                              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                {rec.match}% Match
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{rec.description}</p>
                          <div className="flex gap-2">
                            <Link to="/roadmaps">
                              <Button className="text-xs gradient-button">View Roadmap</Button>
                            </Link>
                            <Link to="/mentorship">
                              <Button variant="outline" className="text-xs border-guidost-500 text-guidost-600 hover:bg-guidost-50">
                                Find Mentors
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Skills to Improve</h2>
                <div className="space-y-4">
                  {skillsToImprove.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-gray-500 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-guidost-500 to-mentor-500 h-2.5 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6">
                    <Button className="w-full gradient-button">Get Personalized Learning Plan</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-full">
              <CareerBot />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareerCompass;
