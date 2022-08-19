import React, { useState, useEffect, useRef } from "react";
import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";
import "./App.css";
import "antd/dist/antd.min.css";
import { fetchWordSearchResults } from "./requests";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
    // document.querySelector(".ant-dropdown-menu").classList.add("hidden");
  };
  return (
    <>
      <div className="title">Thesaurus</div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResult={searchResult}
        onWordSelection={onWordSelection}
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
