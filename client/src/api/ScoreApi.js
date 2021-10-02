import axios from 'axios';
require("dotenv").config();

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
// const BASE_URL = 'https://scorexml-server.herokuapp.com'

async function get(id) {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function create(name, musicxml) {
    try {
        const response = await axios.post(`${BASE_URL}/`, {
            name: name,
            musicxml: musicxml,
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export { get, create };