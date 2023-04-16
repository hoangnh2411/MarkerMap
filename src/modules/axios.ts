import axios, { AxiosInstance } from 'axios'

const Axios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8082',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
})
export default Axios
