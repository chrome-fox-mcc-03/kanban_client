import axios from 'axios';

// const url = 'http://localhost:3000';

const url = 'http://kanban-server-juleshwa.herokuapp.com'

const instance = axios.create({
    baseURL: url
});

export default instance