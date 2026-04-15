import React from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyVideoProps {
  src: string;
  className?: string;
  poster?: string;
}

export default function LazyVideo({ src, className = "", poster }: LazyVideoProps) {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    rootMargin: "200px" 
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {inView ? (
        <video
          className="w-full h-full object-cover"
          controls
          preload="metadata"
          controlsList="nodownload"
          playsInline
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
