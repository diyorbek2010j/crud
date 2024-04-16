import axios from "axios";

const ApiURL = axios.create({
    baseURL: "http://localhost:8000"
})
export default  ApiURL;