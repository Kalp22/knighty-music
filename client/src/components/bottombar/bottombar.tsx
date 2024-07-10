"use client";
import { useState, useEffect } from "react";
import { useVideo } from "@/app/contexts/videoContext/videoContext";
import { Player } from "react-player";
import { IoPlay, IoPause } from "react-icons/io5";

export default function Bottombar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { videoId } = useVideo();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // No need for separate fetch logic with react-player
  }, [videoId]);

  return (
    <footer className="flex flex-col justify-between fixed bottom-0 w-screen h-20 z-10 bg-black">
      <div className="flex flex-row h-20 px-6 w-full justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <IoPause size={35} className="text-white" />
            ) : (
              <IoPlay size={35} className="text-white" />
            )}
          </button>
        </div>
        <Player
          url={`https://www.youtube.com/watch?v=pIWaVJPl0-c`} // Assuming the endpoint provides a valid stream URL
          playing={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls={true} // Enables built-in player controls
          width="100%"
          height="100%" // Adjust height as needed
        />
      </div>
    </footer>
  );
}
