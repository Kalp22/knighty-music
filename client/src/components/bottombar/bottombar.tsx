"use client";
import { useState, useEffect, useRef, use } from "react";
import { useVideo } from "@/app/contexts/videoContext/videoContext";
import { IoPlay, IoPlayBack, IoPlayForward, IoPause } from "react-icons/io5";
import { SongDataProps } from "@/app/types";

export default function Bottombar() {
  const [hoverToggle, setHovering] = useState(false);
  const { videoId } = useVideo();
  const [allStreamData, setAllStreamData] = useState<SongDataProps | null>(
    null
  );
  const [cipher, setCipher] = useState<string>("");
  const [streamUrl, setStreamUrl] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const Hovering = (y: boolean) => {
    y ? setHovering(true) : setHovering(false);
  };

  const fetchStreamData = async () => {
    if (!videoId) return;
    const res = await fetch(`http://127.0.0.1:8000/api/stream/${videoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setAllStreamData(data);
  };

  const fetchStreamUrl = async () => {
    if (!videoId) return;
    const res = await fetch(`http://localhost:5000/api/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cipher: cipher }),
    });
    const data = await res.json();
    if (!data.url) {
      console.log("No stream URL found");
      return;
    }
    setStreamUrl(data.url);
    console.log("Fetched stream URL", data.url);
  };

  useEffect(() => {
    fetchStreamData();
  }, [videoId]);

  useEffect(() => {
    fetchStreamUrl();
  }, [cipher]);

  useEffect(() => {
    if (!allStreamData) return;
    const adaptiveFormats = allStreamData.streamingData.adaptiveFormats;
    const audioFormats = adaptiveFormats.filter(
      (f) =>
        f.mimeType.includes("audio/mp4") || f.mimeType.includes("audio/webm")
    );
    console.log("Audio formats", audioFormats);

    // Get the highest quality audio format
    let highestQualityAudio = audioFormats.filter(
      (f) => f?.audioQuality === "AUDIO_QUALITY_MEDIUM"
    );

    console.log("Highest quality audio", highestQualityAudio);

    if (highestQualityAudio.length === 0) {
      highestQualityAudio = audioFormats.filter(
        (f) => f?.audioQuality === "AUDIO_QUALITY_LOW"
      );
    }

    const audio = highestQualityAudio[0];

    if (!audio) {
      console.log("No audio found");
      return;
    }

    const sigCipher = audio.signatureCipher;
    if (!sigCipher) {
      console.log("No signature cipher found");
      return;
    }
    console.log("Signature cipher", sigCipher);
    setCipher(sigCipher);
  }, [allStreamData]);

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
        <audio ref={audioRef} autoPlay>
          {streamUrl && <source src={streamUrl} type="audio/webm" />}
          Your browser does not support the audio element.
        </audio>
      </div>
    </footer>
  );
}
