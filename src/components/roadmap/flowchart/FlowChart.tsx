
import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { getInitialNodesAndEdges } from "./NodeData";
import { FlowchartColorTheme, flowchartThemes } from "./FlowchartThemes";

interface FlowChartProps {
  roadmapId: string;
  theme: string;
}

const FlowChart: React.FC<FlowChartProps> = ({ roadmapId, theme }) => {
  const currentTheme: FlowchartColorTheme = flowchartThemes[theme] || flowchartThemes.default;
  const { nodes: initialNodes, edges: initialEdges } = getInitialNodesAndEdges(roadmapId, currentTheme);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
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
        <Background color={currentTheme.backgroundColor === "#121212" ? "#333" : "#f8f8f8"} gap={16} />
        <Panel position="top-left" className="bg-white p-2 rounded shadow-sm">
          <div className="text-xs text-gray-500">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.beginnerBackground }}></div>
              <span>Beginner</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.intermediateBackground }}></div>
              <span>Intermediate</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.advancedBackground }}></div>
              <span>Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.expertBackground }}></div>
              <span>Expert</span>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
