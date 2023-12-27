import AsyncStorage from '@react-native-async-storage/async-storage';


export const setToken = async(value) => {
    try {
        const jsonValue = JSON.stringify(value)
        console.log('token', jsonValue);
        await AsyncStorage.setItem('@token', jsonValue)
    } catch (e) {
        // error reading value
    }
}
export const getToken = async() => {
    try {
        const jsonValue = await AsyncStorage.getItem('@token')
            // console.log(JSON.parse(jsonValue))
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}
export const destroyToken = async() => {
    return await AsyncStorage.removeItem('@token')
}


export const setUser = async(value) => {
    try {
        const jsonValue = JSON.stringify(value)
        console.log('token', jsonValue);
        await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
        // error reading value
    }
}
export const getUser = async() => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user')
            // console.log(JSON.parse(jsonValue))
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}
export const destroyUser = async() => {
    return await AsyncStorage.removeItem('@user')
}