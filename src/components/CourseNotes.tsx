
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BookOpen, Link as LinkIcon } from "lucide-react";

interface CourseNote {
  id: string;
  title: string;
  content: string;
  category: string;
  lastUpdated: string;
}

interface CourseNotesProps {
  courseId: string;
  courseTitle: string;
}

const CourseNotes: React.FC<CourseNotesProps> = ({ courseId, courseTitle }) => {
  // This would normally come from a database or API
  const getNotes = (id: string): CourseNote[] => {
    const notesData: Record<string, CourseNote[]> = {
      "cs101": [
        {
          id: "n1",
          title: "Introduction to Programming Concepts",
          content: "This note covers the fundamental concepts of programming including variables, data types, operators, and control structures.",
          category: "Lecture",
          lastUpdated: "2025-03-15"
        },
        {
          id: "n2",
          title: "Algorithms and Problem Solving",
          content: "An overview of algorithmic thinking and approaches to problem-solving in computer science.",
          category: "Tutorial",
          lastUpdated: "2025-03-18"
        },
        {
          id: "n3",
          title: "Basic Data Structures",
          content: "Introduction to arrays, lists, and basic data structures used in programming.",
          category: "Lecture",
          lastUpdated: "2025-03-22"
        }
      ],
      "cs201": [
        {
          id: "n1",
          title: "Array Implementation and Analysis",
          content: "Detailed analysis of array operations and implementation considerations.",
          category: "Lecture",
          lastUpdated: "2025-03-10"
        },
        {
          id: "n2",
          title: "Linked Lists: Singly and Doubly Linked",
          content: "Implementation details and operations for linked list data structures.",
          category: "Tutorial",
          lastUpdated: "2025-03-14"
        },
        {
          id: "n3",
          title: "Stack Applications",
          content: "Common applications of stack data structures in programming and algorithms.",
          category: "Lecture",
          lastUpdated: "2025-03-20"
        }
      ],
      "eng101": [
        {
          id: "n1",
          title: "Engineering Design Process",
          content: "Overview of the engineering design process and methodologies.",
          category: "Lecture",
          lastUpdated: "2025-03-05"
        },
        {
          id: "n2",
          title: "Engineering Ethics Case Studies",
          content: "Analysis of ethical considerations in engineering through case studies.",
          category: "Discussion",
          lastUpdated: "2025-03-12"
        },
        {
          id: "n3",
          title: "Technical Drawing Fundamentals",
          content: "Introduction to technical drawing standards and practices in engineering.",
          category: "Tutorial",
          lastUpdated: "2025-03-19"
        }
      ],
      "eng201": [
        {
          id: "n1",
          title: "DC Circuit Analysis Techniques",
          content: "Methods for analyzing DC circuits including Kirchhoff's laws and nodal analysis.",
          category: "Lecture",
          lastUpdated: "2025-03-08"
        },
        {
          id: "n2",
          title: "AC Circuit Components",
          content: "Overview of components specific to AC circuits and their behaviors.",
          category: "Lecture",
          lastUpdated: "2025-03-16"
        },
        {
          id: "n3",
          title: "Circuit Simulation Lab Notes",
          content: "Instructions and examples for using circuit simulation software.",
          category: "Lab",
          lastUpdated: "2025-03-23"
        }
      ]
    };
    
    return notesData[id] || [];
  };

  const notes = getNotes(courseId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{courseTitle} - Course Notes</CardTitle>
      </CardHeader>
      <CardContent>
        {notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="border rounded-md p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-lg flex items-center">
                      <BookOpen className="h-5 w-5 text-guidost-500 mr-2" />
                      {note.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{note.category}</span>
                      <span className="mx-2">•</span>
                      <span>Updated: {note.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <LinkIcon className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button size="sm" className="gradient-button">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{note.content}</p>
                <div className="mt-3 pt-3 border-t flex justify-end">
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    View Full Notes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No notes available for this course yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseNotes;
