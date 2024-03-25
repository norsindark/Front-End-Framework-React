import axios from 'axios'
import { BASE_URL } from 'constant/network'

async function login(email, password) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/auth/signin`, { email, password })

        if (!data) throw new Error()

        return {
            accessToken: data.accessToken
        }
    } catch (error) {
        return {
            accessToken: null
        }
    }
}