import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ options }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, options);
      setIsReady(true);
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [options]);

  return (
    <div data-vjs-player>
      {isReady && <video ref={videoRef} className="video-js" />}
    </div>
  );
};

export default VideoPlayer;
