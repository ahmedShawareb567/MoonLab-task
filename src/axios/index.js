import axios from "axios";

const options = {};
options.baseURL = "https://opentdb.com/";
export const $api = axios.create(options);
