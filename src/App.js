import React, { useState, useEffect } from "react";
import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";
import "./App.css";
import { fetchData } from "./util.js";
import { WORD_SEARCH_URL } from "./constants";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);

  const fetchWordSearchResults = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    let { succeeded, response } = await fetchData(WORD_SEARCH_URL, {
      s: searchTerm,
    });
    if (succeeded) {
      setSearchResults(response);
    } else {
      console.log("Something went wrong!"); //To-do: ant design error alert component
    }
  };

  useEffect(() => {
    fetchWordSearchResults();
  }, [searchTerm]);

  const onWordSelection = (word) => {
    setIsOverlayVisible(true);
  };
  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResult={searchResult}
        onWordSelection={onWordSelection}
      />
      {isOverlayVisible && (
        <Overlay word={searchTerm} setIsOverlayVisible={setIsOverlayVisible} />
      )}
    </>
  );
}

export default App;
