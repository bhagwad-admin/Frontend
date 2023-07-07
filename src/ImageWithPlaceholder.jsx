import React, { useState } from "react";

const ImageWithPlaceholder = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-spin rounded-full h-full w-full border-t-2 border-b-2 border-gray-900"></span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
