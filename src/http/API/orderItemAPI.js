import {$host} from "../index";

/* Работа с товарами заказов */
export const createOrderItem = async (id, name, price, img, count, orderId) => {
    const {data} = await $host.post('api/orderitem/', {id, name, price, img, count, orderId})
    return data
}

export const fetchOrderItems = async (orderId) => {
    const {data} = await $host.get('api/orderitem/', {params: {orderId}})
    return data
}

export const fetchOrderItem = async (id) => {
    const {data} = await $host.get('api/orderitem/one/', {params: {id}})
    return data
}

export const incrementOrderItem = async (id) => {
    const {data} = await $host.post('api/orderitem/increment/', {id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const decrementOrderItem = async (id) => {
    const {data} = await $host.post('api/orderitem/decrement/', {id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const deleteOrderItem = async (id) => {
    const {data} = await $host.post('api/orderitem/delete/', {id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const deleteOrderItems = async (orderId) => {
    const {data} = await $host.post('api/orderitem/delete/all/', {orderId}, {headers: {authorization: 'ADMIN'}})
    return data
}