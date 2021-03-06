import React, { useEffect, useState } from "react";
import "./Overlay.scss";
import { DICTIONARY_URL } from "../../constants";
import { fetchData } from "../../util";

const Overlay = ({ word, setIsOverlayVisible }) => {
  const [definitions, setDefinition] = useState([]);
  const [error, setError] = useState({ isSuccess: true, errorMessage: "" });

  useEffect(() => {
    const getWordDefinition = async () => {
      const url = DICTIONARY_URL + word;
      let arrayOfMeanings = [];
      let { succeeded, response } = await fetchData(url);
      if (succeeded) {
        setError({ ...error, isSuccess: true });
        response.map((data) => {
          return data.meanings.map((each) =>
            each.definitions.map((desc) =>
              arrayOfMeanings.push(desc.definition)
            )
          );
        });
        setDefinition(arrayOfMeanings);
      } else {
        setError({
          isSuccess: false,
          errorMessage: response.response.data.title,
        });
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
          {error.isSuccess ? (
            definitions.length !== 0 ? (
              <ul>
                {definitions.map((eachMeaning) => {
                  return <li key={eachMeaning}>{eachMeaning}</li>;
                })}
              </ul>
            ) : (
              <div>Data loading...</div>
            )
          ) : (
            <div>{error.errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Overlay;
