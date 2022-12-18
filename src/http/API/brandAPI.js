import {$host} from "../index";

/* Работа с брендами */
export const createBrand = async (object) => {
    const {data} = await $host.post('api/brand', {name: object.value}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeNameBrand = async (name, id) => {
    const {data} = await $host.post('api/brand/changename', {name, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const deleteBrand = async (id) => {
    const {data} = await $host.post('api/brand/delete', {id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}