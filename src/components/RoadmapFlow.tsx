
import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Node,
  Edge,
  MarkerType,
} from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Book, BookOpen, ArrowRight } from 'lucide-react';

import '@xyflow/react/dist/style.css';

interface RoadmapFlowProps {
  courseId: string;
}

const RoadmapFlow: React.FC<RoadmapFlowProps> = ({ courseId }) => {
  // This is where we will store our course roadmap data
  const getRoadmapData = (id: string) => {
    // Define different roadmaps based on courseId
    const roadmaps: Record<string, { nodes: Node[], edges: Edge[] }> = {
      'web-development': {
        nodes: [
          {
            id: 'start',
            type: 'input',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>HTML & CSS Basics</span>
                </div>
              ) 
            },
            position: { x: 250, y: 0 },
            className: 'roadmap-node',
          },
          {
            id: 'js',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>JavaScript Fundamentals</span>
                </div>
              ) 
            },
            position: { x: 250, y: 100 },
            className: 'roadmap-node',
          },
          {
            id: 'react',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>React Basics</span>
                </div>
              ) 
            },
            position: { x: 100, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'node',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Node.js & Express</span>
                </div>
              ) 
            },
            position: { x: 400, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'database',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Database Integration</span>
                </div>
              ) 
            },
            position: { x: 400, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'advanced',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Advanced React Patterns</span>
                </div>
              ) 
            },
            position: { x: 100, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'fullstack',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Full Stack Development</span>
                </div>
              ) 
            },
            position: { x: 250, y: 400 },
            className: 'roadmap-node',
          },
        ],
        edges: [
          {
            id: 'e1-2',
            source: 'start',
            target: 'js',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-3',
            source: 'js',
            target: 'react',
            label: 'Frontend Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-4',
            source: 'js',
            target: 'node',
            label: 'Backend Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e3-6',
            source: 'react',
            target: 'advanced',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-5',
            source: 'node',
            target: 'database',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e5-7',
            source: 'database',
            target: 'fullstack',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e6-7',
            source: 'advanced',
            target: 'fullstack',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
        ],
      },
      'data-science': {
        nodes: [
          {
            id: 'stats',
            type: 'input',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Statistics & Mathematics</span>
                </div>
              ) 
            },
            position: { x: 250, y: 0 },
            className: 'roadmap-node',
          },
          {
            id: 'python',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Python Programming</span>
                </div>
              ) 
            },
            position: { x: 250, y: 100 },
            className: 'roadmap-node',
          },
          {
            id: 'datavis',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Data Visualization</span>
                </div>
              ) 
            },
            position: { x: 100, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'machinelearning',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Machine Learning Basics</span>
                </div>
              ) 
            },
            position: { x: 400, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'deep',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Deep Learning</span>
                </div>
              ) 
            },
            position: { x: 400, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'analysis',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Advanced Data Analysis</span>
                </div>
              ) 
            },
            position: { x: 100, y: 300 },
            className: 'roadmap-node',
          },
        ],
        edges: [
          {
            id: 'e1-2',
            source: 'stats',
            target: 'python',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-3',
            source: 'python',
            target: 'datavis',
            label: 'Analysis Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-4',
            source: 'python',
            target: 'machinelearning',
            label: 'ML Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e3-6',
            source: 'datavis',
            target: 'analysis',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-5',
            source: 'machinelearning',
            target: 'deep',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
        ],
      },
      // Additional roadmaps can be added here
    };

    // Return the requested roadmap or a default one if not found
    return roadmaps[id] || roadmaps['web-development'];
  };

  const initialData = getRoadmapData(courseId);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Card className="w-full h-[500px] mt-6 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="roadmap-flow"
      >
        <Controls />
        <MiniMap />
        <Background color="#f8f8f8" gap={16} />
        <Panel position="top-left" className="bg-white p-2 rounded shadow-sm border">
          <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <ArrowRight size={16} className="text-guidost-500" />
            <span>Interactive Course Roadmap</span>
          </div>
        </Panel>
      </ReactFlow>
    </Card>
  );
};

export default RoadmapFlow;
