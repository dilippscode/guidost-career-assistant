
import { toast } from "sonner";

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
  source: string;
}

// Simulated web search results for educational content
// In a production app, this would connect to a real search API
export const searchEducationalContent = async (query: string): Promise<SearchResult[]> => {
  try {
    // Simulate API request latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock educational search results
    const results: SearchResult[] = [
      {
        title: "Introduction to Computer Science",
        snippet: "Learn fundamental computer science concepts including algorithms, data structures, and programming paradigms.",
        url: "https://example.com/cs-intro",
        source: "Educational Resource"
      },
      {
        title: "Data Structures and Algorithms",
        snippet: "Explore common data structures like arrays, linked lists, trees, and graphs, along with algorithms for searching, sorting, and optimization.",
        url: "https://example.com/data-structures",
        source: "CS Learning Platform"
      },
      {
        title: "Web Development Fundamentals",
        snippet: "Master HTML, CSS, and JavaScript to build responsive and interactive web applications from scratch.",
        url: "https://example.com/web-dev",
        source: "Developer Hub"
      },
      {
        title: "Mobile App Development Guide",
        snippet: "Comprehensive guide to building native and cross-platform mobile applications for iOS and Android platforms.",
        url: "https://example.com/mobile-dev",
        source: "Mobile Dev Academy"
      },
      {
        title: "Machine Learning Essentials",
        snippet: "Introduction to machine learning concepts, algorithms, and practical applications in data analysis and prediction.",
        url: "https://example.com/ml-basics",
        source: "AI Learning Center"
      }
    ];
    
    // Filter results based on the query
    const filteredResults = results.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) || 
      result.snippet.toLowerCase().includes(query.toLowerCase())
    );
    
    // If no specific matches, return all results
    return filteredResults.length > 0 ? filteredResults : results;
  } catch (error) {
    console.error("Error searching educational content:", error);
    toast.error("Failed to fetch search results. Please try again.");
    return [];
  }
};

export const saveNote = async (note: { title: string; content: string; subject: string }): Promise<boolean> => {
  try {
    // In a real application, this would save to a database
    // For now, we'll simulate a successful save
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get existing notes from localStorage
    const existingNotesStr = localStorage.getItem('studyNotes');
    const existingNotes = existingNotesStr ? JSON.parse(existingNotesStr) : [];
    
    // Add the new note with timestamp
    const newNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    // Save updated notes
    localStorage.setItem('studyNotes', JSON.stringify([...existingNotes, newNote]));
    
    return true;
  } catch (error) {
    console.error("Error saving note:", error);
    return false;
  }
};

export const getNotes = (): Array<{
  id: string;
  title: string;
  content: string;
  subject: string;
  createdAt: string;
}> => {
  try {
    const notesStr = localStorage.getItem('studyNotes');
    return notesStr ? JSON.parse(notesStr) : [];
  } catch (error) {
    console.error("Error retrieving notes:", error);
    return [];
  }
};
