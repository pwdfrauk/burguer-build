import axios from 'axios'

const instance = axios.create({
    baseURL:'https://burger-build-ea0da-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

export default instance;