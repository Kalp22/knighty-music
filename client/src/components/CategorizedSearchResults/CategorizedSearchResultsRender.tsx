import { SearchResult } from "@/app/types";
import TopResults from "../cards/TopResults/TopResults";
import SongResults from "../cards/SongResults/SongResults";
import ArtAlbumResults from "../cards/ArtAlbumResults/ArtAlbumResults";

const renderResults = (category: string, items: SearchResult[]) => {
  return (
    <div className="mb-8" key={category}>
      <h2 className="text-2xl font-semibold mb-4">{category}</h2>
      <div
        className={`grid ${
          category === "Songs"
            ? "grid-rows-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        } gap-4`}
      >
        {items[0].category !== "Top result" ? (
          <>
            {category === "Songs" ? (
              items.map((item, i) => (
                <SongResults key={item.videoId || i} item={item} />
              ))
            ) : (
              <>
                {category === "Artists" && (
                  <>
                    {items.map((item, i) => (
                      <ArtAlbumResults
                        key={item.videoId || i}
                        item={item}
                        cat={category}
                      />
                    ))}
                    <ArtAlbumResults key={4} item={undefined} cat={category} />
                  </>
                )}
                {category === "Albums" && (
                  <>
                    {items.map((item, i) => (
                      <ArtAlbumResults
                        key={item.videoId || i}
                        item={item}
                        cat={category}
                      />
                    ))}
                    <ArtAlbumResults key={4} item={undefined} cat={category} />
                  </>
                )}
                {(category === "Playlists" ||
                  category === "Featured playlists" ||
                  category === "Community playlists") && (
                  <>
                    {items.map((item, i) => (
                      <ArtAlbumResults
                        key={item.videoId || i}
                        item={item}
                        cat={"Playlists"}
                      />
                    ))}
                    <ArtAlbumResults
                      key={4}
                      item={undefined}
                      cat={"Playlists"}
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {items.map((item, i) => (
              <TopResults key={item.videoId || i} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default renderResults;
