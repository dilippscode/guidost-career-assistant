
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-guidost-50 to-mentor-50 opacity-50 z-0"></div>
      <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Navigate Your Career Journey with <span className="gradient-heading">GuiDost</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Personalized career guidance, interactive course roadmaps, and real-time mentoring to help you achieve your professional goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/career-compass">
                <Button className="gradient-button px-8 py-6 text-lg rounded-xl">
                  Explore Career Paths
                </Button>
              </Link>
              <Link to="/mentorship">
                <Button variant="outline" className="border-guidost-500 text-guidost-600 hover:bg-guidost-50 px-8 py-6 text-lg rounded-xl">
                  Find a Mentor
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative bg-white p-4 rounded-2xl shadow-xl animate-float">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Students collaborating" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100">
                <span className="text-sm font-medium text-gray-700">Join 10,000+ students</span>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-guidost-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-guidost-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Personalized Recommendations</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-2 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-float" style={{ animationDelay: "2s" }}>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-mentor-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mentor-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Interactive Roadmaps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
