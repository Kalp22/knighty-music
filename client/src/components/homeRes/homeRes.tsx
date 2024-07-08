"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HomeData } from "@/app/types";

export default function homeRes() {
  const [data, setData] = useState<HomeData[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(data);
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
          <div className="container mx-80 p-4 w-[57rem]">
            <h1 className="text-3xl font-bold mb-4">Home</h1>
            <div className="grid grid-cols-3 gap-4">
              {data.map((homeData) => (
                <div key={homeData.title}>
                  <h2 className="text-2xl font-bold">{homeData.title}</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {homeData.contents && homeData.contents.length > 0 ? (
                      homeData.contents.map((content) => (
                        <div key={content.title && content.title}>
                          {content.thumbnails && content.thumbnails[0] && (
                            <Image
                              src={content.thumbnails[0].url}
                              alt={content.title || ""}
                              width={content.thumbnails[0].width}
                              height={content.thumbnails[0].height}
                            />
                          )}
                          <h3 className="text-lg font-bold">{content.title}</h3>
                        </div>
                      ))
                    ) : (
                      <p>No content available</p>
                    )}
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
