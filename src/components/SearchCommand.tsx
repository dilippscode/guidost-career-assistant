
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import { Search } from "lucide-react";

// Define search result types for better organization
type SearchResult = {
  title: string;
  description?: string;
  url: string;
  category: "Pages" | "Resources" | "Mentors" | "Courses";
};

const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Sample search index - in a real app, this would be more extensive
  // and possibly fetched from an API
  const searchIndex: SearchResult[] = [
    { title: "Home", url: "/", category: "Pages" },
    { title: "Career Compass", description: "AI-powered career guidance", url: "/career-compass", category: "Pages" },
    { title: "Roadmaps", description: "Learning paths for different careers", url: "/roadmaps", category: "Pages" },
    { title: "Mentorship", description: "Connect with industry mentors", url: "/mentorship", category: "Pages" },
    { title: "Voice Feedback", description: "Get AI feedback on your presentations", url: "/voice-feedback", category: "Pages" },
    
    { title: "Dr. James Wilson", description: "Senior Software Engineer at Google", url: "/mentorship?mentor=james-wilson", category: "Mentors" },
    { title: "Emily Chen", description: "Data Scientist at Microsoft", url: "/mentorship?mentor=emily-chen", category: "Mentors" },
    { title: "Michael Rodriguez", description: "UX Design Lead at Adobe", url: "/mentorship?mentor=michael-rodriguez", category: "Mentors" },
    
    { title: "Data Structures", description: "Fundamentals of data organization", url: "/course-resources?course=data-structures", category: "Courses" },
    { title: "Algorithms", description: "Problem-solving techniques", url: "/course-resources?course=algorithms", category: "Courses" },
    { title: "Machine Learning", description: "Building intelligent systems", url: "/course-resources?course=machine-learning", category: "Courses" },
    { title: "Web Development", description: "Building modern web applications", url: "/course-resources?course=web-development", category: "Courses" },
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

  // Handle search result selection
  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    navigate(result.url);
  };

  return (
    <>
      {/* Command dialog for search */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search across GuiDost..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Group results by category */}
          <CommandGroup heading="Pages">
            {searchIndex
              .filter(item => item.category === "Pages")
              .map(result => (
                <CommandItem
                  key={result.url}
                  onSelect={() => handleSelect(result)}
                >
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{result.title}</span>
                  {result.description && (
                    <span className="text-sm text-muted-foreground ml-2">
                      — {result.description}
                    </span>
                  )}
                </CommandItem>
              ))}
          </CommandGroup>
          
          <CommandGroup heading="Courses">
            {searchIndex
              .filter(item => item.category === "Courses")
              .map(result => (
                <CommandItem
                  key={result.url}
                  onSelect={() => handleSelect(result)}
                >
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{result.title}</span>
                  {result.description && (
                    <span className="text-sm text-muted-foreground ml-2">
                      — {result.description}
                    </span>
                  )}
                </CommandItem>
              ))}
          </CommandGroup>
          
          <CommandGroup heading="Mentors">
            {searchIndex
              .filter(item => item.category === "Mentors")
              .map(result => (
                <CommandItem
                  key={result.url}
                  onSelect={() => handleSelect(result)}
                >
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{result.title}</span>
                  {result.description && (
                    <span className="text-sm text-muted-foreground ml-2">
                      — {result.description}
                    </span>
                  )}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
