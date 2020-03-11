import axios from 'axios'

const axiosKanban = axios.create({
    baseURL: 'http://localhost:3000'
})

export default axiosKanban