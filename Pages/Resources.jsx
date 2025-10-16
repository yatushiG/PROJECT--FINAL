
import React, { useState, useEffect, useCallback } from "react";
import { Resource } from "@/entities/Resource";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Presentation, HelpCircle, Download, Search, Filter, Users } from "lucide-react";
import { motion } from "framer-motion";

import ResourceCard from "../Components/Resources/ResourceCard";
import FilterPanel from "../Components/Resources/FilterPanel";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const data = await Resource.list("-created_date");
      setResources(data);
    } catch (error) {
      console.error("Failed to load resources:", error);
    }
    setIsLoading(false);
  };

  const filterResources = useCallback(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSubject !== "all") {
      filtered = filtered.filter(resource => resource.subject === selectedSubject);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedSubject, selectedType]); // Dependencies for useCallback

  useEffect(() => {
    filterResources();
  }, [filterResources]); // Now filterResources is stable due to useCallback

  const handleDownload = async (resource) => {
    try {
      await Resource.update(resource.id, {
        ...resource,
        downloads: (resource.downloads || 0) + 1
      });
      
      // Open file in new tab
      window.open(resource.file_url, '_blank');
      
      // Update local state
      setResources(prev => prev.map(r => 
        r.id === resource.id 
          ? { ...r, downloads: (r.downloads || 0) + 1 }
          : r
      ));
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const subjects = [
    "mathematics", "physics", "chemistry", "biology", "computer_science",
    "english", "history", "economics", "psychology", "engineering", "business", "other"
  ];

  const resourceTypes = [
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "presentations", label: "Presentations", icon: Presentation },
    { id: "question_papers", label: "Question Papers", icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Resources</h1>
          <p className="text-xl text-gray-600">
            Discover high-quality study materials shared by students
          </p>
        </div>

        {/* Filters */}
        <FilterPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          subjects={subjects}
          resourceTypes={resourceTypes}
        />

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredResources.length} resources found.
          </p>
        </div>

        {/* Resource Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                index={index}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
