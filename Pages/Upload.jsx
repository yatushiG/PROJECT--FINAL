import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Resource } from "@/entities/Resource";
import { UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, X, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const urlParams = new URLSearchParams(window.location.search);
  const defaultType = urlParams.get('type') || '';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: defaultType,
    subject: '',
    course: '',
    tags: ''
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const subjects = [
    "mathematics", "physics", "chemistry", "biology", "computer_science",
    "english", "history", "economics", "psychology", "engineering", "business", "other"
  ];

  const resourceTypes = [
    { id: "notes", label: "Study Notes" },
    { id: "presentations", label: "Presentations" },
    { id: "question_papers", label: "Question Papers" }
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !formData.title || !formData.type || !formData.subject) {
      return;
    }

    setIsUploading(true);
    try {
      // Upload file
      const { file_url } = await UploadFile({ file: selectedFile });
      
      // Create resource record
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await Resource.create({
        ...formData,
        file_url,
        tags: tagsArray
      });

      setUploadSuccess(true);
      setTimeout(() => {
        navigate(createPageUrl("Resources"));
      }, 2000);
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setIsUploading(false);
  };

  if (uploadSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Successful!</h2>
          <p className="text-gray-600 mb-4">Your resource has been shared with the community</p>
          <p className="text-sm text-gray-500">Redirecting to resources...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(createPageUrl("Home"))}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upload Resource</h1>
            <p className="text-gray-600">Share your knowledge with fellow students</p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl">Resource Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <Label className="text-base font-medium">File Upload</Label>
                <div className="mt-2">
                  {selectedFile ? (
                    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PDF, DOC, PPT, or image files</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-base font-medium">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a descriptive title"
                  className="mt-2"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-base font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the content and what makes it useful"
                  className="mt-2 h-24"
                />
              </div>

              {/* Type and Subject */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium">Resource Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Course */}
              <div>
                <Label htmlFor="course" className="text-base font-medium">Course/Level</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                  placeholder="e.g., Grade 12, Bachelor's, Master's"
                  className="mt-2"
                />
              </div>

              {/* Tags */}
              <div>
                <Label htmlFor="tags" className="text-base font-medium">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Enter tags separated by commas"
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Help others find your resource with relevant keywords
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={!selectedFile || !formData.title || !formData.type || !formData.subject || isUploading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Share Resource
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}