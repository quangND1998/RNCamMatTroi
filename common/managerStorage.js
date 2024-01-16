import { localStorage } from "./storage"


export const setTokenStorage = (value) => {
    localStorage.set('token', value)
}
export const getTokenStorage = () => {
    return localStorage.getString('token')
}
export const destroyTokenStorage = () => {
    localStorage.delete('token')
}
export const existsToken = () => {
    return localStorage.contains('token')
}

export const setUserStorage = (value) => {
    localStorage.set('user', JSON.stringify(value))
}
export const getUserStorage = () => {
    const jsonUser = localStorage.getString('user')
    return JSON.parse(jsonUser)
}
export const destroyUserStorage = () => {
    localStorage.delete('user')
}



export const setCartStorage = (value) => {
    localStorage.set('cart', JSON.stringify(value))
}
export const getCartStorage = () => {
    const jsonCart = localStorage.getString('cart')
    return JSON.parse(jsonCart)
}
export const destroyCartStorage = async() => {
    localStorage.delete('cart')
}


export const savePhoneStorage = (value) => {
    localStorage.set('phone', value)
}
export const getPhoneStorage = () => {
    return localStorage.getString('phone')
}
export const destroyPhone = () => {
    localStorage.delete('phone')
}


export const saveFCMTokenStorage = (value) => {
    localStorage.set('fcm_token', value)
}
export const getFCMTokenStorage = () => {
    return localStorage.getString('fcm_token')
}
export const destroyFCMTokenStorage = () => {
    localStorage.delete('fcm_token')
}