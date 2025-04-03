
import React, { useCallback, useState } from 'react';
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
import { Book, BookOpen, ArrowRight, PieChart } from 'lucide-react';
import CourseQuiz from './CourseQuiz';

import '@xyflow/react/dist/style.css';

interface RoadmapFlowProps {
  courseId: string;
}

const RoadmapFlow: React.FC<RoadmapFlowProps> = ({ courseId }) => {
  const [showQuiz, setShowQuiz] = useState(true);
  const [userLevel, setUserLevel] = useState<string | null>(null);
  
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
      'ux-ui-design': {
        nodes: [
          {
            id: 'design-fundamentals',
            type: 'input',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Design Fundamentals</span>
                </div>
              ) 
            },
            position: { x: 250, y: 0 },
            className: 'roadmap-node',
          },
          {
            id: 'user-research',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>User Research Methods</span>
                </div>
              ) 
            },
            position: { x: 250, y: 100 },
            className: 'roadmap-node',
          },
          {
            id: 'wireframing',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Wireframing & Prototyping</span>
                </div>
              ) 
            },
            position: { x: 100, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'visual-design',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Visual Design Principles</span>
                </div>
              ) 
            },
            position: { x: 400, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'ui-systems',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Design Systems</span>
                </div>
              ) 
            },
            position: { x: 400, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'usability',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Usability Testing</span>
                </div>
              ) 
            },
            position: { x: 100, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'ux-ui-master',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>UX/UI Portfolio</span>
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
            source: 'design-fundamentals',
            target: 'user-research',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-3',
            source: 'user-research',
            target: 'wireframing',
            label: 'UX Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-4',
            source: 'user-research',
            target: 'visual-design',
            label: 'UI Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e3-6',
            source: 'wireframing',
            target: 'usability',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-5',
            source: 'visual-design',
            target: 'ui-systems',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e5-7',
            source: 'ui-systems',
            target: 'ux-ui-master',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e6-7',
            source: 'usability',
            target: 'ux-ui-master',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
        ],
      },
      'digital-marketing': {
        nodes: [
          {
            id: 'marketing-basics',
            type: 'input',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Marketing Fundamentals</span>
                </div>
              ) 
            },
            position: { x: 250, y: 0 },
            className: 'roadmap-node',
          },
          {
            id: 'content-marketing',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Content Marketing</span>
                </div>
              ) 
            },
            position: { x: 250, y: 100 },
            className: 'roadmap-node',
          },
          {
            id: 'seo',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>SEO Essentials</span>
                </div>
              ) 
            },
            position: { x: 100, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'social-media',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Social Media Marketing</span>
                </div>
              ) 
            },
            position: { x: 400, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'paid-advertising',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Paid Advertising</span>
                </div>
              ) 
            },
            position: { x: 400, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'analytics',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Analytics & Optimization</span>
                </div>
              ) 
            },
            position: { x: 100, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'marketing-strategy',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Complete Marketing Strategy</span>
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
            source: 'marketing-basics',
            target: 'content-marketing',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-3',
            source: 'content-marketing',
            target: 'seo',
            label: 'Organic Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-4',
            source: 'content-marketing',
            target: 'social-media',
            label: 'Social Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e3-6',
            source: 'seo',
            target: 'analytics',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-5',
            source: 'social-media',
            target: 'paid-advertising',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e5-7',
            source: 'paid-advertising',
            target: 'marketing-strategy',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e6-7',
            source: 'analytics',
            target: 'marketing-strategy',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
        ],
      },
      'mobile-development': {
        nodes: [
          {
            id: 'mobile-basics',
            type: 'input',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Mobile Development Basics</span>
                </div>
              ) 
            },
            position: { x: 250, y: 0 },
            className: 'roadmap-node',
          },
          {
            id: 'js-mobile',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>JavaScript for Mobile</span>
                </div>
              ) 
            },
            position: { x: 250, y: 100 },
            className: 'roadmap-node',
          },
          {
            id: 'react-native',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>React Native</span>
                </div>
              ) 
            },
            position: { x: 100, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'native-dev',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Native Development</span>
                </div>
              ) 
            },
            position: { x: 400, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'ios-swift',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>iOS & Swift</span>
                </div>
              ) 
            },
            position: { x: 550, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'android-kotlin',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Android & Kotlin</span>
                </div>
              ) 
            },
            position: { x: 400, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'cross-platform',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Cross-Platform Patterns</span>
                </div>
              ) 
            },
            position: { x: 100, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'mobile-master',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Mobile App Deployment</span>
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
            source: 'mobile-basics',
            target: 'js-mobile',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-3',
            source: 'js-mobile',
            target: 'react-native',
            label: 'Cross-Platform',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-4',
            source: 'js-mobile',
            target: 'native-dev',
            label: 'Native Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e3-7',
            source: 'react-native',
            target: 'cross-platform',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-5',
            source: 'native-dev',
            target: 'ios-swift',
            label: 'iOS',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-6',
            source: 'native-dev',
            target: 'android-kotlin',
            label: 'Android',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e5-8',
            source: 'ios-swift',
            target: 'mobile-master',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e6-8',
            source: 'android-kotlin',
            target: 'mobile-master',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e7-8',
            source: 'cross-platform',
            target: 'mobile-master',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
        ],
      },
      'cloud-computing': {
        nodes: [
          {
            id: 'cloud-basics',
            type: 'input',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Cloud Computing Basics</span>
                </div>
              ) 
            },
            position: { x: 250, y: 0 },
            className: 'roadmap-node',
          },
          {
            id: 'networking',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Networking & Security</span>
                </div>
              ) 
            },
            position: { x: 250, y: 100 },
            className: 'roadmap-node',
          },
          {
            id: 'aws',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>AWS Services</span>
                </div>
              ) 
            },
            position: { x: 100, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'azure',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Azure Fundamentals</span>
                </div>
              ) 
            },
            position: { x: 250, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'gcp',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Google Cloud Platform</span>
                </div>
              ) 
            },
            position: { x: 400, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'containers',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Containers & Kubernetes</span>
                </div>
              ) 
            },
            position: { x: 175, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'serverless',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Serverless Architecture</span>
                </div>
              ) 
            },
            position: { x: 325, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'cloud-master',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Cloud Architect</span>
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
            source: 'cloud-basics',
            target: 'networking',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-3',
            source: 'networking',
            target: 'aws',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-4',
            source: 'networking',
            target: 'azure',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-5',
            source: 'networking',
            target: 'gcp',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e3-6',
            source: 'aws',
            target: 'containers',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-6',
            source: 'azure',
            target: 'containers',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-7',
            source: 'azure',
            target: 'serverless',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e5-7',
            source: 'gcp',
            target: 'serverless',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e6-8',
            source: 'containers',
            target: 'cloud-master',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e7-8',
            source: 'serverless',
            target: 'cloud-master',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
        ],
      },
      'financial-analysis': {
        nodes: [
          {
            id: 'finance-basics',
            type: 'input',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Financial Accounting</span>
                </div>
              ) 
            },
            position: { x: 250, y: 0 },
            className: 'roadmap-node',
          },
          {
            id: 'financial-statements',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Financial Statements Analysis</span>
                </div>
              ) 
            },
            position: { x: 250, y: 100 },
            className: 'roadmap-node',
          },
          {
            id: 'valuation',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Valuation Techniques</span>
                </div>
              ) 
            },
            position: { x: 100, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'financial-modeling',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Financial Modeling</span>
                </div>
              ) 
            },
            position: { x: 400, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'investment',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Investment Analysis</span>
                </div>
              ) 
            },
            position: { x: 100, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'risk-management',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Risk Management</span>
                </div>
              ) 
            },
            position: { x: 400, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'finance-master',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Financial Analyst</span>
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
            source: 'finance-basics',
            target: 'financial-statements',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-3',
            source: 'financial-statements',
            target: 'valuation',
            label: 'Valuation Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-4',
            source: 'financial-statements',
            target: 'financial-modeling',
            label: 'Modeling Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e3-5',
            source: 'valuation',
            target: 'investment',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-6',
            source: 'financial-modeling',
            target: 'risk-management',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e5-7',
            source: 'investment',
            target: 'finance-master',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e6-7',
            source: 'risk-management',
            target: 'finance-master',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
        ],
      },
      'graphic-design': {
        nodes: [
          {
            id: 'design-principles',
            type: 'input',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Design Principles</span>
                </div>
              ) 
            },
            position: { x: 250, y: 0 },
            className: 'roadmap-node',
          },
          {
            id: 'color-theory',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Color Theory & Typography</span>
                </div>
              ) 
            },
            position: { x: 250, y: 100 },
            className: 'roadmap-node',
          },
          {
            id: 'adobe-ps',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Adobe Photoshop</span>
                </div>
              ) 
            },
            position: { x: 100, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'adobe-ai',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Adobe Illustrator</span>
                </div>
              ) 
            },
            position: { x: 400, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'digital-illustration',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Digital Illustration</span>
                </div>
              ) 
            },
            position: { x: 400, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'branding',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Branding & Identity</span>
                </div>
              ) 
            },
            position: { x: 100, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'design-portfolio',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Professional Portfolio</span>
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
            source: 'design-principles',
            target: 'color-theory',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-3',
            source: 'color-theory',
            target: 'adobe-ps',
            label: 'Raster Graphics',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-4',
            source: 'color-theory',
            target: 'adobe-ai',
            label: 'Vector Graphics',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e3-6',
            source: 'adobe-ps',
            target: 'branding',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-5',
            source: 'adobe-ai',
            target: 'digital-illustration',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e5-7',
            source: 'digital-illustration',
            target: 'design-portfolio',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e6-7',
            source: 'branding',
            target: 'design-portfolio',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
        ],
      },
      'product-management': {
        nodes: [
          {
            id: 'product-basics',
            type: 'input',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Product Management Basics</span>
                </div>
              ) 
            },
            position: { x: 250, y: 0 },
            className: 'roadmap-node',
          },
          {
            id: 'user-personas',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>User Personas & Journey Maps</span>
                </div>
              ) 
            },
            position: { x: 250, y: 100 },
            className: 'roadmap-node',
          },
          {
            id: 'product-strategy',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Product Strategy</span>
                </div>
              ) 
            },
            position: { x: 100, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'agile-scrum',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Agile & Scrum</span>
                </div>
              ) 
            },
            position: { x: 400, y: 200 },
            className: 'roadmap-node',
          },
          {
            id: 'roadmapping',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Product Roadmapping</span>
                </div>
              ) 
            },
            position: { x: 100, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'metrics',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <Book className="text-guidost-500" size={16} />
                  <span>Product Metrics & Analytics</span>
                </div>
              ) 
            },
            position: { x: 400, y: 300 },
            className: 'roadmap-node',
          },
          {
            id: 'product-launch',
            type: 'output',
            data: { 
              label: (
                <div className="flex items-center gap-2">
                  <BookOpen className="text-guidost-500" size={16} />
                  <span>Product Launch & Iteration</span>
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
            source: 'product-basics',
            target: 'user-personas',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-3',
            source: 'user-personas',
            target: 'product-strategy',
            label: 'Strategy Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e2-4',
            source: 'user-personas',
            target: 'agile-scrum',
            label: 'Execution Path',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e3-5',
            source: 'product-strategy',
            target: 'roadmapping',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e4-6',
            source: 'agile-scrum',
            target: 'metrics',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e5-7',
            source: 'roadmapping',
            target: 'product-launch',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
          {
            id: 'e6-7',
            source: 'metrics',
            target: 'product-launch',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            className: 'roadmap-edge',
          },
        ],
      },
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
  
  const handleQuizComplete = (score: number, level: string) => {
    setShowQuiz(false);
    setUserLevel(level);
    
    // Highlight the appropriate starting nodes based on the user's level
    if (level === "Advanced") {
      // For advanced users, highlight advanced nodes
      setNodes((nds) => nds.map(node => {
        if (node.id.includes('advanced') || node.type === 'output') {
          return {
            ...node,
            className: 'roadmap-node-highlighted',
            data: {
              ...node.data,
              label: node.data.label
            }
          };
        }
        return node;
      }));
    } else if (level === "Intermediate") {
      // For intermediate users, highlight intermediate nodes
      const intermediateNodes = ['js', 'python', 'react', 'node', 'machinelearning', 'datavis'];
      setNodes((nds) => nds.map(node => {
        if (intermediateNodes.includes(node.id)) {
          return {
            ...node,
            className: 'roadmap-node-highlighted',
            data: {
              ...node.data,
              label: node.data.label
            }
          };
        }
        return node;
      }));
    } else {
      // For beginners, highlight the starting node
      setNodes((nds) => nds.map(node => {
        if (node.type === 'input') {
          return {
            ...node,
            className: 'roadmap-node-highlighted',
            data: {
              ...node.data,
              label: node.data.label
            }
          };
        }
        return node;
      }));
    }
  };
  
  const handleSkipQuiz = () => {
    setShowQuiz(false);
  };

  if (showQuiz) {
    return (
      <Card className="w-full mt-6 overflow-hidden">
        <div className="p-4">
          <CourseQuiz 
            courseId={courseId} 
            onComplete={handleQuizComplete}
            onSkip={handleSkipQuiz}
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[500px] mt-6 overflow-hidden">
      {userLevel && (
        <div className="bg-gray-50 p-3 border-b flex items-center gap-2">
          <PieChart size={18} className="text-guidost-500" />
          <span className="text-sm font-medium">
            Based on your knowledge, we've highlighted the <span className="text-guidost-600">{userLevel}</span> level content for you
          </span>
        </div>
      )}
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
