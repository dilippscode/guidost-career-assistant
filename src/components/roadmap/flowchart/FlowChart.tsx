
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

interface FlowChartProps {
  roadmapId: string;
}

const FlowChart: React.FC<FlowChartProps> = ({ roadmapId }) => {
  const { nodes: initialNodes, edges: initialEdges } = getInitialNodesAndEdges(roadmapId);
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
  );
};

export default FlowChart;
