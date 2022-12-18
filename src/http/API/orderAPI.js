import {$host} from "../index";

export const changeSubmit = async (id, typeSubmit) => {
    const {data} = await $host.post('api/order/change/', {id, typeSubmit}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const setTrackNumber = async (id, track) => {
    const {data} = await $host.post('api/order/settrack', {id, track}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchOneOrder = async (id) => {
    const {data} = await $host.get('api/order/id/' + id, {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchAllOrders = async () => {
    const {data} = await $host.get('api/order/')
    return data
}

export const deleteOrder = async (id) => {
    const {data} = await $host.post('api/order/delete', {id}, {headers: {authorization: 'ADMIN'}})
    return data
}