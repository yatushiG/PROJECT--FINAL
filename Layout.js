import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, Upload, FolderOpen, Info, Mail, Layers } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: createPageUrl("Home"), icon: BookOpen },
    { name: "Upload", path: createPageUrl("Upload"), icon: Upload },
    { name: "Resources", path: createPageUrl("Resources"), icon: FolderOpen },
    { name: "About", path: createPageUrl("About"), icon: Info },
    { name: "Contact", path: createPageUrl("Contact"), icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <style>
        {`
          :root {
            --primary-blue: #3B82F6;
            --secondary-blue: #60A5FA;
            --accent-blue: #E0F2FE;
            --text-primary: #1E293B;
            --text-secondary: #64748B;
            --shadow-elegant: 0 4px 20px -2px rgba(59, 130, 246, 0.15);
          }
        `}
      </style>
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-gray-900 to-black rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                  SourceIT
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Your Knowledge Hub</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Link
                to={createPageUrl("Upload")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors"
              >
                Upload
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-blue-100 bg-white/95">
          <div className="px-4 py-3">
            <div className="flex justify-between items-center">
              {navItems.slice(0, 4).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Layers className="w-6 h-6 text-gray-900" />
              <span className="text-xl font-bold text-gray-800">SourceIT</span>
            </div>
            <p className="text-gray-600 mb-4">Centralize. Share. Innovate.</p>
            <p className="text-sm text-gray-500">
              © 2024 SourceIT. Your central hub for knowledge.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}