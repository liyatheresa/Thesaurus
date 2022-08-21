import axios from "axios";

const fetchData = async (url, queryParameters) => {
  try {
    const response = await axios.get(url, { params: queryParameters });
    return { succeeded: true, response: response.data };
  } catch (err) {
    return { succeeded: false, response: err };
  }
};

export { fetchData };
