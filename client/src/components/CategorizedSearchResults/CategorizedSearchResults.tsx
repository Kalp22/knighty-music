import { SearchResult } from "@/app/types";
import renderResults from "./CategorizedSearchResultsRender";

interface CategorizedSearchResultsProps {
  results: SearchResult[];
}

const CategorizedSearchResults: React.FC<CategorizedSearchResultsProps> = ({
  results,
}) => {
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

  return (
    <div className="mt-4">
      {Object.entries(categorizedResults).map(
        ([category, items]) =>
          category !== "Profiles" &&
          items.length > 0 &&
          renderResults(category, items)
      )}
    </div>
  );
};

export default CategorizedSearchResults;