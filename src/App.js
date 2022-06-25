import React, { useState, useEffect } from "react";
import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";
import axios from "axios";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const dataFetch = async () => {
    try {
      let url = `https://api.datamuse.com/sug?s=${searchTerm}`;
      const { data } = await axios.get(url);
      setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    dataFetch();
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
