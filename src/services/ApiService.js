import axios from "axios";

export default class ApiService {
  constructor() {
    this.axios = axios.create();
  }

  async fetchData(options) {
    const response = await this.axios.request(options);
    return response.data;
  }
}
