import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/team", label: t("nav.team") },
    { path: "/technology", label: t("nav.technology") },
    { path: "/success-stories", label: t("nav.success") },
    { path: "/soil-analysis", label: t("nav.soil") },
    { path: "/chatbot", label: t("nav.chatbot") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-max section-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Using actual Bindisa Agritech logo image */}
          <Link to="/" className="flex items-center">
            <img
              src="/bindisa-agritech-logo.png"
              alt="Bindisa Agritech"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                // Fallback to responsive image if main logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            {/* Enhanced fallback with responsive image */}
            <div className="hidden flex items-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2F740e0aee3e534c8a969cc741175154a3%2Fb42e486112e949778170c1a33850a089"
                alt="Bindisa Agritech Logo"
                className="w-full min-w-5 object-cover object-center overflow-hidden pb-6 mr-auto flex-grow"
                style={{ aspectRatio: "1.42" }}
              />
              <span className="text-white font-bold text-lg">B</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item, index) => {
              let marginClass = "";
              // Apply specific margin classes based on the diff requirements
              if (item.path === "/about" || item.path === "/team") {
                marginClass = "mx-auto";
              } else if (item.path === "/technology") {
                marginClass = "mr-auto";
              } else if (item.path === "/success-stories") {
                marginClass = "ml-8";
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${marginClass} ${
                    isActive(item.path)
                      ? "text-agri-primary bg-agri-accent"
                      : "text-gray-700 hover:text-agri-primary hover:bg-agri-accent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">
                    {languages.find((l) => l.code === language)?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={language === lang.code ? "bg-agri-accent" : ""}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="btn-agri-primary">
                    {t("nav.register")}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-agri-primary bg-agri-accent"
                      : "text-gray-700 hover:text-agri-primary hover:bg-agri-accent"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Language Selector */}
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">Language</span>
                </div>
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage(lang.code as any)}
                      className="text-xs"
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mobile User Actions */}
              {user ? (
                <div className="px-3 py-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{user.name}</span>
                    <Button variant="outline" size="sm" onClick={logout}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="px-3 py-2 border-t">
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        {t("nav.login")}
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button size="sm" className="w-full btn-agri-primary">
                        {t("nav.register")}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
