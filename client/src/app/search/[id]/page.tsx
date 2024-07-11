"use client";
import Topbar from "@/components/topbar/topbar";
import { useEffect, useState } from "react";
import CategorizedSearchResults from "@/components/CategorizedSearchResults/CategorizedSearchResults";
import { SearchResultProps } from "@/app/types";

export default function SearchPage({
  params: { id },
}: {
  params: { id: string };
}) {
  id = decodeURIComponent(id);
  const query = id.split("&filter=")[0];
  const filter = id.split("&filter=")[1];
  const [results, setResults] = useState<SearchResultProps[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(results);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/search/?query=${query}&filter=${filter}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, filter]);

  return (
    <div className="bg-gray-10">
      <Topbar />
      <div className="container h-[92dvh] mx-80 p-4 w-[57rem]">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <p className="text-lg mb-8">
          Showing results for <span className="font-semibold">{query}</span>{" "}
          {filter && (
            <>
              in <span className="font-semibold">{filter}</span>
            </>
          )}
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CategorizedSearchResults results={results} />
        )}
      </div>
    </div>
  );
}
