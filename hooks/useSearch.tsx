import { useState, useMemo, useCallback } from "react";

type DataItem = {
  [key: string]: any;
};

type Data = {
  data: {
    [key: string]: DataItem[];
  };
};

type Index = Map<string, DataItem[]>;

const useSearch = (jsonData: Data, keys: string[]) => {
  const buildIndex = useCallback((data: Data, searchKeys: string[]) => {
    const index: Index = new Map();

    for (const dataType in data.data) {
      const items = data.data[dataType];

      items.forEach((item: DataItem) => {
        const searchableFields = searchKeys.map((key) =>
          String(item[key]).toLowerCase()
        );

        searchableFields.forEach((field) => {
          for (let i = 0; i < field.length; i++) {
            for (let j = i + 1; j <= field.length; j++) {
              const term = field.slice(i, j);

              if (!index.has(term)) {
                index.set(term, []);
              }
              index.get(term)?.push(item);
            }
          }
        });
      });
    }

    return index;
  }, []);

  const indexedData = useMemo(
    () => buildIndex(jsonData, keys),
    [jsonData, keys, buildIndex]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DataItem[]>([]);

  const handleSearch = useCallback(
    (term: string) => {
      const searchTermLower = term.toLocaleLowerCase();

      if (!searchTermLower) {
        setSearchResults([]);
        return;
      }

      setSearchTerm(term);

      if (indexedData.has(searchTermLower)) {
        setSearchResults(indexedData.get(searchTermLower)!);
      } else {
        setSearchResults([]);
      }
    },
    [indexedData]
  );

  return { searchTerm, handleSearch, searchResults };
};

export default useSearch;
