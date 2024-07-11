"use client";
import { useState, useEffect, useRef } from "react";
import { useVideo } from "@/app/contexts/videoContext/videoContext";
import { IoPlay, IoPlayBack, IoPlayForward, IoPause } from "react-icons/io5";
import { StreamingData } from "@/app/types";


export default function Bottombar() {
  const [hoverToggle, setHovering] = useState(false);
  const { videoId } = useVideo();
  const [stream, setStream] = useState<StreamingData | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const Hovering = (y: boolean) => {
    y ? setHovering(true) : setHovering(false);
  };

  const fetchStream = async () => {
    if (!videoId) return;
    const res = await fetch(`http://127.0.0.1:8000/api/stream/${videoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setStream(data);
    console.log("Fetched stream data", data);
  };

  useEffect(() => {
    fetchStream();
  }, [videoId]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      console.log("Paused audio");
    } else {
      audioRef.current.play();
      console.log("Playing audio");
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Skip forward 10 seconds
    }
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Skip backward 10 seconds
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Reload the audio element with the new stream URL
      console.log("Reloading audio element with new stream URL");
    } else {
      console.log("Audio element not found");
    }
  }, [stream]);

  return (
    <footer className="flex flex-col justify-between fixed bottom-0 w-screen h-20 z-10 bg-black">
      <section className="flex w-full h-[5px] flex-row items-center">
        <div
          className="absolute w-1/2 h-[3px] hover:h-[5px] bg-blue-700 z-10 cursor-pointer transition-all"
          onMouseOver={() => Hovering(true)}
          onMouseLeave={() => Hovering(false)}
        ></div>
        <div className="absolute w-full h-[3px] bg-gray-100"></div>
        <div
          className={`absolute right-1/2 rounded-full ${
            hoverToggle ? "w-4 h-4" : "w-0 h-0"
          } bg-blue-700 transition-all z-20`}
        ></div>
      </section>
      <div className="flex flex-row h-20 px-6 w-full justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <IoPause size={35} className="text-white" />
            ) : (
              <IoPlay size={35} className="text-white" />
            )}
          </button>
          <button onClick={handleSkipBackward}>
            <IoPlayBack size={30} className="text-white" />
          </button>
          <button onClick={handleSkipForward}>
            <IoPlayForward size={30} className="text-white" />
          </button>
        </div>
        <audio ref={audioRef} autoPlay preload="none">
          {stream && <source src={stream.url} type="audio/mpeg" />}
          Your browser does not support the audio element.
        </audio>
      </div>
    </footer>
  );
}
