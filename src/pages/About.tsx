
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold gradient-heading mb-6">About GuiDost</h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At GuiDost, our mission is to empower students and career seekers with the guidance, tools, and resources they need to make informed decisions about their academic and professional journeys. We believe that everyone deserves access to personalized career guidance that aligns with their unique skills, interests, and aspirations.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-700 mb-6">
              GuiDost was founded by a team of educators, career counselors, and technology enthusiasts who recognized the gap between traditional career guidance and the dynamic needs of today's job market. By combining human expertise with AI-powered tools, we've created a platform that provides personalized, accessible, and up-to-date career guidance for everyone.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Career Compass Bot</h3>
                <p className="text-gray-600">AI-powered guidance to help you explore career options based on your interests, skills, and goals.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Course Roadmaps</h3>
                <p className="text-gray-600">Visual pathways that outline the courses, skills, and milestones needed for various career paths.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Mentorship</h3>
                <p className="text-gray-600">Connect with experienced professionals who can provide personalized guidance and insights.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Voice Feedback</h3>
                <p className="text-gray-600">Receive audio feedback and guidance that you can listen to anywhere, even offline.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="text-gray-700 mb-6">
              We believe in a holistic approach to career guidance that considers not just academic qualifications, but also personal interests, soft skills, market trends, and future potential. Our AI-powered tools are designed to provide objective insights, while our human mentors offer the empathy and nuanced perspective that only humans can provide.
            </p>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Journey?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button asChild className="gradient-button">
                <Link to="/signup">Create Free Account</Link>
              </Button>
              <Button asChild variant="outline" className="border-guidost-500 text-guidost-600 hover:bg-guidost-50">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
