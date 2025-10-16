import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Presentation, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function UploadModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const categories = [
    {
      id: "notes",
      title: "Notes",
      description: "Share your comprehensive study notes and summaries",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: "presentations",
      title: "Presentations",
      description: "Upload presentation slides and visual materials",
      icon: Presentation,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: "question_papers",
      title: "Previous Year Questions",
      description: "Share previous year question papers and mock tests",
      icon: HelpCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  const handleCategorySelect = (categoryId) => {
    navigate(createPageUrl(`Upload?type=${categoryId}`));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            What would you like to upload?
          </DialogTitle>
          <p className="text-gray-600 text-center">
            Choose the type of resource you want to share with the community
          </p>
        </DialogHeader>
        
        <div className="grid gap-4 mt-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${category.bgColor} ${category.borderColor} border-2`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {category.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}