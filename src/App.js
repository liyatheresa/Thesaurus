import React, { useState, useEffect } from "react";
import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";
import "./App.css";
import { fetchData } from "./util.js";
import { WORD_SEARCH_URL } from "./constants";
import "antd/dist/antd.css";
import { notification } from "antd";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [requestResult, setRequestResult] = useState(true);
  const fetchWordSearchResults = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    let { succeeded, response } = await fetchData(WORD_SEARCH_URL, {
      s: searchTerm,
    });
    setRequestResult(succeeded);
    if (succeeded) {
      setSearchResults(response);
    } else {
      notification.error({
        message: "Error",
        description: "Word not found!",
      });
      // console.log("Something went wrong!"); //To-do: ant design error alert component
    }
  };

  useEffect(() => {
    fetchWordSearchResults();
  }, [searchTerm]);

  useEffect(() => {
    isOverlayVisible
      ? document.body.style.setProperty("overflow", "hidden")
      : document.body.style.setProperty("overflow", "auto");
  }, [isOverlayVisible]);

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
      {isOverlayVisible && requestResult ? (
        <Overlay word={searchTerm} setIsOverlayVisible={setIsOverlayVisible} />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
