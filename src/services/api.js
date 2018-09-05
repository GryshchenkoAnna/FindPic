import axios from 'axios';

const API_KEY = '563492ad6f91700001000001f2cfc9a5ebc1461e9591170b640c4bee';
const BASE_URL = 'https://api.pexels.com/';
const DIRECTORY = {
  SEARCH_URL: BASE_URL + 'v1/search?query=',
  POPULAR_URL: BASE_URL + 'v1/popular',
  CURATED_URL: BASE_URL + 'v1/curated',
  VIDEO_SEARCH_URL: BASE_URL + 'videos/search',
  POPULAR_VIDEO_URL: BASE_URL + 'videos/popular',
  PHOTO_URL: BASE_URL + 'v1/photos/'
};
const CONFIG = {
  NUMBER_PAGE: '&page=',
  PER_PAGE: '&per_page=12'
};

axios.defaults.headers.common['Authorization'] = API_KEY;

export const getByName = async (query) => {
  const response = await axios.get(DIRECTORY.SEARCH_URL + query + CONFIG.PER_PAGE);

  return response.data;
};

export const getPhoto = async (id) => {
  const response = await axios.get(DIRECTORY.PHOTO_URL + id);
  return response;
};
