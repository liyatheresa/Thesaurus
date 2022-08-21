import { notification } from "antd";
import { fetchData } from "./util.js";
import {
  WORD_SEARCH_URL,
  MAX_RESULTS_TO_RETURN,
  DICTIONARY_URL,
} from "./constants";
import { serializeWordDefinition, serializeSuggestions } from "./serializers";

const fetchWordSearchResults = async (searchTerm) => {
  let { succeeded, response } = await fetchData(WORD_SEARCH_URL, {
    s: searchTerm,
    max: MAX_RESULTS_TO_RETURN,
  });
  if (succeeded) {
    let suggestions = serializeSuggestions(response);
    return suggestions;
  } else {
    notification.error({
      message: "Error",
      description: "Something went wrong!",
    });
    return [];
  }
};

const getWordDefinition = async (word) => {
  const url = DICTIONARY_URL + word;
  let { succeeded, response } = await fetchData(url);
  if (succeeded) {
    let serializedResponse = serializeWordDefinition(response);
    return { serializedResponse, succeeded };
  } else {
    let serializedResponse = [];
    notification.error({
      message: "Error",
      description: "Word not found!",
    });
    return { serializedResponse, succeeded };
  }
};

export { fetchWordSearchResults, getWordDefinition };
