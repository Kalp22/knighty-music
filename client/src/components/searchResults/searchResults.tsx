import Image from "next/image";
import { SearchResult } from "../../app/types";
import { useVideo } from "@/app/contexts/videoContext/videoContext";

interface SearchResultProps {
  results: SearchResult[];
}

const SearchResultComponent: React.FC<SearchResultProps> = ({ results }) => {
  const { setVideoId } = useVideo();
  console.log(results[0]);
  return (
    <div className="absolute top-14 h-fit w-[550px] bg-stone-900 rounded-2xl">
      <div className="mt-4 w-full">
        {results.map((result, i) => (
          <>
            {i < 7 && (
              <div
                key={i}
                className="flex items-center p-4 rounded-lg shadow-md hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                onClick={() => setVideoId(result.videoId || "")}
              >
                <Image
                  src={result.thumbnails ? result.thumbnails[0].url : ""}
                  alt="thumbnail.png"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div className="ml-4">
                  <div className="font-semibold">
                    {result.resultType === "artist" && result.artists ? (
                      <> {result?.artists[0].name} </>
                    ) : (
                      <> {result.title} </>
                    )}
                  </div>
                  <div className="flex flex-row gap-2 text-sm">
                    <div>{result.resultType}</div>
                    <div className="text-gray-600">
                      {result.resultType === "artist" ? (
                        ""
                      ) : (
                        <div>
                          {result.album?.name} -{" "}
                          {result.artists?.map((artist, j) =>
                            j < 2
                              ? artist.name +
                                (j < 1 &&
                                (result.artists ? result.artists?.length : 0) >
                                  1
                                  ? ", "
                                  : "")
                              : ""
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default SearchResultComponent;
