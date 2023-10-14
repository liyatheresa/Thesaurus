import React from "react";

const AntonymsList = ({ data, sectionIndex }) => (
  <ol className="list-of-meanings">
    {data?.antonyms.map((antonym, antonymIndex) => (
      <li key={`antonym-${sectionIndex}-${antonymIndex}`}>{antonym}</li>
    ))}
  </ol>
);

export default AntonymsList;
