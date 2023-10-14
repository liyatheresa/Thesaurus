import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";
import { fetchWordSearchResults } from "./requests";

import "antd/dist/antd.min.css";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  document
    .getElementById("root")
    .addEventListener("click", () => setIsDropdownVisible(false));

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      debouncedFetchWordSearchResults();
    }
    return debouncedFetchWordSearchResults.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const fetchAndUpdateSearchResults = async () => {
    let response = await fetchWordSearchResults(searchTerm.trim());
    setSearchResults(response);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchWordSearchResults = useCallback(
    debounce(fetchAndUpdateSearchResults, 500),
    [searchTerm]
  );

  const onWordSelection = (word) => {
    setIsModalVisible(true);
  };
  return (
    <>
      <div className="title">Thesaurus</div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResult={searchResult}
        setSearchResults={setSearchResults}
        onWordSelection={onWordSelection}
        isModalVisible={isModalVisible}
        isDropdownVisible={isDropdownVisible}
        setIsDropdownVisible={setIsDropdownVisible}
      />
      <Overlay
        word={searchTerm}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </>
  );
}

export default App;
