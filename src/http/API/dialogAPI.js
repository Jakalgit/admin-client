import {$host} from "../index";

export const createDialog = async (chatId, name, lastMessage) => {
    const {data} = await $host.post('api/dialog/', {chatId, name, lastMessage})
    return data
}

export const getOneDialog = async (chatId) => {
    const {data} = await $host.get('api/dialog/one/', {params: {chatId}})
    return data
}

export const getAllDialogs = async () => {
    const {data} = await $host.get('api/dialog/all/', {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeNameDialog = async (chatId, name) => {
    const {data} = await $host.post('api/dialog/change-name/', {chatId, name}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeLastMessage = async (chatId, lastMessage) => {
    const {data} = await $host.post('api/dialog/change-last-message/', {chatId, lastMessage})
    return data
}

export const changeLastAdminCheck = async (chatId, lastAdminCheck) => {
    const {data} = await $host.post('api/dialog/change-last-admin-check/', {chatId, lastAdminCheck}, {headers: {authorization: 'ADMIN'}})
    return data
}