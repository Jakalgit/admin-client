import {$host} from "../index"

export const changeResponse = async (id, response) => {
    const {data} = await $host.post('api/repair/change-res/', {id, response}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const getAllRequests = async () => {
    const {data} = await $host.get('api/repair/get-all', {headers: {authorization: 'ADMIN'}})
    return data
}