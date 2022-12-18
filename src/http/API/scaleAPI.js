import {$host} from "../index";

export const createScale = async (value) => {
    const {data} = await $host.post('api/scale/', {value}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchScales = async () => {
    const {data} = await $host.get('api/scale/all/')
    return data
}

export const changeScale = async (value, id) => {
    const {data} = await $host.post('api/scale/change/', {value, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const deleteScale = async (id) => {
    const {data} = await $host.post('api/scale/delete/', {id}, {headers: {authorization: 'ADMIN'}})
    return data
}