import React from "react";
import { Typography } from "antd";
import "./MeaningsList.scss";

const { Text } = Typography;

const MeaningsList = ({ data, sectionIndex }) => {
  return (
    <>
      <div className="list-of-meanings">
        {data?.definitions.map((definition, definitionIndex) => {
          return (
            <ol key={`definition-${sectionIndex}-${definitionIndex}`}>
              <Text keyboard>{definition.partOfSpeech}</Text>
              {definition?.meanings.map((meaning, meaningIndex) => (
                <li
                  key={`meaning-${sectionIndex}-${definitionIndex}-${meaningIndex}`}
                >
                  {meaning}
                </li>
              ))}
            </ol>
          );
        })}
      </div>
    </>
  );
};

export default MeaningsList;