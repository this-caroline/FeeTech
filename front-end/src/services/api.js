import axios from 'axios';

class Api {
  constructor() {
    this.url = 'http://localhost:3000/';
    this.axios = axios.create({
      baseURL: this.url
    });
    this.endpoints = this.loadApis();
  }

  loadApis = () => {
    return {
      addUsers: user => this.axios.post('api/users', user),
      getUser: userId =>
        this.axios.get('api/users', {
          params: {
            userId
          }
        }),
      addCard: (userId, card) => this.axios.post(`api/card/${userId}`, card),
      editCard: (userId, data) => this.axios.put(`api/card/${userId}`, data),
      listCards: userId => this.axios.get(`api/card/${userId}`),
      removeCard: (userId, card_id) => this.axios.delete(`api/card/${userId}`, { data: { card_id } })
    };
  };
}

const api = new Api();

export default api;
