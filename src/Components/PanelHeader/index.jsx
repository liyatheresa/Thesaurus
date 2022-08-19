import React from "react";
import { Tag } from "antd";
const PanelHeader = ({ partsOfSpeech, data, sectionIndex }) => {
  return (
    <>
      <div className="main-collapse-title">
        {data.phonetic}
        <div>
          {partsOfSpeech[sectionIndex].map(
            (partOfSpeech, partOfSpeechIndex) => (
              <Tag
                color="#777"
                key={partOfSpeech + sectionIndex + partOfSpeechIndex}
              >
                {partOfSpeech}
              </Tag>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default PanelHeader;
