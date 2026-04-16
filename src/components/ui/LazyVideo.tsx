import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Plyr, type PlyrProps, type APITypes } from 'plyr-react';
import 'plyr-react/plyr.css';

interface LazyVideoProps {
  src: string;
  className?: string;
  poster?: string;
}

const plyrOptions: PlyrProps['options'] = {
  controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
  resetOnEnd: true,
  clickToPlay: true,
  hideControls: true,
  ratio: '9:16',
};

export default function LazyVideo({ src, className = "", poster }: LazyVideoProps) {
  const { ref: viewRef, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
  const plyrRef = useRef<APITypes>(null);

  const plyrSource: PlyrProps['source'] = {
    type: 'video',
    sources: [{ src, type: 'video/mp4' }],
    ...(poster ? { poster } : {}),
  };

  return (
    <div ref={viewRef} className={`${className} [&_.plyr]:w-full [&_.plyr]:h-full [&_.plyr__video-wrapper]:h-full [&_video]:object-cover [&_video]:w-full [&_video]:h-full [&_.plyr--video]:bg-[#0F172A] [&_.plyr__control--overlaid]:bg-[#FFD600] [&_.plyr__control--overlaid]:text-[#0F172A] [&_.plyr--full-ui_input[type=range]]:color-[#FFD600]`}>
      {inView ? (
        <Plyr
          ref={plyrRef}
          source={plyrSource}
          options={plyrOptions}
        />
      ) : (
        <div className="w-full h-full bg-[#0F172A] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
