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
          onChange={(e) => {
            props.setSearchTerm(e.target.value);
          }}
        />
        {/* <button onClick={() => props.setSearch(true)}>Search</button> */}
      </div>
      {isSuggestionsVisible && (
        <Suggestions searchResult={props.searchResult} />
      )}
    </div>
  );
};

export default SearchBar;
