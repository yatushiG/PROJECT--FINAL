import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Presentation, HelpCircle, Download, User, Calendar } from "lucide-react";

export default function ResourceCard({ resource, index, onDownload }) {
  const typeIcons = {
    notes: BookOpen,
    presentations: Presentation,
    question_papers: HelpCircle
  };

  const typeColors = {
    notes: "from-blue-500 to-blue-600",
    presentations: "from-purple-500 to-purple-600",
    question_papers: "from-green-500 to-green-600"
  };

  const Icon = typeIcons[resource.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${typeColors[resource.type]} rounded-xl flex items-center justify-center shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="text-xs">
              {resource.subject?.replace(/_/g, ' ')}
            </Badge>
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {resource.title}
          </h3>
          
          {resource.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {resource.description}
            </p>
          )}

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {resource.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {resource.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{resource.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {resource.downloads || 0}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {format(new Date(resource.created_date), 'MMM d')}
              </div>
            </div>
            
            <Button
              size="sm"
              onClick={() => onDownload(resource)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}