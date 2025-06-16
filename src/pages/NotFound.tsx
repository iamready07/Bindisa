import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 section-padding">
      <div className="max-w-md w-full">
        <Card className="card-agri text-center">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="/bindisa-agritech-logo.png"
                alt="Bindisa Agritech"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className =
                    "w-16 h-16 bg-agri-primary rounded-lg flex items-center justify-center";
                  fallback.innerHTML =
                    '<span class="text-white font-bold text-2xl">B</span>';
                  target.parentElement?.appendChild(fallback);
                }}
              />
            </div>

            {/* 404 Error */}
            <div className="mb-6">
              <h1 className="text-6xl font-bold agri-text-gradient mb-2">
                404
              </h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Page Not Found
              </h2>
              <p className="text-gray-600">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/" className="block">
                <Button className="w-full btn-agri-primary">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>

              <Link to="/contact" className="block">
                <Button
                  variant="outline"
                  className="w-full border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </Link>

              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="w-full text-gray-600 hover:text-agri-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Try these popular pages:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  to="/soil-analysis"
                  className="text-xs text-agri-primary hover:text-agri-primary-dark"
                >
                  Soil Analysis
                </Link>
                <span className="text-xs text-gray-300">•</span>
                <Link
                  to="/chatbot"
                  className="text-xs text-agri-primary hover:text-agri-primary-dark"
                >
                  AI Assistant
                </Link>
                <span className="text-xs text-gray-300">•</span>
                <Link
                  to="/success-stories"
                  className="text-xs text-agri-primary hover:text-agri-primary-dark"
                >
                  Success Stories
                </Link>
                <span className="text-xs text-gray-300">•</span>
                <Link
                  to="/team"
                  className="text-xs text-agri-primary hover:text-agri-primary-dark"
                >
                  Our Team
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
