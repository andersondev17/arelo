import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="about-feature p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
      <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
  

export default FeatureCard