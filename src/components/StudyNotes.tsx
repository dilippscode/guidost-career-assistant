
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Save, BookOpen, Plus, ExternalLink, Check, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { searchEducationalContent, saveNote, getNotes } from "@/services/webSearchService";

interface StudyNotesProps {
  initialSubject?: string;
}

const StudyNotes: React.FC<StudyNotesProps> = ({ initialSubject = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("search");
  
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    subject: initialSubject
  });

  useEffect(() => {
    // Load saved notes when component mounts
    loadNotes();
  }, []);

  const loadNotes = () => {
    const savedNotes = getNotes();
    setNotes(savedNotes);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    
    setIsSearching(true);
    try {
      const results = await searchEducationalContent(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("An error occurred during search");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    
    const success = await saveNote(newNote);
    
    if (success) {
      toast.success("Note saved successfully");
      loadNotes();
      setNewNote({ title: "", content: "", subject: initialSubject });
    } else {
      toast.error("Failed to save note");
    }
  };

  const handleUseSearchResult = (result: any) => {
    setNewNote({
      title: result.title,
      content: result.snippet,
      subject: initialSubject
    });
    setActiveTab("create");
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <BookOpen className="h-5 w-5 text-guidost-600 mr-2" />
          Study Notes
        </CardTitle>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mx-4">
          <TabsTrigger value="search">
            <Search className="h-4 w-4 mr-2" />
            Search
          </TabsTrigger>
          <TabsTrigger value="create">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </TabsTrigger>
          <TabsTrigger value="saved">
            <BookOpen className="h-4 w-4 mr-2" />
            Saved ({notes.length})
          </TabsTrigger>
        </TabsList>
        
        <CardContent className="pt-4">
          <TabsContent value="search" className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search for subject-related notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </form>
            
            {searchResults.length > 0 && (
              <div className="space-y-3 mt-4">
                <h3 className="text-sm font-medium text-gray-500">Search Results</h3>
                {searchResults.map((result, index) => (
                  <div key={index} className="p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{result.title}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUseSearchResult(result)}
                      >
                        Use
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{result.snippet}</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>{result.source}</span>
                      <a 
                        href={result.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-guidost-600 hover:underline"
                      >
                        View source <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                id="title"
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Subject or course"
                value={newNote.subject}
                onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <Textarea
                id="content"
                placeholder="Enter your notes here..."
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                className="min-h-[150px]"
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveNote}>
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            {notes.length > 0 ? (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{note.title}</h4>
                      <span className="text-xs bg-guidost-100 text-guidost-800 px-2 py-0.5 rounded">
                        {note.subject}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{note.content}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      Added: {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No saved notes yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setActiveTab("create")}
                >
                  Create your first note
                </Button>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default StudyNotes;
