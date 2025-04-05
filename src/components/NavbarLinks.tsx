
import React from "react";
import { Link } from "react-router-dom";
import { Volume2 } from "lucide-react";

const NavbarLinks = () => {
  return (
    <>
      <Link to="/voice-feedback" className="flex items-center space-x-1 text-guidost-600 hover:text-guidost-700">
        <Volume2 className="h-4 w-4" />
        <span>Voice Feedback & Reflection</span>
      </Link>
    </>
  );
};

export default NavbarLinks;
