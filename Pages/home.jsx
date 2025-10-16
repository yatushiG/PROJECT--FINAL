import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Upload, BookOpen, FileText, Presentation, HelpCircle, Users, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

import HeroSection from "../Components/Home/HeroSection";
import FeatureCard from "../Components/Home/FeatureCard";
import UploadModal from "../Components/Home/UploadModal";

export default function HomePage() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "Study Notes",
      description: "Access comprehensive notes from top students across all subjects",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Presentation,
      title: "Presentations",
      description: "Download and share presentation slides for better understanding",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: HelpCircle,
      title: "Question Papers",
      description: "Practice with previous year question papers and mock tests",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow students and share knowledge",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection onUploadClick={() => setShowUploadModal(true)} />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access thousands of study materials, connect with peers, and boost your academic performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Share Your Knowledge?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already sharing and accessing quality educational resources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowUploadModal(true)}
                className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Resources
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg"
              >
                <Link to={createPageUrl("Resources")}>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Resources
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upload Modal */}
      <UploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </div>
    )}
  ;