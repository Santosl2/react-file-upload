import axios from "axios";

const api = axios.create({
  baseURL: "https://api.imgur.com/",
});

api.defaults.headers.common[
  "Authorization"
] = `Client-ID ${process.env.REACT_APP_IMGUR_API_CLIENTID}`;

export { api };
