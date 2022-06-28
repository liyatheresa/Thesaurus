import React, { useEffect, useState } from "react";
import "./Overlay.scss";
import { DICTIONARY_URL } from "../../constants";
import axios from "axios";
import { fetchData } from "../../util";

const Overlay = ({ word, setIsOverlayVisible }) => {
  const [definitions, setDefinition] = useState([]);
  console.log(definitions);

  useEffect(() => {
    const getWordDefinition = async () => {
      const url = DICTIONARY_URL + word;
      let { succeeded, response } = await fetchData(url);
      if (succeeded) {
        response.map((data) => {
          return data.meanings.map((each) =>
            each.definitions.map((desc) =>
              setDefinition((value) => [...value, desc.definition])
            )
          );
        });
      } else {
        // setDefinition(response);
        setDefinition((value) => [...value, response.response.data.title]);
      }
    };
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
