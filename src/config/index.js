import axios from 'axios'

const axiosKanban = axios.create({
    baseURL: 'https://murmuring-tor-80696.herokuapp.com/'
    // baseURL: 'http://localhost:3000'
})

export default axiosKanban