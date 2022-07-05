import React from "react";
import "./Suggestions.scss";

const Suggestions = (props) => {
  return (
    <ul className="suggestion-list">
      {props.searchResult.map((result) => (
        <li onClick={() => props.onWordSelected(result.word)} key={result.word}>
          {result.word}
        </li>
      ))}
    </ul>
  );
};

export default Suggestions;
