const serializeWordDefinition = (response) => {
  let serializedResponse = {};
  serializedResponse.word = response[0].word;
  serializedResponse.sections = [];
  response?.forEach((section) => {
    let wordDetails = {};
    wordDetails.phonetic = section.phonetic;
    wordDetails.synonyms = [];
    wordDetails.antonyms = [];
    wordDetails.definitions = [];
    wordDetails.audio = [];
    section.phonetics.forEach((audioDetails) =>
      wordDetails.audio.push(audioDetails.audio)
    );
    section.meanings.forEach((wordInfo) => {
      let meaningsAndPartOfSpeech = {};
      meaningsAndPartOfSpeech.meanings = [];
      wordInfo.synonyms.forEach((synonym) =>
        wordDetails.synonyms.push(synonym)
      );
      wordInfo.antonyms.forEach((antonym) =>
        wordDetails.antonyms.push(antonym)
      );
      meaningsAndPartOfSpeech.partOfSpeech = wordInfo.partOfSpeech;
      wordInfo.definitions.forEach((description) =>
        meaningsAndPartOfSpeech.meanings.push(description.definition)
      );
      wordDetails.definitions.push(meaningsAndPartOfSpeech);
    });
    serializedResponse.sections.push(wordDetails);
  });

  return serializedResponse;
};

const serializeSuggestions = (response) =>
  response.map((suggestion) => suggestion.word);

export { serializeWordDefinition, serializeSuggestions };
