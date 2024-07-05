import Image from "next/image";
import { Artist } from "@/app/types";
import { SearchResult } from "@/app/types";
import { useRouter } from "next/navigation";

interface SongResultsProps {
  key: string | number;
  item: SearchResult;
}

export default function SongResults({ key, item }: SongResultsProps) {
  const router = useRouter();
  return (
    <div
      key={key}
      className="flex flex-row items-center p-2 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
      onClick={() => router.push(`/song/${item.videoId}`)}
    >
      {item.thumbnails && item.thumbnails[0] && (
        <Image
          src={item.thumbnails[0].url}
          alt={item.title || ""}
          width={item.thumbnails[0].width || 150}
          height={item.thumbnails[0].height || 150}
          className={`${
            item.resultType === "artist" ? "rounded-full" : "rounded-lg"
          } mb-2`}
        />
      )}
      {item.title && item.resultType !== "artist" ? (
        <div className="text-lg ">{item.title}</div>
      ) : (
        <div className="text-lg ">{item.artist && item.artist}</div>
      )}
      <div className="flex flex-row items-center">
        {item.artists !== undefined &&
          item.artists?.length !== 0 &&
          item.resultType !== "artist" && (
            <div className="text-sm text-gray-500">
              {item.artists.map((artist: Artist, index: number) => (
                <span key={index}>
                  {artist.name}
                  {index <
                    (item.artists !== undefined ? item.artists?.length : 0) -
                      1 && ", "}
                </span>
              ))}
            </div>
          )}
        {item.subscribers && (
          <div className="text-sm text-gray-500">
            <span className="ml-1"> • </span>
            {item.subscribers}
            <span> subscribers</span>
          </div>
        )}
        {item.album && item.album.name && (
          <div className="text-sm text-gray-500">
            <span className="ml-1"> • </span>
            {item.album.name}
          </div>
        )}
        {item.duration && (
          <div className="text-sm text-gray-500">
            <span className="ml-1"> • </span>
            {item.duration}
            <span> min</span>
          </div>
        )}
        {item.views && (
          <div className="text-sm text-gray-500">
            <span className="ml-1"> • </span>
            {item.views}
            <span> views</span>
          </div>
        )}
      </div>
    </div>
  );
}