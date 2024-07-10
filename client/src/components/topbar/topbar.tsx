"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { SiBandlab, SiGithub } from "react-icons/si";
import { TbMusicSearch } from "react-icons/tb";
import { GiMusicSpell } from "react-icons/gi";

import Darklight from "../ui/darklight/darklight";
import SearchResultComponent from "../searchResults/searchResults";

import { SearchResult } from "../../app/types";

export default function Topbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    handleSearch(query);
  }, [filter]);

  const handleSearch = async (queryTemp: string) => {
    if (!queryTemp) return setResults([]);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/search/?query=${queryTemp}&filter=${
          filter ? filter : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: SearchResult[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <nav className="flex flex-col sticky top-0 items-center px-8 py-4 shadow-md bg-slate-500">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row items-center gap-12">
          <Link href="/" className="flex flex-row gap-[2px] items-baseline">
            <div className="text-xl font-bold">Knighty</div>
            <div className="text-lg font-semibold">Music</div>
          </Link>
          <div className="flex flex-col">
            <div>
              <TbMusicSearch
                size={25}
                color="black"
                className="absolute mt-[5px] ml-4"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter"
                    ? router.push(`/search/${query}&filter=${filter}`)
                    : null
                }
                className="outline-none rounded-xl pl-14 py-1 pr-2 bg-[#00000040] border border-black text-lg w-[450px]"
                placeholder="Search songs..."
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="ml-2 p-1 border rounded bg-[#00000030] text-black outline-none"
              >
                <option value="">All</option>
                <option value="artists">Artists</option>
                <option value="albums">Albums</option>
              </select>
            </div>
            {results.length === 0 ? null : (
              <SearchResultComponent results={results} />
            )}
          </div>
        </div>
        <div className="fixed left-1/2">
          <GiMusicSpell size={35} color="black" />
        </div>
        <div className="flex flex-row gap-6">
          <Darklight />
          <Link
            href="https://www.bandlab.com/knightyklaus"
            target="blank"
            className="flex flex-col items-center text-lg p-2 rounded-full border border-transparent hover:border hover:border-gray-300"
          >
            <SiBandlab size={25} color="red" />
          </Link>
          <Link
            href="https://www.github.com/Kalp22"
            target="blank"
            className="flex flex-col items-center text-lg p-2 rounded-full border border-transparent hover:border hover:border-gray-300"
          >
            <SiGithub size={25} color="white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
