
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface CourseTimelineProps {
  courseId: string;
}

const CourseTimelineChart: React.FC<CourseTimelineProps> = ({ courseId }) => {
  // Data for different course timelines
  const getChartData = (id: string) => {
    const timelines: Record<string, { name: string; weeks: number; color: string }[]> = {
      'web-development': [
        { name: 'Fundamentals', weeks: 4, color: '#4f46e5' },
        { name: 'Frontend', weeks: 5, color: '#8b5cf6' },
        { name: 'Backend', weeks: 5, color: '#a855f7' },
        { name: 'Project', weeks: 2, color: '#d946ef' },
      ],
      'data-science': [
        { name: 'Mathematics', weeks: 3, color: '#4f46e5' },
        { name: 'Programming', weeks: 4, color: '#8b5cf6' },
        { name: 'Analysis', weeks: 6, color: '#a855f7' },
        { name: 'Machine Learning', weeks: 7, color: '#d946ef' },
      ],
      'ux-ui-design': [
        { name: 'Design Theory', weeks: 3, color: '#4f46e5' },
        { name: 'User Research', weeks: 3, color: '#8b5cf6' },
        { name: 'Wireframing', weeks: 4, color: '#a855f7' },
        { name: 'Portfolio', weeks: 4, color: '#d946ef' },
      ],
      'digital-marketing': [
        { name: 'Fundamentals', weeks: 2, color: '#4f46e5' },
        { name: 'Content Strategy', weeks: 3, color: '#8b5cf6' },
        { name: 'SEO & Social', weeks: 4, color: '#a855f7' },
        { name: 'Analytics', weeks: 3, color: '#d946ef' },
      ],
      'mobile-development': [
        { name: 'Basics', weeks: 3, color: '#4f46e5' },
        { name: 'Platform Tech', weeks: 6, color: '#8b5cf6' },
        { name: 'Advanced UI', weeks: 5, color: '#a855f7' },
        { name: 'Deployment', weeks: 4, color: '#d946ef' },
      ],
      'cloud-computing': [
        { name: 'Fundamentals', weeks: 4, color: '#4f46e5' },
        { name: 'Services', weeks: 6, color: '#8b5cf6' },
        { name: 'Architecture', weeks: 8, color: '#a855f7' },
        { name: 'DevOps', weeks: 4, color: '#d946ef' },
      ],
      'financial-analysis': [
        { name: 'Accounting', weeks: 4, color: '#4f46e5' },
        { name: 'Statements', weeks: 4, color: '#8b5cf6' },
        { name: 'Modeling', weeks: 5, color: '#a855f7' },
        { name: 'Valuation', weeks: 3, color: '#d946ef' },
      ],
      'graphic-design': [
        { name: 'Principles', weeks: 3, color: '#4f46e5' },
        { name: 'Tools', weeks: 4, color: '#8b5cf6' },
        { name: 'Composition', weeks: 4, color: '#a855f7' },
        { name: 'Portfolio', weeks: 3, color: '#d946ef' },
      ],
      'product-management': [
        { name: 'Fundamentals', weeks: 3, color: '#4f46e5' },
        { name: 'User Focus', weeks: 4, color: '#8b5cf6' },
        { name: 'Strategy', weeks: 6, color: '#a855f7' },
        { name: 'Execution', weeks: 5, color: '#d946ef' },
      ],
    };

    return timelines[id] || timelines['web-development'];
  };

  const data = getChartData(courseId);

  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={{
          courseTimeline: {
            label: "Course Timeline",
            theme: {
              light: "#4f46e5",
              dark: "#8b5cf6"
            }
          }
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Weeks', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="weeks" name="Duration (weeks)" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default CourseTimelineChart;
