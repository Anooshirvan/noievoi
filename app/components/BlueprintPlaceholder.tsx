import React from 'react';

// This is a placeholder component since we can't generate actual images in this environment
const BlueprintPlaceholder = () => {
  return (
    <div className="w-full h-full">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,80,170,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,80,170,0.05) 1px, transparent 1px),
            linear-gradient(rgba(0,80,170,0.03) 0.5px, transparent 0.5px),
            linear-gradient(90deg, rgba(0,80,170,0.03) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
        }}
      >
        {/* Add small decorative elements that look like blueprint annotations */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-primary/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-12 border-2 border-primary/10"></div>
        <div className="absolute top-2/3 left-1/2 w-20 h-20 border-2 border-primary/10"></div>
      </div>
    </div>
  );
};

export default BlueprintPlaceholder; 