import { SearchResultProps } from "@/app/types";
import renderResults from "./CategorizedSearchResultsRender";

interface CategorizedSearchResultsProps {
  results: SearchResultProps[];
}

const CategorizedSearchResults: React.FC<CategorizedSearchResultsProps> = ({
  results,
}) => {
  const categorizeResults = (results: SearchResultProps[]) => {
    return results.reduce((acc, result) => {
      const category =
        result.category ||
        (result.resultType == "song" ? "Songs" : result.resultType); // Use resultType if category is undefined or null
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(result);
      return acc;
    }, {} as Record<string, SearchResultProps[]>);
  };

  const categorizedResults = categorizeResults(results);

  return (
    <>
      {Object.entries(categorizedResults).map(
        ([category, items]) =>
          category !== "Profiles" &&
          items.length > 0 &&
          renderResults(category, items)
      )}
    </>
  );
};

export default CategorizedSearchResults;
