
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-guidost-600 to-mentor-600 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students and professionals who are building their dream careers with GuiDost's personalized guidance and expert mentorship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/career-compass">
              <Button className="bg-white text-guidost-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl">
                Try Career Compass
              </Button>
            </Link>
            <Link to="/roadmaps">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                Explore Roadmaps
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
