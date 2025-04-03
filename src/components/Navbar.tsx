
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isProduction = window.location.hostname !== "localhost" && 
                       !window.location.hostname.includes(".lovable.app");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            {!isProduction && (
              <span className="text-2xl font-bold gradient-heading">GuiDost</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-guidost-600 font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-guidost-600 font-medium">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/career-compass" className="block px-4 py-2 text-sm text-gray-700 hover:bg-guidost-50 hover:text-guidost-600">
                  Career Compass Bot
                </Link>
                <Link to="/roadmaps" className="block px-4 py-2 text-sm text-gray-700 hover:bg-guidost-50 hover:text-guidost-600">
                  Course Roadmaps
                </Link>
                <Link to="/mentorship" className="block px-4 py-2 text-sm text-gray-700 hover:bg-guidost-50 hover:text-guidost-600">
                  Find Mentors
                </Link>
              </div>
            </div>
            <Link to="/about" className="text-gray-700 hover:text-guidost-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-guidost-600 font-medium">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-guidost-500 text-guidost-600 hover:bg-guidost-50">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-guidost-500 text-guidost-600 hover:bg-guidost-50"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button 
                  className="gradient-button"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-guidost-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-guidost-600 font-medium py-2" onClick={toggleMenu}>
                Home
              </Link>
              <div className="space-y-2 pl-4 border-l-2 border-guidost-100">
                <Link to="/career-compass" className="block text-gray-700 hover:text-guidost-600 font-medium py-1" onClick={toggleMenu}>
                  Career Compass Bot
                </Link>
                <Link to="/roadmaps" className="block text-gray-700 hover:text-guidost-600 font-medium py-1" onClick={toggleMenu}>
                  Course Roadmaps
                </Link>
                <Link to="/mentorship" className="block text-gray-700 hover:text-guidost-600 font-medium py-1" onClick={toggleMenu}>
                  Find Mentors
                </Link>
              </div>
              <Link to="/about" className="text-gray-700 hover:text-guidost-600 font-medium py-2" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-guidost-600 font-medium py-2" onClick={toggleMenu}>
                Contact
              </Link>
              <div className="pt-2 flex flex-col space-y-3">
                {user ? (
                  <>
                    <Link to="/profile" onClick={toggleMenu}>
                      <Button 
                        variant="outline" 
                        className="border-guidost-500 text-guidost-600 hover:bg-guidost-50 w-full"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Button 
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50 w-full"
                      onClick={() => {
                        handleSignOut();
                        toggleMenu();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-guidost-500 text-guidost-600 hover:bg-guidost-50 w-full"
                      onClick={() => {
                        toggleMenu();
                        navigate("/login");
                      }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      className="gradient-button w-full"
                      onClick={() => {
                        toggleMenu();
                        navigate("/signup");
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
