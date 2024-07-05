"use client";
import { useState } from "react";

export default function Bottombar() {
  const [hoverToggle, setHovering] = useState(false);

  const Hovering = (y: Boolean) => {
    y ? setHovering(true) : setHovering(false);
  };
  return (
    <footer className="flex fixed bottom-0 w-screen h-20 z-10 bg-black">
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
    </footer>
  );
}
