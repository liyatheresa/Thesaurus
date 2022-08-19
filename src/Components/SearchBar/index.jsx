import React from "react";
import { Input, Dropdown, Menu } from "antd";
import "./SearchBar.scss";
const { Search } = Input;

const SearchBar = (props) => {
  const onWordSelected = (word) => {
    props.onWordSelection(word);
    props.setSearchTerm(word);
    props.setIsDropdownVisible(false);
  };

  let wordList = props.searchResult.map((wordDetails, index) => ({
    label: wordDetails.word,
    key: index,
  }));

  return (
    <div className="search-area">
      <div className="search-bar">
        <Dropdown
          visible={props.isDropdownVisible}
          overlay={
            <Menu
              onClick={({ key }) => {
                onWordSelected(wordList[key].label);
                console.log(document.activeElement);
              }}
              items={wordList}
            />
          }
          trigger={["click"]}
          placement="bottom"
        >
          <Search
            type="text"
            placeholder="Search the word..."
            onChange={(e) => props.setSearchTerm(e.target.value)}
            onFocus={() => props.setIsDropdownVisible(true)}
            onBlur={() => {
              setTimeout(() => {
                if (
                  !document.activeElement.classList.contains(
                    "ant-dropdown-menu-item"
                  )
                ) {
                  props.setIsDropdownVisible(false);
                }
              }, 100);
            }}
            value={props.searchTerm}
            onSearch={onWordSelected}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default SearchBar;
