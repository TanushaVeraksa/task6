import axios from 'axios';
const url = 'https://server-task6.onrender.com';

export const getMessage = async(tags) => {
    const {data} = await axios.get(url + '/api/message', {params: {
        tags: tags
        }})
    return data;
}

export const getTags = async(tags) => {
    const {data} = await axios.get(url + '/api/message/tags')
    return data;
}