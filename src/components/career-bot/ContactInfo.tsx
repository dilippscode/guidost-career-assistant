
import React from "react";
import { Mail, Phone } from "lucide-react";

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white p-3 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-600">
        <div className="flex items-center mb-2 sm:mb-0">
          <Mail className="h-4 w-4 mr-2 text-guidost-500" />
          <a href="mailto:dilippsdilip@gmail.com" className="hover:text-guidost-600">
            dilippsdilip@gmail.com
          </a>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-guidost-500" />
          <a href="tel:+919035014571" className="hover:text-guidost-600">
            +91 9035014571
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
