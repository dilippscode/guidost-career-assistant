
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AuthForm from "@/components/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-guidost-600 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
        
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
