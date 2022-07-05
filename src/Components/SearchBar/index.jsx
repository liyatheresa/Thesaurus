import React, { useState } from "react";
import Suggestions from "../Suggestions";
// import Select from "react-select";
import "./SearchBar.scss";

const SearchBar = (props) => {
  const [isSuggestionsVisible, setSuggestionsVisibility] = useState(false);
  const showSuggestions = () => {
    setSuggestionsVisibility(true);
  };
  const hideSuggestions = () => {
    setSuggestionsVisibility(true);
  };
  const onWordSelected = (word) => {
    props.onWordSelection(word);
    props.setSearchTerm(word);
    setSuggestionsVisibility(false);
  };
  return (
    <div className="search-area">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search the word..."
          onFocus={showSuggestions}
          onBlur={hideSuggestions}
          onChange={(e) => props.setSearchTerm(e.target.value)}
          value={props.searchTerm}
        />
      </div>
      {isSuggestionsVisible && (
        <Suggestions
          searchResult={props.searchResult}
          onWordSelected={onWordSelected}
        />
      )}
    </div>
  );
};

export default SearchBar;
