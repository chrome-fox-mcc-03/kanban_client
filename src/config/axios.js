import Axios from 'axios';

const heroku = 'https://infinite-mesa-38360.herokuapp.com';
const localhost = 'http://localhost:3000';

const instance = Axios.create({
  baseURL: heroku
});

export default instance