import axios from 'axios'
const baseUrl = '/api/users'

const createAccount = async newObject => {
    const res = await axios.post(baseUrl, newObject)
    return res.data
}

export default { createAccount }