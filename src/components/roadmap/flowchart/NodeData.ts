
import { MarkerType } from "@xyflow/react";

export type RoadmapNodes = {
  nodes: any[];
  edges: any[];
}

export const getInitialNodesAndEdges = (id: string): RoadmapNodes => {
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
