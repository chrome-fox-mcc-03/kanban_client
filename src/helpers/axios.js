const axios = require("axios");

const hitAPI = axios.create({
  baseURL: "https://kanban-quest.herokuapp.com"
});

module.exports = hitAPI;
