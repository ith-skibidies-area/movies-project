import axios from "axios";

const http = axios.create({ baseURL: `${location.protocol}//${location.hostname}:5000` });

export default http;
