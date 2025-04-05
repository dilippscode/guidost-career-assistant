
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, ExternalLink, FileText, Search, Video, Bookmark, BookOpen } from "lucide-react";

const CourseResources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const computerScienceCourses = [
    {
      id: "cs101",
      title: "Introduction to Computer Science",
      description: "Fundamental concepts of computer science and programming",
      resources: [
        { title: "Course Syllabus", type: "document", link: "#", icon: FileText },
        { title: "Algorithms Basics", type: "notes", link: "#", icon: BookOpen },
        { title: "Data Types & Variables", type: "notes", link: "#", icon: BookOpen },
        { title: "Programming Logic Video Lecture", type: "video", link: "#", icon: Video },
        { title: "Problem Solving Techniques", type: "document", link: "#", icon: FileText },
      ]
    },
    {
      id: "cs201",
      title: "Data Structures",
      description: "Implementation and application of common data structures",
      resources: [
        { title: "Course Syllabus", type: "document", link: "#", icon: FileText },
        { title: "Arrays & Linked Lists", type: "notes", link: "#", icon: BookOpen },
        { title: "Stacks & Queues", type: "notes", link: "#", icon: BookOpen },
        { title: "Trees & Graphs", type: "notes", link: "#", icon: BookOpen },
        { title: "Data Structures Implementation", type: "code", link: "#", icon: FileText },
      ]
    },
    {
      id: "cs301",
      title: "Algorithms",
      description: "Design and analysis of algorithms",
      resources: [
        { title: "Course Syllabus", type: "document", link: "#", icon: FileText },
        { title: "Sorting Algorithms", type: "notes", link: "#", icon: BookOpen },
        { title: "Searching Algorithms", type: "notes", link: "#", icon: BookOpen },
        { title: "Dynamic Programming", type: "notes", link: "#", icon: BookOpen },
        { title: "Algorithm Analysis", type: "document", link: "#", icon: FileText },
      ]
    },
    {
      id: "cs401",
      title: "Operating Systems",
      description: "Principles and design of operating systems",
      resources: [
        { title: "Course Syllabus", type: "document", link: "#", icon: FileText },
        { title: "Process Management", type: "notes", link: "#", icon: BookOpen },
        { title: "Memory Management", type: "notes", link: "#", icon: BookOpen },
        { title: "File Systems", type: "notes", link: "#", icon: BookOpen },
        { title: "OS Security", type: "document", link: "#", icon: FileText },
      ]
    },
  ];

  const engineeringCourses = [
    {
      id: "eng101",
      title: "Introduction to Engineering",
      description: "Fundamental principles and practices of engineering",
      resources: [
        { title: "Course Syllabus", type: "document", link: "#", icon: FileText },
        { title: "Engineering Ethics", type: "notes", link: "#", icon: BookOpen },
        { title: "Engineering Mathematics", type: "notes", link: "#", icon: BookOpen },
        { title: "Engineering Design Process", type: "notes", link: "#", icon: BookOpen },
        { title: "Engineering Materials", type: "document", link: "#", icon: FileText },
      ]
    },
    {
      id: "eng201",
      title: "Circuit Analysis",
      description: "Analysis of electrical circuits and components",
      resources: [
        { title: "Course Syllabus", type: "document", link: "#", icon: FileText },
        { title: "DC Circuit Analysis", type: "notes", link: "#", icon: BookOpen },
        { title: "AC Circuit Analysis", type: "notes", link: "#", icon: BookOpen },
        { title: "Circuit Simulation Software Guide", type: "document", link: "#", icon: FileText },
        { title: "Circuit Lab Experiments", type: "document", link: "#", icon: FileText },
      ]
    },
    {
      id: "eng301",
      title: "Embedded Systems",
      description: "Design and implementation of embedded systems",
      resources: [
        { title: "Course Syllabus", type: "document", link: "#", icon: FileText },
        { title: "Microcontroller Architecture", type: "notes", link: "#", icon: BookOpen },
        { title: "Embedded Programming", type: "notes", link: "#", icon: BookOpen },
        { title: "Interface Design", type: "notes", link: "#", icon: BookOpen },
        { title: "Real-Time Systems", type: "document", link: "#", icon: FileText },
      ]
    },
    {
      id: "eng401",
      title: "Robotics",
      description: "Principles and applications of robotics",
      resources: [
        { title: "Course Syllabus", type: "document", link: "#", icon: FileText },
        { title: "Robot Kinematics", type: "notes", link: "#", icon: BookOpen },
        { title: "Sensors and Actuators", type: "notes", link: "#", icon: BookOpen },
        { title: "Control Systems", type: "notes", link: "#", icon: BookOpen },
        { title: "Robotics Project Guide", type: "document", link: "#", icon: FileText },
      ]
    },
  ];

  const filteredCSCourses = computerScienceCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEngCourses = engineeringCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCourseCard = (course: any) => (
    <Card key={course.id} className="mb-6 floating-card">
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <p className="text-sm text-gray-500">{course.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {course.resources.map((resource: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <resource.icon className="h-5 w-5 text-guidost-500 mr-3" />
                <div>
                  <p className="font-medium">{resource.title}</p>
                  <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" className="gradient-button">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Course Resources
            </h1>
            <p className="text-lg text-gray-600">
              Access comprehensive learning materials for computer science and engineering courses.
              Find lecture notes, assignments, tutorials, and helpful resources for your studies.
            </p>
          </div>
          
          <div className="mb-6 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses or resources..."
                className="pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="computer-science" className="w-full">
            <TabsList className="mb-6 flex justify-center">
              <TabsTrigger value="computer-science">Computer Science</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="references">General References</TabsTrigger>
            </TabsList>
            
            <TabsContent value="computer-science">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCSCourses.length > 0 ? (
                  filteredCSCourses.map(renderCourseCard)
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No courses found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="engineering">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEngCourses.length > 0 ? (
                  filteredEngCourses.map(renderCourseCard)
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No courses found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="references">
              <div className="max-w-3xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>General Learning Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Online Textbooks</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <BookOpen className="h-5 w-5 text-guidost-500 mr-2" />
                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                              Computer Science: An Overview <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                          <li className="flex items-center">
                            <BookOpen className="h-5 w-5 text-guidost-500 mr-2" />
                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                              Introduction to Algorithms <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                          <li className="flex items-center">
                            <BookOpen className="h-5 w-5 text-guidost-500 mr-2" />
                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                              Engineering Fundamentals <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Online Courses</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Video className="h-5 w-5 text-guidost-500 mr-2" />
                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                              MIT OpenCourseWare: Computer Science <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                          <li className="flex items-center">
                            <Video className="h-5 w-5 text-guidost-500 mr-2" />
                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                              Stanford Engineering Everywhere <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                          <li className="flex items-center">
                            <Video className="h-5 w-5 text-guidost-500 mr-2" />
                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                              edX: Engineering Courses <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Research Resources</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <FileText className="h-5 w-5 text-guidost-500 mr-2" />
                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                              IEEE Xplore Digital Library <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                          <li className="flex items-center">
                            <FileText className="h-5 w-5 text-guidost-500 mr-2" />
                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                              ACM Digital Library <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                          <li className="flex items-center">
                            <FileText className="h-5 w-5 text-guidost-500 mr-2" />
                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                              Google Scholar <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseResources;
