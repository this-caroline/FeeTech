import axios from "axios";

class Api {
  constructor() {
    this.url = "http://localhost:3000/";
    this.axios = axios.create({
      baseURL: this.url
    });
    this.endpoints = this.loadApis();
  }

  loadApis = () => {
    return {
      addUsers: user => this.axios.post("api/users", user)
    };
  };
}

const api = new Api();

export default api;
