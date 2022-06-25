import React, { useState, useEffect } from "react";
import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";
import axios from "axios";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const fetchWordSearchResults = async () => {
    try {
      const { data: response } = await axios.get(
        "https://api.datamuse.com/sug",
        { params: { s: searchTerm } }
      );
      setSearchResults(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    fetchWordSearchResults();
  }, [searchTerm]);

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResult={searchResult}
      />
      {/* {search && <Overlay />} */}
    </>
  );
}

export default App;
