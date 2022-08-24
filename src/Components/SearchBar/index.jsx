import React from "react";
import { useEffect } from "react";
import { Input, Dropdown, Menu, notification } from "antd";
import "./SearchBar.scss";
const { Search } = Input;

const SearchBar = ({
  onWordSelection,
  setSearchTerm,
  searchResult,
  isModalVisible,
  searchTerm,
  isDropdownVisible,
  setIsDropdownVisible,
}) => {
  const onWordSelected = (word) => {
    if (word.trim() !== "") {
      onWordSelection(word);
      setSearchTerm(word);
      setIsDropdownVisible(false);
    } else {
      notification.error({
        message: "Error",
        description: "Enter something to search!",
      });
    }
  };

  let wordList = searchResult.map((word, index) => ({
    label: word,
    key: index,
  }));

  useEffect(() => {
    !isModalVisible && setIsDropdownVisible(searchResult.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  return (
    <div className="search-area">
      <div className="search-bar">
        <Dropdown
          visible={isDropdownVisible && !isModalVisible}
          className="search-results-dropdown"
          overlay={
            <Menu
              onClick={({ key, domEvent }) => {
                domEvent.stopPropagation();
                onWordSelected(wordList[key].label);
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
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={(e) =>
              e.target.value.length > 0 && setIsDropdownVisible(true)
            }
            onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
            value={searchTerm}
            onSearch={onWordSelected}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default SearchBar;
