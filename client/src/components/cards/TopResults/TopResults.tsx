import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Artist } from "@/app/types";
import { SearchResult } from "@/app/types";

interface TopResultsProps {
  key: string | number;
  item: SearchResult;
}

export default function TopResults({ key, item }: TopResultsProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      key={key}
      className="flex flex-row w-[55rem] h-40 items-center justify-between px-4 py-6 shadow-md bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
      onClick={() => router.push(`/song/${item.videoId}`)}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-row gap-3 items-center">
        {item.thumbnails && item.thumbnails[0] && (
          <Image
            src={item.thumbnails[0].url}
            alt={item.title || ""}
            width={item.thumbnails[0].width || 60}
            height={item.thumbnails[0].height || 60}
            className={`${
              item.resultType === "artist" ? "rounded-full" : "rounded"
            } mb-2`}
          />
        )}
        <div className="flex flex-col gap-2">
          {item.title ? (
            <div className="text-2xl">{item.title}</div>
          ) : (
            <div className="text-2xl">
              {item.artists !== undefined &&
                item.artists?.length !== 0 &&
                item.artists[0].name}
            </div>
          )}
          <div className="flex flex-row items-center">
            <div>{item.resultType} </div>
            {item.artists !== undefined &&
              item.artists?.length !== 0 &&
              item.resultType !== "artist" && (
                <div className="text-sm text-gray-400">
                  <span className="ml-1"> • </span>
                  {item.artists.map((artist: Artist, index: number) => (
                    <span key={index}>
                      {artist.name}
                      {index <
                        (item.artists !== undefined
                          ? item.artists?.length
                          : 0) -
                          1 && ", "}
                    </span>
                  ))}
                </div>
              )}
            {item.subscribers && (
              <div className="text-sm text-gray-400">
                <span className="ml-1"> • </span>
                {item.subscribers}
                <span> subscribers</span>
              </div>
            )}
            {item.album && item.album.name && (
              <div className="text-sm text-gray-400">
                <span className="ml-1"> • </span>
                {item.album.name}
              </div>
            )}
            {item.views && (
              <div className="text-sm text-gray-400">
                <span className="ml-1"> • </span>
                {item.views}
                <span> views</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <IoPlayCircleOutline
        size={55}
        className={`${hovered ? "block" : "hidden"} mr-2`}
      />
    </div>
  );
}
