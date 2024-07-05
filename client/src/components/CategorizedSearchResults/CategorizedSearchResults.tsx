import { useRouter } from "next/navigation";
import Image from "next/image";
import { SearchResult } from "@/app/types";

interface CategorizedSearchResultsProps {
  results: SearchResult[];
}

const CategorizedSearchResults: React.FC<CategorizedSearchResultsProps> = ({
  results,
}) => {
  const router = useRouter();
  console.log("results-");
  console.log(results);
  const categorizeResults = (results: SearchResult[]) => {
    return results.reduce((acc, result) => {
      const category =
        result.category ||
        (result.resultType == "song" ? "Songs" : result.resultType); // Use resultType if category is undefined or null
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(result);
      return acc;
    }, {} as Record<string, SearchResult[]>);
  };

  const categorizedResults = categorizeResults(results);

  const renderResults = (category: string, items: SearchResult[]) => (
    <>
      {category !== "Profiles" && (
        <div className="mb-8" key={category}>
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.length > 1 ? (
              <>
                {items.map((item, i) => (
                  <div
                    key={item.videoId || i}
                    className="flex flex-col items-center p-4 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    onClick={() => router.push(`/song/${item.videoId}`)}
                  >
                    {item.thumbnails && item.thumbnails[0] && (
                      <Image
                        src={item.thumbnails[0].url}
                        alt={item.title || ""}
                        width={item.thumbnails[0].width || 150}
                        height={item.thumbnails[0].height || 150}
                        className={`${
                          item.resultType === "artist"
                            ? "rounded-full"
                            : "rounded-lg"
                        } mb-2`}
                      />
                    )}
                    {item.title && <div className="text-lg ">{item.title}</div>}
                    {item.artists !== undefined &&
                      item.artists?.length !== 0 && (
                        <div className="text-sm text-gray-500">
                          {item.artists.map((artist, index) => (
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
                  </div>
                ))}
              </>
            ) : (
              <>
                {items.map((item, i) => (
                  <div
                    key={item.videoId || i}
                    className="flex flex-row gap-4 items-center p-4 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    onClick={() => router.push(`/song/${item.videoId}`)}
                  >
                    {item.thumbnails && item.thumbnails[0] && (
                      <Image
                        src={item.thumbnails[0].url}
                        alt={item.title || ""}
                        width={item.thumbnails[0].width || 150}
                        height={item.thumbnails[0].height || 150}
                        className={`${
                          item.resultType === "artist"
                            ? "rounded-full"
                            : "rounded-lg"
                        } mb-2`}
                      />
                    )}
                    <div className="flex flex-col">
                      {item.title ? (
                        <div className="text-xl">{item.title}</div>
                      ) : (
                        <div className="text-xl">
                          {item.artists !== undefined &&
                            item.artists?.length !== 0 &&
                            item.artists[0].name}
                        </div>
                      )}
                      <div className="flex flex-row">
                        <div>{item.resultType} </div>
                        {item.artists !== undefined &&
                          item.artists?.length !== 0 &&
                          item.resultType !== "artist" && (
                            <div className="text-sm text-gray-500">
                              <span> • </span>
                              {item.artists.map((artist, index) => (
                                <span key={index}>
                                  {artist.name}
                                  {index < item.artists?.length - 1 && ", "}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );

  console.log("Categories- ");
  console.log(categorizedResults);

  return (
    <div className="mt-4">
      {Object.entries(categorizedResults).map(([category, items]) =>
        renderResults(category, items)
      )}
    </div>
  );
};

export default CategorizedSearchResults;
