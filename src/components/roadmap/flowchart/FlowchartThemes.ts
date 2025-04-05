
// Define theme types and color schemes for the flowchart visualization

export type FlowchartColorTheme = {
  name: string;
  // Node colors for different skill levels
  beginnerBackground: string;
  beginnerBorder: string;
  beginnerText: string;
  
  intermediateBackground: string;
  intermediateBorder: string;
  intermediateText: string;
  
  advancedBackground: string;
  advancedBorder: string;
  advancedText: string;
  
  expertBackground: string;
  expertBorder: string;
  expertText: string;
  
  // Edge colors
  edgeColor: string;
  edgeAnimatedColor: string;
  
  // Background color
  backgroundColor: string;
};

export const flowchartThemes: Record<string, FlowchartColorTheme> = {
  default: {
    name: "Default",
    // Beginner level (blue)
    beginnerBackground: "#d6e4ff",
    beginnerBorder: "#b8cffa",
    beginnerText: "#004080",
    
    // Intermediate level (yellow)
    intermediateBackground: "#fff7d6", 
    intermediateBorder: "#faebb8",
    intermediateText: "#806200",
    
    // Advanced level (pink)
    advancedBackground: "#ffd6e0",
    advancedBorder: "#fab8cd",
    advancedText: "#800040",
    
    // Expert level (green)
    expertBackground: "#d6ffef",
    expertBorder: "#b8fadf",
    expertText: "#008055",
    
    // Edges
    edgeColor: "#b8cffa",
    edgeAnimatedColor: "#fab8cd",
    
    // Background
    backgroundColor: "#f8f8f8"
  },
  
  dark: {
    name: "Dark Mode",
    // Beginner level (blue)
    beginnerBackground: "#1a2c4e",
    beginnerBorder: "#2c4370",
    beginnerText: "#a3c2ff",
    
    // Intermediate level (yellow)
    intermediateBackground: "#403500", 
    intermediateBorder: "#5d4c00",
    intermediateText: "#ffd54f",
    
    // Advanced level (pink)
    advancedBackground: "#400020",
    advancedBorder: "#6e0036",
    advancedText: "#ffb0c4",
    
    // Expert level (green)
    expertBackground: "#003828",
    expertBorder: "#005941",
    expertText: "#6ef7c8",
    
    // Edges
    edgeColor: "#4d76c9",
    edgeAnimatedColor: "#c95979",
    
    // Background
    backgroundColor: "#121212"
  },
  
  pastel: {
    name: "Pastel",
    // Beginner level (blue)
    beginnerBackground: "#e0f0ff",
    beginnerBorder: "#c7e2ff",
    beginnerText: "#5c84b1",
    
    // Intermediate level (yellow)
    intermediateBackground: "#fff9e0", 
    intermediateBorder: "#fff0bc",
    intermediateText: "#a18e4a",
    
    // Advanced level (pink)
    advancedBackground: "#ffe0e9",
    advancedBorder: "#ffcbd9",
    advancedText: "#b25d7a",
    
    // Expert level (green)
    expertBackground: "#e0fff1",
    expertBorder: "#c7ffe2",
    expertText: "#4e9d78",
    
    // Edges
    edgeColor: "#c7e2ff",
    edgeAnimatedColor: "#ffcbd9",
    
    // Background
    backgroundColor: "#fafafa"
  },
  
  vibrant: {
    name: "Vibrant",
    // Beginner level (blue)
    beginnerBackground: "#2962ff",
    beginnerBorder: "#0039cb",
    beginnerText: "#ffffff",
    
    // Intermediate level (yellow)
    intermediateBackground: "#ffd600", 
    intermediateBorder: "#c7a500",
    intermediateText: "#000000",
    
    // Advanced level (pink)
    advancedBackground: "#f50057",
    advancedBorder: "#bb002f",
    advancedText: "#ffffff",
    
    // Expert level (green)
    expertBackground: "#00c853",
    expertBorder: "#009624",
    expertText: "#ffffff",
    
    // Edges
    edgeColor: "#0039cb",
    edgeAnimatedColor: "#bb002f",
    
    // Background
    backgroundColor: "#f5f5f5"
  }
};
