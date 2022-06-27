import React, { useEffect, useState } from "react";
import "./Overlay.scss";
import { DICTIONARY_URL } from "../../constants";
import axios from "axios";

const Overlay = ({ word, setIsOverlayVisible }) => {
  const [definitions, setDefinition] = useState([]);
  const getWordDefinition = async () => {
    try {
      const url = DICTIONARY_URL + word;
      const { data } = await axios.get(url);
      data.map((response) => {
        return response.meanings.map((each) =>
          each.definitions.map((desc) =>
            setDefinition((value) => [...value, desc.definition])
          )
        );
      });
    } catch (err) {
      console.log(err);
    }
  };
  // setDefinition(listOfMeanings);
  console.log(definitions);

  useEffect(() => {
    getWordDefinition();
  }, []);

  return (
    <>
      <div
        className="overlay-backdrop"
        onClick={() => setIsOverlayVisible(false)}
      >
        <div className="content-overlay">
          {definitions.length !== 0 ? (
            <ul>
              {definitions.map((eachMeaning) => {
                return <li key={eachMeaning}>{eachMeaning}</li>;
              })}
            </ul>
          ) : (
            <div>Data loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Overlay;
