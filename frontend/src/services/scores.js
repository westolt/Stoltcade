import axios from 'axios'
const baseUrl = '/api/scores'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const getGame = (id) => {
    const req = axios.get(`${baseUrl}/game/${id}`)
    return req.then(res => res.data)
}

export default { getAll, getGame }