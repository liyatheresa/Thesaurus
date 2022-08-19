import React from "react";
const AntonymsList = ({ data, sectionIndex }) => {
  return (
    <>
      <ol className="list-of-meanings">
        {data?.antonyms.map((antonym, antonymIndex) => (
          <li
            key={"antonym-" + sectionIndex + antonymIndex}
            ckey={"antonym-" + sectionIndex + antonymIndex}
          >
            {antonym}
          </li>
        ))}
      </ol>
    </>
  );
};

export default AntonymsList;
