import axios from 'axios'

const rest = axios.create({
    baseURL: __DEV__ ? "http://192.168.0.104:8000" : 'https://wls-ws-money-runners.herokuapp.com'
})

export default rest