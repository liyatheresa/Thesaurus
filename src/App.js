import React, { useState, useEffect } from "react";
import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";
import "./App.css";
import { fetchData } from "./util.js";
import { WORD_SEARCH_URL } from "./constants";
import "antd/dist/antd.min.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchWordSearchResults = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    let { succeeded, response } = await fetchData(WORD_SEARCH_URL, {
      s: searchTerm,
      max: 8,
    });
    if (succeeded) {
      setSearchResults(response);
    } else {
      console.log("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchWordSearchResults();
  }, [searchTerm]);

  useEffect(() => {
    isModalVisible
      ? document.body.style.setProperty("overflow", "hidden")
      : document.body.style.setProperty("overflow", "auto");
  }, [isModalVisible]);

  const onWordSelection = (word) => {
    setIsModalVisible(true);
  };
  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResult={searchResult}
        onWordSelection={onWordSelection}
      />
      {isModalVisible && (
        <Overlay
          word={searchTerm}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
        />
      )}
    </>
  );
}

export default App;
