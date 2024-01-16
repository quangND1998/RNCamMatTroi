import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCart, getToken } from '../common/asynStorage';
const LoginContext = createContext();
import { loadStorageToken } from '../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../store/actions/cart';
import { getTokenStorage, getUserStorage, existsToken } from '../common/managerStorage';
const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const token = getTokenStorage();
    useEffect(() => {
        fetchUser();
        console.log('aaaaaaaa', token)
    }, []);
    const fetchUser = async () => {
        dispatch(loadStorageToken)
        dispatch(fetchCart)

        if (existsToken()) {
            console.log('fetchUser', token);

            setIsLoggedIn(true);
        }
        else {
            console.log('fetchUser', token);
            setIsLoggedIn(false);
        }
    }
    return (
        <LoginContext.Provider
            value={{ isLoggedIn, setIsLoggedIn }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;