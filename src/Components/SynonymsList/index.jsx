import React from "react";

const SynonymsList = ({ data, sectionIndex }) => <ol className="list-of-meanings">
  {data?.synonyms.map((synonym, synonymIndex) => (
    <li key={`synonym-${sectionIndex}-${synonymIndex}`}>{synonym}</li>
  ))}
</ol>

export default SynonymsList;
