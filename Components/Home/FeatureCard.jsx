import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function FeatureCard({ feature, index }) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}