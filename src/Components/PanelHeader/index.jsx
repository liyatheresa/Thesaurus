import React from "react";
import { Tag } from "antd";
import Pronunciation from "../Pronunciation";
import "./PanelHeader.scss";

const PanelHeader = ({ partsOfSpeech, sectionData, sectionIndex }) => {
  return (
    <>
      <div className="main-collapse-title">
        {sectionData.phonetic}
        <div>
          {partsOfSpeech[sectionIndex].map(
            (partOfSpeech, partOfSpeechIndex) => (
              <Tag
                color="#777"
                key={`${partOfSpeech}-${sectionIndex}-${partOfSpeechIndex}`}
              >
                {partOfSpeech}
              </Tag>
            )
          )}
        </div>
        <div className="speaker">
          <Pronunciation sectionData={sectionData} />
        </div>
      </div>
    </>
  );
};

export default PanelHeader;
