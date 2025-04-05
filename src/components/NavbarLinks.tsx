
import React from "react";
import { Link } from "react-router-dom";
import { Volume2, WifiOff } from "lucide-react";

const NavbarLinks = () => {
  return (
    <>
      <Link to="/voice-feedback" className="flex items-center space-x-1 text-guidost-600 hover:text-guidost-700">
        <div className="flex items-center">
          <Volume2 className="h-4 w-4" />
          <WifiOff className="h-3 w-3 -ml-1 -mt-3" />
        </div>
        <span>Voice Feedback & Reflection</span>
      </Link>
    </>
  );
};

export default NavbarLinks;
