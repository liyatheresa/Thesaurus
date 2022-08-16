import React from "react";
import { Input } from "antd";
import { Dropdown, Menu } from "antd";
import "./SearchBar.scss";

const SearchBar = (props) => {
  const onWordSelected = (word) => {
    props.onWordSelection(word);
    props.setSearchTerm(word);
  };
  let wordList = props.searchResult.map((wordDetails, index) => ({
    label: wordDetails.word,
    key: index,
  }));

  return (
    <div className="search-area">
      <div className="search-bar">
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => {
                onWordSelected(wordList[key].label);
              }}
              items={wordList}
            />
          }
          trigger={["click"]}
          placement="bottom"
        >
          <Input
            type="text"
            placeholder="Search the word..."
            onChange={(e) => props.setSearchTerm(e.target.value)}
            value={props.searchTerm}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default SearchBar;
