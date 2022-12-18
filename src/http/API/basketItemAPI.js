import {$host} from "../index";

export const getAllBasketItems = async (basketId) => {
    const {data} = await $host.get('api/basketitem/', {params: {basketId}})
    return data
}