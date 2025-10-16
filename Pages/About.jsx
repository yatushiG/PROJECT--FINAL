import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Target, Heart, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Quality Resources",
      description: "Curated study materials from top students worldwide"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by students, for students - fostering collaborative learning"
    },
    {
      icon: Target,
      title: "Academic Excellence",
      description: "Helping students achieve their educational goals"
    },
    {
      icon: Heart,
      title: "Free Access",
      description: "Completely free platform - education should be accessible to all"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SourceIT</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            SourceIT is a revolutionary platform that connects students worldwide through the power of shared knowledge. 
            We believe that education thrives when students collaborate and share their insights with one another.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 text-center leading-relaxed">
                To democratize access to quality educational resources by creating a global community where 
                students can freely share, discover, and learn from each other's knowledge and experiences.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Our Story</h2>
              <div className="prose prose-lg mx-auto text-gray-700">
                <p className="mb-4">
                  SourceIT was born from a simple observation: students learn best when they learn together. 
                  Founded by a group of university students who struggled to find quality study materials, 
                  we set out to create a platform that would make academic resources accessible to everyone.
                </p>
                <p className="mb-4">
                  What started as a small project to share notes between classmates has grown into a global 
                  community of learners. Today, students use SourceIT to access 
                  thousands of high-quality educational resources.
                </p>
                <p>
                  We believe that knowledge grows when it's shared, and every student has something valuable 
                  to contribute. Join us in building a more collaborative and accessible future for education.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}