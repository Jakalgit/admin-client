import {$host} from "../index";

/* Работа с товарами */
export const createItem = async (object) => {
    const {data} = await $host.post('api/item', object.formData, {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchFullItems = async () => {
    const {data} = await $host.get('api/item/all', {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchOneItem = async (id) => {
    const {data} = await $host.get('api/item/' + id)
    return data
}

export const changeName = async (name, id) => {
    const {data} = await  $host.post('api/item/change-name', {name, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changePrice = async (price, id) => {
    const {data} = await $host.post('api/item/change-price', {price, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeParams = async (categoryId, downCategoryId, brandId, id) => {
    const {data} = await $host.post('api/item/change-params', {categoryId, downCategoryId, brandId, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeAvailability = async (availability, id) => {
    const {data} = await $host.post('api/item/change-availability', {availability, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeVisibility = async (visibility, id) => {
    const {data} = await $host.post('api/item/change-visibility', {visibility, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeNew = async (new_item, id) => {
    const {data} = await $host.post('api/item/change-new', {new_item, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeLength = async (length, id) => {
    const {data} = await $host.post('api/item/change-length', {length, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeWidth = async (width, id) => {
    const {data} = await $host.post('api/ite/change-width', {width, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeHeight = async (height, id) => {
    const {data} = await $host.post('api/item/change-height', {height, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeWeight = async (weight, id) => {
    const {data} = await $host.post('api/item/change-weight', {weight, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeDiscountFlag = async (id, discount_flag, role) => {
    const {data} = await $host.post('api/item/change-flag', {discount_flag, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeDiscount = async (id, discount, discount_flag, old_price, role) => {
    const {data} = await $host.post('api/item/change-discount', {discount, discount_flag, old_price, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const createItemInfo = async (info, itemId) => {
    const {data} = await $host.post('api/info', {info, itemId}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchAllInfo = async (itemId) => {
    const {data} = await $host.get('api/info', {params: {itemId}})
    return data
}

export const changeInfo = async (info, id) => {
    const {data} = await $host.post('api/info/changeinfo', {info, id}, {headers: {authorization: 'ADMIN'}})
    return data
}