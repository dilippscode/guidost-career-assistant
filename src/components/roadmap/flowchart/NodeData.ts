
import { MarkerType } from "@xyflow/react";
import { FlowchartColorTheme, flowchartThemes } from "./FlowchartThemes";

export type RoadmapNodes = {
  nodes: any[];
  edges: any[];
}

export const getInitialNodesAndEdges = (id: string, theme: FlowchartColorTheme = flowchartThemes.default): RoadmapNodes => {
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
              background: theme.beginnerBackground,
              color: theme.beginnerText,
              border: `1px solid ${theme.beginnerBorder}`,
              width: 180,
            },
          },
          {
            id: "2",
            data: { label: "JavaScript Basics" },
            position: { x: 250, y: 100 },
            style: {
              background: theme.beginnerBackground,
              color: theme.beginnerText,
              border: `1px solid ${theme.beginnerBorder}`,
              width: 180,
            },
          },
          {
            id: "3",
            data: { label: "Frontend Frameworks" },
            position: { x: 250, y: 200 },
            style: {
              background: theme.intermediateBackground,
              color: theme.intermediateText,
              border: `1px solid ${theme.intermediateBorder}`,
              width: 180,
            },
          },
          {
            id: "4",
            data: { label: "Backend Basics" },
            position: { x: 100, y: 300 },
            style: {
              background: theme.intermediateBackground,
              color: theme.intermediateText,
              border: `1px solid ${theme.intermediateBorder}`,
              width: 180,
            },
          },
          {
            id: "5",
            data: { label: "Advanced Frontend" },
            position: { x: 400, y: 300 },
            style: {
              background: theme.intermediateBackground,
              color: theme.intermediateText,
              border: `1px solid ${theme.intermediateBorder}`,
              width: 180,
            },
          },
          {
            id: "6",
            data: { label: "Backend Frameworks" },
            position: { x: 100, y: 400 },
            style: {
              background: theme.advancedBackground,
              color: theme.advancedText,
              border: `1px solid ${theme.advancedBorder}`,
              width: 180,
            },
          },
          {
            id: "7",
            data: { label: "State Management" },
            position: { x: 400, y: 400 },
            style: {
              background: theme.advancedBackground,
              color: theme.advancedText,
              border: `1px solid ${theme.advancedBorder}`,
              width: 180,
            },
          },
          {
            id: "8",
            type: "output",
            data: { label: "Full Stack Development" },
            position: { x: 250, y: 500 },
            style: {
              background: theme.expertBackground,
              color: theme.expertText,
              border: `1px solid ${theme.expertBorder}`,
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
            style: { stroke: theme.edgeColor },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.edgeColor,
            },
          },
          {
            id: "e2-3",
            source: "2",
            target: "3",
            animated: true,
            style: { stroke: theme.edgeColor },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.edgeColor,
            },
          },
          {
            id: "e3-4",
            source: "3",
            target: "4",
            animated: true,
            style: { stroke: theme.intermediateBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.intermediateBorder,
            },
          },
          {
            id: "e3-5",
            source: "3",
            target: "5",
            animated: true,
            style: { stroke: theme.intermediateBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.intermediateBorder,
            },
          },
          {
            id: "e4-6",
            source: "4",
            target: "6",
            animated: true,
            style: { stroke: theme.intermediateBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.intermediateBorder,
            },
          },
          {
            id: "e5-7",
            source: "5",
            target: "7",
            animated: true,
            style: { stroke: theme.intermediateBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.intermediateBorder,
            },
          },
          {
            id: "e6-8",
            source: "6",
            target: "8",
            animated: true,
            style: { stroke: theme.advancedBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.advancedBorder,
            },
          },
          {
            id: "e7-8",
            source: "7",
            target: "8",
            animated: true,
            style: { stroke: theme.advancedBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.advancedBorder,
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
              background: theme.beginnerBackground,
              color: theme.beginnerText,
              border: `1px solid ${theme.beginnerBorder}`,
              width: 180,
            },
          },
          {
            id: "2",
            data: { label: "Data Analysis Libraries" },
            position: { x: 250, y: 100 },
            style: {
              background: theme.beginnerBackground,
              color: theme.beginnerText,
              border: `1px solid ${theme.beginnerBorder}`,
              width: 180,
            },
          },
          {
            id: "3",
            data: { label: "Data Visualization" },
            position: { x: 100, y: 200 },
            style: {
              background: theme.intermediateBackground,
              color: theme.intermediateText,
              border: `1px solid ${theme.intermediateBorder}`,
              width: 180,
            },
          },
          {
            id: "4",
            data: { label: "Statistical Analysis" },
            position: { x: 400, y: 200 },
            style: {
              background: theme.intermediateBackground,
              color: theme.intermediateText,
              border: `1px solid ${theme.intermediateBorder}`,
              width: 180,
            },
          },
          {
            id: "5",
            data: { label: "Machine Learning Basics" },
            position: { x: 250, y: 300 },
            style: {
              background: theme.advancedBackground,
              color: theme.advancedText,
              border: `1px solid ${theme.advancedBorder}`,
              width: 180,
            },
          },
          {
            id: "6",
            data: { label: "Deep Learning" },
            position: { x: 250, y: 400 },
            style: {
              background: theme.advancedBackground,
              color: theme.advancedText,
              border: `1px solid ${theme.advancedBorder}`,
              width: 180,
            },
          },
          {
            id: "7",
            type: "output",
            data: { label: "Advanced Data Science" },
            position: { x: 250, y: 500 },
            style: {
              background: theme.expertBackground,
              color: theme.expertText,
              border: `1px solid ${theme.expertBorder}`,
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
            style: { stroke: theme.edgeColor },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.edgeColor,
            },
          },
          {
            id: "e2-3",
            source: "2",
            target: "3",
            animated: true,
            style: { stroke: theme.intermediateBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.intermediateBorder,
            },
          },
          {
            id: "e2-4",
            source: "2",
            target: "4",
            animated: true,
            style: { stroke: theme.intermediateBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.intermediateBorder,
            },
          },
          {
            id: "e3-5",
            source: "3",
            target: "5",
            animated: true,
            style: { stroke: theme.intermediateBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.intermediateBorder,
            },
          },
          {
            id: "e4-5",
            source: "4",
            target: "5",
            animated: true,
            style: { stroke: theme.intermediateBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.intermediateBorder,
            },
          },
          {
            id: "e5-6",
            source: "5",
            target: "6",
            animated: true,
            style: { stroke: theme.advancedBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.advancedBorder,
            },
          },
          {
            id: "e6-7",
            source: "6",
            target: "7",
            animated: true,
            style: { stroke: theme.expertBorder },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: theme.expertBorder,
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
