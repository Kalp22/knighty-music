import Image from "next/image";
import { Artist } from "@/app/types";
import { SearchResult } from "@/app/types";
import { useRouter } from "next/navigation";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

interface ArtAlbumResultsProps {
  key: string | number;
  item: SearchResult | undefined;
  cat: string;
}

export default function ArtAlbumResults({
  key,
  item,
  cat,
}: ArtAlbumResultsProps) {
  const router = useRouter();
  console.log(item?.resultType === "playlist" ? item : item?.artists);
  return (
    <>
      {item === undefined ? (
        <div
          key={key}
          className={`flex flex-col gap-6 items-center p-2 ${
            cat === "Artists" ? "rounded-3xl" : "rounded-lg"
          } shadow-md hover:bg-gray-700 cursor-pointer transition-colors duration-200`}
        >
          <IoArrowForwardCircleOutline size={70} className="text-gray-400" />
          <div className="text-lg ">See more {cat}</div>
        </div>
      ) : (
        <div
          key={key}
          className={`flex flex-col gap-6 items-center p-2 ${
            cat === "Artists" ? "rounded-3xl" : "rounded-lg"
          } shadow-md hover:bg-gray-700 cursor-pointer transition-colors duration-200`}
          onClick={() => router.push(`/song/${item.videoId}`)}
        >
          {item.thumbnails && item.thumbnails[0] && (
            <Image
              src={item.thumbnails[0].url}
              alt={item.title || ""}
              width={cat === "Artists" ? 100 : 70}
              height={cat === "Artists" ? 100 : 70}
              className={`${
                cat === "Artists" ? "rounded-full" : "rounded"
              } mb-2`}
            />
          )}
          <div>
            {item.title && item.resultType !== "artist" ? (
              <div className="font-bold">{item.title}</div>
            ) : (
              <div className="text-lg">{item.artist && item.artist}</div>
            )}
            <div>
              {cat === "Album" ? (
                item.artists !== undefined &&
                item.artists?.length !== 0 &&
                item.resultType !== "artist" && (
                  <div className="text-sm text-gray-400">
                    {item.artists.map(
                      (artist: Artist, index: number) =>
                        index < 3 && (
                          <span key={index}>
                            {artist.name}
                            {index <
                              (item.artists !== undefined
                                ? item.artists?.length > 3
                                  ? 3
                                  : item.artists?.length
                                : 0) -
                                1 && ", "}
                          </span>
                        )
                    )}
                  </div>
                )
              ) : (
                <div className="text-sm text-gray-400">
                  {item.author && item.author}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
