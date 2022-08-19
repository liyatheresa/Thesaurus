import React from "react";
import { Input, Dropdown, Menu } from "antd";
import "./SearchBar.scss";
import { useState } from "react";
import { useEffect } from "react";
const { Search } = Input;

const SearchBar = (props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const onWordSelected = (word) => {
    props.onWordSelection(word);
    props.setSearchTerm(word);
    setIsDropdownVisible(false);
  };

  let wordList = props.searchResult.map((wordDetails, index) => ({
    label: wordDetails.word,
    key: index,
  }));

  useEffect(() => {
    !props.isModalVisible &&
      setIsDropdownVisible(props.searchResult.length > 0);
  }, [props.searchResult]);

  return (
    <div className="search-area">
      <div className="search-bar">
        <Dropdown
          visible={isDropdownVisible && !props.isModalVisible}
          className="search-results-dropdown"
          overlay={
            <Menu
              onClick={({ key }) => onWordSelected(wordList[key].label)}
              items={wordList}
            />
          }
          trigger={["click"]}
          placement="bottom"
        >
          <Search
            type="text"
            placeholder="Search the word..."
            onChange={(e) => {
              props.setSearchTerm(e.target.value);
            }}
            onFocus={(e) =>
              e.target.value.length > 0 && setIsDropdownVisible(true)
            }
            value={props.searchTerm}
            onSearch={onWordSelected}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default SearchBar;
