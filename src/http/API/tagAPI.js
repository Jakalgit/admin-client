import {$host} from "../index";

export const createTag = async (name) => {
    const {data} = await $host.post('api/tag/', {name}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeTagName = async (id, name) => {
    const {data} = await $host.put('api/tag/change-name/', {id, name}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const delTag = async (name) => {
    const {data} = await $host.delete('api/tag/delete/', {params: {name}, headers: {authorization: 'ADMIN'}})
    return data
}

export const changeTagsAddiction = async (tags, id) => {
    const {data} = await $host.put('api/tag-to-item/change-tags/', {tags, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const getAddictionById = async (id) => {
    const {data} = await $host.get('api/tag-to-item/by-item-id/', {params: {id}, headers: {authorization: 'ADMIN'}})
    return data
}

export const getOneTag = async (id) => {
    const {data} = await $host.get('api/tag/one/', {params: {id}, headers: {authorization: 'ADMIN'}})
    return data
}

export const getAllTags = async () => {
    const {data} = await $host.get('api/tag/all/')
    return data
}