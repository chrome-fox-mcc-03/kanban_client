import axios from 'axios';

const heroku = '';
const localhost = 'http://localhost:3000';

const instance = axios.create({
  baseURL: localhost
});

export default instance