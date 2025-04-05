
import React from "react";
import { Badge } from "@/components/ui/badge";
import VoiceFeedback from "@/components/VoiceFeedback";

const VoiceFeedbackPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Voice Feedback</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Generate human-like voice feedback for students, making it more engaging and accessible,
          especially for those with reading difficulties. Students can also reflect on the feedback they receive.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="outline" className="bg-guidost-50 text-guidost-600">Educational</Badge>
          <Badge variant="outline" className="bg-mentor-50 text-mentor-600">Accessibility</Badge>
          <Badge variant="outline" className="bg-gray-100">AI-Powered</Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-600">Offline Support</Badge>
        </div>
      </div>

      <VoiceFeedback initialText="You've done an excellent job on your assignment. I can see that you've put a lot of effort into understanding the core concepts. Your analysis of the main ideas is thorough and well-articulated. For your next assignment, try to include more specific examples to support your arguments." />

      <div className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Benefits of Voice Feedback with Reflection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-2">Enhanced Accessibility</h3>
            <p className="text-sm text-muted-foreground">Makes feedback more accessible for students with reading difficulties or visual impairments.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-2">Increased Engagement</h3>
            <p className="text-sm text-muted-foreground">Audio feedback can be more engaging and personal than written text.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-2">Better Retention</h3>
            <p className="text-sm text-muted-foreground">Students often retain information better when it's delivered in multiple formats.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-2">Time-Saving</h3>
            <p className="text-sm text-muted-foreground">Teachers can generate voice feedback quickly, saving time compared to recording their own voice.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-2">Self-Reflection</h3>
            <p className="text-sm text-muted-foreground">Prompts students to think critically about feedback received and plan for improvement.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-2">Growth Mindset</h3>
            <p className="text-sm text-muted-foreground">Encourages students to view feedback as an opportunity for growth rather than criticism.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-2">Offline Support</h3>
            <p className="text-sm text-muted-foreground">Generate feedback in offline environments and sync it later when internet connectivity is restored.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-2">Rural Accessibility</h3>
            <p className="text-sm text-muted-foreground">Ideal for schools in rural areas with limited or intermittent internet connectivity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceFeedbackPage;
