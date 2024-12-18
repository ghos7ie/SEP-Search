import axios from "axios";

// NODE_ENV = 'development'
// NODE_ENV = 'production'

const baseURL = process.env.NODE_ENV === 'production' ? "/api/v1/" : "http://localhost:4000/api/v1/";

export default axios.create({
    baseURL: baseURL
});