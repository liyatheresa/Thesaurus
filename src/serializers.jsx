const serializeWordDefinition = (response) => {
  let simplifiedResponse = {};
  simplifiedResponse.word = response[0].word;
  simplifiedResponse.sections = [];
  response?.forEach((each) => {
    let wordDetails = {};
    wordDetails.phonetic = each.phonetic;
    wordDetails.synonyms = [];
    wordDetails.antonyms = [];
    wordDetails.definitions = [];
    each.meanings.forEach((each) => {
      let meaningsAndPartOfSpeech = {};
      meaningsAndPartOfSpeech.meanings = [];
      return (
        each.synonyms.forEach((synonym) => wordDetails.synonyms.push(synonym)),
        each.antonyms.forEach((antonym) => wordDetails.antonyms.push(antonym)),
        (meaningsAndPartOfSpeech.partOfSpeech = each.partOfSpeech),
        each.definitions.forEach((desc) =>
          meaningsAndPartOfSpeech.meanings.push(desc.definition)
        ),
        wordDetails.definitions.push(meaningsAndPartOfSpeech)
      );
    });
    simplifiedResponse.sections.push(wordDetails);
  });
  return simplifiedResponse;
};

export { serializeWordDefinition };
