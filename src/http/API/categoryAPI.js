import {$host} from "../index";

/* Работа с категориями */
export const createCategory = async (object) => {
    const {data} = await $host.post('api/category', {name: object.value}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeCategoryName = async (name, id) => {
    const {data} = await $host.post('api/category/changename', {name, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $host.post('api/category/delete', {id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category')
    return data
}