import { BASE_URL } from '../constants'
import fetch from 'isomorphic-fetch'

type ConfigType = {
    data?: any,
    method?: string,
    token?: string
}

type HeaderType = {
    [key: string]: any
}

type ConfigFormType = {
    data: FormData,
    token: string,
    method?: string
}

const api = {
    // callJson: async (_url: string, _data: Record<string, any>, method = 'GET') => {
    //     const URL = `${BASE_URL}${_url}`
    //     const config = {
    //         method,
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(_data)
    //     }
    //     return await fetch(URL, config)
    //         .then(res => res.json())
    // }, 

    // muốn destructuring thì mặc định phải viết một object rỗng
    //  như bên dưới nếu như người ta không truyền vào config
    // (nếu chỉ truyền url thì default config object rỗng)
    callJson: async (_url: string, { data, method = 'GET', token }: ConfigType = {}) => {
        const URL = `${BASE_URL}${_url}`
        const config: HeaderType = {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return await fetch(URL, config)
            .then(res => res.json())
    },
    callFormData: async (_url: string, { data, method = 'POST', token }: ConfigFormType) => {
        const URL = `${BASE_URL}${_url}`
        const config = {
            method,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data
        }

        return fetch(URL, config)
            .then(res => res.json())
    }
}

export default api;