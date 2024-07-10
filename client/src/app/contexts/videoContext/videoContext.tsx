"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface VideoContextProps {
  videoId: string | null;
  setVideoId: (id: string) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <VideoContext.Provider value={{ videoId, setVideoId }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
