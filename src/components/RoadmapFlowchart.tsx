
import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChartBar, ChartLine, ChartPie, LayoutList } from "lucide-react";

interface RoadmapFlowchartProps {
  roadmapId: string;
}

const RoadmapFlowchart: React.FC<RoadmapFlowchartProps> = ({ roadmapId }) => {
  // This would typically come from an API based on the roadmap ID
  const getInitialNodesAndEdges = (id: string) => {
    switch (id) {
      case "web-development":
        return {
          nodes: [
            {
              id: "1",
              type: "input",
              data: { label: "HTML & CSS Fundamentals" },
              position: { x: 250, y: 0 },
              style: {
                background: "#d6e4ff",
                color: "#004080",
                border: "1px solid #b8cffa",
                width: 180,
              },
            },
            {
              id: "2",
              data: { label: "JavaScript Basics" },
              position: { x: 250, y: 100 },
              style: {
                background: "#d6e4ff",
                color: "#004080",
                border: "1px solid #b8cffa",
                width: 180,
              },
            },
            {
              id: "3",
              data: { label: "Frontend Frameworks" },
              position: { x: 250, y: 200 },
              style: {
                background: "#fff7d6",
                color: "#806200",
                border: "1px solid #faebb8",
                width: 180,
              },
            },
            {
              id: "4",
              data: { label: "Backend Basics" },
              position: { x: 100, y: 300 },
              style: {
                background: "#fff7d6",
                color: "#806200",
                border: "1px solid #faebb8",
                width: 180,
              },
            },
            {
              id: "5",
              data: { label: "Advanced Frontend" },
              position: { x: 400, y: 300 },
              style: {
                background: "#fff7d6",
                color: "#806200",
                border: "1px solid #faebb8",
                width: 180,
              },
            },
            {
              id: "6",
              data: { label: "Backend Frameworks" },
              position: { x: 100, y: 400 },
              style: {
                background: "#ffd6e0",
                color: "#800040",
                border: "1px solid #fab8cd",
                width: 180,
              },
            },
            {
              id: "7",
              data: { label: "State Management" },
              position: { x: 400, y: 400 },
              style: {
                background: "#ffd6e0",
                color: "#800040",
                border: "1px solid #fab8cd",
                width: 180,
              },
            },
            {
              id: "8",
              type: "output",
              data: { label: "Full Stack Development" },
              position: { x: 250, y: 500 },
              style: {
                background: "#d6ffef",
                color: "#008055",
                border: "1px solid #b8fadf",
                width: 180,
              },
            },
          ],
          edges: [
            {
              id: "e1-2",
              source: "1",
              target: "2",
              animated: true,
              style: { stroke: "#b8cffa" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#b8cffa",
              },
            },
            {
              id: "e2-3",
              source: "2",
              target: "3",
              animated: true,
              style: { stroke: "#b8cffa" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#b8cffa",
              },
            },
            {
              id: "e3-4",
              source: "3",
              target: "4",
              animated: true,
              style: { stroke: "#faebb8" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#faebb8",
              },
            },
            {
              id: "e3-5",
              source: "3",
              target: "5",
              animated: true,
              style: { stroke: "#faebb8" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#faebb8",
              },
            },
            {
              id: "e4-6",
              source: "4",
              target: "6",
              animated: true,
              style: { stroke: "#faebb8" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#faebb8",
              },
            },
            {
              id: "e5-7",
              source: "5",
              target: "7",
              animated: true,
              style: { stroke: "#faebb8" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#faebb8",
              },
            },
            {
              id: "e6-8",
              source: "6",
              target: "8",
              animated: true,
              style: { stroke: "#fab8cd" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#fab8cd",
              },
            },
            {
              id: "e7-8",
              source: "7",
              target: "8",
              animated: true,
              style: { stroke: "#fab8cd" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#fab8cd",
              },
            },
          ],
        };
      case "data-science":
        return {
          nodes: [
            {
              id: "1",
              type: "input",
              data: { label: "Python Basics" },
              position: { x: 250, y: 0 },
              style: {
                background: "#d6e4ff",
                color: "#004080",
                border: "1px solid #b8cffa",
                width: 180,
              },
            },
            {
              id: "2",
              data: { label: "Data Analysis Libraries" },
              position: { x: 250, y: 100 },
              style: {
                background: "#d6e4ff",
                color: "#004080",
                border: "1px solid #b8cffa",
                width: 180,
              },
            },
            {
              id: "3",
              data: { label: "Data Visualization" },
              position: { x: 100, y: 200 },
              style: {
                background: "#fff7d6",
                color: "#806200",
                border: "1px solid #faebb8",
                width: 180,
              },
            },
            {
              id: "4",
              data: { label: "Statistical Analysis" },
              position: { x: 400, y: 200 },
              style: {
                background: "#fff7d6",
                color: "#806200",
                border: "1px solid #faebb8",
                width: 180,
              },
            },
            {
              id: "5",
              data: { label: "Machine Learning Basics" },
              position: { x: 250, y: 300 },
              style: {
                background: "#ffd6e0",
                color: "#800040",
                border: "1px solid #fab8cd",
                width: 180,
              },
            },
            {
              id: "6",
              data: { label: "Deep Learning" },
              position: { x: 250, y: 400 },
              style: {
                background: "#ffd6e0",
                color: "#800040",
                border: "1px solid #fab8cd",
                width: 180,
              },
            },
            {
              id: "7",
              type: "output",
              data: { label: "Advanced Data Science" },
              position: { x: 250, y: 500 },
              style: {
                background: "#d6ffef",
                color: "#008055",
                border: "1px solid #b8fadf",
                width: 180,
              },
            },
          ],
          edges: [
            {
              id: "e1-2",
              source: "1",
              target: "2",
              animated: true,
              style: { stroke: "#b8cffa" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#b8cffa",
              },
            },
            {
              id: "e2-3",
              source: "2",
              target: "3",
              animated: true,
              style: { stroke: "#faebb8" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#faebb8",
              },
            },
            {
              id: "e2-4",
              source: "2",
              target: "4",
              animated: true,
              style: { stroke: "#faebb8" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#faebb8",
              },
            },
            {
              id: "e3-5",
              source: "3",
              target: "5",
              animated: true,
              style: { stroke: "#faebb8" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#faebb8",
              },
            },
            {
              id: "e4-5",
              source: "4",
              target: "5",
              animated: true,
              style: { stroke: "#faebb8" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#faebb8",
              },
            },
            {
              id: "e5-6",
              source: "5",
              target: "6",
              animated: true,
              style: { stroke: "#fab8cd" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#fab8cd",
              },
            },
            {
              id: "e6-7",
              source: "6",
              target: "7",
              animated: true,
              style: { stroke: "#b8fadf" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#b8fadf",
              },
            },
          ],
        };
      default:
        return {
          nodes: [
            {
              id: "default-1",
              type: "input",
              data: { label: "Select a specific roadmap" },
              position: { x: 250, y: 250 },
              style: {
                background: "#f0f0f0",
                color: "#333",
                border: "1px solid #ddd",
                width: 200,
              },
            },
          ],
          edges: [],
        };
    }
  };

  const { nodes: initialNodes, edges: initialEdges } = getInitialNodesAndEdges(roadmapId);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [viewType, setViewType] = useState("flow");

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100">
      <Tabs value={viewType} onValueChange={setViewType} className="w-full">
        <div className="flex justify-between items-center border-b p-3">
          <h3 className="text-lg font-medium">Roadmap Visualization</h3>
          <TabsList>
            <TabsTrigger value="flow" className="flex items-center gap-1">
              <LayoutList size={16} />
              Flow
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex items-center gap-1">
              <ChartBar size={16} />
              Chart
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-1">
              <ChartPie size={16} />
              Distribution
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-1">
              <ChartLine size={16} />
              Timeline
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="flow" className="m-0">
          <div style={{ height: 600 }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              attributionPosition="bottom-right"
            >
              <Controls />
              <MiniMap />
              <Background color="#f8f8f8" gap={16} />
              <Panel position="top-left" className="bg-white p-2 rounded shadow-sm">
                <div className="text-xs text-gray-500">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-d6e4ff"></div>
                    <span>Beginner</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-fff7d6"></div>
                    <span>Intermediate</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-ffd6e0"></div>
                    <span>Advanced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-d6ffef"></div>
                    <span>Expert</span>
                  </div>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </TabsContent>

        <TabsContent value="chart" className="p-8 flex justify-center items-center m-0 h-[600px]">
          <div className="text-center">
            <ChartBar size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Progress Chart</h3>
            <p className="text-gray-500 mb-4">
              Visualize your progress through the roadmap stages
            </p>
            <Button>Generate Chart</Button>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="p-8 flex justify-center items-center m-0 h-[600px]">
          <div className="text-center">
            <ChartPie size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Skill Distribution</h3>
            <p className="text-gray-500 mb-4">
              See how skills are distributed across different categories
            </p>
            <Button>Generate Distribution</Button>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="p-8 flex justify-center items-center m-0 h-[600px]">
          <div className="text-center">
            <ChartLine size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Learning Timeline</h3>
            <p className="text-gray-500 mb-4">
              View estimated completion times for each stage
            </p>
            <Button>Generate Timeline</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoadmapFlowchart;
