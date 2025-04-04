
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SkillDistributionProps {
  courseId: string;
}

const SkillDistributionChart: React.FC<SkillDistributionProps> = ({ courseId }) => {
  // Data for different course skill distributions
  const getChartData = (id: string) => {
    const distributions: Record<string, { name: string; value: number; color: string }[]> = {
      'web-development': [
        { name: 'Frontend', value: 40, color: '#4f46e5' },
        { name: 'Backend', value: 35, color: '#8b5cf6' },
        { name: 'DevOps', value: 15, color: '#a855f7' },
        { name: 'Databases', value: 10, color: '#d946ef' },
      ],
      'data-science': [
        { name: 'Statistics', value: 30, color: '#4f46e5' },
        { name: 'Programming', value: 25, color: '#8b5cf6' },
        { name: 'Machine Learning', value: 30, color: '#a855f7' },
        { name: 'Data Visualization', value: 15, color: '#d946ef' },
      ],
      'ux-ui-design': [
        { name: 'UX Research', value: 25, color: '#4f46e5' },
        { name: 'UI Design', value: 35, color: '#8b5cf6' },
        { name: 'Prototyping', value: 20, color: '#a855f7' },
        { name: 'User Testing', value: 20, color: '#d946ef' },
      ],
      'digital-marketing': [
        { name: 'Content Marketing', value: 30, color: '#4f46e5' },
        { name: 'SEO', value: 25, color: '#8b5cf6' },
        { name: 'Social Media', value: 25, color: '#a855f7' },
        { name: 'Analytics', value: 20, color: '#d946ef' },
      ],
      'mobile-development': [
        { name: 'Native Development', value: 40, color: '#4f46e5' },
        { name: 'Cross-Platform', value: 30, color: '#8b5cf6' },
        { name: 'UI/UX', value: 20, color: '#a855f7' },
        { name: 'App Distribution', value: 10, color: '#d946ef' },
      ],
      'cloud-computing': [
        { name: 'Infrastructure', value: 35, color: '#4f46e5' },
        { name: 'Security', value: 20, color: '#8b5cf6' },
        { name: 'Deployment', value: 25, color: '#a855f7' },
        { name: 'Scalability', value: 20, color: '#d946ef' },
      ],
      'financial-analysis': [
        { name: 'Accounting', value: 25, color: '#4f46e5' },
        { name: 'Valuation', value: 30, color: '#8b5cf6' },
        { name: 'Risk Management', value: 25, color: '#a855f7' },
        { name: 'Financial Modeling', value: 20, color: '#d946ef' },
      ],
      'graphic-design': [
        { name: 'Typography', value: 20, color: '#4f46e5' },
        { name: 'Color Theory', value: 20, color: '#8b5cf6' },
        { name: 'Illustration', value: 30, color: '#a855f7' },
        { name: 'Layout Design', value: 30, color: '#d946ef' },
      ],
      'product-management': [
        { name: 'Strategy', value: 25, color: '#4f46e5' },
        { name: 'Agile Methods', value: 30, color: '#8b5cf6' },
        { name: 'Market Research', value: 25, color: '#a855f7' },
        { name: 'Roadmapping', value: 20, color: '#d946ef' },
      ],
    };

    return distributions[id] || distributions['web-development'];
  };

  const data = getChartData(courseId);

  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={{
          skillDistribution: {
            label: "Skill Distribution",
            theme: {
              light: "#4f46e5",
              dark: "#8b5cf6"
            }
          }
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default SkillDistributionChart;
