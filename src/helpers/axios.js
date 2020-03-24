const axios = require("axios");

const hitAPI = axios.create({
  baseURL: "http://localhost:3000"
});

module.exports = hitAPI;
