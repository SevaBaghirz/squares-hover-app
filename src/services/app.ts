import axios from "axios";
import IData from "../models/Data";

const api = axios.create({
  baseURL: "http://demo7919674.mockable.io",
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return api.get<Array<IData>>('');
};

const AppService = {
  getAll
};

export default AppService;