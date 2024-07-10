import Image from "next/image";
import { Artist } from "@/app/types";
import { SearchResult } from "@/app/types";
import { useVideo } from "@/app/contexts/videoContext/videoContext";

interface SongResultsProps {
  key: string | number;
  item: SearchResult;
}

export default function SongResults({ key, item }: SongResultsProps) {
  const { setVideoId } = useVideo();
  return (
    <div
      key={key}
      className="flex flex-row justify-between items-center p-2 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
      onClick={() => setVideoId(item.videoId || "")}
    >
      <div className="flex flex-row gap-3 items-center">
        {item.thumbnails && item.thumbnails[0] && (
          <Image
            src={item.thumbnails[0].url}
            alt={item.title || ""}
            width={50}
            height={50}
            className={`${
              item.resultType === "artist" ? "rounded-full" : "rounded-lg"
            } mb-2`}
          />
        )}
        <div>
          {item.title && item.resultType !== "artist" ? (
            <div className="text-lg ">{item.title}</div>
          ) : (
            <div className="text-lg ">{item.artist && item.artist}</div>
          )}
          <div className="flex flex-row items-center">
            {item.artists !== undefined &&
              item.artists?.length !== 0 &&
              item.resultType !== "artist" && (
                <div className="text-sm text-gray-400">
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
            {item.album && item.album.name && (
              <div className="text-sm text-gray-400">
                <span className="ml-1"> • </span>
                {item.album.name}
              </div>
            )}
          </div>
        </div>
      </div>
      {item.duration && (
        <div className="text-sm text-gray-300 mr-4">{item.duration}</div>
      )}
    </div>
  );
}
