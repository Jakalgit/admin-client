import {$host} from "../index";

/* Работа с категориями */
export const createDownCategory = async (object) => {
    const {data} = await $host.post('api/categorydown', {name: object.value, categoryId: object.categoryId}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeNameCategoryDown = async (name, id) => {
    const {data} = await $host.post('api/categorydown/changename', {name, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const deleteCategoryDown = async (id) => {
    const {data} = await $host.post('api/categorydown/delete', {id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchDownCategories = async () => {
    const {data} = await $host.get('api/categorydown')
    return data
}