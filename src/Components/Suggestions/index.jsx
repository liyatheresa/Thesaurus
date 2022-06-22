import React from "react";
import "./Suggestions.scss";

const Suggestions = ({ searchResult }) => {
  return (
    <>
      <ul className="suggestion-list">
        {searchResult.map((result) => {
          return <li key={result.word}>{result.word}</li>;
        })}
      </ul>
    </>
  );
};

export default Suggestions;
