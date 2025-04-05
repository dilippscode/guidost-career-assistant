
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem,
  CommandSeparator
} from "@/components/ui/command";
import { ArrowRight, BookOpen, FileText, Landmark, Search, User } from "lucide-react";

// Define search result types for better organization
type SearchResult = {
  title: string;
  description?: string;
  url: string;
  category: "Pages" | "Resources" | "Mentors" | "Courses";
  keywords?: string[]; // Additional keywords for better searching
};

const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Expanded search index with more content and keywords
  const searchIndex: SearchResult[] = [
    // Pages
    { title: "Home", url: "/", category: "Pages", keywords: ["dashboard", "main", "start"] },
    { title: "Career Compass", description: "AI-powered career guidance", url: "/career-compass", category: "Pages", keywords: ["career", "path", "future", "ai", "guidance"] },
    { title: "Roadmaps", description: "Learning paths for different careers", url: "/roadmaps", category: "Pages", keywords: ["path", "learning", "track", "journey"] },
    { title: "Mentorship", description: "Connect with industry mentors", url: "/mentorship", category: "Pages", keywords: ["mentor", "guidance", "advice", "industry"] },
    { title: "Voice Feedback", description: "Get AI feedback on your presentations", url: "/voice-feedback", category: "Pages", keywords: ["voice", "presentation", "feedback", "speech"] },
    { title: "About Us", description: "Learn about our mission", url: "/about", category: "Pages", keywords: ["company", "mission", "story"] },
    { title: "Contact", description: "Get in touch with us", url: "/contact", category: "Pages", keywords: ["contact", "support", "help", "email"] },
    
    // Mentors
    { title: "Dr. James Wilson", description: "Senior Software Engineer at Google", url: "/mentorship?mentor=james-wilson", category: "Mentors", keywords: ["software", "google", "engineering", "senior"] },
    { title: "Emily Chen", description: "Data Scientist at Microsoft", url: "/mentorship?mentor=emily-chen", category: "Mentors", keywords: ["data", "science", "microsoft", "machine learning"] },
    { title: "Michael Rodriguez", description: "UX Design Lead at Adobe", url: "/mentorship?mentor=michael-rodriguez", category: "Mentors", keywords: ["ux", "design", "adobe", "interface"] },
    { title: "Sarah Johnson", description: "Product Manager at Amazon", url: "/mentorship?mentor=sarah-johnson", category: "Mentors", keywords: ["product", "management", "amazon", "business"] },
    { title: "Dr. Robert Lee", description: "AI Researcher at DeepMind", url: "/mentorship?mentor=robert-lee", category: "Mentors", keywords: ["ai", "machine learning", "research", "deepmind"] },
    
    // Courses
    { title: "Data Structures", description: "Fundamentals of data organization", url: "/course-resources?course=data-structures", category: "Courses", keywords: ["arrays", "linked lists", "trees", "graphs", "hash tables"] },
    { title: "Algorithms", description: "Problem-solving techniques", url: "/course-resources?course=algorithms", category: "Courses", keywords: ["sorting", "searching", "dynamic programming", "greedy"] },
    { title: "Machine Learning", description: "Building intelligent systems", url: "/course-resources?course=machine-learning", category: "Courses", keywords: ["neural networks", "deep learning", "supervised", "unsupervised"] },
    { title: "Web Development", description: "Building modern web applications", url: "/course-resources?course=web-development", category: "Courses", keywords: ["html", "css", "javascript", "react", "node"] },
    { title: "Database Systems", description: "Data storage and management", url: "/course-resources?course=database-systems", category: "Courses", keywords: ["sql", "nosql", "indexing", "transactions"] },
    { title: "Operating Systems", description: "Computer system fundamentals", url: "/course-resources?course=operating-systems", category: "Courses", keywords: ["processes", "threads", "memory management", "file systems"] },
    { title: "Computer Networks", description: "Network architecture and protocols", url: "/course-resources?course=computer-networks", category: "Courses", keywords: ["tcp/ip", "http", "dns", "routing"] },
    { title: "Artificial Intelligence", description: "Intelligent agent design", url: "/course-resources?course=artificial-intelligence", category: "Courses", keywords: ["search", "knowledge representation", "reasoning", "planning"] },
  ];

  // Register keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Filter search results based on query
  const filteredResults = searchQuery.trim() === "" 
    ? searchIndex 
    : searchIndex.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchLower) || 
          (item.description?.toLowerCase().includes(searchLower)) ||
          item.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower))
        );
      });

  // Group results by category
  const pageResults = filteredResults.filter(item => item.category === "Pages");
  const courseResults = filteredResults.filter(item => item.category === "Courses");
  const mentorResults = filteredResults.filter(item => item.category === "Mentors");

  // Handle search result selection
  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setSearchQuery("");
    navigate(result.url);
  };

  // Get the appropriate icon for each category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Pages":
        return <FileText className="mr-2 h-4 w-4 text-muted-foreground" />;
      case "Courses":
        return <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />;
      case "Mentors":
        return <User className="mr-2 h-4 w-4 text-muted-foreground" />;
      case "Resources":
        return <Landmark className="mr-2 h-4 w-4 text-muted-foreground" />;
      default:
        return <Search className="mr-2 h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <>
      {/* Command dialog for search */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search across GuiDost..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found. Try a different search term.</CommandEmpty>
          
          {/* Display pages */}
          {pageResults.length > 0 && (
            <CommandGroup heading="Pages">
              {pageResults.map(result => (
                <CommandItem
                  key={result.url}
                  onSelect={() => handleSelect(result)}
                >
                  {getCategoryIcon(result.category)}
                  <span>{result.title}</span>
                  {result.description && (
                    <span className="text-sm text-muted-foreground ml-2">
                      — {result.description}
                    </span>
                  )}
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {/* Show separator if multiple sections are displayed */}
          {pageResults.length > 0 && (courseResults.length > 0 || mentorResults.length > 0) && (
            <CommandSeparator />
          )}
          
          {/* Display courses */}
          {courseResults.length > 0 && (
            <CommandGroup heading="Courses">
              {courseResults.map(result => (
                <CommandItem
                  key={result.url}
                  onSelect={() => handleSelect(result)}
                >
                  {getCategoryIcon(result.category)}
                  <span>{result.title}</span>
                  {result.description && (
                    <span className="text-sm text-muted-foreground ml-2">
                      — {result.description}
                    </span>
                  )}
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {/* Show separator if multiple sections are displayed */}
          {courseResults.length > 0 && mentorResults.length > 0 && (
            <CommandSeparator />
          )}
          
          {/* Display mentors */}
          {mentorResults.length > 0 && (
            <CommandGroup heading="Mentors">
              {mentorResults.map(result => (
                <CommandItem
                  key={result.url}
                  onSelect={() => handleSelect(result)}
                >
                  {getCategoryIcon(result.category)}
                  <span>{result.title}</span>
                  {result.description && (
                    <span className="text-sm text-muted-foreground ml-2">
                      — {result.description}
                    </span>
                  )}
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
