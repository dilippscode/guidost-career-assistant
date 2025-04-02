
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <Features />
        
        {/* How it Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
                How GuiDost Works
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform combines AI-powered insights with human expertise to guide your career journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-guidost-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-guidost-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Discover</h3>
                <p className="text-gray-600">
                  Take assessments and interact with our Career Compass bot to explore potential career paths.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-guidost-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-guidost-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Learn</h3>
                <p className="text-gray-600">
                  Follow interactive roadmaps with curated resources to develop skills for your chosen path.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-guidost-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-guidost-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Connect</h3>
                <p className="text-gray-600">
                  Get guidance from industry experts through one-on-one mentorship sessions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Roadmaps Preview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
                  Popular Career Roadmaps
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Explore detailed learning paths for today's most in-demand careers.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/roadmaps">
                  <Button variant="outline" className="border-guidost-500 text-guidost-600 hover:bg-guidost-50">
                    View All Roadmaps
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Web Development",
                  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                  skills: ["HTML/CSS", "JavaScript", "React", "Node.js"],
                  weeks: 16,
                },
                {
                  title: "Data Science",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                  skills: ["Python", "Statistics", "ML", "Data Visualization"],
                  weeks: 20,
                },
                {
                  title: "UX/UI Design",
                  image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                  skills: ["User Research", "Wireframing", "UI Design", "Prototyping"],
                  weeks: 14,
                },
              ].map((roadmap, index) => (
                <Card key={index} className="overflow-hidden floating-card">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={roadmap.image}
                      alt={roadmap.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{roadmap.title}</h3>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {roadmap.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="inline-block bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-guidost-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {roadmap.weeks} weeks
                      </div>
                    </div>
                    <Link to="/roadmaps">
                      <Button className="w-full gradient-button">View Roadmap</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <Testimonials />
        
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
