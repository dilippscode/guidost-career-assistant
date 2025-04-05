
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudyNotes from "@/components/StudyNotes";
import CourseNotes from "@/components/CourseNotes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookOpen, Notebook, Search, BookMarked } from "lucide-react";

const StudyResources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Study Resources
            </h1>
            <p className="text-lg text-gray-600">
              Explore, search, and create comprehensive notes to enhance your learning experience.
              Access course materials, search for additional information, and organize your studies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <StudyNotes />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <BookMarked className="h-5 w-5 text-guidost-600 mr-2" />
                    Course Materials
                  </CardTitle>
                  <CardDescription>
                    Select a course to view its materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="cs101">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="cs101">Computer Science</TabsTrigger>
                      <TabsTrigger value="eng101">Engineering</TabsTrigger>
                    </TabsList>
                    <div className="mt-4">
                      <TabsContent value="cs101">
                        <CourseNotes courseId="cs101" courseTitle="CS 101" />
                      </TabsContent>
                      <TabsContent value="eng101">
                        <CourseNotes courseId="eng101" courseTitle="ENGR 101" />
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Book className="h-5 w-5 text-guidost-600 mr-2" />
                    Study Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <div className="bg-guidost-100 text-guidost-800 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                      <p className="text-sm text-gray-700">Use the search function to find related study materials from the web.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="bg-guidost-100 text-guidost-800 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                      <p className="text-sm text-gray-700">Save important information from search results as notes for easy reference.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="bg-guidost-100 text-guidost-800 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                      <p className="text-sm text-gray-700">Organize your notes by subject to create a comprehensive study guide.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="bg-guidost-100 text-guidost-800 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                      <p className="text-sm text-gray-700">Review course materials alongside your notes for better understanding.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudyResources;
