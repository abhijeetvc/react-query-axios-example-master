import axios from "axios";

export default axios.create({
  //baseURL: "https://jsonplaceholder.typicode.com",
  baseURL: "http://192.168.0.106:8095/masters",
  headers: {
    "Content-type": "application/json",
  },
});
