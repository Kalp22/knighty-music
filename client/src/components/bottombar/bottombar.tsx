// components/Bottombar.tsx
"use client";
import { useState, useEffect } from "react";
import { useVideo } from "@/app/contexts/videoContext/videoContext";
import { IoPlay, IoPlayBack, IoPlayForward } from "react-icons/io5";
import { StreamingData } from "@/app/types";

export default function Bottombar() {
  const [hoverToggle, setHovering] = useState(false);
  const { videoId } = useVideo();
  const [stream, setStream] = useState({} as StreamingData);

  const Hovering = (y: Boolean) => {
    y ? setHovering(true) : setHovering(false);
  };

  const fetchStream = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/stream/${videoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setStream(data);
  };

  useEffect(() => {
    fetchStream();
  }, [videoId]);

  return (
    <footer className="flex flex-col justify-between fixed bottom-0 w-screen h-20 z-10 bg-black">
      <section className="flex w-full h-[5px] flex-row items-center">
        <div
          className=" absolute w-1/2 h-[3px] hover:h-[5px] bg-blue-700 z-10 cursor-pointer transition-all"
          onMouseOver={() => Hovering(true)}
          onMouseLeave={() => Hovering(false)}
        ></div>
        <div className=" absolute w-full h-[3px] bg-gray-100"></div>
        <div
          className={` absolute right-1/2 rounded-full ${
            hoverToggle ? "w-4 h-4" : "w-0 h-0"
          } bg-blue-700 transition-all z-20`}
        ></div>
      </section>
      <section className="flex flex-row h-20 px-6 w-full justify-between">
        <div className="flex flex-row gap-4 items-center">
          <IoPlay size={35} className="text-white" />
          <IoPlayBack size={30} className="text-white" />
          <IoPlayForward size={30} className="text-white" />
        </div>
        <div></div>
        <div>ohfiweh</div>
      </section>
    </footer>
  );
}
