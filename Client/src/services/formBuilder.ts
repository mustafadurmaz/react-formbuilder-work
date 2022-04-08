import axios from "axios";

const url = "http://localhost:3002/";




const findAll = async () => {
  return axios.get(url);
};



const create = async (form:any) => {
  return axios.post(url, form);
};



const service = { findAll, create };

export default service;
