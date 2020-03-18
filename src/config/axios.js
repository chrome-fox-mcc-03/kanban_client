import axios from 'axios';

const url = 'https://kanban-server-juleshwa.herokuapp.com/';
const localhost = 'http://localhost:3000';

const instance = axios.create({
    baseURL: url
});

export default instance