import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, BookOpen, Users, Star } from "lucide-react";

export default function HeroSection({ onUploadClick }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-green-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Share
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Knowledge
              </span>
              <br />
              Excel Together
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Upload your notes, presentations, and question papers. Access high-quality 
              study materials shared by students worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onUploadClick}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Resources
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 font-semibold px-8 py-4 text-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Library
              </Button>
            </div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-2xl">
              {/* Floating cards animation */}
              <div className="space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">Mathematics Notes</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-3/4" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100 ml-8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">Physics Presentation</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-purple-500 rounded-full w-1/2" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-green-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">Chemistry Papers</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-5/6" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
)}
;