import React, { useState, useEffect } from "react";
import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";
import axios from "axios";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [definition, setDefinition] = useState([]);
  const fetchWordSearchResults = async () => {
    try {
      let dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`;
      const { data: response } = await axios.get(
        "https://api.datamuse.com/sug",
        { params: { s: searchTerm } }
      );
      const { data: result } = await axios.get(dictionaryUrl);
      setSearchResults(response);
      setDefinition(result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setDefinition([]);
      return;
    }
    fetchWordSearchResults();
    console.log(definition);
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
