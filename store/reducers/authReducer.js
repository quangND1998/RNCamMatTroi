const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false
};
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_TOKEN':
            console.log('GET_USER_TOKEN', action.payload.user);
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true,
                token: action.payload.token,
                isLoading: true
            }
        case 'LOGIN':
            return {
                ...state
            }
        case 'LOGIN_SUCCESS':
            console.log('LOGIN_SUCCESS', action.payload.token);

            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true,
                token: action.payload.token,
                isLoading: true
            }
        case 'LOGIN_FAIL':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };

        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isLoggedIn: false
            };
        case 'LOADAPP':
            return {
                ...state,
                token: action.token,
                isLoggedIn: action.token ? true : false
            };
        default:
            return state;
    }
};

export default loginReducer;