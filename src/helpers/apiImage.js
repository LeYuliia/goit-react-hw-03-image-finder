import axios from "axios";

const fetchImg = ({ searchQuery = "", page = 1 }) => {
  const key = "16105184-e3637ab62bfe8e9d6c971f373";
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);
};
export default { fetchImg };
