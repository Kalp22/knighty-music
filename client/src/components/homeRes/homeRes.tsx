// components/homeRes.tsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HomeDataProps } from "@/app/types";
import ArtistComponent from "../ui/artist/artist";
import { useVideo } from "@/app/contexts/videoContext/videoContext";

export default function HomeRes() {
  const [data, setData] = useState<HomeDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { setVideoId } = useVideo();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/home/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <main className="flex min-h-screen flex-col">
          <div className="container mx-60">
            <div className="grid grid-rows-3">
              {data.map((HomeDataProps, i) => (
                <div
                  className={`${i == 0 ? "pt-10" : "pt-14"}`}
                  key={HomeDataProps.title}
                >
                  <h2 className="text-5xl font-bold mb-12">{HomeDataProps.title}</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {HomeDataProps?.contents && HomeDataProps.contents.length > 1
                      ? HomeDataProps.contents.map((content) =>
                          content ? (
                            <div
                              className="flex flex-row gap-4 p-4 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                              key={content.title}
                              onClick={() => setVideoId(content.videoId || "")}
                            >
                              {content.thumbnails &&
                                content.thumbnails.length > 0 && (
                                  <>
                                    {content.thumbnails[1] ? (
                                      <Image
                                        src={content.thumbnails[1].url}
                                        alt={content.title || ""}
                                        width={120}
                                        height={120}
                                      />
                                    ) : (
                                      <Image
                                        src={content.thumbnails[0].url}
                                        alt={content.title || ""}
                                        width={120}
                                        height={120}
                                      />
                                    )}
                                  </>
                                )}
                              <div className="flex flex-col gap-2">
                                <h3 className="text-2xl font-bold">
                                  {content.title}
                                </h3>
                                <p>
                                  {content.album && content.album.name && (
                                    <div className="text-sm text-gray-400">
                                      {content.album.name}
                                      <span className="ml-1"> • </span>
                                    </div>
                                  )}
                                  {content.artists &&
                                    content.artists.length > 0 && (
                                      <ArtistComponent
                                        artists={content.artists}
                                        range={2}
                                      />
                                    )}
                                </p>
                              </div>
                            </div>
                          ) : null
                        )
                      : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
