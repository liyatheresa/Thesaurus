import React, { useState, useEffect } from "react";
import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";
import { fetchWordSearchResults } from "./requests";
import "antd/dist/antd.min.css";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const wrapperFunction = async () => {
        let response = await fetchWordSearchResults(searchTerm);
        setSearchResults(response);
      };
      wrapperFunction();
    }
  }, [searchTerm]);

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
